# Test Plan: Storaby Admin Login

**Target:** https://staging.storaby.com/admin/login
**Seed:** tests/seed.spec.js
**Date:** 2026-07-22

## Overview

Covers the Admin Login screen at `/admin/login`: rendering of all form elements, client-side validation, authentication (success and failure paths), session/route-guard behavior, and the two auxiliary controls on the screen (password visibility toggle, Forgot Password link). Explored live against staging using a scripted Chromium session (accessibility snapshots + network capture); not covered via the Copilot browser tools since this environment doesn't expose them.

## Preconditions

- Staging environment reachable at `https://staging.storaby.com`.
- A known-good admin account exists: `admin@storaby.com` / `Admin123!` (role `ADMIN`, status `ACTIVE`).
- Browser storage (localStorage, cookies) is cleared before each test — the app persists the session in `localStorage` under the key `storaby-auth`, not in a cookie, so a dirty storage state will falsely appear "already logged in."
- No rate-limiting/lockout was observed after repeated failed attempts during exploration; do not assume one exists.

## Scenarios

### Scenario 1.1 — Login screen renders all expected elements
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Logged-out state (cleared storage), navigate to `/admin/login`.
- **Steps:**
  1. Navigate to `/admin/login` — expected: page loads, no console errors, title contains "Storaby".
  2. Observe the form — expected: heading "Admin Login", subtext "Sign in to continue to your dashboard.", `Email` textbox (placeholder `admin@storaby.com`), `Password` textbox (placeholder masked), "Show password" toggle button, "Keep me signed in" checkbox (unchecked by default), "Forgot Password?" link, "Login" button.
- **Assertions:**
  - `getByRole('heading', { name: 'Admin Login' })` is visible.
  - `getByRole('button', { name: 'Login' })` is visible and enabled.
  - `getByRole('checkbox', { name: 'Keep me signed in' })` is unchecked by default.
- **Edge cases considered:**
  - Page must not auto-redirect if storage is genuinely empty (covered separately in 1.9).
  - Visual/layout regression is out of scope here — this is structural/role-based only.

### Scenario 1.2 — Successful login with valid credentials
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Logged-out state. Valid admin credentials available.
- **Steps:**
  1. Fill `Email` with `admin@storaby.com` — expected: value accepted, no inline error.
  2. Fill `Password` with `Admin123!` — expected: value accepted, masked.
  3. Click "Login" — expected: `POST /auth/login` fires, app navigates to `/admin/dashboard`.
- **Assertions:**
  - `page` URL becomes `/admin/dashboard`.
  - Dashboard heading "Welcome storaby!" is visible (confirms authenticated state, not just a URL change).
  - `localStorage['storaby-auth']` contains a `token` and `user.email === 'admin@storaby.com'`.
- **Edge cases considered:**
  - Submitting via the "Login" button vs. pressing `Enter` in the password field (both were confirmed to submit the form — see 1.10).
  - The auth API always returns HTTP 201 as the transport status, even on failure — the real result is in the JSON body (`status`, `message`). Do not assert on HTTP status code; assert on UI state per `AGENTS.md`'s web-first assertion rule.

### Scenario 1.3 — Empty form submission shows required-field validation
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Logged-out state, form fields empty.
- **Steps:**
  1. Click "Login" without filling any field — expected: no navigation, no network call fires.
- **Assertions:**
  - `Email` field is marked invalid (`aria-invalid="true"`) and inline text "Email is required" is visible.
  - `Password` field is marked invalid and inline text "Password is required" is visible.
- **Edge cases considered:**
  - Validation is fully client-side — confirmed no `/auth/login` request fires for this case.

### Scenario 1.4 — Invalid email format shows a validation error
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Logged-out state.
- **Steps:**
  1. Fill `Email` with `not-an-email` (no `@`) and `Password` with any non-empty value.
  2. Click "Login" — expected: no navigation.
- **Assertions:**
  - `Email` field is marked invalid and inline text "Enter a valid email" is visible.
  - The `Password` field is not flagged invalid once it has a non-empty value (error state is per-field, not global).
- **Edge cases considered:**
  - `email` input has `maxlength="254"`; not exercised here but worth a boundary check if this scenario is expanded later.
  - Values like `a@b` (no TLD) or trailing whitespace were not verified against the validator — flagged as untested, not assumed passing or failing.

### Scenario 1.5 — Incorrect credentials show a generic error message
- **Priority:** P0
- **Tags:** @critical @regression
- **Preconditions:** Logged-out state. Well-formed but wrong credentials.
- **Steps:**
  1. Fill `Email` with a syntactically valid but non-existent/wrong address (e.g. `wrong@storaby.com`) and any password — expected: `POST /auth/login` fires, response body carries `status: 401`.
  2. Click "Login" — expected: no navigation, an alert/status region shows "Incorrect email or password."
  3. Repeat with the real admin email (`admin@storaby.com`) but a wrong password — expected: identical message.
- **Assertions:**
  - `getByRole('status')` (or equivalent alert region) shows exactly "Incorrect email or password." in both cases.
  - The message text is identical whether the email or the password was wrong — confirms the app does not leak whether an account exists (no user-enumeration via error text).
  - URL remains `/admin/login`.
