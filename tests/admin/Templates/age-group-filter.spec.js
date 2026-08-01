import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage, AGE_GROUP_OPTIONS } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — age group filter', () => {
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

  test('4.1 — Age Group dropdown lists all options @smoke', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Verify the filter button attributes', async () => {
      await expect(templates.ageGroupButton).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(templates.ageGroupButton).toContainText('Age Group');
    });

    await test.step('Open the dropdown and verify options', async () => {
      await templates.ageGroupButton.click();
      await expect(page.getByRole('listbox')).toBeVisible();
      const labels = await page.getByRole('option').allTextContents();
      expect(labels).toEqual(AGE_GROUP_OPTIONS);
      await expect(page.getByRole('option', { name: 'All', exact: true })).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Close the dropdown via Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(page.getByRole('listbox')).not.toBeVisible();
    });
  });

  test('4.2 — Selecting an age group filters the grid @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4'
    );

    await test.step('Select "Ages 2–4"', async () => {
      await templates.selectAgeGroup('Ages 2–4');
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    });

    await test.step('Verify the button text updated', async () => {
      await expect(templates.ageGroupButton).toContainText('Ages 2–4');
    });

    await test.step('Verify every card shows the matching age tag', async () => {
      const response = await responsePromise;
      const { items } = (await response.json()).data;
      await expect(templates.cards).toHaveCount(items.length);
      for (let i = 0; i < items.length; i++) {
        await expect(templates.getCardAgeTag(i)).toHaveText('Age 2-4');
      }
    });

    await test.step('Repeat for "Ages 4–8"', async () => {
      const bResponsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'B_4_8'
      );
      await templates.selectAgeGroup('Ages 4–8');
      const bResponse = await bResponsePromise;
      expect(bResponse.status()).toBe(200);
      await expect(templates.ageGroupButton).toContainText('Ages 4–8');
      const { items } = (await bResponse.json()).data;
      await expect(templates.cards).toHaveCount(items.length);
      for (let i = 0; i < items.length; i++) {
        await expect(templates.getCardAgeTag(i)).toHaveText('Age 4-8');
      }
    });
  });

  test('4.3 — Age Group results match the backend response @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4'
    );
    await templates.selectAgeGroup('Ages 2–4');
    const response = await responsePromise;
    const { items } = (await response.json()).data;

    await test.step('Compare the first 3 cards with the API items', async () => {
      const count = Math.min(3, items.length);
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(templates.getCardTitle(i)).toHaveText(items[i].name);
        await expect(templates.getCardAgeTag(i)).toHaveText('Age 2-4');
        const categoryMap = {
          adventure_imagination: 'Adventure & Imagination',
          life_big_moments: "Life's Big Moments",
        };
        await expect(templates.getCardCategoryTag(i)).toHaveText(categoryMap[items[i].shelfCategory]);
      }
      const rendered = await templates.cards.count();
      expect(rendered).toBe(items.length);
    });
  });

  test('4.4 — "All" resets the Age Group filter @smoke', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Apply an age filter first', async () => {
      const filteredPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4'
      );
      await templates.selectAgeGroup('Ages 2–4');
      await filteredPromise;
      await expect(templates.ageGroupButton).toContainText('Ages 2–4');
    });

    await test.step('Select "All" to reset', async () => {
      const resetPromise = page.waitForResponse(r =>
        isListUrl(r.url()) &&
        new URL(r.url()).searchParams.get('page') === '1' &&
        new URL(r.url()).searchParams.get('ageVersion') === null
      );
      await templates.selectAgeGroup('All');
      const resetResponse = await resetPromise;
      expect(resetResponse.status()).toBe(200);
    });

    await test.step('Verify the button text reverts and the full list returns', async () => {
      await expect(templates.ageGroupButton).toContainText('Age Group');
      const text = await templates.getPaginationText();
      expect(text).toMatch(/^\d+-\d+ of \d+$/);
    });
  });

  test('4.5 — Age Group filter combines with search @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Select "Ages 2–4" then search', async () => {
      const filteredPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4'
      );
      await templates.selectAgeGroup('Ages 2–4');
      await filteredPromise;

      const combinedPromise = page.waitForResponse(r =>
        isListUrl(r.url()) &&
        new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4' &&
        new URL(r.url()).searchParams.get('search') === 'choc'
      );
      await templates.search('choc');
      const combinedResponse = await combinedPromise;
      expect(combinedResponse.status()).toBe(200);
    });

    await test.step('Verify the button and search still show both criteria', async () => {
      await expect(templates.ageGroupButton).toContainText('Ages 2–4');
      await expect(templates.searchInput).toHaveValue('choc');
    });
  });

  test('4.6 — Age Group filter resets after page refresh @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Apply the filter then reload', async () => {
      const filteredPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4'
      );
      await templates.selectAgeGroup('Ages 2–4');
      await filteredPromise;
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify the filter is reset', async () => {
      await expect(templates.ageGroupButton).toContainText('Age Group');
      const text = await templates.getPaginationText();
      expect(text).toMatch(/^\d+-\d+ of \d+$/);
      await expect(templates.cards.first()).toBeVisible();
    });
  });
});
