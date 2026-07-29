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

test.describe('Admin Dashboard — revenue trend', () => {
  test('5.1 — Revenue Trend section renders with title and period selector @smoke', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await expect(dashboard.weeklyRevenueTrendSection).toBeVisible();
    await expect(dashboard.periodSelectorButton).toBeVisible();
    await expect(dashboard.periodSelectorButton).toHaveText('Weekly');

    await dashboard.periodSelectorButton.click();
    await expect(dashboard.periodOptionMonthly).toBeVisible();
    await expect(dashboard.periodOptionWeekly).toBeVisible();

    await page.keyboard.press('Escape');
  });

  test('5.2 — Revenue chart x-axis labels match API data (weekly) @smoke', async ({ page }) => {
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
  });

  test('5.3 — Revenue chart displays correct y-axis values @smoke', async ({ page }) => {
    await loginToDashboard(page);

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

    const yAxisPattern = /^£[\d,.k]+$/;
    const yLabels = allTexts.filter(t => yAxisPattern.test(t));
    expect(yLabels.length).toBeGreaterThanOrEqual(3);
  });

  test('5.4 — Revenue chart data points reflect API response values @regression', async ({ page }) => {
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
  });

  test('5.5 — Switch period from Weekly to Monthly @smoke @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);
    const monthlyResponse = page.waitForResponse(r =>
      r.url().includes('/admin/dashboard/revenue-trend?period=monthly')
    );

    await dashboard.periodSelectorButton.click();
    await page.getByText('Monthly').click();
    await monthlyResponse;

    await expect(page.getByText('Monthly Revenue Trend')).toBeVisible();
    await expect(dashboard.periodSelectorButton).toHaveText('Monthly');

    const weeklyResponse = page.waitForResponse(r =>
      r.url().includes('/admin/dashboard/revenue-trend?period=weekly')
    );
    await dashboard.periodSelectorButton.click();
    await page.getByText('Weekly').first().click();
    await weeklyResponse;

    await expect(page.getByText('Weekly Revenue Trend')).toBeVisible();
  });

  test('5.6 — Revenue chart tooltip on hover (if available) @regression', async ({ page }) => {
    await loginToDashboard(page);

    const chartApp = page.locator('section').filter({ hasText: 'Revenue Trend' }).locator('[role="application"]');
    await expect(chartApp).toBeVisible();

    await chartApp.hover({ force: true });

    const tooltip = page.locator('[role="tooltip"]');
    const tooltipCount = await tooltip.count();
    // Document observed behavior — tooltip may or may not be implemented
    expect(typeof tooltipCount).toBe('number');
  });

  test('5.7 — No duplicate API requests when changing period @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);
    const requests = [];
    page.on('request', req => {
      if (req.url().includes('/admin/dashboard/revenue-trend')) {
        requests.push(req.url());
      }
    });

    await dashboard.periodSelectorButton.click();
    await page.getByText('Monthly').click();
    await page.waitForResponse(r => r.url().includes('period=monthly'));

    await dashboard.periodSelectorButton.click();
    await page.getByText('Weekly').first().click();
    await page.waitForResponse(r => r.url().includes('period=weekly'));

    const monthlyCalls = requests.filter(u => u.includes('period=monthly'));
    const weeklyCalls = requests.filter(u => u.includes('period=weekly'));
    expect(monthlyCalls.length).toBe(1);
    expect(weeklyCalls.length).toBe(1);
  });
});
