# TC-1.9 — Unauthenticated user is redirected from a protected route

- **Priority:** P0
- **Type:** Critical, Regression
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.9-route-guard.spec.js`

## Preconditions
- Logged-out state (cleared cookies/local storage).

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Without logging in, navigate directly to `https://staging.storaby.com/admin/dashboard` | The app does not show the dashboard |
| 2 | Observe the final URL | Browser is redirected to `/admin/login` |

## Expected Result
The dashboard route is protected — no direct/deep-link access without a valid session.

## Test Data
N/A

## Notes
- Only `/admin/dashboard` was verified. Other admin routes (`/admin/orders`, `/admin/support`) are assumed to share the same guard but were not individually checked.
