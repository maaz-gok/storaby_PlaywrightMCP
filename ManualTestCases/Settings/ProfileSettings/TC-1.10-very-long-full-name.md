# TC-1.10 — Very long Full Name

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.10)

## Preconditions
- Logged in as admin, on Profile Settings tab.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Enter a string exceeding the character limit (e.g. 80+ characters) in Full Name | The input enforces a maximum length — cannot type beyond the limit |
| 2 | Observe the actual value in the field | The value is truncated to the app's maximum allowed length |

## Expected Result
The Full Name field enforces a maximum character limit (observed limit: 50 characters).

## Test Data
| Field | Value |
|---|---|
| Full Name | A very long name that exceeds the maximum character limit of fifty characters in this field right here |
