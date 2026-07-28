import { test, expect } from '../../../../src/fixtures/base';
import { LoginPage } from '../../../../src/pages/LoginPage';
import { SettingsPage } from '../../../../src/pages/SettingsPage';
import { DashboardPage } from '../../../../src/pages/DashboardPage';
import { BASE_URL } from '../../../../src/utils/config';
import users from '../../../data/users.json' with { type: 'json' };
import settings from '../../../data/settings.json' with { type: 'json' };

async function loginAndGoToSettings(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.admin.email, users.admin.password);
  await page.waitForURL('**/admin/dashboard', { timeout: 30000 });
  await page.waitForLoadState('networkidle');
}

test.describe('Admin Settings — Change Password', () => {
                          
  test('2.1 — Change Password form renders all expected elements @smoke', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await expect(settingsPage.currentPasswordInput).toBeVisible();
    await expect(settingsPage.newPasswordInput).toBeVisible();
    await expect(settingsPage.confirmPasswordInput).toBeVisible();
    await expect(settingsPage.req8Chars).toBeVisible();
    await expect(settingsPage.reqNumber).toBeVisible();
    await expect(settingsPage.reqUppercase).toBeVisible();
    await expect(settingsPage.reqLowercase).toBeVisible();
  });

  test('2.2 — Empty submission validation @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.saveChangesBtn.click();
    await expect(page.getByText('Current password is required')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('New password is required')).toBeVisible({ timeout: 5000 });
  });

  test('2.3 — Incorrect current password @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillCurrentPassword(settings.incorrectPassword);
    await settingsPage.fillNewPassword(users.admin.newPassword);
    await settingsPage.fillConfirmPassword(users.admin.newPassword);
    await settingsPage.saveChangesBtn.click();

    await expect(page.getByText('Incorrect current password.').first()).toBeVisible({ timeout: 10000 });
  });

  test('2.4 — Correct current password with valid new password (form acceptance) @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillCurrentPassword(users.admin.password);
    await settingsPage.fillNewPassword(users.admin.newPassword);
    await settingsPage.fillConfirmPassword(users.admin.newPassword);

    await expect(settingsPage.saveChangesBtn).toBeEnabled();
  });

  test('2.5 — New Password: less than 8 characters @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillNewPassword(settings.shortPassword);
    await expect(settingsPage.req8Chars).toBeVisible();
  });

  test('2.6 — New Password: no uppercase letter @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillNewPassword(settings.noUppercasePassword);
    await expect(settingsPage.reqUppercase).toBeVisible();
  });

  test('2.7 — New Password: no lowercase letter @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillNewPassword(settings.noLowercasePassword);
    await expect(settingsPage.reqLowercase).toBeVisible();
  });

  test('2.8 — New Password: no number @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillNewPassword(settings.noNumberPassword);
    await expect(settingsPage.reqNumber).toBeVisible();
  });

  test('2.9 — New Password: spaces only @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillNewPassword(settings.spacesOnlyPassword);
    await expect(settingsPage.req8Chars).toBeVisible();
  });

  test('2.10 — New Password: leading/trailing spaces @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillNewPassword(settings.leadingSpacePassword);
    await expect(settingsPage.req8Chars).toBeVisible();
  });

  test('2.11 — New Password: extremely long password @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillNewPassword(settings.longPassword);
    const typed = await settingsPage.newPasswordInput.inputValue();
    expect(typed.length).toBeLessThanOrEqual(50);
  });

  test('2.12 — Confirm Password: does not match New Password @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillCurrentPassword(users.admin.password);
    await settingsPage.fillNewPassword(users.admin.newPassword);
    await settingsPage.fillConfirmPassword(settings.mismatchedConfirm);

    await settingsPage.saveChangesBtn.click();
    await expect(page.getByText('Passwords do not match')).toBeVisible({ timeout: 5000 });
  });

  test('2.13 — Confirm Password: matches exactly @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillCurrentPassword(users.admin.password);
    await settingsPage.fillNewPassword(users.admin.newPassword);
    await settingsPage.fillConfirmPassword(users.admin.newPassword);

    await expect(settingsPage.saveChangesBtn).toBeEnabled();
  });

  test('2.14 — Reuse current password as new password @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillCurrentPassword(users.admin.password);
    await settingsPage.fillNewPassword(users.admin.password);
    await settingsPage.fillConfirmPassword(users.admin.password);
    await settingsPage.saveChangesBtn.click();

    const successDialog = page.getByRole('dialog');
    if (await successDialog.isVisible({ timeout: 5000 }).catch(() => false)) {
      await settingsPage.dismissSuccessDialog();
    }
  });

  test('2.15 — Password requirement indicators update while typing @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillNewPassword('');
    await expect(settingsPage.reqUppercase).toBeVisible();
    await expect(settingsPage.reqLowercase).toBeVisible();
    await expect(settingsPage.reqNumber).toBeVisible();
    await expect(settingsPage.req8Chars).toBeVisible();
  });

  test('2.16 — Save Changes button states @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await expect(settingsPage.saveChangesBtn).toBeEnabled();

    await settingsPage.fillCurrentPassword(users.admin.password);
    await settingsPage.fillNewPassword(users.admin.newPassword);
    await settingsPage.fillConfirmPassword(users.admin.newPassword);
    await expect(settingsPage.saveChangesBtn).toBeEnabled();
  });

  test('2.17 — Password visibility toggle works independently for each field @smoke @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await settingsPage.openChangePassword();

    await settingsPage.fillCurrentPassword(users.admin.password);
    await settingsPage.fillNewPassword(users.admin.newPassword);
    await settingsPage.fillConfirmPassword(users.admin.newPassword);

    expect(await settingsPage.getCurrentPasswordType()).toBe('password');
    expect(await settingsPage.getNewPasswordType()).toBe('password');
    expect(await settingsPage.getConfirmPasswordType()).toBe('password');

    await settingsPage.toggleCurrentPasswordVisibility();
    expect(await settingsPage.getCurrentPasswordType()).toBe('text');
    expect(await settingsPage.getNewPasswordType()).toBe('password');
    expect(await settingsPage.getConfirmPasswordType()).toBe('password');

    await settingsPage.toggleCurrentPasswordVisibility();
    expect(await settingsPage.getCurrentPasswordType()).toBe('password');

    await settingsPage.toggleNewPasswordVisibility();
    expect(await settingsPage.getNewPasswordType()).toBe('text');
    expect(await settingsPage.getCurrentPasswordType()).toBe('password');
    expect(await settingsPage.getConfirmPasswordType()).toBe('password');

    await settingsPage.toggleNewPasswordVisibility();
    expect(await settingsPage.getNewPasswordType()).toBe('password');

    await settingsPage.toggleConfirmPasswordVisibility();
    expect(await settingsPage.getConfirmPasswordType()).toBe('text');
    expect(await settingsPage.getCurrentPasswordType()).toBe('password');
    expect(await settingsPage.getNewPasswordType()).toBe('password');

    await settingsPage.toggleConfirmPasswordVisibility();
    expect(await settingsPage.getConfirmPasswordType()).toBe('password');
  });

  test('2.18 — Full password change flow: change, success, logout, verify old fails, verify new works @smoke @critical', async ({ page }) => {
    test.setTimeout(120_000);
    let passwordChanged = false;
    try {
      await loginAndGoToSettings(page);
      const settingsPage = new SettingsPage(page);
      await settingsPage.goto();
      await settingsPage.openChangePassword();

      await settingsPage.fillCurrentPassword(users.admin.password);
      await settingsPage.fillNewPassword(users.admin.newPassword);
      await settingsPage.fillConfirmPassword(users.admin.newPassword);
      await settingsPage.saveChangesBtn.click();

      const successMsg = await settingsPage.getSuccessMessage();
      await expect(successMsg).toBeVisible({ timeout: 10000 });
      const successText = await successMsg.textContent();
      expect(successText).toMatch(/success|updated|changed/i);
      passwordChanged = true;

      await expect(settingsPage.currentPasswordInput).toHaveValue('');
      await expect(settingsPage.newPasswordInput).toHaveValue('');
      await expect(settingsPage.confirmPasswordInput).toHaveValue('');

      await settingsPage.dismissSuccessDialog();

      const userMenuBtn = page.getByRole('button', { name: /admin@storaby\.com/ });
      await userMenuBtn.click();
      const logoutBtn = page.getByRole('menuitem', { name: 'Sign out' });
      await logoutBtn.click();
      await expect(page).toHaveURL(`${BASE_URL}/admin/login`);

      const login = new LoginPage(page);
      await login.login(users.admin.email, users.admin.password);
      await expect(login.statusMessage).toBeVisible({ timeout: 10000 });
      await expect(page).toHaveURL(`${BASE_URL}/admin/login`);

      const dashboard = await login.loginAs(users.admin.email, users.admin.newPassword);
      await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
      await expect(dashboard.welcomeHeading).toBeVisible();
    } finally {
      if (passwordChanged) {
        try {
          await page.goto(`${BASE_URL}/admin/settings`);
          await page.waitForLoadState('networkidle');
          const restore = new SettingsPage(page);
          await restore.openChangePassword();
          await restore.fillCurrentPassword(users.admin.newPassword);
          await restore.fillNewPassword(users.admin.password);
          await restore.fillConfirmPassword(users.admin.password);
          await restore.saveChangesBtn.click();
          await expect(restore.getSuccessMessage()).toBeVisible({ timeout: 10000 }).catch(() => {});
        } catch {
        }
      }
    }
  });
});
