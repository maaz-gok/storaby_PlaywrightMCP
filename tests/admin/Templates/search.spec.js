import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — search', () => {
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

  async function searchTermFor(page) {
    const body = await capturePageOne(page);
    return body.data.items[0].name.split(' ')[0].toLowerCase();
  }

  test('3.1 — Search input renders with correct placeholder @smoke', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Verify search input attributes', async () => {
      await expect(templates.searchInput).toBeVisible();
      await expect(templates.searchInput).toHaveAttribute('placeholder', 'Search templates...');
      await expect(templates.searchInput).toHaveAttribute('type', 'search');
    });
  });

  test('3.2 — Search is debounced and fires a single API request @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const searchRequests = [];

    page.on('request', req => {
      if (isListUrl(req.url()) && new URL(req.url()).searchParams.get('search') !== null) {
        searchRequests.push(req.url());
      }
    });

    const musResponse = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'mus'
    );

    await test.step('Type quickly without pausing between keystrokes', async () => {
      await templates.searchInput.fill('m');
      await templates.searchInput.fill('mu');
      await templates.searchInput.fill('mus');
      const response = await musResponse;
      expect(response.status()).toBe(200);
    });

    await test.step('Verify only one request fired with search=mus', async () => {
      expect(searchRequests.length).toBe(1);
      expect(new URL(searchRequests[0]).searchParams.get('search')).toBe('mus');
    });
  });

  test('3.3 — Partial and case-insensitive search return the same set @smoke @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    async function titlesFor(query) {
      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === query
      );
      await templates.search(query);
      const response = await responsePromise;
      const items = (await response.json()).data.items;
      const count = await templates.cards.count();
      expect(count).toBe(items.length);
      const titles = [];
      for (let i = 0; i < count; i++) titles.push(await templates.getCardTitle(i).textContent());
      return { titles, count };
    }

    const term = await searchTermFor(page);
    let first;

    await test.step(`Search "${term}" (partial, lowercase)`, async () => {
      first = await titlesFor(term);
      expect(first.count).toBeGreaterThan(0);
      const clearPromise = page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === null);
      await templates.clearSearch();
      await clearPromise;
    });

    await test.step(`Search "${term.toUpperCase()}" and compare the set`, async () => {
      const second = await titlesFor(term.toUpperCase());
      expect(second.count).toBeGreaterThan(0);
      expect(second.titles).toEqual(first.titles);
    });
  });

  test('3.4 — Search trims leading/trailing spaces @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'chocolate'
    );

    await test.step('Search with spaces around the query', async () => {
      await templates.search('  chocolate  ');
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    });
  });

  test('3.5 — Search with an exact full name @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const pageOnePromise = page.waitForResponse(r => isListUrl(r.url()));
    await page.reload();
    const pageOne = await (await pageOnePromise).json();
    const name = pageOne.data.items[0].name;
    const expectedCount = pageOne.data.items.filter(it => it.name === name).length;

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === name
    );

    await test.step('Search for a full template name', async () => {
      await templates.search(name);
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    });

    await test.step('Verify all cards match that name', async () => {
      await expect(templates.cards).toHaveCount(expectedCount);
      for (let i = 0; i < expectedCount; i++) {
        await expect(templates.getCardTitle(i)).toHaveText(name);
      }
    });
  });

  test('3.6 — Search matches name, genre, and prompt text @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    for (const query of ['cartoon', 'adventure', 'magical']) {
      await test.step(`Search "${query}" and compare against the backend response`, async () => {
        const responsePromise = page.waitForResponse(r =>
          isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === query
        );
        await templates.search(query);
        const response = await responsePromise;
        const items = (await response.json()).data.items;
        const count = await templates.cards.count();
        expect(count).toBe(items.length);
        for (let i = 0; i < count; i++) {
          await expect(templates.getCardTitle(i)).toHaveText(items[i].name);
        }
        const clearPromise = page.waitForResponse(r => isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === null);
        await templates.clearSearch();
        await clearPromise;
      });
    }
  });

  test('3.7 — Search with numbers returns empty state @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === '123'
    );

    await test.step('Search "123"', async () => {
      await templates.search('123');
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    });

    await test.step('Verify empty state and disabled pagination', async () => {
      await expect(templates.emptyState).toBeVisible();
      await expect(templates.paginationText).toHaveText('0-0 of 0');
      await expect(templates.firstPageButton).toBeDisabled();
      await expect(templates.prevPageButton).toBeDisabled();
      await expect(templates.nextPageButton).toBeDisabled();
      await expect(templates.lastPageButton).toBeDisabled();
    });
  });

  test('3.8 — Search with special characters is URL-encoded @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === '@#$'
    );

    await test.step('Search "@#$"', async () => {
      await templates.search('@#$');
      const response = await responsePromise;
      expect(response.url()).toContain('search=%40%23$');
      expect(response.status()).toBe(200);
    });

    await test.step('Verify empty state and no console errors', async () => {
      await expect(templates.emptyState).toBeVisible();
      expect(consoleErrors).toEqual([]);
    });
  });

  test('3.9 — Clearing the search restores the full list @smoke', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const term = await searchTermFor(page);

    const searchResponsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === term
    );
    await templates.search(term);
    const searchResponse = await searchResponsePromise;
    const filteredBody = await searchResponse.json();
    expect(filteredBody.data.items.length).toBeGreaterThan(0);

    const resetResponsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) &&
      new URL(r.url()).searchParams.get('search') === null &&
      new URL(r.url()).searchParams.get('page') === '1'
    );

    await test.step('Clear the search input', async () => {
      await templates.clearSearch();
      const resetResponse = await resetResponsePromise;
      const body = await resetResponse.json();
      expect(resetResponse.status()).toBe(200);
      await expect(templates.searchInput).toHaveValue('');
      await expect(templates.paginationText).toHaveText(`1-${body.data.items.length} of ${body.data.total}`);
    });
  });

  test('3.10 — No-result search shows the "No templates found." empty state @smoke @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const responsePromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'zzzznonexistent12345'
    );

    await test.step('Search for a non-existent value', async () => {
      await templates.search('zzzznonexistent12345');
      const response = await responsePromise;
      expect(response.status()).toBe(200);
    });

    await test.step('Verify empty state markup', async () => {
      const emptySection = page.locator('section').filter({ hasText: 'No templates found.' });
      await expect(emptySection).toBeVisible();
      await expect(emptySection).toHaveClass(/rounded/);
      await expect(templates.paginationText).toHaveText('0-0 of 0');
      await expect(templates.firstPageButton).toBeDisabled();
      await expect(templates.prevPageButton).toBeDisabled();
      await expect(templates.nextPageButton).toBeDisabled();
      await expect(templates.lastPageButton).toBeDisabled();
      await expect(templates.searchInput).toBeEnabled();
      await expect(templates.ageGroupButton).toBeEnabled();
    });
  });

  test('3.11 — A new search resets pagination to page 1 @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Navigate to the last page', async () => {
      const pageOnePromise = page.waitForResponse(r => isListUrl(r.url()));
      await page.reload();
      const body = await (await pageOnePromise).json();
      const { totalPages } = body.data;

      if (totalPages > 1) {
        const lastPagePromise = page.waitForResponse(r =>
          isListUrl(r.url()) && new URL(r.url()).searchParams.get('page') === String(totalPages)
        );
        await templates.lastPageButton.click();
        const lastResponse = await lastPagePromise;
        expect(lastResponse.status()).toBe(200);
      }
    });

    await test.step('Search and verify the request resets to page 1', async () => {
      const searchPromise = page.waitForResponse(r =>
        isListUrl(r.url()) &&
        new URL(r.url()).searchParams.get('page') === '1' &&
        new URL(r.url()).searchParams.get('search') === 'choc'
      );
      await templates.search('choc');
      const searchResponse = await searchPromise;
      expect(searchResponse.status()).toBe(200);
    });
  });

  test('3.12 — Search persists across pagination @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const searchPromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('search') === 'e'
    );

    await test.step('Apply a search that may span multiple pages', async () => {
      await templates.search('e');
      const response = await searchPromise;
      expect(response.status()).toBe(200);
    });

    await test.step('Navigate to the next page and verify the search persists', async () => {
      if (await templates.nextPageButton.isEnabled()) {
        const pageTwoPromise = page.waitForResponse(r =>
          isListUrl(r.url()) &&
          new URL(r.url()).searchParams.get('page') === '2' &&
          new URL(r.url()).searchParams.get('search') === 'e'
        );
        await templates.nextPageButton.click();
        const pageTwo = await pageTwoPromise;
        expect(pageTwo.status()).toBe(200);
        await expect(templates.searchInput).toHaveValue('e');
      } else {
        await expect(templates.searchInput).toHaveValue('e');
      }
    });
  });
});
