const { Page } = require('@playwright/test');

class BasePage {
  constructor(page) {
    /** @type {Page} */
    this.page = page;
  }

  /**
   * Navigate to the page
   * @abstract
   * @returns {Promise<void>}
   */
  async goto() {
    throw new Error('Method "goto()" must be implemented in subclass');
  }

  /**
   * Wait for the page to be ready
   * @returns {Promise<void>}
   */
  async waitForReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Read and JSON-parse a localStorage entry for the current origin.
   * No Playwright API exposes localStorage directly, so page.evaluate is required.
   * @param {string} key
   * @returns {Promise<any|null>}
   */
  async getLocalStorageItem(key) {
    return this.page.evaluate((k) => {
      const raw = window.localStorage.getItem(k);
      return raw ? JSON.parse(raw) : null;
    }, key);
  }
}

module.exports = { BasePage };