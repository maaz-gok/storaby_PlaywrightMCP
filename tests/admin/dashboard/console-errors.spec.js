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

test.describe('Admin Dashboard — console errors', () => {
  test('12.1 — No console errors on dashboard load @smoke', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push({ type: 'pageerror', message: err.message }));
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push({ type: 'console.error', message: msg.text() });
      }
      if (msg.type() === 'warning') {
        errors.push({ type: 'console.warn', message: msg.text() });
      }
    });

    await loginToDashboard(page);

    const criticalErrors = errors.filter(e => e.type === 'pageerror' || e.type === 'console.error');
    expect(criticalErrors).toEqual([]);
  });

  test('12.2 — No console errors on period switch @regression', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push({ type: 'pageerror', message: err.message }));
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push({ type: 'console.error', message: msg.text() });
      }
    });

    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    const monthlyResponse = page.waitForResponse(r =>
      r.url().includes('/admin/dashboard/revenue-trend?period=monthly')
    );
    await dashboard.periodSelectorButton.click();
    await page.getByText('Monthly').click();
    await monthlyResponse;

    expect(errors).toEqual([]);
  });

  test('12.3 — No console errors on navigation @regression', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push({ type: 'pageerror', message: err.message }));
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push({ type: 'console.error', message: msg.text() });
      }
    });

    await loginToDashboard(page);
    const dashboard = new DashboardPage(page);

    await dashboard.navigateToMonitorOrders();
    await page.waitForURL('**/admin/orders', { timeout: 10000 });

    await dashboard.navigateToTemplates();
    await page.waitForURL('**/admin/templates', { timeout: 10000 });

    await dashboard.navigateToDashboard();
    await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 10000 });

    expect(errors).toEqual([]);
  });
});
