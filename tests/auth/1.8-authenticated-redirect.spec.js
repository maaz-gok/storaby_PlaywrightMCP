import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { BASE_URL } from '../../src/utils/config';
import users from '../data/users.json';

test.describe('Admin Login — redirect when already authenticated', () => {
  test('visiting the login page while authenticated redirects to the dashboard @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await test.step('Log in as admin', async () => {
      await login.loginAs(users.admin.email, users.admin.password);
      // Wait for the SPA redirect to actually land before the next hard navigation,
      // otherwise it can race the app's localStorage write.
      await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
    });

    await test.step('Navigate directly back to the login page', async () => {
      await login.goto();
    });

    await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
  });
});
