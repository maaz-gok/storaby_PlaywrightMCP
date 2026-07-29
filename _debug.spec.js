import { test } from './src/fixtures/base';
import { LoginPage } from './src/pages/LoginPage';
import { DashboardPage } from './src/pages/DashboardPage';
import { OrdersPage } from './src/pages/OrdersPage';
import { BASE_URL } from './src/utils/config';
import users from './tests/data/users.json' with { type: 'json' };

test('debug customer field', async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  await login.goto();
  await login.login(users.admin.email, users.admin.password);
  await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  await dashboard.monitorOrdersNavLink.click();
  await page.waitForURL(`${BASE_URL}/admin/orders`);
  await page.waitForLoadState('networkidle');

  const orders = new OrdersPage(page);
  const responsePromise = page.waitForResponse(r =>
    r.url().includes('/admin/orders') && r.url().includes('page=1') && r.url().includes('limit=10') && !r.url().includes('search=') && !r.url().includes('status=')
  );
  await orders.goto();
  const response = await responsePromise;
  const body = await response.json();
  const items = body.data.items;

  console.log('\n=== First item customer structure ===');
  console.log(JSON.stringify({ customer: items[0].customer, customerName: items[0].customerName, keys: Object.keys(items[0]) }, null, 2));

  const cells = await orders.getRowCells(0);
  console.log('Row cells:', JSON.stringify(cells, null, 2));

  if (items.length > 1) {
    console.log('\n=== Second item customer structure ===');
    console.log(JSON.stringify({ customer: items[1].customer, customerName: items[1].customerName }, null, 2));
    const cells2 = await orders.getRowCells(1);
    console.log('Row 2 cells:', JSON.stringify(cells2, null, 2));
  }
});
