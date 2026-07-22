# Manual Test Cases — Storaby Admin Login

Manual QA test cases for the scenarios covered by the automated Playwright suite in `tests/auth/`. Each file below corresponds 1:1 to an automated test that is currently passing against `https://staging.storaby.com/admin/login`.

Source plan: [specs/storaby-login.md](../../specs/storaby-login.md)

## Index

| Test Case ID | Title | Priority | Type | Automated Spec |
|---|---|---|---|---|
| [TC-1.1](TC-1.1-login-page-render.md) | Login screen renders all expected elements | P0 | Smoke | `tests/auth/1.1-login-page-render.spec.js` |
| [TC-1.2](TC-1.2-successful-login.md) | Successful login with valid credentials | P0 | Smoke, Critical | `tests/auth/1.2-successful-login.spec.js` |
| [TC-1.3](TC-1.3-empty-field-validation.md) | Empty form submission shows required-field validation | P1 | Regression | `tests/auth/1.3-empty-validation.spec.js` |
| [TC-1.4](TC-1.4-invalid-email-format.md) | Invalid email format shows a validation error | P1 | Regression | `tests/auth/1.4-invalid-email.spec.js` |
| [TC-1.5.1](TC-1.5.1-unknown-email.md) | Incorrect credentials — unknown email | P0 | Critical, Regression | `tests/auth/1.5-invalid-credentials.spec.js` |
| [TC-1.5.2](TC-1.5.2-wrong-password.md) | Incorrect credentials — correct email, wrong password | P0 | Critical, Regression | `tests/auth/1.5-invalid-credentials.spec.js` |
| [TC-1.6](TC-1.6-password-visibility-toggle.md) | Password visibility toggle | P2 | Regression | `tests/auth/1.6-password-toggle.spec.js` |
| [TC-1.7](TC-1.7-session-persistence.md) | Authenticated session persists across navigation/reload | P1 | Regression | `tests/auth/1.7-session-persistence.spec.js` |
| [TC-1.8](TC-1.8-authenticated-user-redirect.md) | Already-authenticated user visiting login is redirected | P1 | Regression | `tests/auth/1.8-authenticated-redirect.spec.js` |
| [TC-1.9](TC-1.9-route-guard.md) | Unauthenticated user is redirected from a protected route | P0 | Critical, Regression | `tests/auth/1.9-route-guard.spec.js` |
| [TC-1.10](TC-1.10-enter-key-submit.md) | Submitting the form via the Enter key | P2 | Regression | `tests/auth/1.10-enter-submit.spec.js` |
| [TC-1.11](TC-1.11-forgot-password-link.md) | Forgot Password link navigates to the correct screen | P2 | Regression | `tests/auth/1.11-forgot-password.spec.js` |

**Total: 12 test cases** (11 scenarios — TC-1.5 has two sub-cases, matching the two `test()` blocks in `1.5-invalid-credentials.spec.js`).

## Shared preconditions (apply to all test cases)

- Environment: `https://staging.storaby.com`
- Test account: `admin@storaby.com` / `Admin123!` (role `ADMIN`, status `ACTIVE`)
- Unless a test case says otherwise, start from a logged-out state (clear browser cookies and local storage first — the app stores the session in `localStorage` under the key `storaby-auth`, not a cookie).
