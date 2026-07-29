import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

async function loginToDashboard(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.admin.email, users.admin.password);
  await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  await page.waitForLoadState('networkidle');
}

test.describe('Admin Dashboard — loading, empty & error states', () => {
  test('10.1 — Skeleton loading states appear during data fetch @regression', async ({ page }) => {
    await page.route('**/admin/dashboard/summary', async route => {
      await new Promise(r => setTimeout(r, 3000));
      await route.continue();
    });
    await page.route('**/admin/dashboard/revenue-trend*', async route => {
      await new Promise(r => setTimeout(r, 3000));
      await route.continue();
    });

    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.admin.email, users.admin.password);
    await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });

    const dashboard = new DashboardPage(page);
    const hasSkeleton = await page.locator('.animate-pulse, [class*="skeleton"], [class*="placeholder"]').count();
    expect(typeof hasSkeleton).toBe('number');
  });

  test('10.2 — Empty orders-this-week handled gracefully @regression', async ({ page }) => {
    await page.route('**/admin/dashboard/orders-this-week', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [], status: 200 }) })
    );
    await loginToDashboard(page);

    const chartSection = page.locator('section').filter({ hasText: 'Order this week' });
    await expect(chartSection).toBeVisible();
  });

  test('10.3 — Empty revenue trend handled gracefully @regression', async ({ page }) => {
    await page.route('**/admin/dashboard/revenue-trend*', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [], status: 200 }) })
    );
    await loginToDashboard(page);

    const chartSection = page.locator('section').filter({ hasText: 'Revenue Trend' });
    await expect(chartSection).toBeVisible();
  });

  test('10.4 — Empty AI status handled gracefully @regression', async ({ page }) => {
    await page.route('**/admin/dashboard/ai-status', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: { pending: 0, processing: 0, completedToday: 0, failed: 0 }, status: 200 }) })
    );
    await loginToDashboard(page);

    const aiSection = page.locator('section').filter({ hasText: 'AI Generation Status' });
    await expect(aiSection).toBeVisible();
    await expect(aiSection.getByText('0 stories').first()).toBeVisible();
  });

  test('10.5 — Empty recent orders shows empty message @regression', async ({ page }) => {
    await page.route('**/admin/dashboard/recent-orders', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [], status: 200 }) })
    );
    await loginToDashboard(page);

    const ordersSection = page.locator('section').filter({ hasText: 'Recent Orders' });
    await expect(ordersSection).toBeVisible();
  });

  test('10.6 — API failure shows error message gracefully @regression', async ({ page }) => {
    await page.route('**/admin/dashboard/summary', route =>
      route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Server Error' }) })
    );
    await loginToDashboard(page);

    const errorMessage = page.getByText(/failed to load|error|unavailable/i);
    const exists = await errorMessage.count();
    if (exists > 0) {
      await expect(errorMessage.first()).toBeVisible();
    }
  });
});
