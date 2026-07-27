# TC-2.1 — Change Password form renders all expected elements

- **Priority:** P0
- **Type:** Smoke
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.1)

## Preconditions
- Logged in as admin, on `/admin/settings`.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Click the "Change Password" tab | Change Password form appears |
| 2 | Observe the form fields | Current Password, New Password, and Confirm New Password fields are visible |
| 3 | Observe the password requirement indicators | Four indicators are visible: 8+ characters, contains a number, contains uppercase, contains lowercase |
| 4 | Observe the visibility toggles | Each password field has a visibility toggle (eye icon) |

## Expected Result
All Change Password form elements render correctly: three password fields, visibility toggles for each, and password requirement indicators.

## Test Data
N/A
