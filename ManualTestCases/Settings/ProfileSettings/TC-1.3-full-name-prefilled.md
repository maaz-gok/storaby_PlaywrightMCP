# TC-1.3 — Full Name field is prefilled correctly

- **Priority:** P1
- **Type:** Smoke
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.3)

## Preconditions
- Logged in as admin, on Profile Settings tab.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Observe the Full Name input | Field is visible and contains the admin user's current name |
| 2 | Verify the value is non-empty | The input has a truthy value |

## Expected Result
The Full Name field is pre-populated with the logged-in admin's name.

## Test Data
N/A
