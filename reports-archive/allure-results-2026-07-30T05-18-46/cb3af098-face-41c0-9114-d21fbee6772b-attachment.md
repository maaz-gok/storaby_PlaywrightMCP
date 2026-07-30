# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin/Monitor-Orders/search.spec.js >> Order Management — search >> 3.4 — Search by customer name returns filtered results @smoke @critical
- Location: tests/admin/Monitor-Orders/search.spec.js:80:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "usman"
Received string:    "st-8rca alex the glowing envelope £29.99 29 jul 2026 printing "
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - complementary [ref=e6]:
    - generic [ref=e7]:
      - img "Storaby" [ref=e8]
      - button "Collapse sidebar" [ref=e9]:
        - img [ref=e10]
    - navigation "Admin" [ref=e12]:
      - link "Dashboard" [ref=e13] [cursor=pointer]:
        - /url: /admin/dashboard
        - img [ref=e14]
        - generic [ref=e19]: Dashboard
      - link "Monitor Orders" [ref=e20] [cursor=pointer]:
        - /url: /admin/orders
        - img [ref=e21]
        - generic [ref=e25]: Monitor Orders
      - link "Templates" [ref=e26] [cursor=pointer]:
        - /url: /admin/templates
        - img [ref=e27]
        - generic [ref=e29]: Templates
  - generic [ref=e30]:
    - banner [ref=e32]:
      - generic [ref=e33]:
        - heading "Order Management" [level=1] [ref=e35]
        - button "admin admin usman+admin@geeksofkolachi.com" [ref=e38]:
          - img "admin" [ref=e39]
          - generic [ref=e40]:
            - generic [ref=e41]: admin
            - generic [ref=e42]: usman+admin@geeksofkolachi.com
          - img [ref=e43]
    - main [ref=e45]:
      - generic [ref=e46]:
        - generic [ref=e47]:
          - generic [ref=e48]:
            - img
            - searchbox [active] [ref=e49]: usman
          - button "Statuses" [ref=e52]:
            - generic [ref=e53]: Statuses
            - img [ref=e54]
        - table [ref=e59]:
          - rowgroup [ref=e60]:
            - row "Order Number Customer Story Transaction Transaction Date Order Status Action" [ref=e61]:
              - columnheader "Order Number" [ref=e62]
              - columnheader "Customer" [ref=e63]
              - columnheader "Story" [ref=e64]
              - columnheader "Transaction" [ref=e65]
              - columnheader "Transaction Date" [ref=e66]
              - columnheader "Order Status" [ref=e67]
              - columnheader "Action" [ref=e68]
          - rowgroup [ref=e69]:
            - row "ST-8RCA Alex The Glowing Envelope £29.99 29 Jul 2026 Printing View order ST-8RCA" [ref=e70]:
              - cell "ST-8RCA" [ref=e71]
              - cell "Alex" [ref=e72]
              - cell "The Glowing Envelope" [ref=e73]
              - cell "£29.99" [ref=e74]
              - cell "29 Jul 2026" [ref=e75]
              - cell "Printing" [ref=e76]:
                - generic [ref=e77]:
                  - img [ref=e78]
                  - text: Printing
              - cell "View order ST-8RCA" [ref=e82]:
                - button "View order ST-8RCA" [ref=e83]:
                  - img [ref=e84]
            - row "ST-RQYD usman The Glowing Gold Envelope £29.99 29 Jul 2026 Printing View order ST-RQYD" [ref=e87]:
              - cell "ST-RQYD" [ref=e88]
              - cell "usman" [ref=e89]
              - cell "The Glowing Gold Envelope" [ref=e90]
              - cell "£29.99" [ref=e91]
              - cell "29 Jul 2026" [ref=e92]
              - cell "Printing" [ref=e93]:
                - generic [ref=e94]:
                  - img [ref=e95]
                  - text: Printing
              - cell "View order ST-RQYD" [ref=e99]:
                - button "View order ST-RQYD" [ref=e100]:
                  - img [ref=e101]
            - row "ST-RLDE usman The Glowing Gift £29.99 29 Jul 2026 Printing View order ST-RLDE" [ref=e104]:
              - cell "ST-RLDE" [ref=e105]
              - cell "usman" [ref=e106]
              - cell "The Glowing Gift" [ref=e107]
              - cell "£29.99" [ref=e108]
              - cell "29 Jul 2026" [ref=e109]
              - cell "Printing" [ref=e110]:
                - generic [ref=e111]:
                  - img [ref=e112]
                  - text: Printing
              - cell "View order ST-RLDE" [ref=e116]:
                - button "View order ST-RLDE" [ref=e117]:
                  - img [ref=e118]
            - row "ST-WRPQ John Doe Cardboard Wings £29.99 29 Jul 2026 Printing View order ST-WRPQ" [ref=e121]:
              - cell "ST-WRPQ" [ref=e122]
              - cell "John Doe" [ref=e123]
              - cell "Cardboard Wings" [ref=e124]
              - cell "£29.99" [ref=e125]
              - cell "29 Jul 2026" [ref=e126]
              - cell "Printing" [ref=e127]:
                - generic [ref=e128]:
                  - img [ref=e129]
                  - text: Printing
              - cell "View order ST-WRPQ" [ref=e133]:
                - button "View order ST-WRPQ" [ref=e134]:
                  - img [ref=e135]
            - row "ST-UBWD Usman The Whispering Gate £29.99 29 Jul 2026 Printing View order ST-UBWD" [ref=e138]:
              - cell "ST-UBWD" [ref=e139]
              - cell "Usman" [ref=e140]
              - cell "The Whispering Gate" [ref=e141]
              - cell "£29.99" [ref=e142]
              - cell "29 Jul 2026" [ref=e143]
              - cell "Printing" [ref=e144]:
                - generic [ref=e145]:
                  - img [ref=e146]
                  - text: Printing
              - cell "View order ST-UBWD" [ref=e150]:
                - button "View order ST-UBWD" [ref=e151]:
                  - img [ref=e152]
            - row "ST-MF03 Usman Azhar The Tiny Door £29.99 29 Jul 2026 Printing View order ST-MF03" [ref=e155]:
              - cell "ST-MF03" [ref=e156]
              - cell "Usman Azhar" [ref=e157]
              - cell "The Tiny Door" [ref=e158]
              - cell "£29.99" [ref=e159]
              - cell "29 Jul 2026" [ref=e160]
              - cell "Printing" [ref=e161]:
                - generic [ref=e162]:
                  - img [ref=e163]
                  - text: Printing
              - cell "View order ST-MF03" [ref=e167]:
                - button "View order ST-MF03" [ref=e168]:
                  - img [ref=e169]
            - row "ST-NLKB usman Zookeeper Osman £29.99 29 Jul 2026 Printing View order ST-NLKB" [ref=e172]:
              - cell "ST-NLKB" [ref=e173]
              - cell "usman" [ref=e174]
              - cell "Zookeeper Osman" [ref=e175]
              - cell "£29.99" [ref=e176]
              - cell "29 Jul 2026" [ref=e177]
              - cell "Printing" [ref=e178]:
                - generic [ref=e179]:
                  - img [ref=e180]
                  - text: Printing
              - cell "View order ST-NLKB" [ref=e184]:
                - button "View order ST-NLKB" [ref=e185]:
                  - img [ref=e186]
            - row "ST-5773 usman Brand New Backpack £29.99 29 Jul 2026 Printing View order ST-5773" [ref=e189]:
              - cell "ST-5773" [ref=e190]
              - cell "usman" [ref=e191]
              - cell "Brand New Backpack" [ref=e192]
              - cell "£29.99" [ref=e193]
              - cell "29 Jul 2026" [ref=e194]
              - cell "Printing" [ref=e195]:
                - generic [ref=e196]:
                  - img [ref=e197]
                  - text: Printing
              - cell "View order ST-5773" [ref=e201]:
                - button "View order ST-5773" [ref=e202]:
                  - img [ref=e203]
            - row "ST-2NUV usman The Tiny Door £29.99 29 Jul 2026 Printing View order ST-2NUV" [ref=e206]:
              - cell "ST-2NUV" [ref=e207]
              - cell "usman" [ref=e208]
              - cell "The Tiny Door" [ref=e209]
              - cell "£29.99" [ref=e210]
              - cell "29 Jul 2026" [ref=e211]
              - cell "Printing" [ref=e212]:
                - generic [ref=e213]:
                  - img [ref=e214]
                  - text: Printing
              - cell "View order ST-2NUV" [ref=e218]:
                - button "View order ST-2NUV" [ref=e219]:
                  - img [ref=e220]
            - row "ST-RYKB Usman The Tiny Door £29.99 29 Jul 2026 Printing View order ST-RYKB" [ref=e223]:
              - cell "ST-RYKB" [ref=e224]
              - cell "Usman" [ref=e225]
              - cell "The Tiny Door" [ref=e226]
              - cell "£29.99" [ref=e227]
              - cell "29 Jul 2026" [ref=e228]
              - cell "Printing" [ref=e229]:
                - generic [ref=e230]:
                  - img [ref=e231]
                  - text: Printing
              - cell "View order ST-RYKB" [ref=e235]:
                - button "View order ST-RYKB" [ref=e236]:
                  - img [ref=e237]
        - generic [ref=e240]:
          - paragraph [ref=e241]: 1-10 of 46
          - generic [ref=e242]:
            - button "First page" [disabled] [ref=e243]:
              - img [ref=e244]
            - button "Previous page" [disabled] [ref=e247]:
              - img [ref=e248]
            - button "Next page" [ref=e250]:
              - img [ref=e251]
            - button "Last page" [ref=e253]:
              - img [ref=e254]
