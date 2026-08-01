import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { TemplatesPage, ageVersionMap } from '../../../src/pages/TemplatesPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

test.describe('Template Management — visibility toggle (show/hide)', () => {
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

  async function interceptVisibilityFlow(page, target) {
    const patchBodies = [];
    let lastPatch = null;

    await page.route(`**/story-templates/${target._id}/visibility`, async route => {
      if (route.request().method() === 'PATCH') {
        const body = route.request().postDataJSON();
        lastPatch = body;
        patchBodies.push(body);
        const message = body.isActive ? 'Template is now visible.' : 'Template hidden from guests.';
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: { ...target, isActive: body.isActive }, status: 200, message }),
        });
      } else {
        await route.continue();
      }
    });

    await page.route('**/story-templates/admin/all**', async route => {
      const response = await route.fetch();
      const body = await response.json();
      const item = body.data && body.data.items && body.data.items.find(it => it._id === target._id);
      if (item && lastPatch) item.isActive = lastPatch.isActive;
      await route.fulfill({ response, body: JSON.stringify(body) });
    });

    return patchBodies;
  }

  test('7.1 — "Show" flow opens a dialog and cancel does not change visibility @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const hiddenPromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false'
    );
    await templates.selectVisibility('Hidden');
    const hiddenResponse = await hiddenPromise;
    const items = (await hiddenResponse.json()).data.items;
    expect(items.length).toBeGreaterThan(0);

    const target = items[0];
    const ageTag = ageVersionMap[target.ageVersion];
    const patches = [];
    page.on('request', req => {
      if (req.method() === 'PATCH' && req.url().includes('/story-templates/')) patches.push(req.url());
    });

    await test.step('Click "Show" on the hidden card and verify the dialog', async () => {
      await templates.cardByName(target.name, ageTag).getByRole('button', { name: `Show ${target.name}` }).click();
      const dialog = templates.getDialog('Make visible?');
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText('Guests will be able to select this template again in the story wizard.');
      await expect(templates.getDialogButton('Make visible?', 'No, Cancel')).toBeVisible();
      await expect(templates.getDialogButton('Make visible?', 'Yes, Show')).toBeVisible();
    });

    await test.step('Click "No, Cancel" and verify no change', async () => {
      await templates.cancelDialog('Make visible?');
      await expect(templates.getDialog('Make visible?')).not.toBeVisible();
      expect(patches.length).toBe(0);
      await expect(templates.cardByName(target.name, ageTag).getByText('Hidden', { exact: true })).toBeVisible();
    });
  });

  test('7.2 — Confirming "Show" updates visibility and is restored @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const hiddenPromise = page.waitForResponse(r =>
      isListUrl(r.url()) && new URL(r.url()).searchParams.get('isActive') === 'false'
    );
    await templates.selectVisibility('Hidden');
    const hiddenResponse = await hiddenPromise;
    const items = (await hiddenResponse.json()).data.items;
    expect(items.length).toBeGreaterThan(0);

    const target = items[0];
    const ageTag = ageVersionMap[target.ageVersion];
    const card = templates.cardByName(target.name, ageTag);
    const patchBodies = await interceptVisibilityFlow(page, target);

    await test.step('Confirm "Yes, Show"', async () => {
      await card.getByRole('button', { name: `Show ${target.name}` }).click();
      await templates.confirmDialog('Make visible?', 'Yes, Show');
    });

    await test.step('Verify the PATCH body and toast', async () => {
      await expect.poll(() => patchBodies.length).toBe(1);
      expect(patchBodies[0].isActive).toBe(true);
      await expect(page.getByRole('status').filter({ hasText: 'now visible' })).toBeVisible();
    });

    await test.step('Verify the card badge and toggle update', async () => {
      await expect(card.getByText('Visible', { exact: true })).toBeVisible();
      await expect(card.getByRole('button', { name: `Hide ${target.name}` })).toBeVisible();
    });

    await test.step('Restore by hiding the template again', async () => {
      await card.getByRole('button', { name: `Hide ${target.name}` }).click();
      await templates.confirmDialog('Hide from guests?', 'Yes, Hide');
      await expect.poll(() => patchBodies.length).toBe(2);
      expect(patchBodies[1].isActive).toBe(false);
      await expect(page.getByRole('status').filter({ hasText: 'hidden from guests' })).toBeVisible();
      await expect(card.getByText('Hidden', { exact: true })).toBeVisible();
    });
  });

  test('7.3 — "Hide" flow makes a visible template hidden and is restored @smoke @critical', async ({ page }) => {
    const templates = new TemplatesPage(page);

    const pageOnePromise = page.waitForResponse(r => isListUrl(r.url()));
    await page.reload();
    const pageOne = await (await pageOnePromise).json();
    const target = pageOne.data.items.find(it => it.isActive);
    expect(target).toBeTruthy();

    const ageTag = ageVersionMap[target.ageVersion];
    const card = templates.cardByName(target.name, ageTag);
    const patchBodies = await interceptVisibilityFlow(page, target);

    await test.step('Open the "Hide from guests?" dialog and verify contents', async () => {
      await card.getByRole('button', { name: `Hide ${target.name}` }).click();
      const dialog = templates.getDialog('Hide from guests?');
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText('The template stays in admin but will no longer appear in the guest theme picker.');
      await expect(templates.getDialogButton('Hide from guests?', 'Yes, Hide')).toBeVisible();
    });

    await test.step('Confirm "Yes, Hide"', async () => {
      await templates.confirmDialog('Hide from guests?', 'Yes, Hide');
      await expect.poll(() => patchBodies.length).toBe(1);
      expect(patchBodies[0].isActive).toBe(false);
      await expect(page.getByRole('status').filter({ hasText: 'hidden from guests' })).toBeVisible();
    });

    await test.step('Verify the card badge and toggle update', async () => {
      await expect(card.getByText('Hidden', { exact: true })).toBeVisible();
      await expect(card.getByRole('button', { name: `Show ${target.name}` })).toBeVisible();
    });

    await test.step('Restore by showing the template again', async () => {
      await card.getByRole('button', { name: `Show ${target.name}` }).click();
      await templates.confirmDialog('Make visible?', 'Yes, Show');
      await expect.poll(() => patchBodies.length).toBe(2);
      expect(patchBodies[1].isActive).toBe(true);
      await expect(page.getByRole('status').filter({ hasText: 'now visible' })).toBeVisible();
      await expect(card.getByText('Visible', { exact: true })).toBeVisible();
    });
  });

  test('7.4 — Dialog close paths: cancel, backdrop, Escape @regression', async ({ page }) => {
    const templates = new TemplatesPage(page);
    const patches = [];
    page.on('request', req => {
      if (req.method() === 'PATCH' && req.url().includes('/story-templates/')) patches.push(req.url());
    });

    const pageOnePromise = page.waitForResponse(r => isListUrl(r.url()));
    await page.reload();
    const pageOne = await (await pageOnePromise).json();
    const target = pageOne.data.items.find(it => it.isActive);
    expect(target).toBeTruthy();
    const card = templates.cardByName(target.name, ageVersionMap[target.ageVersion]);

    async function openDialog() {
      await card.getByRole('button', { name: `Hide ${target.name}` }).click();
      await expect(templates.getDialog('Hide from guests?')).toBeVisible();
    }

    await test.step('Close via "No, Cancel"', async () => {
      await openDialog();
      await templates.cancelDialog('Hide from guests?');
      await expect(templates.getDialog('Hide from guests?')).not.toBeVisible();
      expect(patches.length).toBe(0);
    });

    await test.step('Close via backdrop edge click', async () => {
      await openDialog();
      await page.mouse.click(15, 15);
      await expect(templates.getDialog('Hide from guests?')).not.toBeVisible();
      expect(patches.length).toBe(0);
    });

    await test.step('Escape does not close the dialog (documented behaviour)', async () => {
      await openDialog();
      await page.keyboard.press('Escape');
      await expect(templates.getDialog('Hide from guests?')).toBeVisible();
    });

    await test.step('Close via "No, Cancel" and verify no PATCH fired', async () => {
      await templates.cancelDialog('Hide from guests?');
      await expect(templates.getDialog('Hide from guests?')).not.toBeVisible();
      expect(patches.length).toBe(0);
    });
  });
});
