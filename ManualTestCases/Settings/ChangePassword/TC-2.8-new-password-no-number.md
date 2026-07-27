# TC-2.8 — New Password: no number

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.8)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill New Password with `NewAdmin!` (no digits) | The "Number" requirement indicator shows red (not met) |

## Expected Result
A password without any numeric digit fails the number requirement. The indicator remains unmet.

## Test Data
| Field | Value |
|---|---|
| New Password | NewAdmin! |
