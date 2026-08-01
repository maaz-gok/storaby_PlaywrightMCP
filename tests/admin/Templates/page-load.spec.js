import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — page load and route guard', () => {
  test('1.1 — Templates page loads with authenticated session @smoke @critical', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const templates = new TemplatesPage(page);

    await test.step('Log in as admin', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
    });

    await test.step('Navigate to templates page via sidebar', async () => {
      await dashboard.templatesNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/templates`);
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify URL and heading', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/templates`);
      await expect(page).toHaveTitle(/Storaby/);
      await expect(templates.heading).toBeVisible();
    });

    await test.step('Verify sidebar navigation active state', async () => {
      await expect(dashboard.templatesNavLink).toHaveAttribute('aria-current', 'page');
    });

    await test.step('Verify header/profile section', async () => {
      await expect(dashboard.profileMenuButton).toBeVisible();
    });

    await test.step('Verify main content controls are present', async () => {
      await expect(templates.searchInput).toBeVisible();
      await expect(templates.ageGroupButton).toBeVisible();
      await expect(templates.storefrontSectionButton).toBeVisible();
      await expect(templates.visibilityButton).toBeVisible();
      await expect(templates.newTemplateButton).toBeVisible();
      await expect(templates.cards.first()).toBeVisible();
      await expect(templates.paginationText).toBeVisible();
    });

    await test.step('Verify pagination text format', async () => {
      const text = await templates.getPaginationText();
      expect(text).toMatch(/^\d+-\d+ of \d+$/);
    });

    await test.step('Verify no console errors', async () => {
      expect(consoleErrors).toEqual([]);
    });
  });

  test('1.2 — Unauthenticated user is redirected to login @critical @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Navigate directly to templates page without session', async () => {
      await templates.goto();
    });

    await test.step('Verify redirect to login', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/login`);
    });

    await test.step('Verify templates content is not rendered', async () => {
      await expect(templates.heading).not.toBeVisible();
      await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
    });
  });

  test('1.3 — Templates page structure renders correctly @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const templates = new TemplatesPage(page);

    await test.step('Log in and navigate to templates page', async () => {
      await login.goto();
      await login.login(users.admin.email, users.admin.password);
      await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
      await dashboard.templatesNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/templates`);
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify sidebar structure', async () => {
      await expect(dashboard.sidebar).toBeVisible();
      await expect(dashboard.sidebarLogo).toBeVisible();
      await expect(dashboard.dashboardNavLink).toBeVisible();
      await expect(dashboard.monitorOrdersNavLink).toBeVisible();
      await expect(dashboard.templatesNavLink).toBeVisible();
      await expect(dashboard.sidebarCollapseButton).toBeVisible();
    });

    await test.step('Verify filter buttons expose listbox semantics', async () => {
      await expect(templates.ageGroupButton).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(templates.storefrontSectionButton).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(templates.visibilityButton).toHaveAttribute('aria-haspopup', 'listbox');
    });

    await test.step('Verify new template button opens the drawer and Escape closes it', async () => {
      await templates.newTemplateButton.click();
      await expect(templates.createTemplateDrawer).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(templates.createTemplateDrawer).not.toBeVisible();
    });

    await test.step('Verify pagination controls', async () => {
      await expect(templates.paginationText).toBeVisible();
      await expect(templates.firstPageButton).toBeVisible();
      await expect(templates.prevPageButton).toBeVisible();
      await expect(templates.nextPageButton).toBeVisible();
      await expect(templates.lastPageButton).toBeVisible();
    });
  });
});
