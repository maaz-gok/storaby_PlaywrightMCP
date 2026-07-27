# TC-2.6 — New Password: no uppercase letter

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.6)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill New Password with `newadmin456!` (all lowercase) | The "Uppercase letter" requirement indicator shows red (not met) |

## Expected Result
A password without any uppercase letter fails the uppercase requirement. The indicator remains unmet.

## Test Data
| Field | Value |
|---|---|
| New Password | newadmin456! |
