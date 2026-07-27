# TC-1.4 — Email field is prefilled correctly and disabled

- **Priority:** P1
- **Type:** Smoke
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.4)

## Preconditions
- Logged in as admin, on Profile Settings tab.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Observe the Email input | Field is visible and displays `admin@storaby.com` |
| 2 | Attempt to type in the Email field | The field is disabled/read-only — cannot be modified |

## Expected Result
The Email field shows the correct admin email and is not editable.

## Test Data
| Field | Value |
|---|---|
| Expected email | admin@storaby.com |
