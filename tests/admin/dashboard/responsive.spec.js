import { test, expect } from '../../../src/fixtures/base';
import { LoginPage } from '../../../src/pages/LoginPage';
import { DashboardPage } from '../../../src/pages/DashboardPage';
import { BASE_URL } from '../../../src/utils/config';
import users from '../../data/users.json' with { type: 'json' };

async function loginToDashboard(page, viewport) {
  if (viewport) await page.setViewportSize(viewport);
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.admin.email, users.admin.password);
  await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  await page.waitForLoadState('networkidle');
}

test.describe('Admin Dashboard — responsive behavior', () => {
  test('11.1 — Desktop layout (1440×900) @smoke', async ({ page }) => {
    await loginToDashboard(page, { width: 1440, height: 900 });

    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible();

    const summaryCards = page.locator('article');
    const cardCount = await summaryCards.count();
    expect(cardCount).toBe(4);

    await expect(page.getByText('Weekly Revenue Trend')).toBeVisible();
    await expect(page.getByText('Order this week')).toBeVisible();
    await expect(page.getByText('AI Generation Status')).toBeVisible();
    await expect(page.getByText('Recent Orders')).toBeVisible();
  });

  test('11.2 — Tablet layout (768×1024) @regression', async ({ page }) => {
    await loginToDashboard(page, { width: 768, height: 1024 });

    const summaryCards = page.locator('article');
    const cardCount = await summaryCards.count();
    expect(cardCount).toBe(4);

    await expect(page.getByText('Weekly Revenue Trend')).toBeVisible();
    await expect(page.getByText('Order this week')).toBeVisible();
  });

  test('11.3 — Mobile layout (375×812) @regression', async ({ page }) => {
    await loginToDashboard(page, { width: 375, height: 812 });

    const sidebar = page.locator('aside').first();
    const sidebarVisible = await sidebar.isVisible();
    if (!sidebarVisible) {
      const openMenu = page.getByRole('button', { name: /open menu/i });
      await expect(openMenu).toBeVisible();
    }

    const summaryCards = page.locator('article');
    const cardCount = await summaryCards.count();
    expect(cardCount).toBe(4);

    await expect(page.getByText('Weekly Revenue Trend')).toBeVisible();
    await expect(page.getByText('Order this week')).toBeVisible();
  });
});
