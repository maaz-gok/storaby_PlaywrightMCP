# TC-1.11 — Special characters and numbers in Full Name

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.11)

## Preconditions
- Logged in as admin, on Profile Settings tab.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Enter `@dm!n N@me!` (special characters and numbers) in Full Name | Value is accepted |
| 2 | Click Save Changes | If accepted: saved successfully. If rejected: validation error shown |

## Expected Result
The app either allows or rejects special characters in the Full Name field — observed behaviour: accepted and saved.

## Test Data
| Field | Value |
|---|---|
| Full Name | @dm!n N@me! |
