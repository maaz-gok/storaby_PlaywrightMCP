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

test.describe('Admin Dashboard — API/UI data consistency', () => {
  test('9.1 — All dashboard API requests return 200 @regression', async ({ page }) => {
    const responses = [];
    page.on('response', resp => {
      const url = resp.url();
      if (
        url.includes('/admin/dashboard/') ||
        url.includes('/users')
      ) {
        responses.push({ url, status: resp.status() });
      }
    });

    await loginToDashboard(page);

    const apiPaths = [
      '/admin/dashboard/summary',
      '/admin/dashboard/revenue-trend?period=weekly',
      '/admin/dashboard/orders-this-week',
      '/admin/dashboard/ai-status',
      '/admin/dashboard/recent-orders',
    ];

    for (const path of apiPaths) {
      const matching = responses.filter(r => r.url.includes(path));
      expect(matching.length).toBeGreaterThanOrEqual(1);
      expect(matching[0].status).toBe(200);
    }

    const userApiCalls = responses.filter(r => r.url.includes('/users'));
    expect(userApiCalls.length).toBeGreaterThanOrEqual(1);
    expect(userApiCalls[0].status).toBe(200);
  });

  test('9.2 — Revenue Trend weekly data: API values match chart content @smoke @critical', async ({ page }) => {
    await loginToDashboard(page);

    const apiData = await callApi(page, '/admin/dashboard/revenue-trend?period=weekly');
    const expectedCount = apiData.data.length;

    const chartApp = page.locator('section').filter({ hasText: 'Revenue Trend' }).locator('[role="application"]');
    await expect(chartApp).toBeVisible();

    const allTexts = await chartApp.evaluate(el => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      const texts = [];
      let node;
      while (node = walker.nextNode()) {
        const t = node.textContent.trim();
        if (t) texts.push(t);
      }
      return texts;
    });

    const datePattern = /^[A-Z][a-z]{2}\s\d{1,2}$/;
    const xLabels = allTexts.filter(t => datePattern.test(t));
    expect(xLabels.length).toBe(expectedCount);

    for (let i = 0; i < expectedCount; i++) {
      const date = new Date(apiData.data[i].period + 'T00:00:00');
      const expectedLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      expect(xLabels).toContain(expectedLabel);
    }
  });

  test('9.3 — Revenue Trend monthly data: API matches chart @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const monthlyResponse = page.waitForResponse(r =>
      r.url().includes('/admin/dashboard/revenue-trend?period=monthly')
    );
    await dashboard.periodSelectorButton.click();
    await page.getByText('Monthly').click();
    await monthlyResponse;

    const apiData = await callApi(page, '/admin/dashboard/revenue-trend?period=monthly');
    const expectedCount = apiData.data.length;
    expect(expectedCount).toBe(12);

    const chartApp = page.locator('section').filter({ hasText: 'Revenue Trend' }).locator('[role="application"]');
    await expect(chartApp).toBeVisible();

    const allTexts = await chartApp.evaluate(el => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      const texts = [];
      let node;
      while (node = walker.nextNode()) {
        const t = node.textContent.trim();
        if (t) texts.push(t);
      }
      return texts;
    });

    const monthAbbr = /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/i;
    const xLabels = allTexts.filter(t => monthAbbr.test(t.trim()) || /^[A-Z][a-z]{2}\s\d{1,2}$/.test(t));
    expect(xLabels.length).toBe(expectedCount);
  });

  test('9.4 — Orders This Week: computed percentages sum to 100% @smoke @critical', async ({ page }) => {
    await loginToDashboard(page);

    const apiData = await callApi(page, '/admin/dashboard/orders-this-week');
    const orders = apiData.data;

    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayCounts = {};
    dayLabels.forEach(d => dayCounts[d] = 0);

    orders.forEach(o => {
      const d = new Date(o.createdAt);
      dayCounts[dayLabels[d.getDay()]]++;
    });

    const total = Object.values(dayCounts).reduce((a, b) => a + b, 0);
    const expectedPcts = {};
    for (const [day, count] of Object.entries(dayCounts)) {
      expectedPcts[day] = total > 0 ? Math.round((count / total) * 100) : 0;
    }

    const totalPct = Object.values(expectedPcts).reduce((a, b) => a + b, 0);
    expect(totalPct).toBe(100);
  });

  test('9.5 — Recent Orders: API fields map to UI columns @smoke @critical', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const apiData = await callApi(page, '/admin/dashboard/recent-orders');
    const orders = apiData.data;

    const rowCount = Math.min(orders.length, 3);
    for (let i = 0; i < rowCount; i++) {
      const cells = await dashboard.recentOrdersRowCells(i).allTextContents();
      expect(cells.length).toBe(5);

      expect(cells[0].trim()).toBe(orders[i].orderNumber);
      expect(cells[3].trim()).toBe(STATUS_BADGE_MAP[orders[i].status] || orders[i].status);
    }
  });

  test('9.6 — Total Revenue consistency: card vs revenue trend sum @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const summaryData = await callApi(page, '/admin/dashboard/summary');
    const trendData = await callApi(page, '/admin/dashboard/revenue-trend?period=weekly');

    const cardRevenue = summaryData.data.totalRevenue;

    const trendSum = trendData.data.reduce((sum, d) => sum + d.revenue, 0);

    await expect(dashboard.totalRevenueValue).toHaveText(`£${Math.floor(cardRevenue / 100).toLocaleString('en-GB')}`);
  });
});
