# TC-1.9 — Clear Full Name and verify validation

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.9)

## Preconditions
- Logged in as admin, on Profile Settings tab.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Clear the Full Name field completely | Field is empty |
| 2 | Click Save Changes | Validation error is shown indicating name is required |
| 3 | Observe the field | The field is marked invalid (`aria-invalid="true"`) |

## Expected Result
A required-field validation error prevents saving with an empty Full Name.

## Test Data
N/A
