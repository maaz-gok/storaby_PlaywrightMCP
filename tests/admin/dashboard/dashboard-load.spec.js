import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Admin Dashboard — load and route guard', () => {
  test('1.1 — Dashboard loads with authenticated session @smoke @critical', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const apiPromises = {
      summary: page.waitForResponse(r => r.url().includes('/admin/dashboard/summary')),
      revenue: page.waitForResponse(r => r.url().includes('/admin/dashboard/revenue-trend')),
      orders: page.waitForResponse(r => r.url().includes('/admin/dashboard/orders-this-week')),
      ai: page.waitForResponse(r => r.url().includes('/admin/dashboard/ai-status')),
      recent: page.waitForResponse(r => r.url().includes('/admin/dashboard/recent-orders')),
    };

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await test.step('Log in as admin', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
    });

    await test.step('Verify URL and page title', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
      await expect(page).toHaveTitle(/Storaby/);
    });

    await test.step('Verify welcome heading', async () => {
      await expect(dashboard.welcomeHeading).toBeVisible();
    });

    await test.step('Verify success toast', async () => {
      await expect(dashboard.successToast).toBeVisible({ timeout: 3000 });
    });

    await test.step('Verify sidebar navigation links', async () => {
      await expect(dashboard.dashboardNavLink).toBeVisible();
      await expect(dashboard.monitorOrdersNavLink).toBeVisible();
      await expect(dashboard.templatesNavLink).toBeVisible();
    });

    await test.step('Verify header/profile section', async () => {
      await expect(dashboard.profileMenuButton).toBeVisible();
    });

    await test.step('Verify summary cards', async () => {
      await expect(dashboard.totalRevenueLabel).toBeVisible();
      await expect(dashboard.ordersTodayLabel).toBeVisible();
      await expect(dashboard.activeCustomersLabel).toBeVisible();
      await expect(dashboard.booksGeneratedLabel).toBeVisible();
    });

    await test.step('Verify dashboard sections', async () => {
      await expect(dashboard.weeklyRevenueTrendSection).toBeVisible();
      await expect(dashboard.ordersThisWeekSection).toBeVisible();
      await expect(dashboard.aiStatusSection).toBeVisible();
      await expect(dashboard.recentOrdersSection).toBeVisible();
    });

    await test.step('Verify all dashboard API requests succeed', async () => {
      const results = await Promise.allSettled([
        apiPromises.summary,
        apiPromises.revenue,
        apiPromises.orders,
        apiPromises.ai,
        apiPromises.recent,
      ]);

      const failed = results.filter(r => r.status === 'rejected');
      if (failed.length > 0) {
        const rejected = failed.map((r, i) => {
          const names = ['summary', 'revenue', 'orders', 'ai', 'recent'];
          return `${names[results.indexOf(r)]}`;
        });
        expect(failed, `Dashboard APIs not called: ${rejected.join(', ')}`).toHaveLength(0);
      }

      for (const result of results) {
        if (result.status === 'fulfilled') {
          expect(result.value.status()).toBe(200);
        }
      }
    });

    await test.step('Verify no console errors', async () => {
      expect(consoleErrors).toEqual([]);
    });
  });

  test('1.2 — Unauthenticated user is redirected to login @critical @regression', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await test.step('Navigate to dashboard without session', async () => {
      await dashboard.goto();
    });

    await test.step('Verify redirect to login', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/login`);
    });

    await test.step('Verify dashboard content is not rendered', async () => {
      await expect(dashboard.welcomeHeading).not.toBeVisible();
      await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
    });
  });

  test('1.3 — Dashboard page structure renders correctly @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await test.step('Log in and navigate to dashboard', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify sidebar structure', async () => {
      await expect(dashboard.sidebar).toBeVisible();
      await expect(dashboard.sidebarLogo).toBeVisible();
      await expect(dashboard.sidebarLogo).toHaveAttribute('src', /logo/i);
      await expect(dashboard.dashboardNavLink).toBeVisible();
      await expect(dashboard.monitorOrdersNavLink).toBeVisible();
      await expect(dashboard.templatesNavLink).toBeVisible();
      await expect(dashboard.sidebarCollapseButton).toBeVisible();
    });

    await test.step('Verify header/profile structure', async () => {
      await expect(dashboard.profileAvatar).toBeVisible();
      await expect(dashboard.profileAvatar).toHaveAttribute('alt');
      await expect(dashboard.profileMenuButton).toBeVisible();
    });

    await test.step('Verify main content structure', async () => {
      await expect(dashboard.welcomeHeading).toBeVisible();
      await expect(dashboard.summaryCards).toHaveCount(4);
      await expect(dashboard.totalRevenueLabel).toBeVisible();
      await expect(dashboard.ordersTodayLabel).toBeVisible();
      await expect(dashboard.activeCustomersLabel).toBeVisible();
      await expect(dashboard.booksGeneratedLabel).toBeVisible();
      await expect(dashboard.weeklyRevenueTrendSection).toBeVisible();
      await expect(dashboard.ordersThisWeekSection).toBeVisible();
      await expect(dashboard.aiStatusSection).toBeVisible();
      await expect(dashboard.recentOrdersSection).toBeVisible();
    });
  });
});
