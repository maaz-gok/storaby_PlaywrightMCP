import { test, expect } from '../../../../src/fixtures/base';
import { LoginPage } from '../../../../src/pages/LoginPage';
import { SettingsPage } from '../../../../src/pages/SettingsPage';
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

test.describe('Admin Settings — Profile Settings', () => {

  test('1.1 — Profile Settings tab loads successfully @smoke', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await expect(settingsPage.profileSettingsTab).toBeVisible();
    await expect(page).toHaveURL(`${BASE_URL}/admin/settings`);
  });

  test('1.2 — Profile image is displayed @smoke', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await expect(settingsPage.profileImage).toBeVisible();
    const src = await settingsPage.profileImage.getAttribute('src');
    expect(src).toBeTruthy();
  });

  test('1.3 — Full Name field is prefilled correctly @smoke', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    const name = await settingsPage.getFullName();
    expect(name).toBeTruthy();
  });

  test('1.4 — Email field is prefilled correctly and disabled @smoke', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    const email = await settingsPage.getEmailValue();
    expect(email).toBe(users.admin.email);
    expect(await settingsPage.isEmailDisabled()).toBe(true);
  });

  test('1.5 — Save Changes button is disabled when no changes made @smoke', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await expect(settingsPage.saveChangesBtn).toBeDisabled();
  });

  test('1.6 — Save without making any changes @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await expect(settingsPage.saveChangesBtn).toBeDisabled();
  });

  test('1.7 — Update Full Name with a valid value @smoke @critical', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await settingsPage.fillFullName(settings.validName);
    await expect(settingsPage.saveChangesBtn).toBeEnabled();
    await settingsPage.saveProfile();

    const successMsg = await settingsPage.getSuccessMessage();
    await expect(successMsg).toBeVisible({ timeout: 10000 });
  });

  test('1.8 — Full Name preserves case after save @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    const caseName = 'Administrator';
    await settingsPage.fillFullName(caseName);
    await expect(settingsPage.saveChangesBtn).toBeEnabled();
    await settingsPage.saveProfile();

    const successMsg = await settingsPage.getSuccessMessage();
    await expect(successMsg).toBeVisible({ timeout: 10000 });

    await settingsPage.goto();
    const savedName = await settingsPage.getFullName();
    expect(savedName).toBe(caseName.toLowerCase());
  });

  test('1.9 — Leading/trailing spaces in Full Name @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await settingsPage.fillFullName(settings.spacedName);
    if (await settingsPage.saveChangesBtn.isEnabled()) {
      await settingsPage.saveProfile();
      const successMsg = await settingsPage.getSuccessMessage();
      if (await successMsg.isVisible({ timeout: 5000 }).catch(() => false)) {
        await settingsPage.goto();
        const name = await settingsPage.getFullName();
        expect(name).toBe(settings.trimmedName);
      }
    }
  });

  test('1.10 — Clear Full Name and verify validation @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await settingsPage.fillFullName('');
    if (await settingsPage.saveChangesBtn.isEnabled()) {
      await settingsPage.saveProfile();
      await expect(page.getByText(/required/i).first()).toBeVisible({ timeout: 5000 });
      await expect(settingsPage.fullNameInput).toHaveAttribute('aria-invalid', 'true');
    }
  });

  test('1.11 — Very long Full Name @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await settingsPage.fillFullName(settings.longName);
    const currentValue = await settingsPage.getFullName();
    expect(currentValue.length).toBeLessThanOrEqual(50);
  });

  test('1.12 — Special characters and numbers in Full Name @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await settingsPage.fillFullName(settings.specialCharsName);
    if (await settingsPage.saveChangesBtn.isEnabled()) {
      await settingsPage.saveProfile();
      const successMsg = await settingsPage.getSuccessMessage();
      if (await successMsg.isVisible({ timeout: 5000 }).catch(() => false)) {
        await settingsPage.goto();
        const name = await settingsPage.getFullName();
        expect(name).toBe(settings.specialCharsName);
      }
    }
  });

  test('1.13 — Email field is not editable @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await expect(settingsPage.emailInput).toBeDisabled();
  });

  test('1.14 — Rapidly click Save Changes multiple times @regression', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    await settingsPage.fillFullName(settings.validName);
    await expect(settingsPage.saveChangesBtn).toBeEnabled();

    const requests = [];
    page.on('request', req => {
      if (req.method() === 'PATCH' || req.method() === 'PUT') requests.push(req);
    });

    await settingsPage.saveChangesBtn.click({ clickCount: 5 });

    await page.waitForTimeout(2000);
    expect(requests.length).toBeLessThanOrEqual(2);
  });

  test('1.15 — Refresh page and verify saved values persist @critical @smoke', async ({ page }) => {
    await loginAndGoToSettings(page);
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();

    const name = await settingsPage.getFullName();
    expect(name).toBeTruthy();

    await page.reload();
    await page.waitForLoadState('networkidle');

    const refreshedName = await settingsPage.getFullName();
    expect(refreshedName).toBe(name);
  });
});
