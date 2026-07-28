import { BasePage } from './BasePage';
import { BASE_URL } from '../utils/config';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.welcomeHeading = page.getByRole('heading', { name: /^Welcome / });
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/admin/dashboard`);
    await this.waitForReady();
  }
}
