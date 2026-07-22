import { test, expect } from '../../src/fixtures/base';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { BASE_URL } from '../../src/utils/config';

test.describe('Admin Login — route guard for unauthenticated users', () => {
  test('visiting the dashboard without a session redirects to login @critical @regression', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    await expect(page).toHaveURL(`${BASE_URL}/admin/login`);
  });
});
