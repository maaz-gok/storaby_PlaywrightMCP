# TC-2.17 — Password visibility toggle works independently for each field

- **Priority:** P1
- **Type:** Smoke, Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.17)

## Preconditions
- Logged in as admin, on Change Password form with all three fields filled.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Click the visibility toggle on Current Password | Current Password becomes visible (`type="text"`); others remain masked |
| 2 | Click the visibility toggle on Current Password again | Current Password re-masks (`type="password"`) |
| 3 | Click the visibility toggle on New Password | New Password becomes visible; others remain masked |
| 4 | Click the visibility toggle on New Password again | New Password re-masks |
| 5 | Click the visibility toggle on Confirm New Password | Confirm New Password becomes visible; others remain masked |
| 6 | Click the visibility toggle on Confirm New Password again | Confirm New Password re-masks |

## Expected Result
Each password field's visibility toggle works independently — toggling one field does not affect the others.

## Test Data
| Field | Value |
|---|---|
| Current Password | (any value) |
| New Password | (any value) |
| Confirm New Password | (any value) |
