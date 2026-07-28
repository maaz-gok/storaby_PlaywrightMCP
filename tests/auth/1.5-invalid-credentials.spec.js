import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { BASE_URL } from '../../src/utils/config';
import users from '../data/users.json' with { type: 'json' };

test.describe('Admin Login — incorrect credentials', () => {
  test('shows the generic error for an unknown email @critical @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.login(users.wrongEmail.email, users.wrongEmail.password);

    await expect(login.statusMessage).toHaveText('Incorrect email or password.');
    await expect(page).toHaveURL(`${BASE_URL}/admin/login`);
  });

  test('shows the same generic error for a correct email with the wrong password @critical @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.login(users.wrongPassword.email, users.wrongPassword.password);

    await expect(login.statusMessage).toHaveText('Incorrect email or password.');
    await expect(page).toHaveURL(`${BASE_URL}/admin/login`);
  });
});
