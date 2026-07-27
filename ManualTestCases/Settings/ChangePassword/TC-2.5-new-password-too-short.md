# TC-2.5 — New Password: less than 8 characters

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.5)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill New Password with `Ab1!` (4 characters) | The "8+ characters" requirement indicator shows red (not met) |
| 2 | Observe the other indicators | The "contains number", "contains uppercase", "contains lowercase" indicators may show red or green depending on the input |

## Expected Result
A password shorter than 8 characters fails the minimum length requirement. The "8+ characters" indicator remains unmet.

## Test Data
| Field | Value |
|---|---|
| New Password | Ab1! |