```

# Test source

```ts
  1   | import { test, expect } from '../../../src/fixtures/base';
  2   | import { LoginPage } from '../../../src/pages/LoginPage';
  3   | import { DashboardPage } from '../../../src/pages/DashboardPage';
  4   | import { OrdersPage } from '../../../src/pages/OrdersPage';
  5   | import { BASE_URL } from '../../../src/utils/config';
  6   | import users from '../../data/users.json' with { type: 'json' };
  7   | 
  8   | test.describe('Order Management — search', () => {
  9   |   test.beforeEach(async ({ page }) => {
  10  |     const login = new LoginPage(page);
  11  |     const dashboard = new DashboardPage(page);
  12  |     await login.goto();
  13  |     await login.login(users.admin.email, users.admin.password);
  14  |     await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  15  |     await dashboard.monitorOrdersNavLink.click();
  16  |     await page.waitForURL(`${BASE_URL}/admin/orders`);
  17  |     await page.waitForLoadState('networkidle');
  18  |   });
  19  | 
  20  |   test('3.1 — Search input renders with correct placeholder @smoke', async ({ page }) => {
  21  |     const orders = new OrdersPage(page);
  22  | 
  23  |     await test.step('Verify search input attributes', async () => {
  24  |       await expect(orders.searchInput).toBeVisible();
  25  |       await expect(orders.searchInput).toHaveAttribute('placeholder', 'Search anything...');
  26  |       await expect(orders.searchInput).toHaveAttribute('type', 'search');
  27  |     });
  28  |   });
  29  | 
  30  |   test('3.2 — Search is debounced and fires API request after pause @smoke @critical', async ({ page }) => {
  31  |     const orders = new OrdersPage(page);
  32  |     const requests = [];
  33  | 
  34  |     page.on('request', req => {
  35  |       if (req.url().includes('/admin/orders') && req.method() === 'GET') {
  36  |         requests.push(req.url());
  37  |       }
  38  |     });
  39  | 
  40  |     await test.step('Type search query character by character', async () => {
  41  |       await orders.searchInput.fill('S');
  42  |       await page.waitForTimeout(200);
  43  |       await orders.searchInput.fill('ST');
  44  |       await page.waitForTimeout(200);
  45  |       await orders.searchInput.fill('ST-');
  46  |       await page.waitForTimeout(200);
  47  |       await orders.searchInput.fill('ST-8');
  48  |       await page.waitForTimeout(2000);
  49  |     });
  50  | 
  51  |     await test.step('Verify only one request fired after debounce', async () => {
  52  |       const searchRequests = requests.filter(u => u.includes('search='));
  53  |       expect(searchRequests.length).toBe(1);
  54  |       expect(searchRequests[0]).toContain('search=ST-8');
  55  |     });
  56  |   });
  57  | 
  58  |   test('3.3 — Search by order number prefix returns matching orders @smoke @critical', async ({ page }) => {
  59  |     const orders = new OrdersPage(page);
  60  | 
  61  |     const responsePromise = page.waitForResponse(r =>
  62  |       r.url().includes('/admin/orders') && r.url().includes('search=ST-8')
  63  |     );
  64  | 
  65  |     await test.step('Search for order prefix "ST-8"', async () => {
  66  |       await orders.search('ST-8');
  67  |       await responsePromise;
  68  |     });
  69  | 
  70  |     await test.step('Verify all returned order numbers start with "ST-8"', async () => {
  71  |       const count = await orders.getRowCount();
  72  |       expect(count).toBeGreaterThan(0);
  73  |       for (let i = 0; i < count; i++) {
  74  |         const cells = await orders.getRowCells(i);
  75  |         expect(cells[0]).toMatch(/^ST-8/);
  76  |       }
  77  |     });
  78  |   });
  79  | 
  80  |   test('3.4 — Search by customer name returns filtered results @smoke @critical', async ({ page }) => {
  81  |     const orders = new OrdersPage(page);
  82  | 
  83  |     const responsePromise = page.waitForResponse(r =>
  84  |       r.url().includes('/admin/orders') && r.url().includes('search=usman')
  85  |     );
  86  | 
  87  |     await test.step('Search for "usman"', async () => {
  88  |       await orders.search('usman');
  89  |       await responsePromise;
  90  |     });
  91  | 
  92  |     await test.step('Verify all rows contain "usman" in at least one field', async () => {
  93  |       const count = await orders.getRowCount();
  94  |       expect(count).toBeGreaterThan(0);
  95  |       for (let i = 0; i < count; i++) {
  96  |         const cells = await orders.getRowCells(i);
  97  |         const rowText = cells.join(' ').toLowerCase();
> 98  |         expect(rowText).toContain('usman');
      |                         ^ Error: expect(received).toContain(expected) // indexOf
  99  |       }
  100 |     });
  101 |   });
  102 | 
  103 |   test('3.5 — Search with leading/trailing spaces @regression', async ({ page }) => {
  104 |     const orders = new OrdersPage(page);
  105 | 
  106 |     const responsePromise = page.waitForResponse(r =>
  107 |       r.url().includes('/admin/orders') && r.url().includes('search=')
  108 |     );
  109 | 
  110 |     await test.step('Search with spaces around query', async () => {
  111 |       await orders.search('  usman  ');
  112 |       await responsePromise;
  113 |     });
  114 | 
  115 |     await test.step('Verify results match "usman" without spaces', async () => {
  116 |       const count = await orders.getRowCount();
  117 |       if (count > 0 && (await orders.emptyStateRow.isVisible()) === false) {
  118 |         for (let i = 0; i < count; i++) {
  119 |           const cells = await orders.getRowCells(i);
  120 |           const rowText = cells.join(' ').toLowerCase();
  121 |           expect(rowText).toContain('usman');
  122 |         }
  123 |       }
  124 |     });
  125 |   });
  126 | 
  127 |   test('3.6 — Search with special characters @regression', async ({ page }) => {
  128 |     const orders = new OrdersPage(page);
  129 | 
  130 |     await test.step('Search with special characters', async () => {
  131 |       await orders.search('@#$');
  132 |       await page.waitForTimeout(2000);
  133 |     });
  134 | 
  135 |     await test.step('Verify no console errors and valid empty state', async () => {
  136 |       const count = await orders.getRowCount();
  137 |       if (count === 1) {
  138 |         const text = await orders.tableRows.first().allTextContents();
  139 |         expect(text.join('')).toContain('No orders found');
  140 |       }
  141 |     });
  142 |   });
  143 | 
  144 |   test('3.7 — Search with numeric values @regression', async ({ page }) => {
  145 |     const orders = new OrdersPage(page);
  146 | 
  147 |     await test.step('Search with numbers', async () => {
  148 |       await orders.search('123');
  149 |       await page.waitForTimeout(2000);
  150 |     });
  151 | 
  152 |     await test.step('Verify search executed without errors', async () => {
  153 |       const count = await orders.getRowCount();
  154 |       expect(count).toBeGreaterThanOrEqual(0);
  155 |     });
  156 |   });
  157 | 
  158 |   test('3.8 — Clear search restores full list @smoke', async ({ page }) => {
  159 |     const orders = new OrdersPage(page);
  160 | 
  161 |     await test.step('Apply a search and verify filtered', async () => {
  162 |       await orders.search('usman');
  163 |       await page.waitForTimeout(2000);
  164 |       const filteredCount = await orders.getRowCount();
  165 |       expect(filteredCount).toBeGreaterThan(0);
  166 |     });
  167 | 
  168 |     await test.step('Clear search and verify full list restored', async () => {
  169 |       await orders.clearSearch();
  170 |       await page.waitForTimeout(2000);
  171 |       const restoredCount = await orders.getRowCount();
  172 |       expect(restoredCount).toBe(10);
  173 |     });
  174 |   });
  175 | 
  176 |   test('3.9 — Search and status filter combination @regression', async ({ page }) => {
  177 |     const orders = new OrdersPage(page);
  178 | 
  179 |     const responsePromise = page.waitForResponse(r =>
  180 |       r.url().includes('/admin/orders') && r.url().includes('status=') && r.url().includes('search=')
  181 |     );
  182 | 
  183 |     await test.step('Select a status filter and type a search query', async () => {
  184 |       await orders.selectStatusFilter('Printing');
  185 |       await page.waitForTimeout(1000);
  186 |       await orders.search('usman');
  187 |       await responsePromise;
  188 |     });
  189 | 
  190 |     await test.step('Verify results match both criteria', async () => {
  191 |       const count = await orders.getRowCount();
  192 |       expect(count).toBeGreaterThan(0);
  193 |       for (let i = 0; i < count; i++) {
  194 |         const cells = await orders.getRowCells(i);
  195 |         expect(cells[5]).toBe('Printing');
  196 |         const rowText = cells.join(' ').toLowerCase();
  197 |         expect(rowText).toContain('usman');
  198 |       }
```