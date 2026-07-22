# TC-1.11 — Forgot Password link navigates to the correct screen

- **Priority:** P2
- **Type:** Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.11-forgot-password.spec.js`

## Preconditions
- Logged-out state, on the `/admin/login` page.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/login` | Login page loads |
| 2 | Click "Forgot Password?" | Browser navigates to `/admin/forgot-password` |
| 3 | Observe the new screen | "Forgot Password" heading is visible |
| 4 | Observe the form | An Email field and a "Send verification code" button are visible |
| 5 | Observe the footer link | A "Back to sign in" link is present and points back to `/admin/login` |

## Expected Result
The Forgot Password entry point correctly opens the password-reset request screen.

## Test Data
N/A

## Notes
- This covers only the navigation entry point. The full reset flow (submitting the forgot-password form, verification code, setting a new password) is out of scope for this test case and should be covered by a separate plan.
