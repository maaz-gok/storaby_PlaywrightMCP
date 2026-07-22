# TC-1.1 — Login screen renders all expected elements

- **Priority:** P0
- **Type:** Smoke
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.1-login-page-render.spec.js`

## Preconditions
- Logged-out state (cleared cookies/local storage).

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/login` | Page loads with no errors |
| 2 | Observe the page heading | "Admin Login" heading is visible |
| 3 | Observe the form fields | `Email` and `Password` fields are visible, along with a "Show password" toggle icon |
| 4 | Observe the "Keep me signed in" checkbox | Checkbox is present and unchecked by default |
| 5 | Observe the remaining controls | "Forgot Password?" link and "Login" button are both visible, and the "Login" button is enabled |

## Expected Result
All login screen elements render correctly and the form is ready for input.

## Test Data
N/A
