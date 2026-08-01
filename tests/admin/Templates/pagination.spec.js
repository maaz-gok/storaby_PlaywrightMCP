import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — pagination', () => {
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

  test('9.1 — Pagination controls render with correct disabled states on page 1 @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Verify pagination text format', async () => {
      const text = await templates.getPaginationText();
      expect(text).toMatch(/^\d+-\d+ of \d+$/);
    });

    await test.step('Verify first/prev disabled and next/last enabled on page 1', async () => {
      await expect(templates.firstPageButton).toBeDisabled();
      await expect(templates.prevPageButton).toBeDisabled();
      await expect(templates.nextPageButton).toBeEnabled();
      await expect(templates.lastPageButton).toBeEnabled();
    });
  });

  test('9.2 — Page indicator ranges are correct @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const { total, totalPages, limit } = body.data;
    expect(totalPages).toBeGreaterThan(1);

    await test.step('Verify page 1 range', async () => {
      await expect(templates.paginationText).toHaveText(`1-${Math.min(limit, total)} of ${total}`);
    });

    await test.step('Navigate to page 2 and verify range', async () => {
      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '2'
      );
      await templates.nextPageButton.click();
      const response = await responsePromise;
      expect(response.status()).toBe(200);
      await expect(templates.paginationText).toHaveText(`${limit + 1}-${Math.min(limit * 2, total)} of ${total}`);
    });

    await test.step('Navigate to the last page and verify range', async () => {
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
      expect(response.status()).toBe(200);
      await expect(templates.paginationText).toHaveText(`${(totalPages - 1) * limit + 1}-${total} of ${total}`);
    });
  });

  test('9.3 — Next/Previous load different data @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const { total, totalPages, limit } = body.data;
    const firstTitlePage1 = await templates.getCardTitle(0).textContent();

    await test.step('Go to page 2 and verify different data', async () => {
      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '2'
      );
      await templates.nextPageButton.click();
      const response = await responsePromise;
      const items = (await response.json()).data.items;
      await expect(templates.prevPageButton).toBeEnabled();
      await expect(templates.paginationText).toHaveText(`${limit + 1}-${Math.min(limit * 2, total)} of ${total}`);
      await expect(templates.cards).toHaveCount(items.length);
      const firstTitlePage2 = await templates.getCardTitle(0).textContent();
      expect(firstTitlePage2).not.toBe(firstTitlePage1);
      expect(totalPages).toBeGreaterThan(1);
    });

    await test.step('Go back to page 1 and verify original data returns', async () => {
      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '1'
      );
      await templates.prevPageButton.click();
      const response = await responsePromise;
      expect(response.status()).toBe(200);
      await expect(templates.getCardTitle(0)).toHaveText(firstTitlePage1);
      await expect(templates.prevPageButton).toBeDisabled();
    });
  });

  test('9.4 — First/Last page buttons navigate to boundaries @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const { total, totalPages, limit } = body.data;
    expect(totalPages).toBeGreaterThan(1);

    await test.step('Click Last page from page 1', async () => {
      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === String(totalPages)
      );
      await templates.lastPageButton.click();
      const response = await responsePromise;
      expect(response.status()).toBe(200);
      await expect(templates.paginationText).toHaveText(`${(totalPages - 1) * limit + 1}-${total} of ${total}`);
      await expect(templates.nextPageButton).toBeDisabled();
      await expect(templates.lastPageButton).toBeDisabled();
      await expect(templates.firstPageButton).toBeEnabled();
      await expect(templates.prevPageButton).toBeEnabled();
    });

    await test.step('Click First page from the last page', async () => {
      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '1'
      );
      await templates.firstPageButton.click();
      const response = await responsePromise;
      expect(response.status()).toBe(200);
      await expect(templates.paginationText).toHaveText(`1-${Math.min(limit, total)} of ${total}`);
      await expect(templates.firstPageButton).toBeDisabled();
      await expect(templates.prevPageButton).toBeDisabled();
    });
  });

  test('9.5 — Pagination composes with search and filters @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Navigate to page 2 of the unfiltered list', async () => {
      const body = await capturePageOne(page);
      expect(body.data.totalPages).toBeGreaterThan(1);

      const pageTwoPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === '2'
      );
      await templates.nextPageButton.click();
      const pageTwo = await pageTwoPromise;
      expect(pageTwo.status()).toBe(200);
    });

    await test.step('Apply the Ages 2–4 filter from page 2 — page resets to 1', async () => {
      const filteredPromise = page.waitForResponse(r =>
        isListUrl(r.url()) &&
        new URL(r.url()).searchParams.get('page') === '1' &&
        new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4'
      );
      await templates.selectAgeGroup('Ages 2–4');
      const filteredResponse = await filteredPromise;
      const { total } = (await filteredResponse.json()).data;
      expect(total).toBeGreaterThan(0);
      await expect(templates.paginationText).toHaveText(`1-${Math.min(total, 9)} of ${total}`);
    });

    await test.step('Add a search — request keeps search and filter on page 1', async () => {
      const searchPromise = page.waitForResponse(r =>
        isListUrl(r.url()) &&
        new URL(r.url()).searchParams.get('page') === '1' &&
        new URL(r.url()).searchParams.get('search') === 'a' &&
        new URL(r.url()).searchParams.get('ageVersion') === 'A_2_4'
      );
      await templates.search('a');
      const searchResponse = await searchPromise;
      expect(searchResponse.status()).toBe(200);
      await expect(templates.searchInput).toHaveValue('a');
      await expect(templates.ageGroupButton).toContainText('Ages 2–4');
    });
  });

  test('9.6 — Single-page and no-result pagination boundaries @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Apply the Hidden filter (single page)', async () => {
      const hiddenPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false'
      );
      await templates.selectVisibility('Hidden');
      const hiddenResponse = await hiddenPromise;
      const { total } = (await hiddenResponse.json()).data;

      if (total === 0) {
        await expect(templates.paginationText).toHaveText('0-0 of 0');
      } else {
        await expect(templates.paginationText).toHaveText(`1-${total} of ${total}`);
      }
      await expect(templates.firstPageButton).toBeDisabled();
      await expect(templates.prevPageButton).toBeDisabled();
      await expect(templates.nextPageButton).toBeDisabled();
      await expect(templates.lastPageButton).toBeDisabled();
    });

    await test.step('Apply a no-result search', async () => {
      const emptyPromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'zzzznonexistent12345'
      );
      await templates.search('zzzznonexistent12345');
      const emptyResponse = await emptyPromise;
      expect(emptyResponse.status()).toBe(200);
      await expect(templates.paginationText).toHaveText('0-0 of 0');
      await expect(templates.firstPageButton).toBeDisabled();
      await expect(templates.prevPageButton).toBeDisabled();
      await expect(templates.nextPageButton).toBeDisabled();
      await expect(templates.lastPageButton).toBeDisabled();
    });
  });
});
