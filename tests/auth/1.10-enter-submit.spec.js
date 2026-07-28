import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { BASE_URL } from '../../src/utils/config';
import users from '../data/users.json' with { type: 'json' };

test.describe('Admin Login — submit via keyboard', () => {
  test('pressing Enter in the password field submits the form @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.fillEmail(users.admin.email);
    await login.fillPassword(users.admin.password);
    await login.passwordInput.press('Enter');

    await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
  });
});
