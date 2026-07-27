# TC-2.18 — Full password change flow: change, success, logout, verify old fails, verify new works

- **Priority:** P0
- **Type:** Smoke, Critical
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.18)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill Current Password with the current admin password | Value accepted |
| 2 | Fill New Password with `NewAdmin456!` | Value accepted, all requirement indicators green |
| 3 | Fill Confirm New Password with `NewAdmin456!` | Confirm matches New Password |
| 4 | Click Save Changes | Success message visible: text contains "success", "updated", or "changed" |
| 5 | Observe the form fields | All three password fields are cleared |
| 6 | Dismiss the success dialog | Dialog closes |
| 7 | Click the user menu (admin@storaby.com) | Dropdown opens showing "Sign out" |
| 8 | Click "Sign out" | Redirected to `/admin/login` |
| 9 | Attempt login with the *old* password | Login fails — "Incorrect email or password." shown, URL remains `/admin/login` |
| 10 | Login with the *new* password (`NewAdmin456!`) | Login succeeds — navigates to `/admin/dashboard` with welcome heading visible |

## Expected Result
The full password change lifecycle works end-to-end: a new password is set, the user can log out, the old password is rejected, and the new password grants access.

## Test Data
| Field | Value |
|---|---|
| Current Password | (current admin password) |
| New Password | NewAdmin456! |
| Confirm New Password | NewAdmin456! |

## Notes
- After verification, the original password is restored automatically by the automated test.
- This is a destructive test of the shared admin account password. If interrupted, the password may remain changed.
