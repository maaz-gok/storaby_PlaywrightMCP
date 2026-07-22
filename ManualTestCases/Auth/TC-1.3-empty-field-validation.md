# TC-1.3 — Empty form submission shows required-field validation

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.3-empty-validation.spec.js`

## Preconditions
- Logged-out state.
- Both Email and Password fields are empty.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/login` | Login page loads |
| 2 | Without entering anything, click "Login" | No navigation occurs; no login request is sent |
| 3 | Observe the Email field | Field is marked invalid; inline message "Email is required" is shown |
| 4 | Observe the Password field | Field is marked invalid; inline message "Password is required" is shown |

## Expected Result
Both fields show a required-field error, and the form is not submitted.

## Test Data
N/A (fields left empty)
