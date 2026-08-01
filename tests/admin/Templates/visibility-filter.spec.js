import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage, VISIBILITY_OPTIONS } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — visibility filter', () => {
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

  test('6.1 — Visibility dropdown lists all options @smoke', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Open the dropdown and verify options', async () => {
      await templates.visibilityButton.click();
      await expect(page.getByRole('listbox')).toBeVisible();
      const labels = await page.getByRole('option').allTextContents();
      expect(labels).toEqual(VISIBILITY_OPTIONS);
      await expect(page.getByRole('option', { name: 'All', exact: true })).toHaveAttribute('aria-selected', 'true');
    });
  });

  test('6.2 — Filtering by "Visible" returns active templates @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'true'
    );

    await test.step('Select "Visible"', async () => {
      await templates.selectVisibility('Visible');
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    });

    await test.step('Verify every card shows the Visible badge', async () => {
      const response = await responsePromise;
      const { items, total } = (await response.json()).data;
      await expect(templates.visibilityButton).toContainText('Visible');
      await expect(templates.cards).toHaveCount(items.length);
      for (let i = 0; i < items.length; i++) {
        await expect(templates.getCardBadge(i)).toHaveText('Visible');
        await expect(templates.getCardToggleButton(i)).toHaveAccessibleName(`Hide ${items[i].name}`);
      }
      const text = await templates.getPaginationText();
      expect(text.endsWith(`of ${total}`)).toBe(true);
    });
  });

  test('6.3 — Filtering by "Hidden" returns inactive templates @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false'
    );

    await test.step('Select "Hidden"', async () => {
      await templates.selectVisibility('Hidden');
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    });

    await test.step('Verify the results match the backend response', async () => {
      const response = await responsePromise;
      const { items } = (await response.json()).data;
      await expect(templates.visibilityButton).toContainText('Hidden');

      if (items.length === 0) {
        await expect(templates.emptyState).toBeVisible();
      } else {
        await expect(templates.cards).toHaveCount(items.length);
        for (let i = 0; i < items.length; i++) {
          await expect(templates.getCardBadge(i)).toHaveText('Hidden');
          await expect(templates.getCardToggleButton(i)).toHaveAccessibleName(`Show ${items[i].name}`);
        }
      }
    });
  });

  test('6.4 — "All" resets the Visibility filter @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Apply a visibility filter first', async () => {
      const filteredPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false'
      );
      await templates.selectVisibility('Hidden');
      await filteredPromise;
      await expect(templates.visibilityButton).toContainText('Hidden');
    });

    await test.step('Select "All" to reset', async () => {
      const resetPromise = page.waitForResponse(r =>
        isListUrl(r.url()) &&
        new URL(r.url()).searchParams.get('page') === '1' &&
        new URL(r.url()).searchParams.get('isActive') === null
      );
      await templates.selectVisibility('All');
      const resetResponse = await resetPromise;
      expect(resetResponse.status()).toBe(200);
    });

    await test.step('Verify the button text reverts', async () => {
      await expect(templates.visibilityButton).toContainText('Visibility');
      const text = await templates.getPaginationText();
      expect(text).toMatch(/^\d+-\d+ of \d+$/);
    });
  });

  test('6.5 — Combined Hidden + Age Group produces an empty state @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Intercept the combined query to return an empty result', async () => {
      await page.route('**/story-templates/admin/all**', async route => {
        const params = new URL(route.request().url()).searchParams;
        if (params.get('isActive') === 'false' && params.get('ageVersion') === 'B_4_8') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              data: { items: [], total: 0, page: 1, limit: 9, totalPages: 1 },
              status: 200,
              message: 'Templates retrieved successfully',
            }),
          });
        } else {
          await route.continue();
        }
      });
    });

    await test.step('Apply "Hidden" then "Ages 4–8"', async () => {
      const hiddenPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false'
      );
      await templates.selectVisibility('Hidden');
      await hiddenPromise;

      const combinedPromise = page.waitForResponse(r => {
        if (!isListUrl(r.url())) return false;
        const params = new URL(r.url()).searchParams;
        return params.get('isActive') === 'false' && params.get('ageVersion') === 'B_4_8';
      });
      await templates.selectAgeGroup('Ages 4–8');
      const combinedResponse = await combinedPromise;
      expect(combinedResponse.status()).toBe(200);
    });

    await test.step('Verify the empty state', async () => {
      await expect(templates.emptyState).toBeVisible();
      await expect(templates.paginationText).toHaveText('0-0 of 0');
      await expect(templates.firstPageButton).toBeDisabled();
      await expect(templates.prevPageButton).toBeDisabled();
      await expect(templates.nextPageButton).toBeDisabled();
      await expect(templates.lastPageButton).toBeDisabled();
    });
  });
});
