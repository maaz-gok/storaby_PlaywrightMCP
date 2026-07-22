const { BasePage } = require('./BasePage');
const { BASE_URL } = require('../utils/config');

class ForgotPasswordPage extends BasePage {
  constructor(page) {
    super(page);

    this.heading = page.getByRole('heading', { name: 'Forgot Password' });
    this.emailInput = page.getByLabel('Email', { exact: true });
    this.sendCodeButton = page.getByRole('button', { name: 'Send verification code' });
    this.backToSignInLink = page.getByRole('link', { name: 'Back to sign in' });
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/admin/forgot-password`);
    await this.waitForReady();
  }

  async clickBackToSignIn() {
    const { LoginPage } = require('./LoginPage');
    await this.backToSignInLink.click();
    return new LoginPage(this.page);
  }
}

module.exports = { ForgotPasswordPage };
