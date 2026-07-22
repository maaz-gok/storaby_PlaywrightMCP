# TC-1.2 — Successful login with valid credentials

- **Priority:** P0
- **Type:** Smoke, Critical
- **Module:** Admin Login
- **Automated:** Yes — `tests/auth/1.2-successful-login.spec.js`

## Preconditions
- Logged-out state.
- Valid admin credentials available.

## Test Steps

| # | Step | Expected Result |
|---|---|---|
| 1 | Navigate to `https://staging.storaby.com/admin/login` | Login page loads |
| 2 | Enter `admin@storaby.com` in the Email field | Value is accepted, no inline error shown |
| 3 | Enter `Admin123!` in the Password field | Value is accepted and masked |
| 4 | Click "Login" | Page navigates to `/admin/dashboard` |
| 5 | Observe the dashboard | "Welcome storaby!" heading is visible, confirming an authenticated session (not just a URL change) |

## Expected Result
The user is authenticated and lands on the dashboard with a valid session established.

## Test Data
| Field | Value |
|---|---|
| Email | admin@storaby.com |
| Password | Admin123! |

## Notes
- The backend's `/auth/login` call returns HTTP 201 as its transport status even on failed logins (the real result is in the response body) — testers should judge success/failure purely by what the UI shows, not by inspecting network status codes.
