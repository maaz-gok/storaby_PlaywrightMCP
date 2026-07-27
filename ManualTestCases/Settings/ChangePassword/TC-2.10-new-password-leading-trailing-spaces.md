# TC-2.10 — New Password: leading/trailing spaces

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.10)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill New Password with `  NewAdmin456!  ` (leading/trailing spaces) | The "8+ characters" requirement indicator shows red (not met), or the password is trimmed |

## Expected Result
Passwords with surrounding whitespace are either rejected for length or the app trims them. The indicator remains unmet or reflects the trimmed value.

## Test Data
| Field | Value |
|---|---|
| New Password | "  NewAdmin456!  " (with leading/trailing spaces) |
