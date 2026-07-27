# TC-2.3 — Incorrect current password

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.3)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill Current Password with `WrongPassword999!` | Value is accepted |
| 2 | Fill New Password with `NewAdmin456!` | Value is accepted |
| 3 | Fill Confirm New Password with `NewAdmin456!` | Value matches New Password |
| 4 | Click Save Changes | Error message is displayed: "Incorrect current password." or equivalent |
| 5 | Observe the URL | No navigation occurs — still on `/admin/settings` |

## Expected Result
An incorrect current password is rejected with a clear error message and no navigation occurs.

## Test Data
| Field | Value |
|---|---|
| Current Password | WrongPassword999! |
| New Password | NewAdmin456! |
| Confirm New Password | NewAdmin456! |
