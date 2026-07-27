# TC-1.7 — Update Full Name with a valid value

- **Priority:** P0
- **Type:** Smoke, Critical
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.7)

## Preconditions
- Logged in as admin, on Profile Settings tab.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Clear the Full Name field | Field is empty |
| 2 | Enter `Updated Admin Name` in Full Name | Value is accepted |
| 3 | Observe the Save Changes button | Button becomes enabled |
| 4 | Click Save Changes | A success toast/message is displayed |
| 5 | Navigate away and back, or refresh | Updated name persists |

## Expected Result
The Full Name is updated successfully with a success confirmation shown.

## Test Data
| Field | Value |
|---|---|
| Full Name | Updated Admin Name |

## Notes
- This test changes the shared admin name. Subsequent profile tests use the updated name as the new baseline.
- The dashboard welcome heading will reflect the updated name (e.g. "Welcome Updated!").
