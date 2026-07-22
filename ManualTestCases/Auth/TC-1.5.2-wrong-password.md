# TC-1.5.2 — Incorrect credentials: correct email, wrong password

- **Priority:** P0
- **Type:** Critical, Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.5-invalid-credentials.spec.js` (test 2 of 2)

## Preconditions
- Logged-out state.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/login` | Login page loads |
| 2 | Enter `admin@storaby.com` (the real admin email) in the Email field | Value accepted |
| 3 | Enter `WrongPassword999!` in the Password field | Value accepted |
| 4 | Click "Login" | No navigation occurs; page stays on `/admin/login` |
| 5 | Observe the error message | A message reading exactly "Incorrect email or password." is shown |

## Expected Result
The app rejects the login with the same generic error as TC-1.5.1 — a real account with a wrong password produces an identical message to a nonexistent account, confirming no user-enumeration is possible.

## Test Data
| Field | Value |
|---|---|
| Email | admin@storaby.com |
| Password | WrongPassword999! |
