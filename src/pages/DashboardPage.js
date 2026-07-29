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

    // Dashboard sections
    this.weeklyRevenueTrendSection = page.getByText('Weekly Revenue Trend');
    this.ordersThisWeekSection = page.getByText('Order this week');
    this.aiStatusSection = page.getByText('AI Generation Status');
    this.recentOrdersSection = page.getByText('Recent Orders');

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
