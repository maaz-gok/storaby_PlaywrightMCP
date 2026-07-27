# TC-1.12 — Email field is not editable

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.12)

## Preconditions
- Logged in as admin, on Profile Settings tab.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Attempt to type in the Email field | The input is disabled — keystrokes are not accepted |
| 2 | Observe the field's HTML attributes | The input has a `disabled` attribute |

## Expected Result
The Email field is read-only and cannot be modified from the Profile Settings page.

## Test Data
N/A
