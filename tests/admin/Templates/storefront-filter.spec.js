import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage, STOREFRONT_SECTION_OPTIONS } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — storefront section filter', () => {
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

  test('5.1 — Storefront section dropdown lists all options @smoke', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Open the dropdown and verify options', async () => {
      await templates.storefrontSectionButton.click();
      await expect(page.getByRole('listbox')).toBeVisible();
      const labels = await page.getByRole('option').allTextContents();
      expect(labels).toEqual(STOREFRONT_SECTION_OPTIONS);
      await expect(page.getByRole('option', { name: 'All', exact: true })).toHaveAttribute('aria-selected', 'true');
    });
  });

  test('5.2 — Selecting a storefront section filters the grid @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Select "Adventure & Imagination"', async () => {
      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('shelfCategory') === 'adventure_imagination'
      );
      await templates.selectStorefrontSection('Adventure & Imagination');
      const response = await responsePromise;
      expect(response.status()).toBe(200);

      const { items } = (await response.json()).data;
      await expect(templates.storefrontSectionButton).toContainText('Adventure & Imagination');
      await expect(templates.cards).toHaveCount(items.length);
      for (let i = 0; i < items.length; i++) {
        await expect(templates.getCardCategoryTag(i)).toHaveText('Adventure & Imagination');
      }
    });

    await test.step('Select "Life\'s Big Moments"', async () => {
      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('shelfCategory') === 'life_big_moments'
      );
      await templates.selectStorefrontSection("Life's Big Moments");
      const response = await responsePromise;
      expect(response.status()).toBe(200);

      const { items } = (await response.json()).data;
      await expect(templates.storefrontSectionButton).toContainText("Life's Big Moments");
      await expect(templates.cards).toHaveCount(items.length);
      for (let i = 0; i < items.length; i++) {
        await expect(templates.getCardCategoryTag(i)).toHaveText("Life's Big Moments");
      }
    });
  });

  test('5.3 — "All" resets the Storefront filter @smoke', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Apply a storefront filter first', async () => {
      const filteredPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('shelfCategory') === 'adventure_imagination'
      );
      await templates.selectStorefrontSection('Adventure & Imagination');
      await filteredPromise;
      await expect(templates.storefrontSectionButton).toContainText('Adventure & Imagination');
    });

    await test.step('Select "All" to reset', async () => {
      const resetPromise = page.waitForResponse(r =>
        isListUrl(r.url()) &&
        new URL(r.url()).searchParams.get('page') === '1' &&
        new URL(r.url()).searchParams.get('shelfCategory') === null
      );
      await templates.selectStorefrontSection('All');
      const resetResponse = await resetPromise;
      expect(resetResponse.status()).toBe(200);
    });

    await test.step('Verify the button text reverts', async () => {
      await expect(templates.storefrontSectionButton).toContainText('Storefront section');
      const text = await templates.getPaginationText();
      expect(text).toMatch(/^\d+-\d+ of \d+$/);
    });
  });

  test('5.4 — Storefront filter combines with Age Group and search @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Select "Ages 4–8", "Life\'s Big Moments" and search "birthday"', async () => {
      const agePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'B_4_8'
      );
      await templates.selectAgeGroup('Ages 4–8');
      await agePromise;

      const sectionPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('shelfCategory') === 'life_big_moments'
      );
      await templates.selectStorefrontSection("Life's Big Moments");
      await sectionPromise;

      const combinedPromise = page.waitForResponse(r => {
        if (!isListUrl(r.url())) return false;
        const params = new URL(r.url()).searchParams;
        return params.get('page') === '1' &&
          params.get('search') === 'birthday' &&
          params.get('ageVersion') === 'B_4_8' &&
          params.get('shelfCategory') === 'life_big_moments';
      });
      await templates.search('birthday');
      const combinedResponse = await combinedPromise;
      expect(combinedResponse.status()).toBe(200);

      const { items } = (await combinedResponse.json()).data;
      await expect(templates.cards).toHaveCount(items.length);
      for (let i = 0; i < items.length; i++) {
        await expect(templates.getCardTitle(i)).toHaveText(items[i].name);
        await expect(templates.getCardAgeTag(i)).toHaveText('Age 4-8');
        await expect(templates.getCardCategoryTag(i)).toHaveText("Life's Big Moments");
      }
    });
  });
});
