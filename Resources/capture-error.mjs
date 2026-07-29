import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resourcesDir = path.resolve(__dirname);
const filePath = path.join(resourcesDir, 'LargeFile.png');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();

// Login
await page.goto('https://staging.storaby.com/admin/login');
await page.waitForLoadState('networkidle');
await page.getByLabel('Email', { exact: true }).fill('maaz@geeksofkolachi.com');
await page.getByRole('textbox', { name: 'Password', exact: true }).fill('QA_Maaz00');
await page.getByRole('button', { name: 'Login', exact: true }).click();
await page.waitForURL('**/admin/dashboard');
await page.waitForLoadState('networkidle');

// Go to settings
await page.goto('https://staging.storaby.com/admin/settings');
await page.waitForLoadState('networkidle');

// Upload large file
const fileInput = page.locator('input[type="file"]');
await fileInput.setInputFiles(filePath);

// Click Save
const saveBtn = page.getByRole('button', { name: /save/i });
await saveBtn.click();

// Wait for error/status message
await page.waitForTimeout(3000);

// Screenshot
await page.screenshot({ path: path.join(resourcesDir, 'bug-evidence-settings.png'), fullPage: true });
console.log('Screenshot saved');

// Log what's visible
const visibleText = await page.locator('body').innerText();
console.log('=== Page text after save ===');
const lines = visibleText.split('\n').filter(l => l.trim());
lines.forEach(l => console.log('  >', l.trim()));

await browser.close();
