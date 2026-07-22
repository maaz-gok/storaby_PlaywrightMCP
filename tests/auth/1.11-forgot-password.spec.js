import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { BASE_URL } from '../../src/utils/config';

test.describe('Admin Login — Forgot Password navigation', () => {
  test('the Forgot Password link opens the reset-request screen @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    const forgotPassword = await login.clickForgotPassword();

    await expect(page).toHaveURL(`${BASE_URL}/admin/forgot-password`);
    await expect(forgotPassword.heading).toBeVisible();
    await expect(forgotPassword.emailInput).toBeVisible();
    await expect(forgotPassword.sendCodeButton).toBeVisible();
    await expect(forgotPassword.backToSignInLink).toHaveAttribute('href', '/admin/login');
  });
});
