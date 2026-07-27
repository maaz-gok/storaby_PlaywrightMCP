# TC-2.4 — Correct current password with valid new password (form acceptance)

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.4)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill Current Password with the current admin password | Value accepted |
| 2 | Fill New Password with `NewAdmin456!` | All requirement indicators show green (all met) |
| 3 | Fill Confirm New Password with the same new password | Confirm matches New Password |
| 4 | Observe the Save Changes button | Button is enabled |

## Expected Result
When all fields are filled with valid values, the form is ready for submission (button enabled, requirements met). This scenario only validates form acceptance, not submission.

## Test Data
| Field | Value |
|---|---|
| Current Password | (current admin password) |
| New Password | NewAdmin456! |
| Confirm New Password | NewAdmin456! |
