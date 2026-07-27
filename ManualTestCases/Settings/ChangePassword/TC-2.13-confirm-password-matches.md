# TC-2.13 — Confirm Password: matches exactly

- **Priority:** P1
- **Type:** Smoke, Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.13)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill Current Password with the current admin password | Value accepted |
| 2 | Fill New Password with `NewAdmin456!` | Value accepted, requirement indicators all green |
| 3 | Fill Confirm New Password with the exact same value (`NewAdmin456!`) | Confirm matches New Password — no mismatch error |
| 4 | Observe the Save Changes button | Button is enabled |

## Expected Result
When Confirm Password matches New Password exactly, no mismatch error is shown and the form is ready for submission.

## Test Data
| Field | Value |
|---|---|
| Current Password | (current admin password) |
| New Password | NewAdmin456! |
| Confirm New Password | NewAdmin456! |
