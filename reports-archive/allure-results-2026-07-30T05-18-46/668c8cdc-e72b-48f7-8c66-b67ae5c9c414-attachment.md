# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: explore-orders.spec.js >> Order Management — Exploration >> explore orders page
- Location: tests/explore-orders.spec.js:7:3

# Error details

```
Error: locator.textContent: Error: strict mode violation: locator('aside a[aria-current="page"]') resolved to 2 elements:
    1) <a aria-current="page" href="/admin/orders" data-discover="true" class="flex h-[50px] items-center gap-3.5 rounded-[10px] px-3 text-sm transition-colors bg-storaby-primary font-medium text-white">…</a> aka getByRole('link', { name: 'Monitor Orders' })
    2) <a aria-current="page" href="/admin/orders" data-discover="true" class="flex h-[50px] items-center gap-3.5 rounded-[10px] px-3 text-sm transition-colors bg-storaby-primary font-medium text-white">…</a> aka locator('a').nth(4)

Call log:
  - waiting for locator('aside a[aria-current="page"]')

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
        - link "Monitor Orders" [active] [ref=e20] [cursor=pointer]:
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
              - searchbox [ref=e49]
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
              - row "ST-8RCA Alex The Glowing Envelope £29.99 29 Jul 2026 Generating Final View order ST-8RCA" [ref=e70]:
                - cell "ST-8RCA" [ref=e71]
                - cell "Alex" [ref=e72]
                - cell "The Glowing Envelope" [ref=e73]
                - cell "£29.99" [ref=e74]
                - cell "29 Jul 2026" [ref=e75]
                - cell "Generating Final" [ref=e76]:
                  - generic [ref=e77]:
                    - img [ref=e78]
                    - text: Generating Final
                - cell "View order ST-8RCA" [ref=e81]:
                  - button "View order ST-8RCA" [ref=e82]:
                    - img [ref=e83]
              - row "ST-RQYD usman The Glowing Gold Envelope £29.99 29 Jul 2026 Submitted To Print View order ST-RQYD" [ref=e86]:
                - cell "ST-RQYD" [ref=e87]
                - cell "usman" [ref=e88]
                - cell "The Glowing Gold Envelope" [ref=e89]
                - cell "£29.99" [ref=e90]
                - cell "29 Jul 2026" [ref=e91]
                - cell "Submitted To Print" [ref=e92]:
                  - generic [ref=e93]:
                    - img [ref=e94]
                    - text: Submitted To Print
                - cell "View order ST-RQYD" [ref=e98]:
                  - button "View order ST-RQYD" [ref=e99]:
                    - img [ref=e100]
              - row "ST-RLDE usman The Glowing Gift £29.99 29 Jul 2026 Printing View order ST-RLDE" [ref=e103]:
                - cell "ST-RLDE" [ref=e104]
                - cell "usman" [ref=e105]
                - cell "The Glowing Gift" [ref=e106]
                - cell "£29.99" [ref=e107]
                - cell "29 Jul 2026" [ref=e108]
                - cell "Printing" [ref=e109]:
                  - generic [ref=e110]:
                    - img [ref=e111]
                    - text: Printing
                - cell "View order ST-RLDE" [ref=e115]:
                  - button "View order ST-RLDE" [ref=e116]:
                    - img [ref=e117]
              - row "ST-WRPQ John Doe Cardboard Wings £29.99 29 Jul 2026 Printing View order ST-WRPQ" [ref=e120]:
                - cell "ST-WRPQ" [ref=e121]
                - cell "John Doe" [ref=e122]
                - cell "Cardboard Wings" [ref=e123]
                - cell "£29.99" [ref=e124]
                - cell "29 Jul 2026" [ref=e125]
                - cell "Printing" [ref=e126]:
                  - generic [ref=e127]:
                    - img [ref=e128]
                    - text: Printing
                - cell "View order ST-WRPQ" [ref=e132]:
                  - button "View order ST-WRPQ" [ref=e133]:
                    - img [ref=e134]
              - row "ST-UBWD Usman The Whispering Gate £29.99 29 Jul 2026 Printing View order ST-UBWD" [ref=e137]:
                - cell "ST-UBWD" [ref=e138]
                - cell "Usman" [ref=e139]
                - cell "The Whispering Gate" [ref=e140]
                - cell "£29.99" [ref=e141]
                - cell "29 Jul 2026" [ref=e142]
                - cell "Printing" [ref=e143]:
                  - generic [ref=e144]:
                    - img [ref=e145]
                    - text: Printing
                - cell "View order ST-UBWD" [ref=e149]:
                  - button "View order ST-UBWD" [ref=e150]:
                    - img [ref=e151]
              - row "ST-MF03 Usman Azhar The Tiny Door £29.99 29 Jul 2026 Printing View order ST-MF03" [ref=e154]:
                - cell "ST-MF03" [ref=e155]
                - cell "Usman Azhar" [ref=e156]
                - cell "The Tiny Door" [ref=e157]
                - cell "£29.99" [ref=e158]
                - cell "29 Jul 2026" [ref=e159]
                - cell "Printing" [ref=e160]:
                  - generic [ref=e161]:
                    - img [ref=e162]
                    - text: Printing
                - cell "View order ST-MF03" [ref=e166]:
                  - button "View order ST-MF03" [ref=e167]:
                    - img [ref=e168]
              - row "ST-NLKB usman Zookeeper Osman £29.99 29 Jul 2026 Printing View order ST-NLKB" [ref=e171]:
                - cell "ST-NLKB" [ref=e172]
                - cell "usman" [ref=e173]
                - cell "Zookeeper Osman" [ref=e174]
                - cell "£29.99" [ref=e175]
                - cell "29 Jul 2026" [ref=e176]
                - cell "Printing" [ref=e177]:
                  - generic [ref=e178]:
                    - img [ref=e179]
                    - text: Printing
                - cell "View order ST-NLKB" [ref=e183]:
                  - button "View order ST-NLKB" [ref=e184]:
                    - img [ref=e185]
              - row "ST-5773 usman Brand New Backpack £29.99 29 Jul 2026 Printing View order ST-5773" [ref=e188]:
                - cell "ST-5773" [ref=e189]
                - cell "usman" [ref=e190]
                - cell "Brand New Backpack" [ref=e191]
                - cell "£29.99" [ref=e192]
                - cell "29 Jul 2026" [ref=e193]
                - cell "Printing" [ref=e194]:
                  - generic [ref=e195]:
                    - img [ref=e196]
                    - text: Printing
                - cell "View order ST-5773" [ref=e200]:
                  - button "View order ST-5773" [ref=e201]:
                    - img [ref=e202]
              - row "ST-2NUV usman The Tiny Door £29.99 29 Jul 2026 Printing View order ST-2NUV" [ref=e205]:
                - cell "ST-2NUV" [ref=e206]
                - cell "usman" [ref=e207]
                - cell "The Tiny Door" [ref=e208]
                - cell "£29.99" [ref=e209]
                - cell "29 Jul 2026" [ref=e210]
                - cell "Printing" [ref=e211]:
                  - generic [ref=e212]:
                    - img [ref=e213]
                    - text: Printing
                - cell "View order ST-2NUV" [ref=e217]:
                  - button "View order ST-2NUV" [ref=e218]:
                    - img [ref=e219]
              - row "ST-RYKB Usman The Tiny Door £29.99 29 Jul 2026 Printing View order ST-RYKB" [ref=e222]:
                - cell "ST-RYKB" [ref=e223]
                - cell "Usman" [ref=e224]
                - cell "The Tiny Door" [ref=e225]
                - cell "£29.99" [ref=e226]
                - cell "29 Jul 2026" [ref=e227]
                - cell "Printing" [ref=e228]:
                  - generic [ref=e229]:
                    - img [ref=e230]
                    - text: Printing
                - cell "View order ST-RYKB" [ref=e234]:
                  - button "View order ST-RYKB" [ref=e235]:
                    - img [ref=e236]
          - generic [ref=e239]:
            - paragraph [ref=e240]: 1-10 of 85
            - generic [ref=e241]:
              - button "First page" [disabled] [ref=e242]:
                - img [ref=e243]
              - button "Previous page" [disabled] [ref=e246]:
                - img [ref=e247]
              - button "Next page" [ref=e249]:
                - img [ref=e250]
              - button "Last page" [ref=e252]:
                - img [ref=e253]
  - generic [ref=e256]: 0%
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL = 'https://staging.storaby.com';
  4   | const API_BASE_URL = 'https://api.staging.storaby.com';
  5   | 
  6   | test.describe('Order Management — Exploration', () => {
  7   |   test('explore orders page', async ({ page }) => {
  8   |     await page.goto(`${BASE_URL}/admin/login`);
  9   |     await page.getByLabel('Email', { exact: true }).fill('usman+admin@geeksofkolachi.com');
  10  |     await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Admin@123');
  11  |     await page.getByRole('button', { name: 'Login', exact: true }).click();
  12  |     await page.waitForURL('**/admin/dashboard');
  13  |     await page.waitForLoadState('networkidle');
  14  | 
  15  |     await page.getByRole('link', { name: 'Monitor Orders' }).click();
  16  |     await page.waitForURL('**/admin/orders');
  17  |     await page.waitForLoadState('networkidle');
  18  | 
  19  |     console.log('URL:', page.url());
  20  |     console.log('Title:', await page.title());
  21  | 
  22  |     await page.screenshot({ path: 'orders-page-full.png', fullPage: true });
  23  | 
  24  |     // Sidebar
  25  |     const sidebarLinks = await page.locator('aside a').allTextContents();
  26  |     console.log('Sidebar links:', sidebarLinks);
> 27  |     const activeNav = await page.locator('aside a[aria-current="page"]').textContent();
      |                                                                          ^ Error: locator.textContent: Error: strict mode violation: locator('aside a[aria-current="page"]') resolved to 2 elements:
  28  |     console.log('Active nav:', activeNav);
  29  | 
  30  |     // Search
  31  |     const searchInput = page.getByPlaceholder('Search anything...');
  32  |     console.log('Search visible:', await searchInput.isVisible());
  33  |     console.log('Search placeholder:', await searchInput.getAttribute('placeholder'));
  34  | 
  35  |     // Status filter
  36  |     const statusFilter = page.getByRole('button', { name: /statuses/i });
  37  |     const sfVisible = await statusFilter.isVisible();
  38  |     console.log('Status filter visible:', sfVisible);
  39  |     console.log('Status filter text:', await statusFilter.textContent());
  40  | 
  41  |     // Table headers
  42  |     const headers = await page.locator('table thead th, table thead td').allTextContents();
  43  |     console.log('Table headers:', headers);
  44  | 
  45  |     // Row count and data
  46  |     const rows = page.locator('table tbody tr');
  47  |     const rowCount = await rows.count();
  48  |     console.log('Row count:', rowCount);
  49  | 
  50  |     // Print first 3 rows
  51  |     for (let i = 0; i < Math.min(rowCount, 3); i++) {
  52  |       const cells = await rows.nth(i).locator('td').allTextContents();
  53  |       console.log(`Row ${i}:`, cells);
  54  |     }
  55  | 
  56  |     // Check for links in rows (action column)
  57  |     const actionLinks = page.locator('table tbody tr td:last-child a, table tbody tr td:last-child button');
  58  |     console.log('Action elements count:', await actionLinks.count());
  59  |     for (let i = 0; i < Math.min(await actionLinks.count(), 3); i++) {
  60  |       const el = actionLinks.nth(i);
  61  |       const tag = await el.evaluate(el => el.tagName);
  62  |       const ariaLabel = await el.getAttribute('aria-label');
  63  |       const href = await el.getAttribute('href');
  64  |       const innerText = await el.textContent();
  65  |       console.log(`  Action ${i}: tag=${tag}, aria-label=${ariaLabel}, href=${href}, text=${innerText}`);
  66  |     }
  67  | 
  68  |     // Pagination
  69  |     const paginationText = page.locator('nav[aria-label="pagination"], [role="navigation"], .pagination, .pagination-info');
  70  |     const hasPagination = await paginationText.count();
  71  |     console.log('Pagination elements:', hasPagination);
  72  |     if (hasPagination > 0) {
  73  |       console.log('Pagination HTML:', await paginationText.first().innerHTML());
  74  |     }
  75  |     const pageInfo = page.locator('text=/\\d+-\\d+ of \\d+/');
  76  |     console.log('Page info visible:', await pageInfo.isVisible());
  77  |     if (await pageInfo.isVisible()) {
  78  |       console.log('Page info text:', await pageInfo.textContent());
  79  |     }
  80  | 
  81  |     // Check for sorting indicators
  82  |     const sortableHeaders = page.locator('table thead th[aria-sort], table thead th .sort, table thead th svg');
  83  |     console.log('Sort indicators:', await sortableHeaders.count());
  84  |   });
  85  | 
  86  |   test('explore status filter dropdown', async ({ page }) => {
  87  |     await page.goto(`${BASE_URL}/admin/login`);
  88  |     await page.getByLabel('Email', { exact: true }).fill('usman+admin@geeksofkolachi.com');
  89  |     await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Admin@123');
  90  |     await page.getByRole('button', { name: 'Login', exact: true }).click();
  91  |     await page.waitForURL('**/admin/dashboard');
  92  |     await page.waitForLoadState('networkidle');
  93  | 
  94  |     await page.getByRole('link', { name: 'Monitor Orders' }).click();
  95  |     await page.waitForURL('**/admin/orders');
  96  |     await page.waitForLoadState('networkidle');
  97  | 
  98  |     // Open status filter
  99  |     await page.getByRole('button', { name: /statuses/i }).click();
  100 |     await page.waitForTimeout(500);
  101 | 
  102 |     // Get dropdown options
  103 |     const panels = page.locator('[role="listbox"], [role="menu"], [role="dialog"], [class*="dropdown"], [class*="popover"]');
  104 |     const panelCount = await panels.count();
  105 |     console.log('Dropdown panels:', panelCount);
  106 |     for (let p = 0; p < panelCount; p++) {
  107 |       const html = await panels.nth(p).innerHTML();
  108 |       console.log(`Panel ${p}: ${html.substring(0, 500)}`);
  109 |     }
  110 | 
  111 |     const options = page.locator('[role="option"], [role="menuitemcheckbox"], [role="menuitem"]');
  112 |     const count = await options.count();
  113 |     console.log('Option count:', count);
  114 |     for (let i = 0; i < count; i++) {
  115 |       const text = await options.nth(i).textContent();
  116 |       const selected = await options.nth(i).getAttribute('aria-selected');
  117 |       const checked = await options.nth(i).getAttribute('aria-checked');
  118 |       console.log(`  [${i}] text="${text}" selected=${selected} checked=${checked}`);
  119 |     }
  120 | 
  121 |     // Click a status option
  122 |     await page.keyboard.press('Escape');
  123 |     await page.waitForTimeout(300);
  124 |   });
  125 | 
  126 |   test('explore order detail drawer', async ({ page }) => {
  127 |     await page.goto(`${BASE_URL}/admin/login`);
```