# TC-2.12 — Confirm Password: does not match New Password

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.12)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill Current Password with the current admin password | Value accepted |
| 2 | Fill New Password with `NewAdmin456!` | Value accepted |
| 3 | Fill Confirm New Password with `DifferentMismatch1!` | Value does NOT match New Password |
| 4 | Click Save Changes | Error message: "Passwords do not match" or equivalent is displayed |
| 5 | Observe that no navigation occurs | Still on `/admin/settings` |

## Expected Result
A mismatched confirmation password is rejected with a clear client-side error.

## Test Data
| Field | Value |
|---|---|
| Current Password | (current admin password) |
| New Password | NewAdmin456! |
| Confirm New Password | DifferentMismatch1! |
