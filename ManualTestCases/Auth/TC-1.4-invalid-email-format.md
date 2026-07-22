# TC-1.4 — Invalid email format shows a validation error

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.4-invalid-email.spec.js`

## Preconditions
- Logged-out state.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/login` | Login page loads |
| 2 | Enter `not-an-email` in the Email field | Value is accepted into the field |
| 3 | Enter any non-empty value in the Password field | Value is accepted into the field |
| 4 | Click "Login" | No navigation occurs |
| 5 | Observe the Email field | Field is marked invalid; inline message "Enter a valid email" is shown |
| 6 | Observe the Password field | Field is NOT marked invalid, since it has a non-empty value — error state is per-field |

## Expected Result
Only the Email field is flagged, with the correct format-specific message.

## Test Data
| Field | Value |
|---|---|
| Email | not-an-email |
| Password | somepassword |
