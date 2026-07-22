import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { BASE_URL } from '../../src/utils/config';
import users from '../data/users.json';

test.describe('Admin Login — authenticated session persistence', () => {
  test('a fresh navigation to the dashboard keeps the session @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await test.step('Log in as admin', async () => {
      await login.loginAs(users.admin.email, users.admin.password);
      // Wait for the SPA redirect to actually land before the next hard navigation,
      // otherwise it can race the app's localStorage write.
      await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
    });

    const dashboard = new DashboardPage(page);
    await test.step('Navigate directly to the dashboard (fresh navigation, not an in-app link)', async () => {
      await dashboard.goto();
    });

    await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
    await expect(dashboard.welcomeHeading).toBeVisible();
  });
});
