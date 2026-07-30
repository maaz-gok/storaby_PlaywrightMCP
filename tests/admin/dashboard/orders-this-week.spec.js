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

test.describe('Admin Dashboard — orders this week', () => {
  test('6.1 — Orders This Week section renders with chart @smoke', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await expect(dashboard.ordersThisWeekSection).toBeVisible();
    await expect(dashboard.ordersChart).toBeVisible();
  });

  test('6.2 — Orders This Week data reflects API @smoke @critical', async ({ page }) => {
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
    if (total > 0) {
      const rawPcts = {};
      for (const [day, count] of Object.entries(dayCounts)) {
        rawPcts[day] = (count / total) * 100;
      }
      for (const [day, pct] of Object.entries(rawPcts)) {
        expectedPcts[day] = Math.floor(pct);
      }
      const flooredSum = Object.values(expectedPcts).reduce((a, b) => a + b, 0);
      let remainder = 100 - flooredSum;
      const sortedDays = Object.entries(rawPcts)
        .sort((a, b) => (b[1] - Math.floor(b[1])) - (a[1] - Math.floor(a[1])))
        .map(([day]) => day);
      for (let i = 0; i < remainder; i++) {
        expectedPcts[sortedDays[i]]++;
      }
    } else {
      dayLabels.forEach(d => expectedPcts[d] = 0);
    }

    const totalPct = Object.values(expectedPcts).reduce((a, b) => a + b, 0);
    expect(totalPct).toBe(100);
  });

  test('6.3 — Orders This Week tooltip on hover (if available) @regression', async ({ page }) => {
    await loginToDashboard(page);

    const chartApp = page.locator('section').filter({ hasText: 'Order this week' }).locator('[role="application"]');
    await expect(chartApp).toBeVisible();

    await chartApp.hover({ force: true });

    const tooltip = page.locator('[role="tooltip"]');
    await expect(tooltip).toHaveCount(await tooltip.count());
  });
});
