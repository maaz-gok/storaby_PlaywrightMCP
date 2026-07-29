import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
import { BASE_URL, API_BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Order Management — API/UI data consistency', () => {
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

  const statusMap = {
    PENDING: 'Pending',
    PAID: 'Paid',
    GENERATING_FINAL: 'Generating Final',
    SUBMITTED_TO_PRINT: 'Submitted To Print',
    PRINTING: 'Printing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    GENERATION_FAILED: 'Generation Failed',
    REFUNDED: 'Refunded',
  };

  function formatPrice(pence) {
    return `£${(pence / 100).toFixed(2)}`;
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  test('12.1 — Orders list API returns 200 @regression', async ({ page }) => {
    const response = await page.waitForResponse(r =>
      r.url().includes('/admin/orders') && r.url().includes('page=1') && r.url().includes('limit=10') && !r.url().includes('search=') && !r.url().includes('status=')
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe(200);
    expect(body.data).toHaveProperty('items');
    expect(body.data).toHaveProperty('total');
    expect(body.data).toHaveProperty('page', 1);
    expect(body.data).toHaveProperty('limit', 10);
    expect(body.data).toHaveProperty('totalPages');
  });

  test('12.2 — Orders list data matches API @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Capture API response', async () => {
      const response = await page.waitForResponse(r =>
        r.url().includes('/admin/orders') && r.url().includes('page=1') && r.url().includes('limit=10') && !r.url().includes('search=') && !r.url().includes('status=')
      );
      const body = await response.json();
      const items = body.data.items;

      expect(items.length).toBeGreaterThan(0);
      expect(await orders.getRowCount()).toBe(items.length);

      for (let i = 0; i < Math.min(items.length, 3); i++) {
        const item = items[i];
        const cells = await orders.getRowCells(i);

        expect(cells[0]).toBe(item.orderNumber);
        const expectedCustomer = item.customer?.customerName || item.customer?.email || '';
        expect(cells[1]).toBe(expectedCustomer);
        expect(cells[2]).toBe(item.storyTitle || '—');
        expect(cells[3]).toBe(formatPrice(item.price));
        expect(cells[4]).toBe(formatDate(item.createdAt));
        expect(cells[5]).toBe(statusMap[item.status] || item.status);
      }
    });
  });

  test('12.3 — Status filtered list: all rows belong to selected status @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Filter by Printing status', async () => {
      const responsePromise = page.waitForResponse(r =>
        r.url().includes('/admin/orders') && r.url().includes('status=PRINTING')
      );
      await orders.selectStatusFilter('Printing');
      const response = await responsePromise;
      const body = await response.json();
      const items = body.data.items;

      const count = await orders.getRowCount();
      expect(count).toBe(items.length);

      for (let i = 0; i < count; i++) {
        const cells = await orders.getRowCells(i);
        expect(cells[5]).toBe('Printing');
        expect(cells[0]).toBe(items[i].orderNumber);
      }
    });
  });

  test('12.4 — Order detail drawer fields match API @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open drawer and capture API response', async () => {
      const responsePromise = page.waitForResponse(r =>
        r.url().match(/\/admin\/orders\/[a-f0-9]+$/) && r.request().method() === 'GET'
      );
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      const response = await responsePromise;
      const body = await response.json();
      const item = body.data;

      const firstRow = await orders.getRowCells(0);

      await expect(orders.drawerOrderNumber).toHaveText(item.orderNumber);
      expect(item.orderNumber).toBe(firstRow[0]);

      const drawerStatusText = await orders.drawerStatusBadge.textContent();
      expect(drawerStatusText).toBe(statusMap[item.status] || item.status);

      const customerNameText = await orders.drawerCustomerName.textContent();
      expect(customerNameText).toBe(item.customer?.customerName || firstRow[1]);

      const storyText = await orders.drawerStoryTitle.textContent();
      expect(storyText).toBe(item.storyTitle);

      const amountText = await orders.drawerAmount.textContent();
      expect(amountText).toBe(formatPrice(item.price));

      const paymentText = await orders.drawerPaymentStatus.textContent();
      expect(paymentText).toBe(item.paymentStatus === 'PAID' ? 'Paid' : item.paymentStatus);
    });
  });

  test('12.5 — No console errors during all interactions @smoke', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const orders = new OrdersPage(page);

    await test.step('Interact with all features', async () => {
      // Search
      await orders.search('usman');
      await page.waitForTimeout(2000);

      // Status filter
      await orders.selectStatusFilter('Printing');
      await page.waitForTimeout(1500);
      await orders.selectStatusFilter('All');
      await page.waitForTimeout(1500);

      // Pagination
      if (await orders.nextPageButton.isEnabled()) {
        await orders.nextPageButton.click();
        await page.waitForTimeout(1500);
        await orders.prevPageButton.click();
        await page.waitForTimeout(1500);
      }

      // Order detail drawer
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1500);
      await orders.closeDrawer();
      await page.waitForTimeout(500);
    });

    await test.step('Verify no console errors', async () => {
      expect(consoleErrors).toEqual([]);
    });
  });
});
