import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
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

test.describe('Admin Dashboard — recent orders', () => {
  test('8.1 — Recent Orders section renders with table @smoke', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await expect(dashboard.recentOrdersSection).toBeVisible();
    await expect(dashboard.recentOrdersTable).toBeVisible();
    await expect(dashboard.viewAllButton).toBeVisible();
  });

  test('8.2 — Recent Orders table rows match API response @smoke @critical', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const apiData = await callApi(page, '/admin/dashboard/recent-orders');
    const orders = apiData.data;

    const rowCount = await dashboard.recentOrdersRows.count();
    expect(rowCount).toBe(orders.length);
    expect(rowCount).toBeLessThanOrEqual(10);

    for (let i = 0; i < rowCount; i++) {
      const cells = await dashboard.recentOrdersRows.nth(i).locator('td').allTextContents();
      expect(cells.length).toBeGreaterThanOrEqual(4);
    }
  });

  test('8.3 — Recent Orders action button is present for each row @smoke @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const rowCount = await dashboard.recentOrdersRows.count();
    const actionBtnCount = await dashboard.actionButtons.count();
    expect(actionBtnCount).toBe(rowCount);

    for (let i = 0; i < rowCount; i++) {
      await expect(dashboard.actionButtons.nth(i)).toBeVisible();
    }
  });

  test('8.4 — View All button navigates to orders page @smoke', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await dashboard.viewAllButton.click();
    await page.waitForURL('**/admin/orders', { timeout: 10000 });
    expect(page.url()).toContain('/admin/orders');
  });

  test('8.5 — Orders page status filter opens dropdown @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await dashboard.viewAllButton.click();
    await page.waitForURL('**/admin/orders', { timeout: 10000 });

    const ordersPage = new OrdersPage(page);
    await expect(ordersPage.statusFilterButton).toBeVisible();

    await ordersPage.statusFilterButton.click();

    const options = ordersPage.statusOptions;
    const optionCount = await options.count();
    expect(optionCount).toBeGreaterThanOrEqual(1);
  });

  test('8.6 — Orders page search input is present @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await dashboard.viewAllButton.click();
    await page.waitForURL('**/admin/orders', { timeout: 10000 });

    const ordersPage = new OrdersPage(page);
    await expect(ordersPage.searchInput).toBeVisible();
    await expect(ordersPage.searchInput).toHaveAttribute('placeholder', 'Search anything...');
  });

  test('8.7 — Orders page pagination is displayed @regression', async ({ page }) => {
    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await dashboard.viewAllButton.click();
    await page.waitForURL('**/admin/orders', { timeout: 10000 });

    const ordersPage = new OrdersPage(page);
    await expect(ordersPage.paginationText.first()).toBeVisible();
  });
});
