import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Admin Login — screen render', () => {
  test('renders all expected login form elements @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await expect(login.heading).toBeVisible();
    await expect(login.loginButton).toBeVisible();
    await expect(login.loginButton).toBeEnabled();
    await expect(login.keepSignedInCheckbox).not.toBeChecked();
  });
});
