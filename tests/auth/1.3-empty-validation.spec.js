import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Admin Login — empty field validation', () => {
  test('shows required-field errors when submitting with empty fields @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.submit();

    await expect(login.emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(login.emailRequiredError).toBeVisible();
    await expect(login.passwordInput).toHaveAttribute('aria-invalid', 'true');
    await expect(login.passwordRequiredError).toBeVisible();
  });
});
