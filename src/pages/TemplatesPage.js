import { BasePage } from './BasePage';
import { BASE_URL } from '../utils/config';

export const ageVersionMap = {
  A_2_4: 'Age 2-4',
  B_4_8: 'Age 4-8',
};

export const shelfCategoryMap = {
  adventure_imagination: 'Adventure & Imagination',
  life_big_moments: "Life's Big Moments",
};

export const AGE_GROUP_OPTIONS = ['All', 'Ages 2–4', 'Ages 4–8'];
export const STOREFRONT_SECTION_OPTIONS = ['All', "Life's Big Moments", 'Adventure & Imagination'];
export const VISIBILITY_OPTIONS = ['All', 'Visible', 'Hidden'];

export class TemplatesPage extends BasePage {
  constructor(page) {
    super(page);

    this.heading = page.getByRole('heading', { name: 'Template Management' });

    // Search
    this.searchInput = page.getByPlaceholder('Search templates...');

    // Filter buttons — accessible name comes from aria-label, which does not
    // change after a selection, so the name-based locator is stable.
    this.ageGroupButton = page.getByRole('button', { name: 'Age Group', exact: true });
    this.storefrontSectionButton = page.getByRole('button', { name: 'Storefront section', exact: true });
    this.visibilityButton = page.getByRole('button', { name: 'Visibility', exact: true });
    this.newTemplateButton = page.getByRole('button', { name: 'New template', exact: true });

    // Template grid
    this.cards = page.locator('main article');
    this.skeletons = page.locator('main .animate-pulse');
    this.emptyState = page.getByText('No templates found.', { exact: true });

    // Pagination
    this.paginationText = page.locator('main').getByText(/\d+-\d+ of \d+/);
    this.firstPageButton = page.getByRole('button', { name: 'First page' });
    this.prevPageButton = page.getByRole('button', { name: 'Previous page' });
    this.nextPageButton = page.getByRole('button', { name: 'Next page' });
    this.lastPageButton = page.getByRole('button', { name: 'Last page' });

    // Toast
    this.toast = page.getByRole('status');

    // New template drawer (trigger only; drawer content is out of scope)
    this.createTemplateDrawer = page.getByRole('dialog', { name: 'Create template' });
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/admin/templates`);
    await this.waitForReady();
  }

  async search(query) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.searchInput.fill('');
  }

  async getPaginationText() {
    return this.paginationText.textContent();
  }

  async selectOption(optionName) {
    await this.page.getByRole('option', { name: optionName, exact: true }).click();
  }

  async selectAgeGroup(optionName) {
    await this.ageGroupButton.click();
    await this.selectOption(optionName);
  }

  async selectStorefrontSection(optionName) {
    await this.storefrontSectionButton.click();
    await this.selectOption(optionName);
  }

  async selectVisibility(optionName) {
    await this.visibilityButton.click();
    await this.selectOption(optionName);
  }

  getCard(index) {
    return this.cards.nth(index);
  }

  getCardTitle(index) {
    return this.getCard(index).locator('label');
  }

  getCardCover(index) {
    return this.getCard(index).locator('img');
  }

  getCardAgeTag(index) {
    return this.getCard(index).getByText(/^Age \d+-\d+$/);
  }

  getCardCategoryTag(index) {
    return this.getCard(index).getByText(/^(Adventure & Imagination|Life's Big Moments)$/);
  }

  getCardBadge(index) {
    return this.getCard(index).getByText(/^(Visible|Hidden)$/);
  }

  getCardToggleButton(index) {
    return this.getCard(index).getByRole('button', { name: /^(Hide|Show) / });
  }

  getCardDeleteButton(index) {
    return this.getCard(index).getByRole('button', { name: /^Delete / });
  }

  getCardEditButton(index) {
    return this.getCard(index).getByRole('button', { name: /^Edit / });
  }

  cardByName(name, ageTag) {
    let locator = this.cards.filter({ hasText: name });
    if (ageTag) locator = locator.filter({ hasText: ageTag });
    return locator;
  }

  getDialog(name) {
    return this.page.getByRole('dialog', { name });
  }

  getDialogButton(dialogName, buttonName) {
    return this.getDialog(dialogName).getByRole('button', { name: buttonName });
  }

  async confirmDialog(dialogName, buttonName) {
    await this.getDialogButton(dialogName, buttonName).click();
  }

  async cancelDialog(dialogName) {
    await this.getDialogButton(dialogName, 'No, Cancel').click();
  }
}
