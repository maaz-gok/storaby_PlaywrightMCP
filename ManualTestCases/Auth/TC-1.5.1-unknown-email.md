# TC-1.5.1 — Incorrect credentials: unknown email

- **Priority:** P0
- **Type:** Critical, Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.5-invalid-credentials.spec.js` (test 1 of 2)

## Preconditions
- Logged-out state.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/login` | Login page loads |
| 2 | Enter `wrong@storaby.com` in the Email field | Value accepted (well-formed email) |
| 3 | Enter `WrongPass123!` in the Password field | Value accepted |
| 4 | Click "Login" | No navigation occurs; page stays on `/admin/login` |
| 5 | Observe the error message | A message reading exactly "Incorrect email or password." is shown |

## Expected Result
The app rejects the login and shows a generic error — it must not reveal whether the email exists in the system.

## Test Data
| Field | Value |
|---|---|
| Email | wrong@storaby.com |
| Password | WrongPass123! |

## Notes
- Compare against TC-1.5.2: the message text must be identical in both cases, so the app never leaks whether the account exists.
