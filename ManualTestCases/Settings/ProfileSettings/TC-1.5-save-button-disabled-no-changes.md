# TC-1.5 — Save Changes button is disabled when no changes made

- **Priority:** P1
- **Type:** Smoke
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.5)

## Preconditions
- Logged in as admin, on Profile Settings tab, no fields modified.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Observe the Save Changes button without modifying any field | The button is disabled (greyed out, not clickable) |

## Expected Result
The Save Changes button is disabled when the form has no unsaved changes (clean/dirty tracking).

## Test Data
N/A
