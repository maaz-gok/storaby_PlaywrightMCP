# TC-2.9 — New Password: spaces only

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.9)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill New Password with 5 space characters (`     `) | The "8+ characters" requirement indicator shows red (not met) |

## Expected Result
A spaces-only password does not satisfy the minimum length requirement (spaces count toward character count but the value is not a valid password).

## Test Data
| Field | Value |
|---|---|
| New Password | (5 space characters) |
