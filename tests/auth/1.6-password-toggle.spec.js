import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Admin Login — password visibility toggle', () => {
  test('reveals and masks the password value without changing it @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.fillPassword('TestVisibility1!');
    await expect(login.passwordInput).toHaveAttribute('type', 'password');

    await login.togglePasswordVisibility();

    await expect(login.passwordInput).toHaveAttribute('type', 'text');
    await expect(login.passwordInput).toHaveValue('TestVisibility1!');
    await expect(login.passwordToggleButton).toHaveAccessibleName('Hide password');
  });
});
