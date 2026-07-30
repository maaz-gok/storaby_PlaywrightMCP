# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin/Settings/ProfileSettings/capture-bug-evidence.spec.js >> capture settings page
- Location: tests/admin/Settings/ProfileSettings/capture-bug-evidence.spec.js:12:1

# Error details

```
Error: ENOENT: no such file or directory, stat '/Users/mac/Desktop/Storaby/Resources/LargeFile.png'
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - complementary [ref=e6]:
    - generic [ref=e7]:
      - img "Storaby" [ref=e8]
      - button "Collapse sidebar" [ref=e9]:
        - img [ref=e10]
    - navigation "Admin" [ref=e12]:
      - link "Dashboard" [ref=e13] [cursor=pointer]:
        - /url: /admin/dashboard
        - img [ref=e14]
        - generic [ref=e19]: Dashboard
      - link "Monitor Orders" [ref=e20] [cursor=pointer]:
        - /url: /admin/orders
        - img [ref=e21]
        - generic [ref=e25]: Monitor Orders
      - link "Templates" [ref=e26] [cursor=pointer]:
        - /url: /admin/templates
        - img [ref=e27]
        - generic [ref=e29]: Templates
  - generic [ref=e30]:
    - banner [ref=e32]:
      - generic [ref=e33]:
        - heading "Profile Settings" [level=1] [ref=e35]
        - button "admin admin usman+admin@geeksofkolachi.com" [ref=e38]:
          - img "admin" [ref=e39]
          - generic [ref=e40]:
            - generic [ref=e41]: admin
            - generic [ref=e42]: usman+admin@geeksofkolachi.com
          - img [ref=e43]
    - main [ref=e45]:
      - generic [ref=e46]:
        - generic [ref=e47]:
          - button "Profile Settings" [ref=e48]
          - button "Change Password" [ref=e49]
        - generic [ref=e51]:
          - heading "Profile Settings" [level=2] [ref=e52]
          - generic [ref=e54]:
            - img "admin" [ref=e55]
            - button "Choose File" [ref=e56]
            - button "Change profile photo" [active] [ref=e57]:
              - img [ref=e58]
          - generic [ref=e61]:
            - generic [ref=e62]:
              - text: Full Name
              - textbox "Full Name" [ref=e64]:
                - /placeholder: Enter full name
                - text: admin
            - generic [ref=e65]:
              - text: Email
              - textbox "Email" [disabled] [ref=e67]:
                - /placeholder: admin@storaby.com
                - text: usman+admin@geeksofkolachi.com
          - button "Save Changes" [disabled] [ref=e69]
```

# Test source

```ts
  1  | import { test } from '../../../../src/fixtures/base';
  2  | import { LoginPage } from '../../../../src/pages/LoginPage';
  3  | import { SettingsPage } from '../../../../src/pages/SettingsPage';
  4  | import { BASE_URL } from '../../../../src/utils/config';
  5  | import users from '../../../data/users.json' with { type: 'json' };
  6  | import path from 'path';
  7  | import { fileURLToPath } from 'url';
  8  | 
  9  | const __dirname = path.dirname(fileURLToPath(import.meta.url));
  10 | const resourcesDir = path.resolve(__dirname, '../../../../Resources');
  11 | 
  12 | test('capture settings page', async ({ page }) => {
  13 |   const login = new LoginPage(page);
  14 |   await login.goto();
  15 |   await login.login(users.admin.email, users.admin.password);
  16 |   await page.waitForURL('**/admin/dashboard', { timeout: 30000 });
  17 |   await page.waitForLoadState('networkidle');
  18 |   const settings = new SettingsPage(page);
  19 |   await settings.goto();
  20 |   await page.waitForLoadState('networkidle');
  21 | 
  22 |   // Click change profile photo to see what happens
  23 |   const btn = page.getByRole('button', { name: 'Change profile photo' });
  24 |   console.log('Change photo button visible:', await btn.isVisible());
  25 |   await btn.click();
  26 | 
  27 |   // Check what appeared
  28 |   const fileInput = page.locator('input[type="file"]');
  29 |   console.log('File input visible:', await fileInput.isVisible());
  30 |   console.log('File input count:', await fileInput.count());
  31 | 
  32 |   // Upload large file
> 33 |   await fileInput.setInputFiles([path.join(resourcesDir, 'LargeFile.png')]);
     |   ^ Error: ENOENT: no such file or directory, stat '/Users/mac/Desktop/Storaby/Resources/LargeFile.png'
  34 |   await page.waitForLoadState('networkidle');
  35 | 
  36 |   // Save
  37 |   await settings.saveProfile();
  38 |   await page.waitForLoadState('networkidle');
  39 | 
  40 |   await page.screenshot({ path: 'Resources/bug-evidence-settings.png', fullPage: true });
  41 |   console.log('Screenshot saved');
  42 | });
  43 | 
```