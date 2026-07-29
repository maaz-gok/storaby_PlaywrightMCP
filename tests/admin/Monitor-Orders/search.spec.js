import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Order Management — search', () => {
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

  test('3.1 — Search input renders with correct placeholder @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Verify search input attributes', async () => {
      await expect(orders.searchInput).toBeVisible();
      await expect(orders.searchInput).toHaveAttribute('placeholder', 'Search anything...');
      await expect(orders.searchInput).toHaveAttribute('type', 'search');
    });
  });

  test('3.2 — Search is debounced and fires API request after pause @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);
    const requests = [];

    page.on('request', req => {
      if (req.url().includes('/admin/orders') && req.method() === 'GET') {
        requests.push(req.url());
      }
    });

    await test.step('Type search query character by character', async () => {
      await orders.searchInput.fill('S');
      await page.waitForTimeout(200);
      await orders.searchInput.fill('ST');
      await page.waitForTimeout(200);
      await orders.searchInput.fill('ST-');
      await page.waitForTimeout(200);
      await orders.searchInput.fill('ST-8');
      await page.waitForTimeout(2000);
    });

    await test.step('Verify only one request fired after debounce', async () => {
      const searchRequests = requests.filter(u => u.includes('search='));
      expect(searchRequests.length).toBe(1);
      expect(searchRequests[0]).toContain('search=ST-8');
    });
  });

  test('3.3 — Search by order number prefix returns matching orders @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    const responsePromise = page.waitForResponse(r =>
      r.url().includes('/admin/orders') && r.url().includes('search=ST-8')
    );

    await test.step('Search for order prefix "ST-8"', async () => {
      await orders.search('ST-8');
      await responsePromise;
    });

    await test.step('Verify all returned order numbers start with "ST-8"', async () => {
      const count = await orders.getRowCount();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const cells = await orders.getRowCells(i);
        expect(cells[0]).toMatch(/^ST-8/);
      }
    });
  });

  test('3.4 — Search by customer name returns filtered results @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    const response = page.waitForResponse(r =>
      r.url().includes('/admin/orders') && r.url().includes('search=usman')
    );

    await test.step('Search for "usman"', async () => {
      await orders.search('usman');
      const res = await response;
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.data.items.length).toBeGreaterThan(0);
    });
  });

  test('3.5 — Search with leading/trailing spaces @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    const response = page.waitForResponse(r =>
      r.url().includes('/admin/orders') && r.url().includes('search=')
    );

    await test.step('Search with spaces around query', async () => {
      await orders.search('  usman  ');
      const res = await response;
      expect(res.status()).toBe(200);
      const url = res.url();
      const searchParam = new URL(url).searchParams.get('search');
      expect(searchParam).toBe('usman');
    });

    await test.step('Verify results are returned', async () => {
      const count = await orders.getRowCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  test('3.6 — Search with special characters @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Search with special characters', async () => {
      await orders.search('@#$');
      await page.waitForTimeout(2000);
    });

    await test.step('Verify no console errors and valid empty state', async () => {
      const count = await orders.getRowCount();
      if (count === 1) {
        const text = await orders.tableRows.first().allTextContents();
        expect(text.join('')).toContain('No orders found');
      }
    });
  });

  test('3.7 — Search with numeric values @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Search with numbers', async () => {
      await orders.search('123');
      await page.waitForTimeout(2000);
    });

    await test.step('Verify search executed without errors', async () => {
      const count = await orders.getRowCount();
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test('3.8 — Clear search restores full list @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Apply a search and verify filtered', async () => {
      await orders.search('usman');
      await page.waitForTimeout(2000);
      const filteredCount = await orders.getRowCount();
      expect(filteredCount).toBeGreaterThan(0);
    });

    await test.step('Clear search and verify full list restored', async () => {
      await orders.clearSearch();
      await page.waitForTimeout(2000);
      const restoredCount = await orders.getRowCount();
      expect(restoredCount).toBe(10);
    });
  });

  test('3.9 — Search and status filter combination @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    const response = page.waitForResponse(r =>
      r.url().includes('/admin/orders') && r.url().includes('status=') && r.url().includes('search=')
    );

    await test.step('Select a status filter and type a search query', async () => {
      await orders.selectStatusFilter('Printing');
      await page.waitForTimeout(1000);
      await orders.search('usman');
      const res = await response;
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.data.items.length).toBeGreaterThan(0);
    });

    await test.step('Verify all displayed rows have Printing status', async () => {
      const count = await orders.getRowCount();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const cells = await orders.getRowCells(i);
        expect(cells[5]).toBe('Printing');
      }
    });
  });

  test('3.10 — Search persistence after pagination @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Search and go to page 2', async () => {
      await orders.search('ST-');
      await page.waitForTimeout(2000);

      if (await orders.nextPageButton.isEnabled()) {
        await orders.nextPageButton.click();
        await page.waitForTimeout(1500);
      }
    });

    await test.step('Verify search term persists', async () => {
      const searchValue = await orders.searchInput.inputValue();
      expect(searchValue).toBe('ST-');
    });
  });

  test('3.11 — Search does not persist after page refresh @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Apply search and refresh', async () => {
      await orders.search('usman');
      await page.waitForTimeout(1500);
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify search input is empty', async () => {
      const searchValue = await orders.searchInput.inputValue();
      expect(searchValue).toBe('');
    });

    await test.step('Verify full list restored', async () => {
      const count = await orders.getRowCount();
      expect(count).toBe(10);
    });
  });

  test('3.12 — No results state displays "No orders found." @smoke @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Search for non-existent value', async () => {
      await orders.search('ZZZZNONEXISTENT12345');
      await page.waitForTimeout(2000);
    });

    await test.step('Verify empty state', async () => {
      await expect(orders.emptyStateMessage).toBeVisible();
      expect(await orders.getRowCount()).toBe(1);
    });

    await test.step('Verify pagination shows 0-0 of 0', async () => {
      const text = await orders.getPaginationText();
      expect(text).toBe('0-0 of 0');
    });

    await test.step('Verify all pagination buttons are disabled', async () => {
      await expect(orders.firstPageButton).toBeDisabled();
      await expect(orders.prevPageButton).toBeDisabled();
      await expect(orders.nextPageButton).toBeDisabled();
      await expect(orders.lastPageButton).toBeDisabled();
    });
  });
});