- **Edge cases considered:**
  - Confirmed via network capture that both the "unknown email" and "correct email, wrong password" cases return the same body — this is the behavior worth locking in with an assertion, not just "an error appears."
  - Repeated-failure/lockout behavior was not observed and is not asserted on.

### Scenario 1.6 — Password visibility toggle
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Logged-out state.
- **Steps:**
  1. Fill `Password` with any value — expected: input renders masked (`type="password"`).
  2. Click the "Show password" button — expected: input becomes plain text (`type="text"`).
- **Assertions:**
  - Password input `type` attribute changes from `password` to `text` after the toggle, and the typed value remains unchanged.
  - Button's accessible name reflects the new state (verify whether it becomes "Hide password" — observed only the initial "Show password" label during exploration).
- **Edge cases considered:**
  - Toggling should not clear or mutate the field's value — confirmed during exploration.

### Scenario 1.7 — Authenticated session persists across navigation/reload
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Start logged in (valid `storaby-auth` entry in localStorage from a prior login).
- **Steps:**
  1. Navigate directly to `/admin/dashboard` (fresh navigation, not an in-app link) — expected: dashboard loads without bouncing to login.
- **Assertions:**
  - URL stays at `/admin/dashboard`.
  - Dashboard content (e.g. "Welcome storaby!") renders — confirms the session, not just the route, survived.
- **Edge cases considered:**
  - This only verifies same-session persistence within one browser context; multi-tab or cross-context session-sharing was not tested.

### Scenario 1.8 — Already-authenticated user visiting the login page is redirected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Start logged in.
- **Steps:**
  1. Navigate directly to `/admin/login` — expected: immediate redirect.
- **Assertions:**
  - Final URL is `/admin/dashboard`, not `/admin/login`.
- **Edge cases considered:**
  - Confirmed this redirect is unconditional (no query param like `?redirect=` observed to return the user to an original destination) — worth re-checking if deep-linking is added later.

### Scenario 1.9 — Unauthenticated user is redirected away from a protected route
- **Priority:** P0
- **Tags:** @critical @regression
- **Preconditions:** Logged-out state (cleared localStorage/cookies).
- **Steps:**
  1. Navigate directly to `/admin/dashboard` without a session — expected: redirect to login.
- **Assertions:**
  - Final URL is `/admin/login`.
- **Edge cases considered:**
  - This is the core route-guard check; only `/admin/dashboard` was verified. Other admin routes (`/admin/orders`, `/admin/support` , seen in the post-login nav) were not individually checked and are assumed to share the same guard — flagged as an assumption, not a verified fact.

### Scenario 1.10 — Submitting the form via the Enter key
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Logged-out state, valid credentials available.
- **Steps:**
  1. Fill `Email` and `Password` with valid credentials.
  2. Press `Enter` while focus is in the `Password` field — expected: form submits identically to clicking "Login".
- **Assertions:**
  - Navigation to `/admin/dashboard` occurs, same as Scenario 1.2.
- **Edge cases considered:**
  - Only tested `Enter` from the password field; not tested from the email field.

### Scenario 1.11 — Forgot Password link navigates to the correct screen
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Logged-out state, on `/admin/login`.
- **Steps:**
  1. Click "Forgot Password?" — expected: navigation to `/admin/forgot-password`.
- **Assertions:**
  - URL is `/admin/forgot-password`.
  - Heading "Forgot Password" and an `Email` field plus a "Send verification code" button are visible.
  - A "Back to sign in" link is present and its `href`/target is `/admin/login`.
- **Edge cases considered:**
  - The actual password-reset flow (submitting the forgot-password form, code verification) is a separate feature area and is intentionally out of scope for this login-focused plan (see Not covered).

## Not covered (and why)

- **Full forgot-password / reset-password flow** — only the entry link from the login screen was verified (Scenario 1.11); the rest is a distinct feature area deserving its own plan.
- **Logout flow and post-login dashboard functionality** — out of scope; this plan is login-only per the request.
- **Rate limiting / account lockout after repeated failed attempts** — not observed during exploration; no evidence either way, so nothing is asserted.
- **"Keep me signed in" checkbox's actual effect on session duration** — its presence and toggle-ability weren't turned into a scenario because the *behavioral difference* (e.g. shorter-lived session when unchecked) could not be verified without a much longer-running test; flagged here so a future plan can dig in.
- **Multi-tab / multi-context session behavior** — not tested.
- **Input hardening (XSS/SQLi-style payloads in the login fields)** — security-focused testing is out of scope for this functional plan.
- **Security note (not a scenario, but worth flagging to a human reviewer):** the access token, refresh token, and user object are stored in plain `localStorage` (key `storaby-auth`) rather than an `httpOnly` cookie. This is a legitimate app-design detail, not a test scenario, but it means any XSS elsewhere in the admin app could exfiltrate the session — worth a separate security review.
- **Copilot browser tools** (`browser_navigate`, `browser_snapshot`, etc.) referenced in `playwright-test-planner.agent.md` were unavailable in this session; exploration was instead performed with a scripted Playwright/Chromium session driven directly. Functionally equivalent (same accessibility-tree and network data), but noting the substitution for traceability.
