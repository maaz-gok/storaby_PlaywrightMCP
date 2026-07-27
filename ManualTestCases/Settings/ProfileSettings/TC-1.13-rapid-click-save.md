# TC-1.13 — Rapidly click Save Changes multiple times

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.13)

## Preconditions
- Logged in as admin, on Profile Settings tab with a valid change made to Full Name.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Enter a valid name in Full Name | Button becomes enabled |
| 2 | Rapidly click Save Changes 5+ times in succession | No more than 1–2 API requests are sent |
| 3 | Observe network activity | Duplicate submissions are debounced or rejected |

## Expected Result
Rapid clicking does not trigger duplicate submissions — the button is debounced, disabled during the request, or the API rejects duplicates.

## Test Data
| Field | Value |
|---|---|
| Full Name | Updated Admin Name |
