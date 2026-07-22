# TC-1.10 — Submitting the form via the Enter key

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.10-enter-submit.spec.js`

## Preconditions
- Logged-out state.
- Valid admin credentials available.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/login` | Login page loads |
| 2 | Enter `admin@storaby.com` in the Email field | Value accepted |
| 3 | Enter `Admin123!` in the Password field, keeping focus in that field | Value accepted |
| 4 | Press the `Enter` key (do not click "Login") | Form submits exactly as if "Login" had been clicked |
| 5 | Observe the result | Page navigates to `/admin/dashboard` |

## Expected Result
Pressing Enter from the password field is a valid way to submit the login form.

## Test Data
| Field | Value |
|---|---|
| Email | admin@storaby.com |
| Password | Admin123! |
