# TC-2.15 — Password requirement indicators update while typing

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Settings — Change Password
- **Automated:** Yes — `tests/admin/Settings/ChangePassword/change-password.spec.js` (test 2.15)

## Preconditions
- Logged in as admin, on Change Password form, New Password field empty.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | With New Password empty, observe all four indicators | All indicators show red (unmet): uppercase, lowercase, number, 8+ characters |
| 2 | Type characters one by one that satisfy each rule | Each indicator toggles from red (unmet) to green (met) as its rule is satisfied |

## Expected Result
Password requirement indicators update in real time as the user types, providing immediate visual feedback on which rules are met.

## Test Data
N/A
