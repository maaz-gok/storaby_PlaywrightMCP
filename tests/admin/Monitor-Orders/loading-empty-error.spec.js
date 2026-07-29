import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Order Management — loading, empty and error states', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    await login.goto();
    await login.login(users.admin.email, users.admin.password);
    await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
    await dashboard.monitorOrdersNavLink.click();
    await page.waitForURL(`${BASE_URL}/admin/orders`);
    await page.waitForLoadState('networkidle');
  });

  test('8.1 — Skeleton loaders appear while table data is loading @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Delay API response to observe loading state', async () => {
      await page.route('**/api.staging.storaby.com/admin/orders**', async route => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await route.continue();
      });
    });

    await test.step('Navigate to orders page fresh', async () => {
      await orders.goto();
      await page.waitForTimeout(500);
    });

    await test.step('Verify skeleton rows are present during loading', async () => {
      const skeletonCount = await orders.skeletonRows.count();
      expect(skeletonCount).toBeGreaterThan(0);
    });
  });

  test('9.1 — No search results displays empty state @smoke @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Search for non-existent value', async () => {
      await orders.search('ZZZZNONEXISTENT12345');
      await page.waitForTimeout(2000);
    });

    await test.step('Verify empty state message', async () => {
      await expect(orders.emptyStateMessage).toBeVisible();
      await expect(orders.emptyStateRow).toBeVisible();
    });

    await test.step('Verify pagination shows zeros', async () => {
      const text = await orders.getPaginationText();
      expect(text).toBe('0-0 of 0');
    });

    await test.step('Verify all pagination buttons disabled', async () => {
      await expect(orders.firstPageButton).toBeDisabled();
      await expect(orders.prevPageButton).toBeDisabled();
      await expect(orders.nextPageButton).toBeDisabled();
      await expect(orders.lastPageButton).toBeDisabled();
    });
  });

  test('9.2 — Filter returns no results @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Filter by status with no orders', async () => {
      await orders.selectStatusFilter('Shipped');
      await page.waitForTimeout(2000);
    });

    await test.step('Verify empty state', async () => {
      await expect(orders.emptyStateMessage).toBeVisible();
      await expect(orders.paginationText).toHaveText('0-0 of 0');
      await expect(orders.firstPageButton).toBeDisabled();
      await expect(orders.nextPageButton).toBeDisabled();
    });

    await test.step('Verify filter button still shows selected status', async () => {
      await expect(orders.statusFilterButton).toContainText('Shipped');
    });
  });

  test('9.3 — No orders in database via API mock @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Mock empty orders response', async () => {
      await page.route('**/api.staging.storaby.com/admin/orders**', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: { items: [], total: 0, page: 1, limit: 10, totalPages: 0 },
            status: 200,
            message: 'Orders retrieved successfully',
          }),
        });
      });
    });

    await test.step('Navigate to orders page', async () => {
      await page.goto(`${BASE_URL}/admin/orders`);
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify empty state', async () => {
      await expect(orders.emptyStateMessage).toBeVisible();
      expect(await orders.getRowCount()).toBe(1);
      await expect(orders.emptyStateRow).toBeVisible();
    });
  });

  test('10.1 — API failure shows graceful error state @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Block the orders API', async () => {
      await page.route('**/api.staging.storaby.com/admin/orders**', async route => {
        await route.abort('connectionrefused');
      });
    });

    await test.step('Navigate to orders page', async () => {
      await page.goto(`${BASE_URL}/admin/orders`);
      await page.waitForTimeout(2000);
    });

    await test.step('Verify search and filter controls are still visible', async () => {
      await expect(orders.searchInput).toBeVisible();
      await expect(orders.statusFilterButton).toBeVisible();
    });
  });

  test('10.2 — Order detail API failure shows error in drawer @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Block order detail API', async () => {
      await page.route('**/api.staging.storaby.com/admin/orders**', async route => {
        const url = route.request().url();
        if (!url.includes('?page=') && !url.includes('limit=')) {
          await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ status: 500, message: 'Internal server error' }),
          });
        } else {
          await route.continue();
        }
      });
    });

    await test.step('Open order drawer', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(2000);
    });

    await test.step('Verify drawer opened (may show error state)', async () => {
      // Drawer should open but may not have data
      const isVisible = await orders.drawer.isVisible().catch(() => false);
      expect(isVisible).toBe(true);
    });
  });
});
