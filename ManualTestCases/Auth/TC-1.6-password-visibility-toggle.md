# TC-1.6 — Password visibility toggle

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.6-password-toggle.spec.js`

## Preconditions
- Logged-out state.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/login` | Login page loads |
| 2 | Enter `TestVisibility1!` in the Password field | Value is masked (dots/asterisks) |
| 3 | Click the "Show password" icon | The typed value becomes readable plain text, unchanged |
| 4 | Observe the toggle icon | Its accessible label switches to "Hide password" |

## Expected Result
The toggle reveals/masks the password without altering the entered value.

## Test Data
| Field | Value |
|---|---|
| Password | TestVisibility1! |
