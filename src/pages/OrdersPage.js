import { BasePage } from './BasePage';
import { BASE_URL } from '../utils/config';

export class OrdersPage extends BasePage {
  constructor(page) {
    super(page);

    // Heading
    this.heading = page.getByRole('heading', { name: 'Order Management' });

    // Search
    this.searchInput = page.getByPlaceholder('Search anything...');

    // Status filter
    this.statusFilterButton = page.getByRole('button', { name: /statuses/i });
    this.statusDropdown = page.locator('[role="listbox"]');
    this.statusOptions = page.locator('[role="option"]');
    this.statusOptionAll = page.locator('[role="option"]').filter({ hasText: 'All' });

    // Table
    this.table = page.locator('table');
    this.tableHeaders = page.locator('table thead tr th');
    this.tableBody = page.locator('table tbody');
    this.tableRows = page.locator('table tbody tr');
    this.skeletonRows = page.locator('table tbody tr:has(.animate-pulse)');
    this.emptyStateRow = page.locator('table tbody tr:has-text("No orders found.")');
    this.emptyStateMessage = page.getByText('No orders found.');

    // Action buttons per row
    this.viewOrderButtons = page.getByRole('button', { name: /view order/i });

    // Pagination
    this.paginationText = page.locator('p.text-sm').filter({ hasText: /of/ });
    this.firstPageButton = page.getByRole('button', { name: 'First page' });
    this.prevPageButton = page.getByRole('button', { name: 'Previous page' });
    this.nextPageButton = page.getByRole('button', { name: 'Next page' });
    this.lastPageButton = page.getByRole('button', { name: 'Last page' });

    // Order detail drawer
    this.drawer = page.locator('[class*="storaby-drawer-panel"]');
    this.drawerBackdrop = page.locator('.fixed.inset-0.z-80').first();
    this.drawerCloseButton = page.getByRole('button', { name: 'Close' });
    this.drawerOrderNumber = this.drawer.locator('h2').first();
    this.drawerStatusBadge = this.drawer.locator('header .inline-flex.items-center.gap-\\[3\\.75px\\]');
    this.drawerCustomerName = this.drawer.locator('section').first().locator('p.truncate.text-sm').first();
    this.drawerCustomerEmail = this.drawer.locator('section').first().locator('p.truncate.text-xs').first();
    this.drawerCustomerSection = this.drawer.locator('section').filter({ hasText: 'Customer & Shipping Details' });
    this.drawerBookDetailsSection = this.drawer.locator('section').filter({ hasText: 'Book Details' });
    this.drawerTimelineSection = this.drawer.locator('section').filter({ hasText: 'Timeline' });
    this.drawerStoryTitle = this.drawerBookDetailsSection.locator('div.flex.items-center.justify-between').nth(0).locator('span').last();
    this.drawerAmount = this.drawerBookDetailsSection.locator('div.flex.items-center.justify-between').nth(1).locator('span').last();
    this.drawerPaymentStatus = this.drawerBookDetailsSection.locator('div.flex.items-center.justify-between').nth(2).locator('span.inline-flex').last();
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/admin/orders`);
    await this.waitForReady();
  }

  async getHeaderTexts() {
    return this.tableHeaders.allTextContents();
  }

  async getRowCount() {
    return this.tableRows.count();
  }

  async getRowCells(rowIndex) {
    return this.tableRows.nth(rowIndex).locator('td').allTextContents();
  }

  async getRowActionButton(rowIndex) {
    return this.tableRows.nth(rowIndex).getByRole('button', { name: /view order/i });
  }

  async getPaginationText() {
    return this.paginationText.textContent();
  }

  async selectStatusFilter(statusName) {
    await this.statusFilterButton.click();
    await this.page.waitForTimeout(300);
    const option = this.statusOptions.filter({ hasText: statusName });
    await option.click();
  }

  async search(query) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.searchInput.fill('');
  }

  async openOrderDrawer(rowIndex) {
    const button = this.tableRows.nth(rowIndex).getByRole('button', { name: /view order/i });
    await button.click();
  }

  async closeDrawer() {
    await this.drawerCloseButton.click();
  }

  async closeDrawerViaEscape() {
    await this.page.keyboard.press('Escape');
  }

  async getDrawerSectionTexts() {
    return this.drawer.locator('h3').allTextContents();
  }

  async isDrawerOpen() {
    return this.drawer.isVisible();
  }
}
