# TC-1.8 — Already-authenticated user visiting login is redirected

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.8-authenticated-redirect.spec.js`

## Preconditions
- Start logged in as `admin@storaby.com` (complete TC-1.2 first, or log in as a setup step).

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | While logged in, navigate directly to `https://staging.storaby.com/admin/login` | The app immediately redirects away from the login page |
| 2 | Observe the final URL | Browser lands on `/admin/dashboard`, not `/admin/login` |

## Expected Result
An authenticated user can never see the login form again without logging out first.

## Test Data
N/A (uses the logged-in session from TC-1.2)
