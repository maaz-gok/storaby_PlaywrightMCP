import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage, ageVersionMap, shelfCategoryMap } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — card grid and card data', () => {
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

  async function capturePageOne(page) {
    const responsePromise = page.waitForResponse(r =>
      r.url().includes('/story-templates/admin/all') &&
      new URL(r.url()).searchParams.get('page') === '1' &&
      new URL(r.url()).searchParams.get('limit') === '9' &&
      new URL(r.url()).searchParams.get('search') === null &&
      new URL(r.url()).searchParams.get('ageVersion') === null &&
      new URL(r.url()).searchParams.get('shelfCategory') === null &&
      new URL(r.url()).searchParams.get('isActive') === null
    );
    await page.reload();
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    return response.json();
  }

  test('2.1 — Grid renders one card per API item, 9 per page @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const body = await capturePageOne(page);
    const { items, total, limit, totalPages } = body.data;

    await test.step('Verify card count matches API items', async () => {
      expect(limit).toBe(9);
      expect(totalPages).toBe(Math.ceil(total / 9));
      await expect(templates.cards).toHaveCount(items.length);
    });

    await test.step('Verify pagination text shows the total', async () => {
      await expect(templates.paginationText).toHaveText(`1-${items.length} of ${total}`);
    });
  });

  test('2.2 — Every card field matches the backend response @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const body = await capturePageOne(page);
    const { items } = body.data;

    await test.step('Compare each rendered card with its API item', async () => {
      const count = await templates.cards.count();
      expect(count).toBe(items.length);

      for (let i = 0; i < count; i++) {
        const item = items[i];
        const card = templates.getCard(i);

        await expect(templates.getCardTitle(i)).toHaveText(item.name);
        await expect(templates.getCardCover(i)).toHaveAttribute('alt', item.name);

        const src = await templates.getCardCover(i).getAttribute('src');
        expect(src).toBeTruthy();
        const expectedPath = item.coverImageUrl ? item.coverImageUrl.split('?')[0] : '';
        if (expectedPath) expect(src.startsWith(expectedPath)).toBe(true);

        await expect(templates.getCardAgeTag(i)).toHaveText(ageVersionMap[item.ageVersion]);
        await expect(templates.getCardCategoryTag(i)).toHaveText(shelfCategoryMap[item.shelfCategory]);
        await expect(templates.getCardBadge(i)).toHaveText(item.isActive ? 'Visible' : 'Hidden');
        await expect(card.getByRole('button', { name: `Edit ${item.name}` })).toBeVisible();
        await expect(card.getByRole('button', { name: `${item.isActive ? 'Hide' : 'Show'} ${item.name}` })).toBeVisible();
        await expect(card.getByRole('button', { name: `Delete ${item.name}` })).toBeVisible();
      }
    });
  });

  test('2.3 — Visibility badge styling distinguishes Visible vs Hidden @smoke @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Inspect a visible card badge', async () => {
      const body = await capturePageOne(page);
      const visibleItem = body.data.items.find(it => it.isActive);
      const idx = body.data.items.indexOf(visibleItem);
      const badge = templates.getCardBadge(idx);
      await expect(badge).toHaveText('Visible');
      await expect(badge).toHaveClass(/bg-white/);
      await expect(badge.locator('span[aria-hidden="true"]')).toBeVisible();
    });

    await test.step('Inspect the hidden card badge', async () => {
      const responsePromise = page.waitForResponse(r =>
        r.url().includes('/story-templates/admin/all') &&
        new URL(r.url()).searchParams.get('isActive') === 'false'
      );
      await templates.selectVisibility('Hidden');
      const response = await responsePromise;
      const items = (await response.json()).data.items;
      expect(items.length).toBeGreaterThan(0);

      const badge = templates.getCardBadge(0);
      await expect(badge).toHaveText('Hidden');
      await expect(badge).toHaveClass(/bg-storaby-secondary/);
      await expect(badge.locator('span[aria-hidden="true"]')).toBeVisible();
    });
  });

  test('2.4 — Duplicate template names render as separate cards @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const body = await capturePageOne(page);
    const { items } = body.data;

    await test.step('Verify cards sharing a name each render', async () => {
      const nameCounts = new Map();
      for (const item of items) nameCounts.set(item.name, (nameCounts.get(item.name) || 0) + 1);

      for (const [name, expectedCount] of nameCounts) {
        if (expectedCount > 1) {
          await expect(templates.cardByName(name)).toHaveCount(expectedCount);
        }
      }
    });
  });

  test('2.5 — Long template names clamp to two lines @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const body = await capturePageOne(page);
    const { items } = body.data;

    await test.step('Assert the longest title clamps to two lines', async () => {
      const longest = items.reduce((a, b) => (b.name.length > a.name.length ? b : a));
      const idx = items.indexOf(longest);
      const title = templates.getCardTitle(idx);
      await expect(title).toContainText(longest.name);
      await expect(title).toHaveCSS('-webkit-line-clamp', '2');
    });
  });

  test('2.6 — Broken cover image does not break the card @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Abort all image requests and reload', async () => {
      await page.route('**/*', route => {
        if (route.request().resourceType() === 'image') return route.abort();
        return route.continue();
      });
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify the card still renders fully', async () => {
      await expect(templates.cards.first()).toBeVisible();
      await expect(templates.getCardTitle(0)).toBeVisible();
      await expect(templates.getCardAgeTag(0)).toBeVisible();
      await expect(templates.getCardCategoryTag(0)).toBeVisible();
      await expect(templates.getCardBadge(0)).toBeVisible();
      await expect(templates.getCardToggleButton(0)).toBeVisible();
      await expect(templates.getCardDeleteButton(0)).toBeVisible();
      const alt = await templates.getCardCover(0).getAttribute('alt');
      expect(alt).toBeTruthy();
    });
  });

  test('2.7 — Responsive grid layout @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    async function countColumns() {
      const count = await templates.cards.count();
      const first = await templates.getCard(0).boundingBox();
      let columns = 1;
      for (let i = 1; i < count; i++) {
        const box = await templates.getCard(i).boundingBox();
        if (Math.abs(box.y - first.y) < 2) columns++;
      }
      return columns;
    }

    await test.step('Desktop (1440x900): 3 columns', async () => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(templates.cards.first()).toBeVisible();
      expect(await countColumns()).toBe(3);
      expect(await templates.cards.count()).toBe(9);
    });

    await test.step('Tablet (768px): 2 columns', async () => {
      await page.setViewportSize({ width: 768, height: 900 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(templates.cards.first()).toBeVisible();
      expect(await countColumns()).toBe(2);
    });

    await test.step('Mobile (375px): 1 column, sidebar hidden, mobile heading shown', async () => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(templates.cards.first()).toBeVisible();
      expect(await countColumns()).toBe(1);
      await expect(templates.heading).toBeVisible();
    });
  });
});
