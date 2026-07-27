# TC-2.7 — New Password: no lowercase letter

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.7)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill New Password with `NEWADMIN456!` (all uppercase) | The "Lowercase letter" requirement indicator shows red (not met) |

## Expected Result
A password without any lowercase letter fails the lowercase requirement. The indicator remains unmet.

## Test Data
| Field | Value |
|---|---|
| New Password | NEWADMIN456! |
