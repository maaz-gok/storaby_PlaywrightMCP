import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — backend/UI data consistency', () => {
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

  test('12.1 — All list requests return 200 with the expected envelope @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const responses = [];
    page.on('response', res => {
      if (isListUrl(res.url())) responses.push(res);
    });

    await test.step('Exercise load, search, filters, and pagination', async () => {
      await page.reload();
      await page.waitForLoadState('networkidle');

      await templates.search('choc');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'choc');
      await templates.clearSearch();
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === null);

      await templates.selectAgeGroup('Ages 2–4');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4');
      await templates.selectAgeGroup('All');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === null);

      await templates.selectVisibility('Hidden');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false');
      await templates.selectVisibility('All');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === null);

      if (await templates.nextPageButton.isEnabled()) {
        await templates.nextPageButton.click();
        await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '2');
      }
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify every response envelope', async () => {
      expect(responses.length).toBeGreaterThan(5);
      for (const res of responses) {
        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.status).toBe(200);
        expect(body.data).toHaveProperty('items');
        expect(body.data).toHaveProperty('total');
        expect(body.data).toHaveProperty('page');
        expect(body.data).toHaveProperty('limit', 9);
        expect(body.data).toHaveProperty('totalPages');
      }
    });
  });

  test('12.2 — Card count and page size match the backend @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const pageOne = await capturePageOne(page);
    const { total, totalPages, limit } = pageOne.data;

    await test.step('Verify page 1 card count and pagination', async () => {
      await expect(templates.cards).toHaveCount(pageOne.data.items.length);
      await expect(templates.paginationText).toHaveText(`1-${Math.min(limit, total)} of ${total}`);
    });

    if (totalPages > 1) {
      await test.step('Verify page 2 card count', async () => {
        const responsePromise = page.waitForResponse(r =>
          isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '2'
        );
        await templates.nextPageButton.click();
        const response = await responsePromise;
        const body = await response.json();
        expect(body.data.page).toBe(2);
        await expect(templates.cards).toHaveCount(body.data.items.length);
      });

      await test.step('Verify last page card count', async () => {
        const backPromise = page.waitForResponse(r =>
          isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '1'
        );
        await templates.firstPageButton.click();
        await backPromise;

        const responsePromise = page.waitForResponse(r =>
          isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === String(totalPages)
        );
        await templates.lastPageButton.click();
        const response = await responsePromise;
        const body = await response.json();
        expect(body.data.page).toBe(totalPages);
        await expect(templates.cards).toHaveCount(body.data.items.length);
      });
    } else {
      await test.step('Verify single-page boundary (all controls disabled)', async () => {
        await expect(templates.paginationText).toHaveText(`1-${Math.min(limit, total)} of ${total}`);
        await expect(templates.firstPageButton).toBeDisabled();
        await expect(templates.prevPageButton).toBeDisabled();
        await expect(templates.nextPageButton).toBeDisabled();
        await expect(templates.lastPageButton).toBeDisabled();
      });
    }
  });

  test('12.3 — Search and filter results match backend filtered responses @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    async function assertUiMatches(responsePromise) {
      const response = await responsePromise;
      expect(response.status()).toBe(200);
      const items = (await response.json()).data.items;
      await expect(templates.cards).toHaveCount(items.length);
      for (let i = 0; i < items.length; i++) {
        await expect(templates.getCardTitle(i)).toHaveText(items[i].name);
      }
    }

    await test.step('Search "chocolate"', async () => {
      const promise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'chocolate'
      );
      await templates.search('chocolate');
      await assertUiMatches(promise);
    });

    await test.step('Clear search', async () => {
      await templates.clearSearch();
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === null);
    });

    await test.step('Filter by ageVersion=A_2_4', async () => {
      const promise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4'
      );
      await templates.selectAgeGroup('Ages 2–4');
      await assertUiMatches(promise);
      await templates.selectAgeGroup('All');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === null);
    });

    await test.step('Filter by shelfCategory=life_big_moments', async () => {
      const promise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('shelfCategory') === 'life_big_moments'
      );
      await templates.selectStorefrontSection("Life's Big Moments");
      await assertUiMatches(promise);
      await templates.selectStorefrontSection('All');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('shelfCategory') === null);
    });

    await test.step('Filter by isActive=false', async () => {
      const promise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false'
      );
      await templates.selectVisibility('Hidden');
      await assertUiMatches(promise);
    });
  });

  test('12.4 — Visibility state on cards matches the backend isActive field @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const pageOne = await capturePageOne(page);
    const items = pageOne.data.items;

    await test.step('Verify badge and toggle label follow isActive for every card', async () => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await expect(templates.getCardBadge(i)).toHaveText(item.isActive ? 'Visible' : 'Hidden');
        await expect(templates.getCardToggleButton(i)).toHaveAccessibleName(
          `${item.isActive ? 'Hide' : 'Show'} ${item.name}`
        );
      }
    });
  });

  test('12.5 — No console errors on any listing interaction @smoke', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await test.step('Load the page', async () => {
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Search and clear', async () => {
      await templates.search('choc');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'choc');
      await templates.clearSearch();
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === null);
    });

    await test.step('Cycle filters', async () => {
      await templates.selectAgeGroup('Ages 2–4');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4');
      await templates.selectAgeGroup('All');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === null);

      await templates.selectVisibility('Hidden');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false');
      await templates.selectVisibility('All');
      await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === null);
    });

    await test.step('Paginate', async () => {
      if (await templates.nextPageButton.isEnabled()) {
        await templates.nextPageButton.click();
        await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '2');
        if (await templates.prevPageButton.isEnabled()) {
          await templates.prevPageButton.click();
          await page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '1');
        }
      }
    });

    await test.step('Open and cancel a dialog', async () => {
      await templates.getCardDeleteButton(0).click();
      await expect(templates.getDialog('Delete this template?')).toBeVisible();
      await templates.cancelDialog('Delete this template?');
      await expect(templates.getDialog('Delete this template?')).not.toBeVisible();
    });

    await test.step('Verify no console errors', async () => {
      expect(consoleErrors).toEqual([]);
    });
  });
});
