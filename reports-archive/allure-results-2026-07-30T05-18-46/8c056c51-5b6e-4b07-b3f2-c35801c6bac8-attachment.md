# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin/Monitor-Orders/search.spec.js >> Order Management — search >> 3.9 — Search and status filter combination @regression
- Location: tests/admin/Monitor-Orders/search.spec.js:174:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "usman"
Received string:    "alex"
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
            - generic [ref=e53]: Printing
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
          - paragraph [ref=e241]: 1-10 of 17
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
  94  |       expect(count).toBeGreaterThan(0);
  95  |       for (let i = 0; i < count; i++) {
  96  |         const cells = await orders.getRowCells(i);
  97  |         expect(cells[1].toLowerCase()).toContain('usman');
  98  |       }
  99  |     });
  100 |   });
  101 | 
  102 |   test('3.5 — Search with leading/trailing spaces @regression', async ({ page }) => {
  103 |     const orders = new OrdersPage(page);
  104 | 
  105 |     const responsePromise = page.waitForResponse(r =>
  106 |       r.url().includes('/admin/orders') && r.url().includes('search=')
  107 |     );
  108 | 
  109 |     await test.step('Search with spaces around query', async () => {
  110 |       await orders.search('  usman  ');
  111 |       await responsePromise;
  112 |     });
  113 | 
  114 |     await test.step('Verify results match "usman" without spaces', async () => {
  115 |       const count = await orders.getRowCount();
  116 |       if (count > 0) {
  117 |         for (let i = 0; i < count; i++) {
  118 |           const cells = await orders.getRowCells(i);
  119 |           expect(cells[1].toLowerCase()).toContain('usman');
  120 |         }
  121 |       }
  122 |     });
  123 |   });
  124 | 
  125 |   test('3.6 — Search with special characters @regression', async ({ page }) => {
  126 |     const orders = new OrdersPage(page);
  127 | 
  128 |     await test.step('Search with special characters', async () => {
  129 |       await orders.search('@#$');
  130 |       await page.waitForTimeout(2000);
  131 |     });
  132 | 
  133 |     await test.step('Verify no console errors and valid empty state', async () => {
  134 |       const count = await orders.getRowCount();
  135 |       if (count === 1) {
  136 |         const text = await orders.tableRows.first().allTextContents();
  137 |         expect(text.join('')).toContain('No orders found');
  138 |       }
  139 |     });
  140 |   });
  141 | 
  142 |   test('3.7 — Search with numeric values @regression', async ({ page }) => {
  143 |     const orders = new OrdersPage(page);
  144 | 
  145 |     await test.step('Search with numbers', async () => {
  146 |       await orders.search('123');
  147 |       await page.waitForTimeout(2000);
  148 |     });
  149 | 
  150 |     await test.step('Verify search executed without errors', async () => {
  151 |       const count = await orders.getRowCount();
  152 |       expect(count).toBeGreaterThanOrEqual(0);
  153 |     });
  154 |   });
  155 | 
  156 |   test('3.8 — Clear search restores full list @smoke', async ({ page }) => {
  157 |     const orders = new OrdersPage(page);
  158 | 
  159 |     await test.step('Apply a search and verify filtered', async () => {
  160 |       await orders.search('usman');
  161 |       await page.waitForTimeout(2000);
  162 |       const filteredCount = await orders.getRowCount();
  163 |       expect(filteredCount).toBeGreaterThan(0);
  164 |     });
  165 | 
  166 |     await test.step('Clear search and verify full list restored', async () => {
  167 |       await orders.clearSearch();
  168 |       await page.waitForTimeout(2000);
  169 |       const restoredCount = await orders.getRowCount();
  170 |       expect(restoredCount).toBe(10);
  171 |     });
  172 |   });
  173 | 
  174 |   test('3.9 — Search and status filter combination @regression', async ({ page }) => {
  175 |     const orders = new OrdersPage(page);
  176 | 
  177 |     const responsePromise = page.waitForResponse(r =>
  178 |       r.url().includes('/admin/orders') && r.url().includes('status=') && r.url().includes('search=')
  179 |     );
  180 | 
  181 |     await test.step('Select a status filter and type a search query', async () => {
  182 |       await orders.selectStatusFilter('Printing');
  183 |       await page.waitForTimeout(1000);
  184 |       await orders.search('usman');
  185 |       await responsePromise;
  186 |     });
  187 | 
  188 |     await test.step('Verify results match both criteria', async () => {
  189 |       const count = await orders.getRowCount();
  190 |       expect(count).toBeGreaterThan(0);
  191 |       for (let i = 0; i < count; i++) {
  192 |         const cells = await orders.getRowCells(i);
  193 |         expect(cells[5]).toBe('Printing');
> 194 |         expect(cells[1].toLowerCase()).toContain('usman');
      |                                        ^ Error: expect(received).toContain(expected) // indexOf
  195 |       }
  196 |     });
  197 |   });
  198 | 
  199 |   test('3.10 — Search persistence after pagination @regression', async ({ page }) => {
  200 |     const orders = new OrdersPage(page);
  201 | 
  202 |     await test.step('Search and go to page 2', async () => {
  203 |       await orders.search('ST-');
  204 |       await page.waitForTimeout(2000);
  205 | 
  206 |       if (await orders.nextPageButton.isEnabled()) {
  207 |         await orders.nextPageButton.click();
  208 |         await page.waitForTimeout(1500);
  209 |       }
  210 |     });
  211 | 
  212 |     await test.step('Verify search term persists', async () => {
  213 |       const searchValue = await orders.searchInput.inputValue();
  214 |       expect(searchValue).toBe('ST-');
  215 |     });
  216 |   });
  217 | 
  218 |   test('3.11 — Search does not persist after page refresh @regression', async ({ page }) => {
  219 |     const orders = new OrdersPage(page);
  220 | 
  221 |     await test.step('Apply search and refresh', async () => {
  222 |       await orders.search('usman');
  223 |       await page.waitForTimeout(1500);
  224 |       await page.reload();
  225 |       await page.waitForLoadState('networkidle');
  226 |     });
  227 | 
  228 |     await test.step('Verify search input is empty', async () => {
  229 |       const searchValue = await orders.searchInput.inputValue();
  230 |       expect(searchValue).toBe('');
  231 |     });
  232 | 
  233 |     await test.step('Verify full list restored', async () => {
  234 |       const count = await orders.getRowCount();
  235 |       expect(count).toBe(10);
  236 |     });
  237 |   });
  238 | 
  239 |   test('3.12 — No results state displays "No orders found." @smoke @regression', async ({ page }) => {
  240 |     const orders = new OrdersPage(page);
  241 | 
  242 |     await test.step('Search for non-existent value', async () => {
  243 |       await orders.search('ZZZZNONEXISTENT12345');
  244 |       await page.waitForTimeout(2000);
  245 |     });
  246 | 
  247 |     await test.step('Verify empty state', async () => {
  248 |       await expect(orders.emptyStateMessage).toBeVisible();
  249 |       expect(await orders.getRowCount()).toBe(1);
  250 |     });
  251 | 
  252 |     await test.step('Verify pagination shows 0-0 of 0', async () => {
  253 |       const text = await orders.getPaginationText();
  254 |       expect(text).toBe('0-0 of 0');
  255 |     });
  256 | 
  257 |     await test.step('Verify all pagination buttons are disabled', async () => {
  258 |       await expect(orders.firstPageButton).toBeDisabled();
  259 |       await expect(orders.prevPageButton).toBeDisabled();
  260 |       await expect(orders.nextPageButton).toBeDisabled();
  261 |       await expect(orders.lastPageButton).toBeDisabled();
  262 |     });
  263 |   });
  264 | });
  265 | 
```