# TC-1.8 — Leading/trailing spaces in Full Name

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.8)

## Preconditions
- Logged in as admin, on Profile Settings tab.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Enter `  Spaced Name  ` (with leading and trailing spaces) in Full Name | Value is accepted |
| 2 | Click Save Changes | If trimmed: saved value is `Spaced Name` (no surrounding spaces). If rejected: validation error shown |

## Expected Result
The app handles surrounding whitespace by trimming it or showing a clear validation error.

## Test Data
| Field | Value |
|---|---|
| Full Name | "  Spaced Name  " (with leading/trailing spaces) |
