import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Admin Dashboard — admin profile', () => {
  test('3.1 — Profile button displays admin name and email @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await test.step('Log in and navigate to dashboard', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify profile avatar', async () => {
      await expect(dashboard.profileAvatar).toBeVisible();
      await expect(dashboard.profileAvatar).toHaveAttribute('alt', users.admin.name);
    });

    await test.step('Verify admin name and email in profile section', async () => {
      const buttonText = await dashboard.profileMenuButton.textContent();
      expect(buttonText).toContain(users.admin.name);
      expect(buttonText).toContain(users.admin.email);
    });
  });

  test('3.2 — Profile dropdown opens with Settings and Sign out @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await test.step('Log in and navigate to dashboard', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
      await page.waitForLoadState('networkidle');
    });

    await test.step('Click profile button and verify dropdown', async () => {
      await dashboard.profileMenuButton.click();
      await expect(dashboard.profileDropdown).toBeVisible();
    });

    await test.step('Verify Settings and Sign out options', async () => {
      await expect(page.getByText('Settings')).toBeVisible();
      await expect(page.getByText('Sign out')).toBeVisible();
    });

    await test.step('Close dropdown by pressing Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(dashboard.profileDropdown).not.toBeVisible();
    });
  });

  test('3.3 — Click Settings navigates to settings page @smoke @regression', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await test.step('Log in and navigate to dashboard', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
      await page.waitForLoadState('networkidle');
    });

    await test.step('Open profile menu and click Settings', async () => {
      await dashboard.profileMenuButton.click();
      await expect(dashboard.profileDropdown).toBeVisible();
      await page.getByText('Settings').click();
    });

    await test.step('Verify navigation to settings page', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/settings`);
      await expect(page.getByRole('button', { name: 'Profile Settings' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Change Password' })).toBeVisible();
    });
  });

  test('3.4 — Sign out clears session and redirects to login @critical @regression', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await test.step('Log in and navigate to dashboard', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
      await page.waitForLoadState('networkidle');
    });

    await test.step('Open profile menu and click Sign out', async () => {
      await dashboard.profileMenuButton.click();
      await expect(dashboard.profileDropdown).toBeVisible();
      await page.getByText('Sign out').click();
    });

    await test.step('Verify redirect to login page', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/login`);
    });

    await test.step('Verify session is cleared', async () => {
      const authState = await dashboard.getLocalStorageItem('storaby-auth');
      expect(authState?.state?.token).toBeFalsy();
      expect(authState?.state?.user).toBeFalsy();
    });

    await test.step('Verify navigating to dashboard redirects to login', async () => {
      await page.goto(`${BASE_URL}/admin/dashboard`);
      await expect(page).toHaveURL(`${BASE_URL}/admin/login`);
    });
  });
});
