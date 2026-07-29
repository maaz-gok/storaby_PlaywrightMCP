import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Order Management — page load and route guard', () => {
  test('1.1 — Orders page loads with authenticated session @smoke @critical', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const orders = new OrdersPage(page);

    await test.step('Log in as admin', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
    });

    await test.step('Navigate to orders page via sidebar', async () => {
      await dashboard.monitorOrdersNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/orders`);
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify URL and heading', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/orders`);
      await expect(page).toHaveTitle(/Storaby/);
      await expect(orders.heading).toBeVisible();
    });

    await test.step('Verify sidebar navigation active state', async () => {
      await expect(dashboard.monitorOrdersNavLink).toHaveAttribute('aria-current', 'page');
    });

    await test.step('Verify header/profile section', async () => {
      await expect(dashboard.profileMenuButton).toBeVisible();
    });

    await test.step('Verify no console errors', async () => {
      expect(consoleErrors).toEqual([]);
    });
  });

  test('1.2 — Unauthenticated user is redirected to login @critical @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Navigate directly to orders page without session', async () => {
      await orders.goto();
    });

    await test.step('Verify redirect to login', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/login`);
    });

    await test.step('Verify orders page content is not rendered', async () => {
      await expect(orders.heading).not.toBeVisible();
      await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
    });
  });

  test('1.3 — Orders page structure renders correctly @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const orders = new OrdersPage(page);

    await test.step('Log in and navigate to orders page', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
      await dashboard.monitorOrdersNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/orders`);
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify sidebar structure', async () => {
      await expect(dashboard.sidebar).toBeVisible();
      await expect(dashboard.dashboardNavLink).toBeVisible();
      await expect(dashboard.monitorOrdersNavLink).toBeVisible();
      await expect(dashboard.templatesNavLink).toBeVisible();
      await expect(dashboard.sidebarCollapseButton).toBeVisible();
    });

    await test.step('Verify Monitor Orders is active', async () => {
      await expect(dashboard.monitorOrdersNavLink).toHaveAttribute('aria-current', 'page');
    });

    await test.step('Verify search input', async () => {
      await expect(orders.searchInput).toBeVisible();
      await expect(orders.searchInput).toHaveAttribute('placeholder', 'Search anything...');
    });

    await test.step('Verify status filter button', async () => {
      await expect(orders.statusFilterButton).toBeVisible();
      await expect(orders.statusFilterButton).toHaveAttribute('aria-label', 'Statuses');
    });

    await test.step('Verify table is rendered', async () => {
      await expect(orders.table).toBeVisible();
    });

    await test.step('Verify pagination controls', async () => {
      await expect(orders.paginationText).toBeVisible();
      await expect(orders.firstPageButton).toBeVisible();
      await expect(orders.prevPageButton).toBeVisible();
      await expect(orders.nextPageButton).toBeVisible();
      await expect(orders.lastPageButton).toBeVisible();
    });

    await test.step('Verify header/profile', async () => {
      await expect(dashboard.profileAvatar).toBeVisible();
      await expect(dashboard.profileMenuButton).toBeVisible();
    });
  });
});
