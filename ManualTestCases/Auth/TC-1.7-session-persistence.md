# TC-1.7 — Authenticated session persists across navigation/reload

- **Priority:** P1
- **Type:** Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.7-session-persistence.spec.js`

## Preconditions
- Start logged in as `admin@storaby.com` (complete TC-1.2 first, or log in as a setup step).

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | While logged in, type `https://staging.storaby.com/admin/dashboard` directly into the address bar and navigate (a fresh page load, not an in-app link click) | The dashboard loads directly, without bouncing back to the login page |
| 2 | Observe the dashboard | "Welcome storaby!" heading is visible, confirming the session — not just the route — survived the fresh navigation |

## Expected Result
A hard reload/direct navigation to a protected route does not lose the session.

## Test Data
N/A (uses the logged-in session from TC-1.2)
