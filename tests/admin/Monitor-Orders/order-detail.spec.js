import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { OrdersPage } from '../../../src/pages/OrdersPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Order Management — order detail drawer', () => {
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

  test('6.1 — Clicking View Order opens a slide-over drawer @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Click view order button for first row', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Verify drawer is visible', async () => {
      await expect(orders.drawer).toBeVisible();
      await expect(orders.drawerBackdrop).toBeVisible();
    });

    await test.step('Verify URL did not change', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/orders`);
    });
  });

  test('6.2 — Drawer header displays order number and status @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open drawer for first order', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Verify header content', async () => {
      await expect(orders.drawerOrderNumber).toBeVisible();
      await expect(orders.drawerStatusBadge).toBeVisible();
    });

    await test.step('Verify close button', async () => {
      await expect(orders.drawerCloseButton).toBeVisible();
      await expect(orders.drawerCloseButton).toHaveAttribute('aria-label', 'Close');
    });

    await test.step('Verify drawer order number matches table row', async () => {
      const firstRow = await orders.getRowCells(0);
      const orderNum = await orders.drawerOrderNumber.textContent();
      expect(orderNum).toBe(firstRow[0]);
    });
  });

  test('6.3 — Drawer sections are rendered correctly @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open drawer and check sections', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Verify three sections exist', async () => {
      await expect(orders.drawerCustomerSection).toBeVisible();
      await expect(orders.drawerBookDetailsSection).toBeVisible();
      await expect(orders.drawerTimelineSection).toBeVisible();
    });

    await test.step('Verify section headings', async () => {
      const headings = await orders.getDrawerSectionTexts();
      expect(headings).toContain('Customer & Shipping Details');
      expect(headings).toContain('Book Details');
      expect(headings).toContain('Timeline');
    });
  });

  test('6.4 — Customer & Shipping Details section @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open drawer', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Verify customer name and email are visible', async () => {
      await expect(orders.drawerCustomerName).toBeVisible();
      await expect(orders.drawerCustomerEmail).toBeVisible();
    });
  });

  test('6.5 — Book Details section @smoke @critical', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open drawer', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Verify story, amount, payment fields', async () => {
      const firstRow = await orders.getRowCells(0);

      await expect(orders.drawerStoryTitle).toBeVisible();
      const story = await orders.drawerStoryTitle.textContent();
      expect(story).toBe(firstRow[2]);

      await expect(orders.drawerAmount).toBeVisible();
      const amount = await orders.drawerAmount.textContent();
      expect(amount).toMatch(/^£\d+\.\d{2}$/);

      await expect(orders.drawerPaymentStatus).toBeVisible();
    });
  });

  test('6.6 — Timeline section is rendered @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open drawer and check timeline', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1500);
    });

    await test.step('Verify timeline items', async () => {
      const timelineItems = orders.drawerTimelineSection.locator('ol > li');
      const count = await timelineItems.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });

  test('6.7 — Drawer close via close button @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open and close drawer via button', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1000);
      await expect(orders.drawer).toBeVisible();

      await orders.closeDrawer();
      await page.waitForTimeout(500);
    });

    await test.step('Verify drawer is closed', async () => {
      await expect(orders.drawer).not.toBeVisible();
      await expect(page).toHaveURL(`${BASE_URL}/admin/orders`);
    });
  });

  test('6.8 — Drawer close via backdrop click @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open drawer and click backdrop', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1000);
      await expect(orders.drawer).toBeVisible();

      await orders.drawerBackdrop.click({ position: { x: 10, y: 10 } });
      await page.waitForTimeout(500);
    });

    await test.step('Verify drawer is closed', async () => {
      await expect(orders.drawer).not.toBeVisible();
    });
  });

  test('6.9 — Drawer close via Escape key @regression', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open drawer and press Escape', async () => {
      const btn = await orders.getRowActionButton(0);
      await btn.click();
      await page.waitForTimeout(1000);
      await expect(orders.drawer).toBeVisible();

      await orders.closeDrawerViaEscape();
      await page.waitForTimeout(500);
    });

    await test.step('Verify drawer is closed', async () => {
      await expect(orders.drawer).not.toBeVisible();
    });
  });

  test('6.10 — Opening different orders shows different data @smoke', async ({ page }) => {
    const orders = new OrdersPage(page);

    await test.step('Open first order drawer', async () => {
      const btn0 = await orders.getRowActionButton(0);
      await btn0.click();
      await page.waitForTimeout(1000);
      const order1 = await orders.drawerOrderNumber.textContent();
      await orders.closeDrawer();
      await page.waitForTimeout(500);

      const btn1 = await orders.getRowActionButton(1);
      await btn1.click();
      await page.waitForTimeout(1000);
      const order2 = await orders.drawerOrderNumber.textContent();
      await orders.closeDrawer();

      expect(order1).not.toBe(order2);
    });
  });
});
