import { BasePage } from './BasePage';
import { BASE_URL } from '../utils/config';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.welcomeHeading = page.getByRole('heading', { name: /^Welcome / });

    // Sidebar
    this.sidebar = page.locator('aside').first();
    this.sidebarLogo = page.locator('aside img').first();
    this.dashboardNavLink = page.getByRole('link', { name: 'Dashboard' });
    this.monitorOrdersNavLink = page.getByRole('link', { name: 'Monitor Orders' });
    this.templatesNavLink = page.getByRole('link', { name: 'Templates' });
    this.sidebarCollapseButton = page.getByRole('button', { name: /collapse sidebar/i });
    this.openMenuButton = page.getByRole('button', { name: /open menu/i });
    this.closeMenuOverlay = page.getByRole('button', { name: /close menu overlay/i });

    // Header / Profile
    this.profileMenuButton = page.locator('header').first().getByRole('button').filter({ has: page.locator('img') });
    this.profileAvatar = page.locator('header').first().locator('img').first();
    this.profileDropdown = page.getByRole('menu');
    this.settingsOption = page.getByRole('menu').getByText('Settings');
    this.signOutOption = page.getByRole('menu').getByText('Sign out');

    // Summary cards
    this.summaryCards = page.locator('article');
    this.totalRevenueLabel = page.getByText('Total Revenue', { exact: true });
    this.ordersTodayLabel = page.getByText('Orders Today', { exact: true });
    this.activeCustomersLabel = page.getByText('Active Customers', { exact: true });
    this.booksGeneratedLabel = page.getByText('Books Generated', { exact: true });
    this.totalRevenueValue = page.locator('article').filter({ hasText: 'Total Revenue' }).locator('p');
    this.ordersTodayValue = page.locator('article').filter({ hasText: 'Orders Today' }).locator('p');
    this.activeCustomersValue = page.locator('article').filter({ hasText: 'Active Customers' }).locator('p');
    this.booksGeneratedValue = page.locator('article').filter({ hasText: 'Books Generated' }).locator('p');

    // Dashboard sections
    this.weeklyRevenueTrendSection = page.getByText('Weekly Revenue Trend');
    this.revenueTrendSection = page.locator('section').filter({ hasText: 'Revenue Trend' }).first();
    this.periodSelectorButton = this.revenueTrendSection.getByRole('button').first();
    this.periodOptionMonthly = page.getByText('Monthly');
    this.periodOptionWeekly = page.getByText('Weekly').first();
    this.revenueChart = page.locator('section').filter({ hasText: 'Weekly Revenue Trend' }).locator('svg').first();
    this.revenueXAxisLabels = page.locator('section').filter({ hasText: 'Revenue Trend' }).locator('svg [role="application"]').first().locator('> :first-child > :first-child > *');

    this.ordersThisWeekSection = page.getByText('Order this week');
    this.ordersChart = page.locator('section').filter({ hasText: 'Order this week' }).locator('.recharts-wrapper, svg').first();

    this.aiStatusSection = page.getByText('AI Generation Status');
    this.aiQueueCount = page.locator('section').filter({ hasText: 'AI Generation Status' }).getByText(/Queue/);
    this.aiProcessingCount = page.locator('section').filter({ hasText: 'AI Generation Status' }).getByText(/Processing/);
    this.aiCompletedCount = page.locator('section').filter({ hasText: 'AI Generation Status' }).getByText(/Completed today/);
    this.aiFailedCount = page.locator('section').filter({ hasText: 'AI Generation Status' }).getByText(/Failed/);

    this.recentOrdersSection = page.getByText('Recent Orders');
    this.recentOrdersSectionElement = page.locator('section').filter({ hasText: 'Recent Orders' }).first();
    this.recentOrdersTable = this.recentOrdersSectionElement.locator('table');
    this.recentOrdersRows = this.recentOrdersSectionElement.locator('table tbody tr');
    this.recentOrdersRowCells = (index) => this.recentOrdersRows.nth(index).locator('td');
    this.actionButtons = this.recentOrdersSectionElement.getByRole('button', { name: /order actions/i });
    this.viewAllButton = page.getByRole('button', { name: /view all/i });
    this.ordersPageHeading = page.getByRole('heading', { name: 'Order Management' });
    this.ordersSearchInput = page.getByPlaceholder('Search anything...');
    this.ordersStatusFilter = page.getByRole('button', { name: /statuses/i });
    this.ordersPagination = page.locator('text=/\\d+-\\d+ of \\d+/');

    // Donut chart
    this.donutChart = page.locator('section').filter({ hasText: 'AI Generation Status' }).locator('[role="application"]').first();

    // Revenue chart y-axis
    this.revenueYAxisLabels = page.locator('section').filter({ hasText: 'Revenue Trend' }).locator('[role="application"]').first();

    // Tooltip
    this.chartTooltip = page.locator('[role="tooltip"], .recharts-tooltip-wrapper, [class*="tooltip"]').first();

    // Toast / status messages
    this.successToast = page.getByRole('status').filter({ hasText: /signed in successfully/i });
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/admin/dashboard`);
    await this.waitForReady();
  }

  async getSidebarLinkNames() {
    return this.page.locator('aside a').allTextContents();
  }

  async navigateToDashboard() {
    await this.dashboardNavLink.click();
  }

  async navigateToMonitorOrders() {
    await this.monitorOrdersNavLink.click();
  }

  async navigateToTemplates() {
    await this.templatesNavLink.click();
  }

  async openProfileMenu() {
    await this.profileMenuButton.click();
  }
}
