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

async function callSummaryApi(page) {
  return page.evaluate(async (apiUrl) => {
    const auth = JSON.parse(localStorage.getItem('storaby-auth'));
    const token = auth?.state?.token;
    const resp = await fetch(`${apiUrl}/admin/dashboard/summary`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.json();
  }, API_BASE_URL);
}

function formatRevenue(cents) {
  const pounds = cents / 100;
  return `£${pounds.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

test.describe('Admin Dashboard — summary cards', () => {
  test('4.1 — All four summary cards are displayed @smoke', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await expect(dashboard.summaryCards).toHaveCount(4);
    await expect(dashboard.totalRevenueLabel).toBeVisible();
    await expect(dashboard.ordersTodayLabel).toBeVisible();
    await expect(dashboard.activeCustomersLabel).toBeVisible();
    await expect(dashboard.booksGeneratedLabel).toBeVisible();
  });

  test('4.2 — Total Revenue displays correct formatted value @smoke @critical', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const apiData = await callSummaryApi(page);
    const expectedRevenue = formatRevenue(apiData.data.totalRevenue);
    await expect(dashboard.totalRevenueValue).toHaveText(expectedRevenue);
  });

  test('4.3 — Orders Today displays correct value @smoke @critical', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const apiData = await callSummaryApi(page);
    await expect(dashboard.ordersTodayValue).toHaveText(String(apiData.data.ordersToday));
  });

  test('4.4 — Active Customers displays correct value @smoke @critical', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const apiData = await callSummaryApi(page);
    await expect(dashboard.activeCustomersValue).toHaveText(String(apiData.data.activeCustomers));
  });

  test('4.5 — Books Generated displays correct value @smoke @critical', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const apiData = await callSummaryApi(page);
    await expect(dashboard.booksGeneratedValue).toHaveText(String(apiData.data.booksGenerated));
  });

  test('4.6 — Summary cards are not clickable @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const cardCount = await dashboard.summaryCards.count();
    for (let i = 0; i < cardCount; i++) {
      const card = dashboard.summaryCards.nth(i);
      const tagName = await card.evaluate(el => el.tagName.toLowerCase());
      expect(tagName).not.toBe('a');
      const hasClickHandler = await card.evaluate(el => {
        return typeof el.onclick === 'function' || el.hasAttribute('onclick');
      });
      expect(hasClickHandler).toBe(false);
    }
  });
});
