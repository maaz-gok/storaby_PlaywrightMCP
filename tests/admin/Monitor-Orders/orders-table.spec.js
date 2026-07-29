import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Order Management — orders table', () => {
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

  test('2.1 — Table headers are correct @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify header count and labels', async () => {
      const headers = await orders.getHeaderTexts();
      expect(headers).toEqual([
        'Order Number',
        'Customer',
        'Story',
        'Transaction',
        'Transaction Date',
        'Order Status',
        'Action',
      ]);
    });
  });

  test('2.2 — Table displays 10 rows per page @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify row count', async () => {
      const count = await orders.getRowCount();
      expect(count).toBe(10);
    });

    await test.step('Verify each row has 7 cells', async () => {
      for (let i = 0; i < 10; i++) {
        const cells = await orders.getRowCells(i);
        expect(cells).toHaveLength(7);
      }
    });
  });

  test('2.3 — Table row status badges render with correct styling @smoke @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify each row has a status badge', async () => {
      const rows = orders.tableRows;
      const count = await rows.count();
      for (let i = 0; i < count; i++) {
        const badge = rows.nth(i).locator('td').nth(5).locator('span.inline-flex');
        await expect(badge).toBeVisible();
        const svgCount = await badge.locator('svg').count();
        expect(svgCount).toBeGreaterThanOrEqual(1);
      }
    });
  });

  test('2.4 — Action column contains eye-icon button for each row @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify view order buttons exist and have correct aria-labels', async () => {
      const rows = orders.tableRows;
      const count = await rows.count();
      for (let i = 0; i < count; i++) {
        const btn = rows.nth(i).locator('td').nth(6).getByRole('button');
        await expect(btn).toBeVisible();
        const ariaLabel = await btn.getAttribute('aria-label');
        expect(ariaLabel).toMatch(/^View order ST-/);
      }
    });

    await test.step('Verify action text is center-aligned', async () => {
      const actionHeader = orders.tableHeaders.nth(6);
      await expect(actionHeader).toHaveClass(/text-center/);
    });
  });

  test('2.5 — No sorting available on table columns @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify no sort attributes on headers', async () => {
      const count = await orders.tableHeaders.count();
      for (let i = 0; i < count; i++) {
        const sortAttr = await orders.tableHeaders.nth(i).getAttribute('aria-sort');
        expect(sortAttr).toBeNull();
      }
    });
  });

  test('2.6 — Story column displays values in italic @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify story cells are italicized', async () => {
      const rows = orders.tableRows;
      const count = await rows.count();
      for (let i = 0; i < Math.min(count, 3); i++) {
        const storyCell = rows.nth(i).locator('td').nth(2).locator('span');
        await expect(storyCell).toHaveClass(/italic/);
      }
    });
  });
});
