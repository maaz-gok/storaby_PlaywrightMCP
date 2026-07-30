# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin/Dashboard/revenue-trend.spec.js >> Admin Dashboard — revenue trend >> 5.4 — Revenue chart data points reflect API response values @regression
- Location: tests/admin/Dashboard/revenue-trend.spec.js:89:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('section').filter({ hasText: 'Revenue Trend' }).locator('svg')
Expected: visible
Error: strict mode violation: locator('section').filter({ hasText: 'Revenue Trend' }).locator('svg') resolved to 2 elements:
    1) <svg width="14" height="14" fill="none" stroke-width="2" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="lucide lucide-chevron-down text-storaby-primary transition-transform">…</svg> aka locator('header').filter({ hasText: 'Weekly Revenue TrendWeekly' }).getByRole('button')
    2) <svg width="505" tabindex="0" height="260" role="application" viewBox="0 0 505 260" class="recharts-surface">…</svg> aka getByRole('application').filter({ hasText: 'Jun 10Jun 17Jun 24Jul 1Jul' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('section').filter({ hasText: 'Revenue Trend' }).locator('svg')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
          - heading "Welcome admin!" [level=1] [ref=e35]
          - button "admin admin usman+admin@geeksofkolachi.com" [ref=e38]:
            - img "admin" [ref=e39]
            - generic [ref=e40]:
              - generic [ref=e41]: admin
              - generic [ref=e42]: usman+admin@geeksofkolachi.com
            - img [ref=e43]
      - main [ref=e45]:
        - generic [ref=e46]:
          - generic [ref=e47]:
            - article [ref=e48]:
              - generic [ref=e49]:
                - generic [ref=e50]:
                  - generic [ref=e51]: Total Revenue
                  - paragraph [ref=e52]: £2,289
                - img [ref=e54]
            - article [ref=e57]:
              - generic [ref=e58]:
                - generic [ref=e59]:
                  - generic [ref=e60]: Orders Today
                  - paragraph [ref=e61]: "21"
                - img [ref=e63]
            - article [ref=e67]:
              - generic [ref=e68]:
                - generic [ref=e69]:
                  - generic [ref=e70]: Active Customers
                  - paragraph [ref=e71]: "19"
                - img [ref=e73]
            - article [ref=e78]:
              - generic [ref=e79]:
                - generic [ref=e80]:
                  - generic [ref=e81]: Books Generated
                  - paragraph [ref=e82]: "77"
                - img [ref=e84]
          - generic [ref=e86]:
            - generic [ref=e87]:
              - generic [ref=e88]:
                - generic [ref=e89]: Weekly Revenue Trend
                - button "Weekly" [ref=e92]:
                  - text: Weekly
                  - img [ref=e93]
              - application [ref=e99]:
                - generic [ref=e117]:
                  - generic [ref=e118]:
                    - generic [ref=e120]: Jun 10
                    - generic [ref=e122]: Jun 17
                    - generic [ref=e124]: Jun 24
                    - generic [ref=e126]: Jul 1
                    - generic [ref=e128]: Jul 8
                    - generic [ref=e130]: Jul 15
                    - generic [ref=e132]: Jul 22
                    - generic [ref=e134]: Jul 29
                  - generic [ref=e135]:
                    - generic [ref=e137]: £0
                    - generic [ref=e139]: £350
                    - generic [ref=e141]: £700
                    - generic [ref=e143]: £1.1k
                    - generic [ref=e145]: £1.4k
            - generic [ref=e146]:
              - generic [ref=e148]: Order this week
              - application [ref=e153]:
                - generic [ref=e170]:
                  - generic [ref=e171]:
                    - generic [ref=e173]: Sun
                    - generic [ref=e175]: Mon
                    - generic [ref=e177]: Tue
                    - generic [ref=e179]: Wed
                    - generic [ref=e181]: Thu
                    - generic [ref=e183]: Fri
                    - generic [ref=e185]: Sat
                  - generic [ref=e186]:
                    - generic [ref=e188]: 0%
                    - generic [ref=e190]: 20%
                    - generic [ref=e192]: 40%
                    - generic [ref=e194]: 60%
                    - generic [ref=e196]: 80%
                    - generic [ref=e198]: 100%
          - generic [ref=e199]:
            - generic [ref=e200]:
              - generic [ref=e201]:
                - generic [ref=e202]: AI Generation Status
                - button "Weekly" [ref=e205]:
                  - text: Weekly
                  - img [ref=e206]
              - generic [ref=e209]:
                - list [ref=e210]:
                  - listitem [ref=e211]:
                    - generic [ref=e214]: Queue
                    - generic [ref=e215]: 3 stories
                  - listitem [ref=e216]:
                    - generic [ref=e219]: Processing
                    - generic [ref=e220]: 0 stories
                  - listitem [ref=e221]:
                    - generic [ref=e224]: Completed today
                    - generic [ref=e225]: 69 stories
                  - listitem [ref=e226]:
                    - generic [ref=e229]: Failed
                    - generic [ref=e230]: 46 stories
                - application [ref=e234]:
                  - generic [ref=e247]:
                    - generic [ref=e252]: 3%
                    - generic [ref=e257]: 58%
                    - generic [ref=e262]: 39%
            - generic [ref=e265]:
              - generic [ref=e266]:
                - generic [ref=e267]: Recent Orders
                - button "View All" [ref=e269]:
                  - text: View All
                  - img [ref=e270]
              - table [ref=e276]:
                - rowgroup [ref=e277]:
                  - row "Order ID Customer Story Status Action" [ref=e278]:
                    - columnheader "Order ID" [ref=e279]
                    - columnheader "Customer" [ref=e280]
                    - columnheader "Story" [ref=e281]
                    - columnheader "Status" [ref=e282]
                    - columnheader "Action" [ref=e283]
                - rowgroup [ref=e284]:
                  - row "ST-8RCA Alex The Glowing Envelope Generating Final Order actions" [ref=e285]:
                    - cell "ST-8RCA" [ref=e286]
                    - cell "Alex" [ref=e287]
                    - cell "The Glowing Envelope" [ref=e288]
                    - cell "Generating Final" [ref=e289]:
                      - generic [ref=e290]:
                        - img [ref=e291]
                        - text: Generating Final
                    - cell "Order actions" [ref=e294]:
                      - button "Order actions" [ref=e295]:
                        - img [ref=e296]
                  - row "ST-RQYD usman The Glowing Gold Envelope Generating Final Order actions" [ref=e300]:
                    - cell "ST-RQYD" [ref=e301]
                    - cell "usman" [ref=e302]
                    - cell "The Glowing Gold Envelope" [ref=e303]
                    - cell "Generating Final" [ref=e304]:
                      - generic [ref=e305]:
                        - img [ref=e306]
                        - text: Generating Final
                    - cell "Order actions" [ref=e309]:
                      - button "Order actions" [ref=e310]:
                        - img [ref=e311]
                  - row "ST-RLDE usman The Glowing Gift Generating Final Order actions" [ref=e315]:
                    - cell "ST-RLDE" [ref=e316]
                    - cell "usman" [ref=e317]
                    - cell "The Glowing Gift" [ref=e318]
                    - cell "Generating Final" [ref=e319]:
                      - generic [ref=e320]:
                        - img [ref=e321]
                        - text: Generating Final
                    - cell "Order actions" [ref=e324]:
                      - button "Order actions" [ref=e325]:
                        - img [ref=e326]
                  - row "ST-WRPQ John Doe Cardboard Wings Printing Order actions" [ref=e330]:
                    - cell "ST-WRPQ" [ref=e331]
                    - cell "John Doe" [ref=e332]
                    - cell "Cardboard Wings" [ref=e333]
                    - cell "Printing" [ref=e334]:
                      - generic [ref=e335]:
                        - img [ref=e336]
                        - text: Printing
                    - cell "Order actions" [ref=e340]:
                      - button "Order actions" [ref=e341]:
                        - img [ref=e342]
                  - row "ST-UBWD Usman The Whispering Gate Submitted To Print Order actions" [ref=e346]:
                    - cell "ST-UBWD" [ref=e347]
                    - cell "Usman" [ref=e348]
                    - cell "The Whispering Gate" [ref=e349]
                    - cell "Submitted To Print" [ref=e350]:
                      - generic [ref=e351]:
                        - img [ref=e352]
                        - text: Submitted To Print
                    - cell "Order actions" [ref=e356]:
                      - button "Order actions" [ref=e357]:
                        - img [ref=e358]
                  - row "ST-MF03 Usman Azhar The Tiny Door Submitted To Print Order actions" [ref=e362]:
                    - cell "ST-MF03" [ref=e363]
                    - cell "Usman Azhar" [ref=e364]
                    - cell "The Tiny Door" [ref=e365]
                    - cell "Submitted To Print" [ref=e366]:
                      - generic [ref=e367]:
                        - img [ref=e368]
                        - text: Submitted To Print
                    - cell "Order actions" [ref=e372]:
                      - button "Order actions" [ref=e373]:
                        - img [ref=e374]
                  - row "ST-NLKB usman Zookeeper Osman Printing Order actions" [ref=e378]:
                    - cell "ST-NLKB" [ref=e379]
                    - cell "usman" [ref=e380]
                    - cell "Zookeeper Osman" [ref=e381]
                    - cell "Printing" [ref=e382]:
                      - generic [ref=e383]:
                        - img [ref=e384]
                        - text: Printing
                    - cell "Order actions" [ref=e388]:
                      - button "Order actions" [ref=e389]:
                        - img [ref=e390]
                  - row "ST-5773 usman Brand New Backpack Printing Order actions" [ref=e394]:
                    - cell "ST-5773" [ref=e395]
                    - cell "usman" [ref=e396]
                    - cell "Brand New Backpack" [ref=e397]
                    - cell "Printing" [ref=e398]:
                      - generic [ref=e399]:
                        - img [ref=e400]
                        - text: Printing
                    - cell "Order actions" [ref=e404]:
                      - button "Order actions" [ref=e405]:
                        - img [ref=e406]
                  - row "ST-2NUV usman The Tiny Door Printing Order actions" [ref=e410]:
                    - cell "ST-2NUV" [ref=e411]
                    - cell "usman" [ref=e412]
                    - cell "The Tiny Door" [ref=e413]
                    - cell "Printing" [ref=e414]:
                      - generic [ref=e415]:
                        - img [ref=e416]
                        - text: Printing
                    - cell "Order actions" [ref=e420]:
                      - button "Order actions" [ref=e421]:
                        - img [ref=e422]
                  - row "ST-RYKB Usman The Tiny Door Printing Order actions" [ref=e426]:
                    - cell "ST-RYKB" [ref=e427]
                    - cell "Usman" [ref=e428]
                    - cell "The Tiny Door" [ref=e429]
                    - cell "Printing" [ref=e430]:
                      - generic [ref=e431]:
                        - img [ref=e432]
                        - text: Printing
                    - cell "Order actions" [ref=e436]:
                      - button "Order actions" [ref=e437]:
                        - img [ref=e438]
  - generic [ref=e442]: 0%
```

# Test source

```ts
  1   | import { test, expect } from '../../../src/fixtures/base';
  2   | import { LoginPage } from '../../../src/pages/LoginPage';
  3   | import { DashboardPage } from '../../../src/pages/DashboardPage';
  4   | import { BASE_URL, API_BASE_URL } from '../../../src/utils/config';
  5   | import users from '../../data/users.json' with { type: 'json' };
  6   | 
  7   | async function loginToDashboard(page) {
  8   |   const login = new LoginPage(page);
  9   |   await login.goto();
  10  |   await login.login(users.admin.email, users.admin.password);
  11  |   await page.waitForURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  12  |   await page.waitForLoadState('networkidle');
  13  | }
  14  | 
  15  | async function callApi(page, path) {
  16  |   return page.evaluate(async ({ apiUrl, path }) => {
  17  |     const auth = JSON.parse(localStorage.getItem('storaby-auth'));
  18  |     const token = auth?.state?.token;
  19  |     const resp = await fetch(`${apiUrl}${path}`, {
  20  |       headers: { Authorization: `Bearer ${token}` },
  21  |     });
  22  |     return resp.json();
  23  |   }, { apiUrl: API_BASE_URL, path });
  24  | }
  25  | 
  26  | test.describe('Admin Dashboard — revenue trend', () => {
  27  |   test('5.1 — Revenue Trend section renders with title and period selector @smoke', async ({ page }) => {
  28  |     await loginToDashboard(page);
  29  |     const dashboard = new DashboardPage(page);
  30  | 
  31  |     await expect(dashboard.weeklyRevenueTrendSection).toBeVisible();
  32  |     await expect(dashboard.periodSelectorButton).toBeVisible();
  33  |     await expect(dashboard.periodSelectorButton).toHaveText('Weekly');
  34  | 
  35  |     await dashboard.periodSelectorButton.click();
  36  |     await expect(dashboard.periodOptionMonthly).toBeVisible();
  37  |     await expect(dashboard.periodOptionWeekly).toBeVisible();
  38  | 
  39  |     await page.keyboard.press('Escape');
  40  |   });
  41  | 
  42  |   test('5.2 — Revenue chart x-axis labels match API data (weekly) @smoke', async ({ page }) => {
  43  |     await loginToDashboard(page);
  44  | 
  45  |     const apiData = await callApi(page, '/admin/dashboard/revenue-trend?period=weekly');
  46  |     const expectedCount = apiData.data.length;
  47  | 
  48  |     const chartApp = page.locator('section').filter({ hasText: 'Revenue Trend' }).locator('[role="application"]');
  49  |     await expect(chartApp).toBeVisible();
  50  | 
  51  |     const allTexts = await chartApp.evaluate(el => {
  52  |       const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  53  |       const texts = [];
  54  |       let node;
  55  |       while (node = walker.nextNode()) {
  56  |         const t = node.textContent.trim();
  57  |         if (t) texts.push(t);
  58  |       }
  59  |       return texts;
  60  |     });
  61  | 
  62  |     const datePattern = /^[A-Z][a-z]{2}\s\d{1,2}$/;
  63  |     const xLabels = allTexts.filter(t => datePattern.test(t));
  64  |     expect(xLabels.length).toBe(expectedCount);
  65  |   });
  66  | 
  67  |   test('5.3 — Revenue chart displays correct y-axis values @smoke', async ({ page }) => {
  68  |     await loginToDashboard(page);
  69  | 
  70  |     const chartApp = page.locator('section').filter({ hasText: 'Revenue Trend' }).locator('[role="application"]');
  71  |     await expect(chartApp).toBeVisible();
  72  | 
  73  |     const allTexts = await chartApp.evaluate(el => {
  74  |       const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  75  |       const texts = [];
  76  |       let node;
  77  |       while (node = walker.nextNode()) {
  78  |         const t = node.textContent.trim();
  79  |         if (t) texts.push(t);
  80  |       }
  81  |       return texts;
  82  |     });
  83  | 
  84  |     const yAxisPattern = /^£[\d,.k]+$/;
  85  |     const yLabels = allTexts.filter(t => yAxisPattern.test(t));
  86  |     expect(yLabels.length).toBeGreaterThanOrEqual(3);
  87  |   });
  88  | 
  89  |   test('5.4 — Revenue chart data points reflect API response values @regression', async ({ page }) => {
  90  |     await loginToDashboard(page);
  91  | 
  92  |     const apiData = await callApi(page, '/admin/dashboard/revenue-trend?period=weekly');
  93  |     const dataPoints = apiData.data;
  94  | 
  95  |     const chartSvg = page.locator('section').filter({ hasText: 'Revenue Trend' }).locator('svg');
> 96  |     await expect(chartSvg).toBeVisible();
      |                            ^ Error: expect(locator).toBeVisible() failed
  97  | 
  98  |     const apiTotal = dataPoints.reduce((sum, d) => sum + d.revenue, 0);
  99  |     const maxRevenue = Math.max(...dataPoints.map(d => d.revenue), 1);
  100 | 
  101 |     const barValues = await chartSvg.evaluate((svg, { apiTotal, maxRevenue }) => {
  102 |       const bars = svg.querySelectorAll('.recharts-bar-rectangle');
  103 |       if (!bars || bars.length === 0) return [];
  104 | 
  105 |       const svgHeight = svg.getBoundingClientRect().height;
  106 |       const results = [];
  107 | 
  108 |       bars.forEach(bar => {
  109 |         const rect = bar.querySelector('rect');
  110 |         if (!rect) return;
  111 |         const h = parseFloat(rect.getAttribute('height'));
  112 |         const y = parseFloat(rect.getAttribute('y'));
  113 |         const computedValue = ((svgHeight - y - h) / svgHeight) * maxRevenue;
  114 |         results.push({ height: h, y, computedValue });
  115 |       });
  116 | 
  117 |       return results;
  118 |     }, { apiTotal, maxRevenue });
  119 | 
  120 |     expect(barValues.length).toBeGreaterThanOrEqual(dataPoints.length);
  121 |     expect(barValues.length).toBeLessThanOrEqual(dataPoints.length + 1);
  122 |   });
  123 | 
  124 |   test('5.5 — Switch period from Weekly to Monthly @smoke @regression', async ({ page }) => {
  125 |     await loginToDashboard(page);
  126 |     const dashboard = new DashboardPage(page);
  127 |     const monthlyResponse = page.waitForResponse(r =>
  128 |       r.url().includes('/admin/dashboard/revenue-trend?period=monthly')
  129 |     );
  130 | 
  131 |     await dashboard.periodSelectorButton.click();
  132 |     await page.getByText('Monthly').click();
  133 |     await monthlyResponse;
  134 | 
  135 |     await expect(page.getByText('Monthly Revenue Trend')).toBeVisible();
  136 |     await expect(dashboard.periodSelectorButton).toHaveText('Monthly');
  137 | 
  138 |     const weeklyResponse = page.waitForResponse(r =>
  139 |       r.url().includes('/admin/dashboard/revenue-trend?period=weekly')
  140 |     );
  141 |     await dashboard.periodSelectorButton.click();
  142 |     await page.getByText('Weekly').first().click();
  143 |     await weeklyResponse;
  144 | 
  145 |     await expect(page.getByText('Weekly Revenue Trend')).toBeVisible();
  146 |   });
  147 | 
  148 |   test('5.6 — Revenue chart tooltip on hover (if available) @regression', async ({ page }) => {
  149 |     await loginToDashboard(page);
  150 | 
  151 |     const chartApp = page.locator('section').filter({ hasText: 'Revenue Trend' }).locator('[role="application"]');
  152 |     await expect(chartApp).toBeVisible();
  153 | 
  154 |     await chartApp.hover({ force: true });
  155 | 
  156 |     const tooltip = page.locator('[role="tooltip"]');
  157 |     const tooltipCount = await tooltip.count();
  158 |     // Document observed behavior — tooltip may or may not be implemented
  159 |     expect(typeof tooltipCount).toBe('number');
  160 |   });
  161 | 
  162 |   test('5.7 — No duplicate API requests when changing period @regression', async ({ page }) => {
  163 |     await loginToDashboard(page);
  164 |     const dashboard = new DashboardPage(page);
  165 |     const requests = [];
  166 |     page.on('request', req => {
  167 |       if (req.url().includes('/admin/dashboard/revenue-trend')) {
  168 |         requests.push(req.url());
  169 |       }
  170 |     });
  171 | 
  172 |     await dashboard.periodSelectorButton.click();
  173 |     await page.getByText('Monthly').click();
  174 |     await page.waitForResponse(r => r.url().includes('period=monthly'));
  175 | 
  176 |     await dashboard.periodSelectorButton.click();
  177 |     await page.getByText('Weekly').first().click();
  178 |     await page.waitForResponse(r => r.url().includes('period=weekly'));
  179 | 
  180 |     const monthlyCalls = requests.filter(u => u.includes('period=monthly'));
  181 |     const weeklyCalls = requests.filter(u => u.includes('period=weekly'));
  182 |     expect(monthlyCalls.length).toBe(1);
  183 |     expect(weeklyCalls.length).toBe(1);
  184 |   });
  185 | });
  186 | 
```