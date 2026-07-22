import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Admin Login — invalid email format validation', () => {
  test('shows a validation error for a malformed email @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.login('not-an-email', 'somepassword');

    await expect(login.emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(login.emailInvalidError).toBeVisible();
    await expect(login.passwordInput).not.toHaveAttribute('aria-invalid', 'true');
  });
});
