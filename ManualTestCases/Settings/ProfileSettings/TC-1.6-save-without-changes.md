# TC-1.6 — Save without making any changes

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.6)

## Preconditions
- Logged in as admin, on Profile Settings tab, fields in original state.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Observe the Save Changes button without modifying any field | Button is disabled (form tracks dirty state) |
| 2 | Attempt to click Save Changes | No network request fires; no error occurs |

## Expected Result
The form prevents submission when no changes have been made. No unexpected behavior occurs.

## Test Data
N/A
