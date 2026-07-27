# TC-1.2 — Profile image is displayed

- **Priority:** P1
- **Type:** Smoke
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.2)

## Preconditions
- Logged in as admin, on Profile Settings tab.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Observe the profile image/avatar area | An image element is visible |
| 2 | Inspect the image `src` attribute | The `src` is a valid URL (not broken) |

## Expected Result
The profile image area displays a valid avatar or placeholder.

## Test Data
N/A
