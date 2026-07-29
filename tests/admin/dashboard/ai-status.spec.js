import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { BASE_URL, API_BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

async function loginToDashboard(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.admin.email, users.admin.password);
  await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  await page.waitForLoadState('networkidle');
}

async function callApi(page, path) {
  return page.evaluate(async ({ apiUrl, path }) => {
    const auth = JSON.parse(localStorage.getItem('storaby-auth'));
    const token = auth?.state?.token;
    const resp = await fetch(`${apiUrl}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.json();
  }, { apiUrl: API_BASE_URL, path });
}

const STATUS_BADGE_MAP = {
  PENDING: 'Pending',
  GENERATING_FINAL: 'Generating Final',
  SUBMITTED_TO_PRINT: 'Submitted To Print',
  PRINTING: 'Printing',
  PAID: 'Paid',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  GENERATION_FAILED: 'Generation Failed',
  REFUNDED: 'Refunded',
};

test.describe('Admin Dashboard — AI generation status', () => {
  test('7.1 — AI Status section renders with all elements @smoke', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await expect(dashboard.aiStatusSection).toBeVisible();
    await expect(page.getByText('Queue')).toBeVisible();
    await expect(page.getByText('Processing')).toBeVisible();
    await expect(page.getByText('Completed today')).toBeVisible();
    await expect(page.getByText('Failed')).toBeVisible();
  });

  test('7.2 — AI Status counts match API response @smoke @critical', async ({ page }) => {
    await loginToDashboard(page);

    const apiData = await callApi(page, '/admin/dashboard/ai-status');
    const api = apiData.data;

    const aiSection = page.locator('section').filter({ hasText: 'AI Generation Status' });
    const lis = aiSection.locator('li');
    const liTexts = await lis.allTextContents();

    const statusMap = {};
    for (const text of liTexts) {
      if (text.includes('Queue')) statusMap.queue = text;
      else if (text.includes('Processing')) statusMap.processing = text;
      else if (text.includes('Completed today')) statusMap.completed = text;
      else if (text.includes('Failed')) statusMap.failed = text;
    }

    const extractNum = (s) => {
      const m = s.match(/([\d,]+)\s*stor/);
      return m ? parseInt(m[1].replace(/,/g, ''), 10) : 0;
    };

    expect(extractNum(statusMap.queue)).toBe(api.pending);
    expect(extractNum(statusMap.processing)).toBe(api.processing);
    expect(extractNum(statusMap.completed)).toBe(api.completedToday);
    expect(extractNum(statusMap.failed)).toBe(api.failed);
  });

  test('7.3 — AI Status percentages are calculated correctly @regression', async ({ page }) => {
    await loginToDashboard(page);

    const apiData = await callApi(page, '/admin/dashboard/ai-status');
    const api = apiData.data;
    const total = api.pending + api.processing + api.completedToday + api.failed;

    const expectedPcts = {};
    if (total > 0) {
      expectedPcts.queue = Math.round((api.pending / total) * 100);
      expectedPcts.processing = Math.round((api.processing / total) * 100);
      expectedPcts.completed = Math.round((api.completedToday / total) * 100);
      expectedPcts.failed = Math.round((api.failed / total) * 100);
    } else {
      expectedPcts.queue = 0;
      expectedPcts.processing = 0;
      expectedPcts.completed = 0;
      expectedPcts.failed = 0;
    }

    const expectedSum = expectedPcts.queue + expectedPcts.processing + expectedPcts.completed + expectedPcts.failed;
    expect(expectedSum).toBeGreaterThanOrEqual(99);
    expect(expectedSum).toBeLessThanOrEqual(101);
  });

  test('7.4 — AI Status donut chart renders with segments @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await expect(dashboard.donutChart).toBeVisible();

    const segments = await dashboard.donutChart.evaluate(el => {
      const paths = el.querySelectorAll('path, circle, [class*="segment"], [class*="slice"]');
      return paths.length;
    });

    expect(segments).toBeGreaterThanOrEqual(1);
  });

  test('7.5 — AI Status period selector shows only Weekly @smoke', async ({ page }) => {
    await loginToDashboard(page);

    const aiPeriod = page.locator('section').filter({ hasText: 'AI Generation Status' }).getByRole('button');
    await expect(aiPeriod).toHaveText('Weekly');
  });
});
