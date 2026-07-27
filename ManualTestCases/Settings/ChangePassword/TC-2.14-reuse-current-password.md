# TC-2.14 — Reuse current password as new password

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.14)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Fill Current Password with the current admin password | Value accepted |
| 2 | Fill New Password with the same value as Current Password | Value accepted (matches current) |
| 3 | Fill Confirm New Password with the same value | Confirm matches New Password |
| 4 | Click Save Changes | A success dialog may appear (the API may accept the same password as an idempotent operation) |

## Expected Result
Reusing the current password as the new password may succeed (idempotent) or be rejected — observed behaviour: success dialog appears.

## Test Data
| Field | Value |
|---|---|
| Current Password | (current admin password) |
| New Password | (same as current admin password) |
| Confirm New Password | (same as current admin password) |
