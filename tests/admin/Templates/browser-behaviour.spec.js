import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — browser behaviour', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.admin.email, users.admin.password);
    await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  });

  const isListUrl = url => url.includes('/story-templates/admin/all');

  test('12.6a — Browser back navigates to dashboard @smoke @critical', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const templates = new TemplatesPage(page);

    await test.step('Navigate to templates page', async () => {
      await dashboard.templatesNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/templates`);
      await page.waitForLoadState('networkidle');
    });

    await test.step('Click browser back', async () => {
      await page.goBack();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify navigated to dashboard', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
      await expect(dashboard.welcomeHeading).toBeVisible();
      await expect(dashboard.dashboardNavLink).toHaveAttribute('aria-current', 'page');
    });
  });

  test('12.6b — Browser forward returns to templates page @regression', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const templates = new TemplatesPage(page);

    await test.step('Navigate to templates, back, then forward', async () => {
      await dashboard.templatesNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/templates`);
      await page.waitForLoadState('networkidle');

      await page.goBack();
      await page.waitForLoadState('networkidle');

      await page.goForward();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify back on templates page', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/admin/templates`);
      await expect(templates.heading).toBeVisible();
      await expect(dashboard.templatesNavLink).toHaveAttribute('aria-current', 'page');
    });
  });

  test('12.6c — Page refresh restores default state @smoke @regression', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const templates = new TemplatesPage(page);

    await test.step('Apply search, filter, and paginate before refreshing', async () => {
      await dashboard.templatesNavLink.click();
      await page.waitForURL(`${BASE_URL}/admin/templates`);
      await page.waitForLoadState('networkidle');

      await templates.search('choc');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'choc');

      await templates.selectAgeGroup('Ages 2–4');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4');

      if (await templates.nextPageButton.isEnabled()) {
        await templates.nextPageButton.click();
        await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '2');
      }

      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify the default state is restored', async () => {
      await expect(templates.searchInput).toHaveValue('');
      await expect(templates.ageGroupButton).toContainText('Age Group');
      await expect(templates.storefrontSectionButton).toContainText('Storefront section');
      await expect(templates.visibilityButton).toContainText('Visibility');
      await expect(templates.cards.first()).toBeVisible();
      const text = await templates.getPaginationText();
      expect(text).toMatch(/^1-9 of \d+$/);
    });
  });

  test('12.6d — Direct URL access loads the templates page @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Navigate directly with an existing session', async () => {
      await templates.goto();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify the templates page loaded', async () => {
      await expect(templates.heading).toBeVisible();
      const responsePromise = page.waitForResponse(r => isListUrl(r.url()));
      await page.reload();
      const body = await (await responsePromise).json();
      await expect(templates.cards).toHaveCount(body.data.items.length);
    });
  });
});
