# TC-2.16 — Save Changes button states

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.16)

## Preconditions
- Logged in as admin, on Change Password form.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Observe the Save Changes button when form is empty | Button may be enabled or disabled |
| 2 | Fill all three fields with valid values | Button is enabled |
| 3 | Change a field to an invalid value | Button may remain enabled (form always allows submission; validation occurs on submit) |

## Expected Result
The Save Changes button remains enabled for Change Password regardless of field state — validation errors appear on submit, not by disabling the button.

## Test Data
| Field | Value |
|---|---|
| Current Password | (current admin password) |
| New Password | NewAdmin456! |
| Confirm New Password | NewAdmin456! |
