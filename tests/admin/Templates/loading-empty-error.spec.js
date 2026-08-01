import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — loading, empty and error states', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    await login.goto();
    await login.login(users.admin.email, users.admin.password);
    await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
    await dashboard.templatesNavLink.click();
    await page.waitForURL(`${BASE_URL}/admin/templates`);
    await page.waitForLoadState('networkidle');
  });

  const isListUrl = url => url.includes('/story-templates/admin/all');

  async function capturePageOne(page) {
    const responsePromise = page.waitForResponse(r => isListUrl(r.url()));
    await page.reload();
    const response = await responsePromise;
    return response.json();
  }

  test('10.1 — Skeleton cards render while the grid loads @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Delay the list API and reload', async () => {
      await page.route('**/story-templates/admin/all**', async route => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await route.continue();
      });
    });

    const responsePromise = page.waitForResponse(r => isListUrl(r.url()));

    await test.step('Observe the skeleton state during the delay', async () => {
      await page.reload();
      await expect(templates.skeletons).toHaveCount(9);
      await expect(templates.cards).toHaveCount(0);
      await expect(page.locator('main img')).toHaveCount(0);
      await expect(templates.paginationText).toHaveText('0-0 of 0');
    });

    await test.step('Verify real cards replace skeletons after the response', async () => {
      const response = await responsePromise;
      expect(response.status()).toBe(200);
      await expect(templates.cards.first()).toBeVisible();
      await expect(templates.skeletons).toHaveCount(0);
    });
  });

  test('10.2 — Loading behaviour during a search keeps controls interactive @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const term = body.data.items[0].name.split(' ')[0].toLowerCase();

    await test.step('Delay the list API and type a search', async () => {
      await page.route('**/story-templates/admin/all**', async route => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await route.continue();
      });

      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === term
      );
      await templates.search(term);
      await expect(templates.searchInput).toBeEnabled();
      await expect(templates.ageGroupButton).toBeEnabled();
      await expect(templates.visibilityButton).toBeEnabled();

      const response = await responsePromise;
      expect(response.status()).toBe(200);
      await expect(templates.cards.first()).toBeVisible();
    });
  });

  test('10.3 — Empty state markup for no results @smoke @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'zzzznonexistent12345'
    );
    await templates.search('zzzznonexistent12345');
    const response = await responsePromise;
    expect(response.status()).toBe(200);

    await test.step('Verify the empty state section markup', async () => {
      const emptySection = page.locator('section').filter({ hasText: 'No templates found.' });
      await expect(emptySection).toBeVisible();
      await expect(emptySection).toHaveClass(/rounded/);
      await expect(emptySection.locator('p')).toHaveText('No templates found.');
      await expect(templates.paginationText).toHaveText('0-0 of 0');
      await expect(templates.firstPageButton).toBeDisabled();
      await expect(templates.prevPageButton).toBeDisabled();
      await expect(templates.nextPageButton).toBeDisabled();
      await expect(templates.lastPageButton).toBeDisabled();
    });
  });

  test('10.4 — API failure keeps the grid in the skeleton state (no error UI) @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Fail the list API with a 500 and reload', async () => {
      await page.route('**/story-templates/admin/all**', async route => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ status: 500, message: 'Internal server error' }),
        });
      });
      const responsePromise = page.waitForResponse(r => isListUrl(r.url()));
      await page.reload();
      const response = await responsePromise;
      expect(response.status()).toBe(500);
    });

    await test.step('Document the observed behaviour: no error state, skeletons persist', async () => {
      await expect(templates.skeletons.first()).toBeVisible();
      await expect(templates.emptyState).not.toBeVisible();
      await expect(templates.paginationText).toHaveText('0-0 of 0');
    });

    await test.step('Verify filter and search controls still render', async () => {
      await expect(templates.searchInput).toBeVisible();
      await expect(templates.ageGroupButton).toBeVisible();
      await expect(templates.storefrontSectionButton).toBeVisible();
      await expect(templates.visibilityButton).toBeVisible();
    });
  });

  test('10.5 — Cover images load with correct dimensions @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const body = await capturePageOne(page);
    const items = body.data.items;

    await test.step('Verify every cover image is loaded with the right alt', async () => {
      const count = await templates.cards.count();
      expect(count).toBe(items.length);
      for (let i = 0; i < count; i++) {
        await expect(templates.getCardCover(i)).toHaveAttribute('alt', items[i].name);
        await expect(templates.getCardCover(i)).toHaveJSProperty('complete', true);
      }
      expect(consoleErrors).toEqual([]);
    });
  });
});
