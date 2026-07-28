import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { BASE_URL } from '../../src/utils/config';
import users from '../data/users.json' with { type: 'json' };

test.describe('Admin Login — successful authentication', () => {
  test('logs in with valid credentials and reaches the dashboard @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    const dashboard = await login.loginAs(users.admin.email, users.admin.password);

    await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
    await expect(dashboard.welcomeHeading).toBeVisible();

    // No locator exposes localStorage; this is the justified page.evaluate exception.
    const authState = await dashboard.getLocalStorageItem('storaby-auth');
    expect(authState?.state?.token).toBeTruthy();
    expect(authState?.state?.user?.email).toBe(users.admin.email);
  });
});
