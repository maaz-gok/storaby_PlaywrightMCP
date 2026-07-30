import { test, expect } from '../../../../src/fixtures/base';
import { LoginPage } from '../../../../src/pages/LoginPage';
import { SettingsPage } from '../../../../src/pages/SettingsPage';
import users from '../../../data/users.json' with { type: 'json' };
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resourcesDir = path.resolve(__dirname, '../../../../Resources');

test.setTimeout(120000);

test('capture settings page', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.admin.email, users.admin.password);
  await expect(page).toHaveURL(/\/admin\/dashboard/, { timeout: 60000 });
  await page.waitForLoadState('networkidle');
  const settings = new SettingsPage(page);
  await settings.goto();
  await page.waitForLoadState('networkidle');

  const btn = page.getByRole('button', { name: 'Change profile photo' });
  console.log('Change photo button visible:', await btn.isVisible());
  await btn.click();

  const fileInput = page.locator('input[type="file"]');
  console.log('File input visible:', await fileInput.isVisible());
  console.log('File input count:', await fileInput.count());

  await fileInput.setInputFiles([path.join(resourcesDir, 'IMG_8163.png')]);
  await page.waitForLoadState('networkidle');

  await settings.saveProfile();

  const errorToast = page.getByText(/something went wrong/i);
  await errorToast.waitFor({ state: 'visible', timeout: 60000 }).catch(() => {});

  await page.screenshot({ path: 'Resources/bug-evidence-settings.png', fullPage: true });
  console.log('Screenshot saved');
});
