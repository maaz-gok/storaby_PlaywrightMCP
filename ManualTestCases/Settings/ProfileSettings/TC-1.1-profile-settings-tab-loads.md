# TC-1.1 — Profile Settings tab loads successfully

- **Priority:** P0
- **Type:** Smoke
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.1)

## Preconditions
- Logged in as admin on `/admin/settings`.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/settings` | Settings page loads with no errors |
| 2 | Observe the active tab | Profile Settings tab is visually selected/active |
| 3 | Observe the page URL | URL is `/admin/settings` |

## Expected Result
The Profile Settings section loads without errors and is the default active tab.

## Test Data
N/A
