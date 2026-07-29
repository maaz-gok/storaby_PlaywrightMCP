import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Order Management — browser behaviour', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    await login.goto();
    await login.login(users.admin.email, users.admin.password);
    await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  });

  test('7.1 — Browser back navigates to dashboard @smoke @critical', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const orders = new OrdersPage(page);

    await test.step('Navigate to orders page', async () => {
      await dashboard.monitorOrdersNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/orders`);
      await page.waitForLoadState('networkidle');
    });

    await test.step('Click browser back', async () => {
      await page.goBack();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify navigated to dashboard', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
      await expect(dashboard.welcomeHeading).toBeVisible();
      await expect(dashboard.dashboardNavLink).toHaveAttribute('aria-current', 'page');
    });
  });

  test('7.2 — Browser forward returns to orders page @regression', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const orders = new OrdersPage(page);

    await test.step('Navigate to orders, back, then forward', async () => {
      await dashboard.monitorOrdersNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/orders`);
      await page.waitForLoadState('networkidle');

      await page.goBack();
      await page.waitForLoadState('networkidle');

      await page.goForward();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify back on orders page', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/orders`);
      await expect(orders.heading).toBeVisible();
      await expect(dashboard.monitorOrdersNavLink).toHaveAttribute('aria-current', 'page');
    });
  });

  test('7.3 — Page refresh restores default state @smoke @regression', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const orders = new OrdersPage(page);

    await test.step('Apply filter, search, go to page 2, then refresh', async () => {
      await dashboard.monitorOrdersNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/orders`);
      await page.waitForLoadState('networkidle');

      await orders.selectStatusFilter('Printing');
      await page.waitForTimeout(1500);

      await orders.search('usman');
      await page.waitForTimeout(1500);

      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify default state restored', async () => {
      await expect(orders.statusFilterButton).toContainText('Statuses');
      const searchValue = await orders.searchInput.inputValue();
      expect(searchValue).toBe('');
      await expect(orders.paginationText).toContainText('1-10');
      const count = await orders.getRowCount();
      expect(count).toBe(10);
    });
  });

  test('7.4 — Direct URL access loads orders page @regression', async ({ page, context }) => {
    const orders = new OrdersPage(page);

    await test.step('Navigate directly to orders page with existing session', async () => {
      // We're authenticated from beforeEach, navigate direct
      await orders.goto();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify orders page loaded', async () => {
      await expect(orders.heading).toBeVisible();
      const count = await orders.getRowCount();
      expect(count).toBe(10);
    });
  });
});
