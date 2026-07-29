import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Order Management — status filter', () => {
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

  const allStatuses = [
    'Pending', 'Paid', 'Generating Final', 'Submitted To Print',
    'Printing', 'Shipped', 'Delivered', 'Cancelled',
    'Generation Failed', 'Refunded',
  ];

  test('4.1 — Status filter button renders correctly @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify button attributes', async () => {
      await expect(orders.statusFilterButton).toBeVisible();
      await expect(orders.statusFilterButton).toHaveAttribute('aria-label', 'Statuses');
      await expect(orders.statusFilterButton).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(orders.statusFilterButton).toContainText('Statuses');
    });
  });

  test('4.2 — Status filter dropdown opens with all 11 options @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open the dropdown', async () => {
      await orders.statusFilterButton.click();
      await expect(orders.statusDropdown).toBeVisible();
    });

    await test.step('Verify option count and labels', async () => {
      const count = await orders.statusOptions.count();
      expect(count).toBe(11);
      const labels = await orders.statusOptions.allTextContents();
      expect(labels).toEqual([
        'All', 'Pending', 'Paid', 'Generating Final', 'Submitted To Print',
        'Printing', 'Shipped', 'Delivered', 'Cancelled',
        'Generation Failed', 'Refunded',
      ]);
    });

    await test.step('Verify All is selected by default', async () => {
      await expect(orders.statusOptionAll).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Close dropdown via Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(orders.statusDropdown).not.toBeVisible();
    });
  });

  test('4.3 — Selecting a status filters the table @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    const responsePromise = page.waitForResponse(r =>
      r.url().includes('/admin/orders') && r.url().includes('status=PRINTING')
    );

    await test.step('Select Printing status', async () => {
      await orders.selectStatusFilter('Printing');
      await responsePromise;
    });

    await test.step('Verify button text updated', async () => {
      await expect(orders.statusFilterButton).toContainText('Printing');
    });

    await test.step('Verify all rows have Printing status', async () => {
      const count = await orders.getRowCount();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const cells = await orders.getRowCells(i);
        expect(cells[5]).toBe('Printing');
      }
    });
  });

  test('4.4 — Selecting "All" resets the filter @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Apply a filter first', async () => {
      await orders.selectStatusFilter('Printing');
      await page.waitForTimeout(1500);
      const filteredCount = await orders.getRowCount();
      expect(filteredCount).toBeGreaterThan(0);
    });

    await test.step('Select All to reset', async () => {
      await orders.selectStatusFilter('All');
      await page.waitForTimeout(1500);
    });

    await test.step('Verify button text reverts to Statuses', async () => {
      await expect(orders.statusFilterButton).toContainText('Statuses');
    });

    await test.step('Verify full list restored', async () => {
      const count = await orders.getRowCount();
      expect(count).toBe(10);
    });
  });

  test('4.5 — Each status option is selectable @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    for (const status of allStatuses) {
      await test.step(`Select "${status}" status`, async () => {
        await orders.selectStatusFilter(status);
        await page.waitForTimeout(1500);

        const count = await orders.getRowCount();
        if (count > 0 && (await orders.emptyStateRow.isVisible()) === false) {
          for (let i = 0; i < count; i++) {
            const cells = await orders.getRowCells(i);
            expect(cells[5]).toContain(status);
          }
        }
      });
    }
  });

  test('4.6 — Filter persists after pagination @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Apply filter and navigate to next page', async () => {
      await orders.selectStatusFilter('Generating Final');
      await page.waitForTimeout(1500);

      if (await orders.nextPageButton.isEnabled()) {
        await orders.nextPageButton.click();
        await page.waitForTimeout(1500);
      }
    });

    await test.step('Verify filter still active', async () => {
      await expect(orders.statusFilterButton).toContainText('Generating Final');
      const count = await orders.getRowCount();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const cells = await orders.getRowCells(i);
          expect(cells[5]).toContain('Generating Final');
        }
      }
    });
  });

  test('4.7 — Filter does not persist after page refresh @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Apply filter and refresh', async () => {
      await orders.selectStatusFilter('Printing');
      await page.waitForTimeout(1500);
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify filter is reset', async () => {
      await expect(orders.statusFilterButton).toContainText('Statuses');
      const count = await orders.getRowCount();
      expect(count).toBe(10);
    });
  });
});
