const { BasePage } = require('./BasePage');
const { BASE_URL } = require('../utils/config');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome storaby!' });
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/admin/dashboard`);
    await this.waitForReady();
  }
}

module.exports = { DashboardPage };
