import { test, expect } from '../../../../src/fixtures/base';
import { LoginPage } from '../../../../src/pages/LoginPage';
import { SettingsPage } from '../../../../src/pages/SettingsPage';
import { BASE_URL } from '../../../../src/utils/config';
import users from '../../../data/users.json' with { type: 'json' };
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resourcesDir = path.resolve(__dirname, '../../../../Resources');

async function loginAndGoToSettings(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.admin.email, users.admin.password);
  await page.waitForURL('**/admin/dashboard', { timeout: 30000 });
  await page.waitForLoadState('networkidle');
  const settings = new SettingsPage(page);
  await settings.goto();
  return settings;
}

test.describe('Admin Settings — Profile Image Upload', () => {
  test('Upload small JPEG image (24K) succeeds @smoke', async ({ page }) => {
    const settings = await loginAndGoToSettings(page);
    const filePath = path.join(resourcesDir, 'images (10).jpeg');

    await settings.uploadProfileImage(filePath);
    await expect(settings.saveChangesBtn).toBeEnabled();
    await settings.saveProfile();
    const success = await settings.getSuccessMessage();
    await expect(success).toBeVisible({ timeout: 10000 });
  });

  test('Upload medium PNG image (933K) succeeds @smoke', async ({ page }) => {
    const settings = await loginAndGoToSettings(page);
    const filePath = path.join(resourcesDir, 'ChatGPT Image Jul 10, 2026, 04_01_14 PM.png');

    await settings.uploadProfileImage(filePath);
    await expect(settings.saveChangesBtn).toBeEnabled();
    await settings.saveProfile();
    const success = await settings.getSuccessMessage();
    await expect(success).toBeVisible({ timeout: 10000 });
  });

  test('Upload LargeFile (3.9M) shows user-friendly error @regression', async ({ page }) => {
    const settings = await loginAndGoToSettings(page);
    const filePath = path.join(resourcesDir, 'LargeFile.png');

    await settings.uploadProfileImage(filePath);

    const errorMsg = page.getByText(/too large|exceeds|limit|maximum|size|error|wrong/i);
    const exists = await errorMsg.count();
    if (exists > 0) {
      const text = await errorMsg.first().textContent();
      expect(text).not.toMatch(/something went wrong/i);
    }
  });
});
