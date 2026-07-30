# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin/Monitor-Orders/page-load.spec.ts >> Order Management — page load and route guard >> 1.2 — Unauthenticated user is redirected to login @critical @regression
- Location: tests/admin/Monitor-Orders/page-load.spec.ts:50:3

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://staging.storaby.com/admin/orders
Call log:
  - navigating to "https://staging.storaby.com/admin/orders", waiting until "load"

```

# Test source

```ts
  1   | import { BasePage } from './BasePage';
  2   | import { BASE_URL } from '../utils/config';
  3   | 
  4   | export class OrdersPage extends BasePage {
  5   |   constructor(page) {
  6   |     super(page);
  7   | 
  8   |     // Heading
  9   |     this.heading = page.getByRole('heading', { name: 'Order Management' });
  10  | 
  11  |     // Search
  12  |     this.searchInput = page.getByPlaceholder('Search anything...');
  13  | 
  14  |     // Status filter
  15  |     this.statusFilterButton = page.getByRole('button', { name: /statuses/i });
  16  |     this.statusDropdown = page.locator('[role="listbox"]');
  17  |     this.statusOptions = page.locator('[role="option"]');
  18  |     this.statusOptionAll = page.locator('[role="option"]').filter({ hasText: 'All' });
  19  | 
  20  |     // Table
  21  |     this.table = page.locator('table');
  22  |     this.tableHeaders = page.locator('table thead tr th');
  23  |     this.tableBody = page.locator('table tbody');
  24  |     this.tableRows = page.locator('table tbody tr');
  25  |     this.skeletonRows = page.locator('table tbody tr:has(.animate-pulse)');
  26  |     this.emptyStateRow = page.locator('table tbody tr:has-text("No orders found.")');
  27  |     this.emptyStateMessage = page.getByText('No orders found.');
  28  | 
  29  |     // Action buttons per row
  30  |     this.viewOrderButtons = page.getByRole('button', { name: /view order/i });
  31  | 
  32  |     // Pagination
  33  |     this.paginationText = page.locator('p.text-sm').filter({ hasText: /of/ });
  34  |     this.firstPageButton = page.getByRole('button', { name: 'First page' });
  35  |     this.prevPageButton = page.getByRole('button', { name: 'Previous page' });
  36  |     this.nextPageButton = page.getByRole('button', { name: 'Next page' });
  37  |     this.lastPageButton = page.getByRole('button', { name: 'Last page' });
  38  | 
  39  |     // Order detail drawer
  40  |     this.drawer = page.locator('[class*="storaby-drawer-panel"]');
  41  |     this.drawerBackdrop = page.locator('.fixed.inset-0.z-80').first();
  42  |     this.drawerCloseButton = page.getByRole('button', { name: 'Close' });
  43  |     this.drawerOrderNumber = this.drawer.locator('h2').first();
  44  |     this.drawerStatusBadge = this.drawer.locator('header .inline-flex.items-center.gap-\\[3\\.75px\\]');
  45  |     this.drawerCustomerName = this.drawer.locator('section').first().locator('p.truncate.text-sm').first();
  46  |     this.drawerCustomerEmail = this.drawer.locator('section').first().locator('p.truncate.text-xs').first();
  47  |     this.drawerCustomerSection = this.drawer.locator('section').filter({ hasText: 'Customer & Shipping Details' });
  48  |     this.drawerBookDetailsSection = this.drawer.locator('section').filter({ hasText: 'Book Details' });
  49  |     this.drawerTimelineSection = this.drawer.locator('section').filter({ hasText: 'Timeline' });
  50  |     this.drawerStoryTitle = this.drawerBookDetailsSection.locator('div.flex.items-center.justify-between').nth(0).locator('span').last();
  51  |     this.drawerAmount = this.drawerBookDetailsSection.locator('div.flex.items-center.justify-between').nth(1).locator('span').last();
  52  |     this.drawerPaymentStatus = this.drawerBookDetailsSection.locator('div.flex.items-center.justify-between').nth(2).locator('span.inline-flex').last();
  53  |   }
  54  | 
  55  |   async goto() {
> 56  |     await this.page.goto(`${BASE_URL}/admin/orders`);
      |                     ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://staging.storaby.com/admin/orders
  57  |     await this.waitForReady();
  58  |   }
  59  | 
  60  |   async getHeaderTexts() {
  61  |     return this.tableHeaders.allTextContents();
  62  |   }
  63  | 
  64  |   async getRowCount() {
  65  |     return this.tableRows.count();
  66  |   }
  67  | 
  68  |   async getRowCells(rowIndex) {
  69  |     return this.tableRows.nth(rowIndex).locator('td').allTextContents();
  70  |   }
  71  | 
  72  |   async getRowActionButton(rowIndex) {
  73  |     return this.tableRows.nth(rowIndex).getByRole('button', { name: /view order/i });
  74  |   }
  75  | 
  76  |   async getPaginationText() {
  77  |     return this.paginationText.textContent();
  78  |   }
  79  | 
  80  |   async selectStatusFilter(statusName) {
  81  |     await this.statusFilterButton.click();
  82  |     await this.page.waitForTimeout(300);
  83  |     const option = this.statusOptions.filter({ hasText: statusName });
  84  |     await option.click();
  85  |   }
  86  | 
  87  |   async search(query) {
  88  |     await this.searchInput.fill(query);
  89  |   }
  90  | 
  91  |   async clearSearch() {
  92  |     await this.searchInput.fill('');
  93  |   }
  94  | 
  95  |   async openOrderDrawer(rowIndex) {
  96  |     const button = this.tableRows.nth(rowIndex).getByRole('button', { name: /view order/i });
  97  |     await button.click();
  98  |   }
  99  | 
  100 |   async closeDrawer() {
  101 |     await this.drawerCloseButton.click();
  102 |   }
  103 | 
  104 |   async closeDrawerViaEscape() {
  105 |     await this.page.keyboard.press('Escape');
  106 |   }
  107 | 
  108 |   async getDrawerSectionTexts() {
  109 |     return this.drawer.locator('h3').allTextContents();
  110 |   }
  111 | 
  112 |   async isDrawerOpen() {
  113 |     return this.drawer.isVisible();
  114 |   }
  115 | }
  116 | 
```