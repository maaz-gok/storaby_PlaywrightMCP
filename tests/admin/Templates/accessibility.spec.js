import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — accessibility & keyboard', () => {
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

  test('11.1 — Logical tab order through the main content @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Tab through the filter row and first card', async () => {
      await expect(templates.cards.first()).toBeVisible();
      await templates.searchInput.focus();
      await expect(templates.searchInput).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(templates.ageGroupButton).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(templates.storefrontSectionButton).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(templates.visibilityButton).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(templates.newTemplateButton).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(templates.cards.first()).toBeFocused();
    });
  });

  test('11.2 — Filter dropdown keyboard interaction @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    await test.step('Open the Age Group dropdown with Enter', async () => {
      await templates.ageGroupButton.focus();
      await page.keyboard.press('Enter');
      await expect(page.getByRole('listbox')).toBeVisible();
      await expect(templates.ageGroupButton).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('option', { name: 'All', exact: true })).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Document bug: Arrow keys do not navigate the options', async () => {
      await templates.ageGroupButton.focus();
      await page.keyboard.press('ArrowDown');
      await expect(templates.ageGroupButton).toBeFocused();
    });

    await test.step('Options are reachable via Tab and Enter selects', async () => {
      await page.keyboard.press('Tab'); // All
      await page.keyboard.press('Tab'); // Ages 2–4
      await page.keyboard.press('Tab'); // Ages 4–8
      const listbox = page.getByRole('listbox');
      const optionButton = listbox.getByRole('button', { name: 'Ages 4–8', exact: true });
      await expect(optionButton).toBeFocused();
      const responsePromise = page.waitForResponse(r =>
        isListUrl(r.url()) && new URL(r.url()).searchParams.get('ageVersion') === 'B_4_8'
      );
      await page.keyboard.press('Enter');
      const response = await responsePromise;
      expect(response.status()).toBe(200);
      await expect(page.getByRole('listbox')).not.toBeVisible();
      await expect(templates.ageGroupButton).toContainText('Ages 4–8');
    });

    await test.step('Escape closes the dropdown without selecting', async () => {
      await templates.ageGroupButton.click();
      await expect(page.getByRole('listbox')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('listbox')).not.toBeVisible();
      await expect(templates.ageGroupButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test('11.3 — Dialog keyboard behaviour: focus trap and Escape @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const deletes = [];
    page.on('request', req => {
      if (req.method() === 'DELETE' && req.url().includes('/story-templates/')) deletes.push(req.url());
    });

    await page.route('**/story-templates/*', async route => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: null, status: 200, message: 'Story template deleted successfully.' }),
        });
      } else {
        await route.continue();
      }
    });

    await test.step('Open the delete dialog and verify aria-modal', async () => {
      await templates.getCardDeleteButton(0).click();
      const dialog = templates.getDialog('Delete this template?');
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    await test.step('Document bug: Escape does not close the dialog in the natural flow', async () => {
      await page.keyboard.press('Escape');
      await expect(templates.getDialog('Delete this template?')).toBeVisible();
    });

    await test.step('Document bug: focus is NOT trapped in the dialog', async () => {
      await page.keyboard.press('Tab');
      await expect(templates.getDialog('Delete this template?').locator(':focus')).toHaveCount(0);
    });

    await test.step('Enter activates the focused button to close', async () => {
      await templates.getDialogButton('Delete this template?', 'No, Cancel').focus();
      await page.keyboard.press('Enter');
      await expect(templates.getDialog('Delete this template?')).not.toBeVisible();
      expect(deletes.length).toBe(0);
    });
  });

  test('11.4 — Screen-reader names on key elements @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const target = body.data.items[0];

    await test.step('Verify search input accessible name comes from the placeholder', async () => {
      await expect(templates.searchInput).toHaveAttribute('placeholder', 'Search templates...');
    });

    await test.step('Verify filter buttons expose listbox semantics and names', async () => {
      await expect(templates.ageGroupButton).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(templates.storefrontSectionButton).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(templates.visibilityButton).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(templates.ageGroupButton).toHaveAccessibleName('Age Group');
      await expect(templates.storefrontSectionButton).toHaveAccessibleName('Storefront section');
      await expect(templates.visibilityButton).toHaveAccessibleName('Visibility');
    });

    await test.step('Verify card and action button names', async () => {
      await expect(templates.cards.first()).toHaveAttribute('aria-label', `Edit ${target.name}`);
      await expect(templates.getCardToggleButton(0)).toHaveAccessibleName(`${target.isActive ? 'Hide' : 'Show'} ${target.name}`);
      await expect(templates.getCardDeleteButton(0)).toHaveAccessibleName(`Delete ${target.name}`);
    });

    await test.step('Verify pagination button names', async () => {
      await expect(templates.firstPageButton).toHaveAccessibleName('First page');
      await expect(templates.prevPageButton).toHaveAccessibleName('Previous page');
      await expect(templates.nextPageButton).toHaveAccessibleName('Next page');
      await expect(templates.lastPageButton).toHaveAccessibleName('Last page');
    });

    await test.step('Verify toast exposes role=status with polite live region', async () => {
      await templates.getCardDeleteButton(0).click();
      await templates.confirmDialog('Delete this template?', 'Yes, Delete');
      const toast = page.getByRole('status').filter({ hasText: 'Template deleted' });
      await expect(toast).toBeVisible();
      await expect(toast).toHaveAttribute('aria-live', 'polite');
    });
  });
});
