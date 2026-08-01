import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — delete template', () => {
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

  test('8.1 — Delete button opens a confirmation dialog @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const target = body.data.items[0];

    await test.step('Click delete on the first card', async () => {
      await templates.getCardDeleteButton(0).click();
      const dialog = templates.getDialog('Delete this template?');
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText('This removes this age version from the catalogue. This action cannot be undone from the admin panel.');
      await expect(templates.getDialogButton('Delete this template?', 'No, Cancel')).toBeVisible();
      await expect(templates.getDialogButton('Delete this template?', 'Yes, Delete')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Close dialog backdrop' })).toBeVisible();
      expect(target.name).toBeTruthy();
    });
  });

  test('8.2 — Cancel delete keeps the template @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const target = body.data.items[0];
    const deletes = [];
    page.on('request', req => {
      if (req.method() === 'DELETE' && req.url().includes('/story-templates/')) deletes.push(req.url());
    });

    await test.step('Open the delete dialog and cancel', async () => {
      await templates.getCardDeleteButton(0).click();
      await expect(templates.getDialog('Delete this template?')).toBeVisible();
      await templates.cancelDialog('Delete this template?');
      await expect(templates.getDialog('Delete this template?')).not.toBeVisible();
      expect(deletes.length).toBe(0);
      await expect(templates.getCardTitle(0)).toHaveText(target.name);
      await expect(templates.paginationText).toContainText(`of ${body.data.total}`);
    });
  });

  test('8.3 — Backdrop click closes the delete dialog without deleting @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const deletes = [];
    page.on('request', req => {
      if (req.method() === 'DELETE' && req.url().includes('/story-templates/')) deletes.push(req.url());
    });

    await test.step('Open the delete dialog and click the backdrop edge', async () => {
      await templates.getCardDeleteButton(0).click();
      await expect(templates.getDialog('Delete this template?')).toBeVisible();
      await page.mouse.click(15, 15);
      await expect(templates.getDialog('Delete this template?')).not.toBeVisible();
      expect(deletes.length).toBe(0);
      await expect(templates.cards).toHaveCount(body.data.items.length);
    });
  });

  test('8.4 — Confirm delete removes the template (route-intercepted) @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const { items, total } = body.data;
    const target = items[0];
    const deleteRequests = [];
    page.on('request', req => {
      if (req.method() === 'DELETE' && req.url().includes('/story-templates/')) deleteRequests.push(req.url());
    });

    let deleted = false;
    await page.route('**/story-templates/*', async route => {
      if (route.request().method() === 'DELETE') {
        deleted = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: null, status: 200, message: 'Story template deleted successfully.' }),
        });
      } else {
        await route.continue();
      }
    });

    await page.route('**/story-templates/admin/all**', async route => {
      const response = await route.fetch();
      const listBody = await response.json();
      if (deleted && listBody.data) {
        listBody.data.items = listBody.data.items.filter(it => it._id !== target._id);
        listBody.data.total = Math.max(0, total - 1);
        listBody.data.totalPages = Math.ceil(listBody.data.total / 9);
      }
      await route.fulfill({ response, body: JSON.stringify(listBody) });
    });

    await test.step('Confirm the delete', async () => {
      await templates.getCardDeleteButton(0).click();
      await templates.confirmDialog('Delete this template?', 'Yes, Delete');
      await expect.poll(() => deleteRequests.length).toBe(1);
      expect(deleteRequests[0]).toContain(`/story-templates/${target._id}`);
    });

    await test.step('Verify the toast', async () => {
      await expect(page.getByRole('status').filter({ hasText: 'Template deleted' })).toBeVisible();
    });

    await test.step('Verify the card is removed and the grid re-renders', async () => {
      await expect(templates.cards).toHaveCount(items.length - 1);
      if (items.length > 1) {
        await expect(templates.getCardTitle(0)).toHaveText(items[1].name);
      }
      await expect(templates.paginationText).toContainText(`of ${total - 1}`);
    });
  });

  test('8.5 — Simulated deletion does not persist after reload (real data safe) @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const { items, total } = body.data;
    const target = items[0];

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
    await page.route('**/story-templates/admin/all**', async route => {
      const response = await route.fetch();
      const listBody = await response.json();
      if (listBody.data) {
        listBody.data.items = listBody.data.items.filter(it => it._id !== target._id);
        listBody.data.total = Math.max(0, total - 1);
        listBody.data.totalPages = Math.ceil(listBody.data.total / 9);
      }
      await route.fulfill({ response, body: JSON.stringify(listBody) });
    });

    await test.step('Confirm a delete against the simulated response', async () => {
      await templates.getCardDeleteButton(0).click();
      await templates.confirmDialog('Delete this template?', 'Yes, Delete');
      await expect(templates.cards).toHaveCount(items.length - 1);
      await expect(templates.paginationText).toContainText(`of ${total - 1}`);
    });

    await test.step('Reload without interception — the template must reappear', async () => {
      await page.unroute('**/story-templates/*');
      await page.unroute('**/story-templates/admin/all**');
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(templates.cards).toHaveCount(items.length);
      await expect(templates.paginationText).toContainText(`of ${total}`);
    });
  });

  test('8.6 — Delete failure shows an error toast and keeps the template @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const body = await capturePageOne(page);
    const target = body.data.items[0];
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.route('**/story-templates/*', async route => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ status: 500, message: 'Delete failed' }),
        });
      } else {
        await route.continue();
      }
    });

    await test.step('Confirm the delete and expect a failure', async () => {
      await templates.getCardDeleteButton(0).click();
      await templates.confirmDialog('Delete this template?', 'Yes, Delete');
      await expect(page.getByRole('status').filter({ hasText: 'Delete failed' }).first()).toBeVisible();
    });

    await test.step('Verify the card and pagination are unchanged', async () => {
      await expect(templates.getCardTitle(0)).toHaveText(target.name);
      await expect(templates.paginationText).toContainText(`of ${body.data.total}`);
      await expect.poll(() => pageErrors.length).toBe(1);
      expect(pageErrors[0]).toBe('Delete failed');
    });
  });

  test('8.7 — Deleting the last template on a filtered view shows the empty state @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const hiddenPromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false'
    );
    await templates.selectVisibility('Hidden');
    const hiddenResponse = await hiddenPromise;
    const hiddenItems = (await hiddenResponse.json()).data.items;
    expect(hiddenItems.length).toBeGreaterThan(0);
    const target = hiddenItems[0];

    let deleted = false;
    await page.route('**/story-templates/*', async route => {
      if (route.request().method() === 'DELETE') {
        deleted = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: null, status: 200, message: 'Story template deleted successfully.' }),
        });
      } else {
        await route.continue();
      }
    });
    await page.route('**/story-templates/admin/all**', async route => {
      const response = await route.fetch();
      const listBody = await response.json();
      if (deleted && listBody.data) {
        listBody.data.items = [];
        listBody.data.total = 0;
        listBody.data.totalPages = 1;
      }
      await route.fulfill({ response, body: JSON.stringify(listBody) });
    });

    await test.step('Delete the only template in the filtered view', async () => {
      await templates.cardByName(target.name).getByRole('button', { name: `Delete ${target.name}` }).click();
      await templates.confirmDialog('Delete this template?', 'Yes, Delete');
    });

    await test.step('Verify the empty state renders', async () => {
      await expect(templates.emptyState).toBeVisible();
      await expect(templates.paginationText).toHaveText('0-0 of 0');
      await expect(templates.firstPageButton).toBeDisabled();
      await expect(templates.prevPageButton).toBeDisabled();
      await expect(templates.nextPageButton).toBeDisabled();
      await expect(templates.lastPageButton).toBeDisabled();
    });
  });
});
