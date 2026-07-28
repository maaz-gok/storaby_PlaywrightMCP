import { BasePage } from './BasePage';
import { BASE_URL } from '../utils/config';

export class SettingsPage extends BasePage {
  constructor(page) {
    super(page);

    this.profileSettingsTab = page.getByRole('button', { name: 'Profile Settings' });
    this.changePasswordTab = page.getByRole('button', { name: 'Change Password' });

    this.profileImage = page.locator('img[src*="amazonaws.com"]').first();
    this.fullNameInput = page.getByLabel('Full Name');
    this.emailInput = page.getByLabel('Email');
    this.saveChangesBtn = page.getByRole('button', { name: 'Save Changes' });
    this.changeProfilePhotoBtn = page.getByRole('button', { name: 'Change profile photo' });
    this.fileInput = page.locator('input[type="file"]');

    this.currentPasswordInput = page.getByLabel('Current Password');
    this.newPasswordInput = page.getByLabel('New Password', { exact: true });
    this.confirmPasswordInput = page.getByLabel('Confirm New Password');

    this.currentPasswordToggle = page.locator('#currentPassword + button');
    this.newPasswordToggle = page.locator('#newPassword + button');
    this.confirmPasswordToggle = page.locator('#confirmPassword + button');

    this.req8Chars = page.getByText('8+ characters');
    this.reqNumber = page.getByText('Number');
    this.reqUppercase = page.getByText('Uppercase letter');
    this.reqLowercase = page.getByText('Lowercase letter');
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/admin/settings`);
    await this.waitForReady();
  }

  async openProfileSettings() {
    await this.profileSettingsTab.click();
  }

  async openChangePassword() {
    await this.changePasswordTab.click();
  }

  async getFullName() {
    return this.fullNameInput.inputValue();
  }

  async fillFullName(name) {
    await this.fullNameInput.fill(name);
  }

  async saveProfile() {
    await this.saveChangesBtn.click();
  }

  async getEmailValue() {
    return this.emailInput.inputValue();
  }

  async isEmailDisabled() {
    return this.emailInput.isDisabled();
  }

  async uploadProfileImage(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  async fillCurrentPassword(password) {
    await this.currentPasswordInput.fill(password);
  }

  async fillNewPassword(password) {
    await this.newPasswordInput.fill(password);
  }

  async fillConfirmPassword(password) {
    await this.confirmPasswordInput.fill(password);
  }

  async changePassword(currentPassword, newPassword) {
    await this.fillCurrentPassword(currentPassword);
    await this.fillNewPassword(newPassword);
    await this.fillConfirmPassword(newPassword);
    await this.saveChangesBtn.click();
  }

  async toggleCurrentPasswordVisibility() {
    await this.currentPasswordToggle.click();
  }

  async toggleNewPasswordVisibility() {
    await this.newPasswordToggle.click();
  }

  async toggleConfirmPasswordVisibility() {
    await this.confirmPasswordToggle.click();
  }

  async getCurrentPasswordType() {
    return this.currentPasswordInput.getAttribute('type');
  }

  async getNewPasswordType() {
    return this.newPasswordInput.getAttribute('type');
  }

  async getConfirmPasswordType() {
    return this.confirmPasswordInput.getAttribute('type');
  }

  async isSaveChangesEnabled() {
    return this.saveChangesBtn.isEnabled();
  }

  async getSuccessMessage() {
    return this.page.getByRole('status').or(this.page.getByRole('dialog')).first();
  }

  async getErrorMessage() {
    return this.page.getByRole('alert').or(this.page.locator('[role="status"]'));
  }

  async dismissSuccessDialog() {
    const dialog = this.page.getByRole('dialog');
    const okBtn = dialog.getByRole('button', { name: 'Okay' });
    if (await okBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await okBtn.click();
    }
  }
}
