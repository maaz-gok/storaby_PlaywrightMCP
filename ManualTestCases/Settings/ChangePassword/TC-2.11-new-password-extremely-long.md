# TC-2.11 — New Password: extremely long password

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.11)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill New Password with a 100+ character string meeting complexity rules | The input enforces a maximum length — the actual typed value is truncated |

## Expected Result
The New Password field enforces a maximum character limit (observed limit: 50 characters).

## Test Data
| Field | Value |
|---|---|
| New Password | A1b#A1b#A1b#A1b#A1b#A1b#A1b#A1b#A1b#A1b#... (100+ chars) |
