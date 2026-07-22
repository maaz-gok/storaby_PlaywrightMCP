const { BasePage } = require('./BasePage');
const { BASE_URL } = require('../utils/config');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.heading = page.getByRole('heading', { name: 'Admin Login' });
    this.emailInput = page.getByLabel('Email', { exact: true });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.passwordToggleButton = page.getByRole('button', { name: /show password|hide password/i });
    this.keepSignedInCheckbox = page.getByRole('checkbox', { name: 'Keep me signed in' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.statusMessage = page.getByRole('status');

    this.emailRequiredError = page.getByText('Email is required', { exact: true });
    this.emailInvalidError = page.getByText('Enter a valid email', { exact: true });
    this.passwordRequiredError = page.getByText('Password is required', { exact: true });
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/admin/login`);
    await this.waitForReady();
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  /**
   * Fills credentials and submits, without asserting the outcome.
   * Use for scenarios where login is expected to fail and the page stays on /admin/login.
   */
  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  /**
   * Fills credentials, submits, and returns the next page.
   * Use for scenarios where login is expected to succeed.
   * @returns {Promise<import('./DashboardPage').DashboardPage>}
   */
  async loginAs(email, password) {
    const { DashboardPage } = require('./DashboardPage');
    await this.login(email, password);
    return new DashboardPage(this.page);
  }

  async togglePasswordVisibility() {
    await this.passwordToggleButton.click();
  }

  async clickForgotPassword() {
    const { ForgotPasswordPage } = require('./ForgotPasswordPage');
    await this.forgotPasswordLink.click();
    return new ForgotPasswordPage(this.page);
  }
}

module.exports = { LoginPage };
