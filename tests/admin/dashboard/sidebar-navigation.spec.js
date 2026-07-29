import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

async function loginAndGoToDashboard(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.admin.email, users.admin.password);
  await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  await page.waitForLoadState('networkidle');
}

test.describe('Admin Dashboard — sidebar navigation', () => {
  test('2.1 — Sidebar navigation links are visible and have correct hrefs @smoke', async ({ page }) => {
    await loginAndGoToDashboard(page);
    const dashboard = new DashboardPage(page);

    await test.step('Verify Dashboard link', async () => {
      await expect(dashboard.dashboardNavLink).toBeVisible();
      await expect(dashboard.dashboardNavLink).toHaveAttribute('href', '/admin/dashboard');
      await expect(dashboard.dashboardNavLink).toHaveAttribute('aria-current', 'page');
    });

    await test.step('Verify Monitor Orders link', async () => {
      await expect(dashboard.monitorOrdersNavLink).toBeVisible();
      await expect(dashboard.monitorOrdersNavLink).toHaveAttribute('href', '/admin/orders');
    });

    await test.step('Verify Templates link', async () => {
      await expect(dashboard.templatesNavLink).toBeVisible();
      await expect(dashboard.templatesNavLink).toHaveAttribute('href', '/admin/templates');
    });

    await test.step('Verify each link is clickable', async () => {
      await expect(dashboard.dashboardNavLink).toBeEnabled();
      await expect(dashboard.monitorOrdersNavLink).toBeEnabled();
      await expect(dashboard.templatesNavLink).toBeEnabled();
    });
  });

  test('2.2 — Navigate to Monitor Orders and back to Dashboard @smoke @critical', async ({ page }) => {
    await loginAndGoToDashboard(page);
    const dashboard = new DashboardPage(page);

    await test.step('Click Monitor Orders and verify navigation', async () => {
      await dashboard.monitorOrdersNavLink.click();
      await expect(page).toHaveURL(`${BASE_URL}/admin/orders`);
      await expect(page.getByRole('heading', { name: 'Order Management' })).toBeVisible();
    });

    await test.step('Verify nav item active states on orders page', async () => {
      await expect(dashboard.monitorOrdersNavLink).toHaveAttribute('aria-current', 'page');
      await expect(dashboard.dashboardNavLink).not.toHaveAttribute('aria-current', 'page');
    });

    await test.step('Navigate back to Dashboard', async () => {
      await dashboard.dashboardNavLink.click();
      await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
    });

    await test.step('Verify Dashboard nav is active again', async () => {
      await expect(dashboard.dashboardNavLink).toHaveAttribute('aria-current', 'page');
      await expect(dashboard.monitorOrdersNavLink).not.toHaveAttribute('aria-current', 'page');
    });
  });

  test('2.3 — Navigate to Templates and back to Dashboard @smoke @regression', async ({ page }) => {
    await loginAndGoToDashboard(page);
    const dashboard = new DashboardPage(page);

    await test.step('Click Templates and verify navigation', async () => {
      await dashboard.templatesNavLink.click();
      await expect(page).toHaveURL(`${BASE_URL}/admin/templates`);
      await expect(page.getByRole('heading', { name: 'Template Management' })).toBeVisible();
    });

    await test.step('Verify nav item active states on templates page', async () => {
      await expect(dashboard.templatesNavLink).toHaveAttribute('aria-current', 'page');
      await expect(dashboard.dashboardNavLink).not.toHaveAttribute('aria-current', 'page');
    });

    await test.step('Navigate back to Dashboard', async () => {
      await dashboard.dashboardNavLink.click();
      await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
    });

    await test.step('Verify Dashboard nav is active again', async () => {
      await expect(dashboard.dashboardNavLink).toHaveAttribute('aria-current', 'page');
    });
  });

  test('2.4 — Sidebar collapse/expand behavior @regression', async ({ page }) => {
    await loginAndGoToDashboard(page);
    const dashboard = new DashboardPage(page);

    await test.step('Collapse the sidebar', async () => {
      await dashboard.sidebarCollapseButton.click();
      await expect(dashboard.sidebar).toHaveCSS('width', '88px');
    });

    await test.step('Expand the sidebar back', async () => {
      const expandButton = page.getByRole('button', { name: /open menu|expand/i });
      await expandButton.click();
      await expect(dashboard.sidebar).toHaveCSS('width', '274px');
    });
  });

  test('2.5 — Mobile hamburger menu opens sidebar overlay @regression', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await loginAndGoToDashboard(page);
    const dashboard = new DashboardPage(page);

    await test.step('Click hamburger menu button', async () => {
      await expect(dashboard.openMenuButton).toBeVisible();
      await dashboard.openMenuButton.click();
    });

    await test.step('Verify sidebar navigation links are accessible', async () => {
      await expect(dashboard.dashboardNavLink).toBeVisible();
      await expect(dashboard.monitorOrdersNavLink).toBeVisible();
      await expect(dashboard.templatesNavLink).toBeVisible();
    });

    await test.step('Close the menu by clicking a navigation link', async () => {
      await dashboard.monitorOrdersNavLink.click();
      await expect(page).toHaveURL(`${BASE_URL}/admin/orders`);
    });
  });
});
