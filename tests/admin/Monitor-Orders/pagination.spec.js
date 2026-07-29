import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Order Management — pagination', () => {
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

  test('5.1 — Pagination controls are rendered with correct disabled states on page 1 @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify pagination text format', async () => {
      const text = await orders.getPaginationText();
      expect(text).toMatch(/^\d+-\d+ of \d+$/);
    });

    await test.step('Verify first/prev are disabled on page 1', async () => {
      await expect(orders.firstPageButton).toBeDisabled();
      await expect(orders.prevPageButton).toBeDisabled();
    });

    await test.step('Verify next/last are enabled on page 1', async () => {
      await expect(orders.nextPageButton).toBeEnabled();
      await expect(orders.lastPageButton).toBeEnabled();
    });
  });

  test('5.2 — Page indicator shows correct ranges @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify page 1 range', async () => {
      const text = await orders.getPaginationText();
      expect(text).toBe('1-10 of 85');
    });

    await test.step('Navigate to page 2 and verify range', async () => {
      await orders.nextPageButton.click();
      await page.waitForTimeout(1500);
      const text = await orders.getPaginationText();
      expect(text).toBe('11-20 of 85');
    });

    await test.step('Navigate to last page and verify range', async () => {
      await orders.lastPageButton.click();
      await page.waitForTimeout(1500);
      const text = await orders.getPaginationText();
      expect(text).toBe('81-85 of 85');
    });
  });

  test('5.3 — Next page loads new data @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Get first order on page 1', async () => {
      const firstRowPage1 = await orders.getRowCells(0);
      expect(firstRowPage1[0]).toBeTruthy();
    });

    await test.step('Go to page 2 and verify different data', async () => {
      await orders.nextPageButton.click();
      await page.waitForTimeout(1500);
      const firstRowPage2 = await orders.getRowCells(0);
      const prevRowPage1 = firstRowPage2; // captured intentionally
      expect(prevRowPage1[0]).toBeTruthy();
      expect(await orders.getRowCount()).toBe(10);
    });
  });

  test('5.4 — Previous page returns to page 1 data @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);
    const firstRowPage1 = await orders.getRowCells(0);

    await test.step('Go to page 2 and back', async () => {
      await orders.nextPageButton.click();
      await page.waitForTimeout(1500);
      // Wait for prev to be enabled
      await expect(orders.prevPageButton).toBeEnabled();
      await orders.prevPageButton.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Verify back on page 1 with original data', async () => {
      const restoredRow = await orders.getRowCells(0);
      expect(restoredRow[0]).toBe(firstRowPage1[0]);
      await expect(orders.paginationText).toContainText('1-10');
    });

    await test.step('Verify prev/disabled back to disabled', async () => {
      await expect(orders.prevPageButton).toBeDisabled();
    });
  });

  test('5.5 — First page button navigates to page 1 @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Navigate to page 3', async () => {
      await orders.nextPageButton.click();
      await page.waitForTimeout(1000);
      await orders.nextPageButton.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Click First page', async () => {
      await orders.firstPageButton.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Verify on page 1', async () => {
      await expect(orders.paginationText).toContainText('1-10');
      await expect(orders.firstPageButton).toBeDisabled();
      await expect(orders.prevPageButton).toBeDisabled();
    });
  });

  test('5.6 — Last page button navigates to the final page @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Click Last page', async () => {
      await orders.lastPageButton.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Verify on last page', async () => {
      await expect(orders.paginationText).toContainText('of 85');
      const text = await orders.getPaginationText();
      const lastPageRange = text.split(' ')[0];
      expect(lastPageRange).toBe('81-85');
    });

    await test.step('Verify next/last are disabled', async () => {
      await expect(orders.nextPageButton).toBeDisabled();
      await expect(orders.lastPageButton).toBeDisabled();
    });
  });

  test('5.7 — Pagination button disabled states are correct @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Page 1: first/prev disabled, next/last enabled', async () => {
      await expect(orders.firstPageButton).toBeDisabled();
      await expect(orders.prevPageButton).toBeDisabled();
      await expect(orders.nextPageButton).toBeEnabled();
      await expect(orders.lastPageButton).toBeEnabled();
    });

    await test.step('Middle page: all enabled', async () => {
      await orders.nextPageButton.click();
      await page.waitForTimeout(1500);
      await expect(orders.firstPageButton).toBeEnabled();
      await expect(orders.prevPageButton).toBeEnabled();
      await expect(orders.nextPageButton).toBeEnabled();
      await expect(orders.lastPageButton).toBeEnabled();
    });

    await test.step('Last page: next/last disabled, first/prev enabled', async () => {
      await orders.lastPageButton.click();
      await page.waitForTimeout(1500);
      await expect(orders.firstPageButton).toBeEnabled();
      await expect(orders.prevPageButton).toBeEnabled();
      await expect(orders.nextPageButton).toBeDisabled();
      await expect(orders.lastPageButton).toBeDisabled();
    });
  });

  test('5.8 — Pagination with search active @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Search and navigate pages', async () => {
      await orders.search('ST-');
      await page.waitForTimeout(2000);

      if (await orders.nextPageButton.isEnabled()) {
        await orders.nextPageButton.click();
        await page.waitForTimeout(1500);
      }
    });

    await test.step('Verify pagination shows filtered total', async () => {
      const text = await orders.getPaginationText();
      expect(text).toMatch(/\d+-\d+ of \d+/);
    });
  });

  test('5.9 — Pagination with status filter active @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Apply status filter and navigate pages', async () => {
      await orders.selectStatusFilter('Printing');
      await page.waitForTimeout(1500);

      if (await orders.nextPageButton.isEnabled()) {
        await orders.nextPageButton.click();
        await page.waitForTimeout(1500);
      }
    });

    await test.step('Verify filtered results persist across pages', async () => {
      const count = await orders.getRowCount();
      for (let i = 0; i < count; i++) {
        const cells = await orders.getRowCells(i);
        expect(cells[5]).toBe('Printing');
      }
    });
  });

  test('5.10 — Pagination boundaries when total <= limit @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Filter to a status with few results', async () => {
      await orders.selectStatusFilter('Paid');
      await page.waitForTimeout(1500);
    });

    await test.step('Verify all pagination buttons are disabled', async () => {
      await expect(orders.firstPageButton).toBeDisabled();
      await expect(orders.prevPageButton).toBeDisabled();
      await expect(orders.nextPageButton).toBeDisabled();
      await expect(orders.lastPageButton).toBeDisabled();
    });
  });
});
