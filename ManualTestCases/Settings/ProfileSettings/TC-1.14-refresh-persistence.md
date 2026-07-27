# TC-1.14 — Refresh page and verify saved values persist

- **Priority:** P0
- **Type:** Critical, Smoke
- **Module:** Admin Settings — Profile Settings
- **Automated:** Yes — `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` (test 1.14)

## Preconditions
- Logged in as admin. A prior save operation was performed (e.g. name was updated).

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Note the current value of Full Name | Value is visible and known |
| 2 | Reload the page (Cmd+R / Ctrl+R) | Page reloads, profile settings tab is active |
| 3 | Observe the Full Name field | The previously saved value is still displayed — unchanged from before the reload |

## Expected Result
Profile settings persist across page refreshes — the backend persists the data, not just the local UI state.

## Test Data
N/A (uses the saved state from a preceding test)
