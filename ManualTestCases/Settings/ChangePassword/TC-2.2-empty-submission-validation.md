# TC-2.2 — Empty submission validation

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.2)

## Preconditions
- Logged in as admin, on Change Password form, all fields empty.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Click Save Changes without filling any field | No navigation occurs |
| 2 | Observe the error messages | "Current password is required" and "New password is required" (or equivalent) are displayed |

## Expected Result
Submitting an empty Change Password form shows validation errors for all required fields.

## Test Data
N/A
