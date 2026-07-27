# Test Plan: Admin Settings — Profile Settings & Change Password

**Target:** https://staging.storaby.com/admin/settings
**Seed:** tests/seed.spec.js
**Date:** 2026-07-27

## Overview

Covers the full Admin Settings screen at `/admin/settings` after a successful login. Two tabs are tested exhaustively: **Profile Settings** (field display, validation, image upload, persistence) and **Change Password** (field-level validation, password policy, visibility toggle, successful change, post-change login verification). Network, console, UI, and accessibility observations are collected throughout.

## Preconditions

- Staging environment reachable at `https://staging.storaby.com`.
- A known-good admin account exists: `admin@storaby.com` / `Admin123!` (role `ADMIN`, status `ACTIVE`).
- A valid new password for the successful-change scenario: `NewAdmin456!`.
- Test image assets available: a valid small PNG/JPG (< 1 MB), an unsupported file type (e.g. `.svg`, `.webp`), and an oversized image (> 5 MB if there is a size limit, else > 10 MB).
- Browser storage is cleared before the first scenario; session established via standard `/admin/login` flow.
- The test changes the shared account password — the password must be reset after the run, or a dedicated test account must be used.

## Scenarios

---

### Feature Group 1 — Profile Settings Tab

#### Scenario 1.1 — Profile Settings tab loads successfully
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated as admin, navigate to `/admin/settings`.
- **Steps:**
  1. Log in with `admin@storaby.com` / `Admin123!` — expected: redirect to `/admin/dashboard`.
  2. Navigate to `https://staging.storaby.com/admin/settings` — expected: settings page loads, Profile Settings tab is active by default.
- **Assertions:**
  - Profile Settings tab is visually selected/active.
  - No console errors on page load.
  - No failed network requests.
- **Edge cases considered:**
  - Direct navigation vs. in-app navigation.

#### Scenario 1.2 — Profile image is displayed
- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** On Profile Settings tab.
- **Steps:**
  1. Observe the profile image/avatar area — expected: an image is displayed (default avatar or uploaded photo).
- **Assertions:**
  - An `<img>` element (or avatar placeholder) is visible in the profile section.
  - The image has a valid `src` (not broken).
- **Edge cases considered:**
  - If no image is uploaded, a placeholder/initials avatar may be shown — still valid.

#### Scenario 1.3 — Full Name field is prefilled correctly
- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** On Profile Settings tab.
- **Steps:**
  1. Observe the Full Name input — expected: prefilled with the admin user's current name.
- **Assertions:**
  - Full Name field is visible and not empty.
  - The value matches the logged-in user's name (from API or token).
- **Edge cases considered:**
  - Compare value against user data from auth state or a profile API response.

#### Scenario 1.4 — Email field is prefilled correctly
- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** On Profile Settings tab.
- **Steps:**
  1. Observe the Email input — expected: prefilled with `admin@storaby.com`.
- **Assertions:**
  - Email field is visible and displays `admin@storaby.com`.
- **Edge cases considered:**
  - Check if the email field is read-only or editable — this determines test approach in later scenarios.

#### Scenario 1.5 — Save Changes button state
- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** On Profile Settings tab, no changes made yet.
- **Steps:**
  1. Observe the Save Changes button — expected: disabled or enabled depending on whether the form is "dirty".
- **Assertions:**
  - If the form tracks dirty state, Save Changes is disabled when no changes are made.
  - If the form does not track dirty state, Save Changes is always enabled.
- **Edge cases considered:**
  - The button should be enabled when a field is modified, disabled when reverted to original value (if dirty tracking exists).

---

#### Scenario 1.6 — Save without making any changes
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Profile Settings tab, fields are in their original state.
- **Steps:**
  1. Click Save Changes without modifying any field — expected: either a "no changes" message, a successful save (idempotent), or the button remains disabled (if dirty-tracked).
- **Assertions:**
  - No error occurs.
  - If the API is called, it returns success or a "nothing to update" response.
- **Edge cases considered:**
  - If dirty-tracked, the button should be disabled and clicking it should be impossible.

#### Scenario 1.7 — Update Full Name with a valid value
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** On Profile Settings tab.
- **Steps:**
  1. Note the current Full Name value.
  2. Clear the field and enter a new valid name (e.g. `Updated Admin Name`).
  3. Click Save Changes — expected: success toast/message.
- **Assertions:**
  - Success message is visible.
  - No console errors.
  - API response confirms the update.
- **Edge cases considered:**
  - Restore original name after verification, OR treat this test as the new baseline for subsequent tests.

#### Scenario 1.8 — Leading/trailing spaces in Full Name
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Profile Settings tab.
- **Steps:**
  1. Enter `  Spaced Name  ` (with leading and trailing spaces) in Full Name.
  2. Click Save Changes — expected: validation error OR the app trims spaces automatically.
- **Assertions:**
  - If trimmed: saved value should be `Spaced Name` (no leading/trailing spaces).
  - If rejected: validation error shown for invalid input.
- **Edge cases considered:**
  - Both outcomes are valid depending on app design — document which one occurs.

#### Scenario 1.9 — Clear Full Name and verify validation
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On Profile Settings tab.
- **Steps:**
  1. Clear the Full Name field completely.
  2. Click Save Changes — expected: validation error indicating name is required.
- **Assertions:**
  - Inline error or toast: "Full Name is required" or equivalent.
  - Save is rejected, field is marked invalid.
- **Edge cases considered:**
  - The field may be allowed to be empty — note the behavior.

#### Scenario 1.10 — Very long Full Name
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Profile Settings tab.
- **Steps:**
  1. Enter a string > 255 characters (or the field's `maxlength` if visible) in Full Name.
  2. Click Save Changes — expected: validation error or truncation.
- **Assertions:**
  - If truncated: the saved value is within the character limit.
  - If rejected: a clear error message is shown.
- **Edge cases considered:**
  - Check if the input enforces `maxlength` attribute natively (browser prevents typing beyond it).

#### Scenario 1.11 — Special characters and numbers in Full Name
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Profile Settings tab.
- **Steps:**
  1. Enter values with special characters (e.g. `@dm!n N@me!`) and numbers (e.g. `Admin123456`).
  2. Click Save Changes — expected: validation error OR successful save depending on app policy.
- **Assertions:**
  - If rejected: specific error message about invalid characters.
  - If accepted: name is saved as entered.
- **Edge cases considered:**
  - Names may legitimately contain hyphens, apostrophes, or periods — the app should distinguish between valid and invalid special characters.

#### Scenario 1.12 — Email field behaviour (editable or read-only)
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On Profile Settings tab.
- **Steps:**
  1. Attempt to type in the Email field — expected: either editable or read-only.
- **Assertions:**
  - If read-only: the input has `readonly` attribute or is disabled; a tooltip/note may explain why.
  - If editable: verify client-side email format validation (see auth login scenarios).
- **Edge cases considered:**
  - Email is commonly read-only on admin profile settings (change is done via a separate flow).

#### Scenario 1.13 — Upload a valid profile image
- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** On Profile Settings tab. A valid image file available (e.g. `avatar.png`, < 1 MB).
- **Steps:**
  1. Click the profile image upload area/button.
  2. Select a valid image file — expected: preview updates, no error.
  3. Save Changes — expected: success toast.
- **Assertions:**
  - Profile image preview updates to the uploaded image.
  - After refresh, the new image persists.
- **Edge cases considered:**
  - Test both PNG and JPG formats.

#### Scenario 1.14 — Upload unsupported file types
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Profile Settings tab. An unsupported file available (e.g. `test.svg`, `test.webp`, `test.pdf`).
- **Steps:**
  1. Click the profile image upload area/button.
  2. Select an unsupported file type — expected: validation error.
- **Assertions:**
  - Error message indicates the file type is not supported (e.g. "Please upload a PNG or JPG image").
  - The file input is cleared/reset.
- **Edge cases considered:**
  - The browser's native `accept` attribute may filter the file picker — test bypassing it via drag-and-drop if possible.

#### Scenario 1.15 — Upload an oversized image
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Profile Settings tab. An oversized image (> 5 MB or the app's limit) available.
- **Steps:**
  1. Click the profile image upload area/button.
  2. Select an oversized file — expected: validation error.
- **Assertions:**
  - Error message indicates the file exceeds the size limit (e.g. "File must be less than 5 MB").
- **Edge cases considered:**
  - Check if the app enforces size on the client side or only on the server.

#### Scenario 1.16 — Rapidly click Save Changes multiple times
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Profile Settings tab, a valid change made (dirty state).
- **Steps:**
  1. Make a change to Full Name.
  2. Click Save Changes rapidly 5+ times — expected: only one request fires, or subsequent clicks are debounced/disabled.
- **Assertions:**
  - Only one successful API request is sent (no duplicate submissions).
  - No console errors.
- **Edge cases considered:**
  - If the button is not debounced, multiple saves may cause race conditions.

#### Scenario 1.17 — Refresh page and verify saved values persist
- **Priority:** P0
- **Tags:** @critical @smoke
- **Preconditions:** A successful save was performed in a prior scenario (e.g. name updated).
- **Steps:**
  1. Reload the page (`Ctrl+R` / `Cmd+R`).
  2. Observe the Full Name field — expected: displays the previously saved value.
- **Assertions:**
  - The saved value persists after page refresh.
  - Profile image (if changed) also persists.
- **Edge cases considered:**
  - Ensures the backend persists the data, not just local state.

---

### Feature Group 2 — Change Password Tab

#### Scenario 2.1 — Change Password form renders all expected elements
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on `/admin/settings`.
- **Steps:**
  1. Click the "Change Password" tab/section — expected: form fields appear.
  2. Observe all form elements — expected: Current Password, New Password, Confirm New Password fields, password visibility toggles for each, password requirement indicators.
- **Assertions:**
  - All three password fields are visible.
  - Each field has a visibility toggle (eye icon).
  - Password requirement indicators are visible (8+ characters, number, uppercase, lowercase).
  - No console errors.
- **Edge cases considered:**
  - The form may be on a separate tab or an expandable section within Profile Settings.

#### Scenario 2.2 — Empty submission validation
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On Change Password form, all fields empty.
- **Steps:**
  1. Click the submit/change button without filling any field — expected: validation errors for all three fields.
- **Assertions:**
  - "Current Password is required" or equivalent.
  - "New Password is required" or equivalent.
  - "Confirm New Password is required" or equivalent.
  - No network request fires.
- **Edge cases considered:**
  - Field-level vs. form-level error display.

#### Scenario 2.3 — Incorrect current password
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill Current Password with `WrongPassword999!`, New Password with `NewAdmin456!`, Confirm New Password with `NewAdmin456!`.
  2. Click submit — expected: error message indicating incorrect current password.
- **Assertions:**
  - Error message displayed (e.g. "Current password is incorrect").
  - No navigation occurs.
  - API request returns a failure status.
- **Edge cases considered:**
  - Error may be a toast or inline near the Current Password field.

#### Scenario 2.4 — Correct current password with valid new password
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On Change Password form. This scenario only checks field acceptance, NOT submission (submission is Scenario 2.12).
- **Steps:**
  1. Fill Current Password with `Admin123!`.
  2. Fill New Password with `NewAdmin456!`.
  3. Fill Confirm New Password with `NewAdmin456!`.
  4. Observe that the Save Changes button becomes enabled and requirement indicators show all met.
- **Assertions:**
  - All password requirement indicators show green/check (8+ chars, number, uppercase, lowercase).
  - Submit button is enabled.
- **Edge cases considered:**
  - This validates the form is ready for submission.

#### Scenario 2.5 — New Password: less than 8 characters
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill Current Password with `Admin123!`.
  2. Fill New Password with `Abc1!` (6 characters).
  3. Fill Confirm New Password with `Abc1!`.
- **Assertions:**
  - Requirement indicator for "8+ characters" shows red/x (not met).
  - Submit button is disabled OR clicking it shows validation error.
- **Edge cases considered:**
  - Boundary: 7 chars should fail, 8 chars should pass.

#### Scenario 2.6 — New Password: no uppercase letter
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill New Password with `newadmin456!`.
- **Assertions:**
  - Requirement indicator for "Uppercase letter" shows red/x (not met).
- **Edge cases considered:**
  - Only lowercase, numbers, and special characters — should fail the uppercase requirement.

#### Scenario 2.7 — New Password: no lowercase letter
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill New Password with `NEWADMIN456!`.
- **Assertions:**
  - Requirement indicator for "Lowercase letter" shows red/x (not met).
- **Edge cases considered:**
  - Only uppercase, numbers, and special characters.

#### Scenario 2.8 — New Password: no number
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill New Password with `NewAdmin!`.
- **Assertions:**
  - Requirement indicator for "Number" shows red/x (not met).
- **Edge cases considered:**
  - Only letters and special characters, no digits.

#### Scenario 2.9 — New Password: spaces only
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill New Password with `     ` (only spaces).
  2. Fill Confirm New Password with `     `.
- **Assertions:**
  - Validation error for spaces-only input, or requirement indicators all show unmet.
- **Edge cases considered:**
  - Some apps trim spaces and treat it as empty.

#### Scenario 2.10 — New Password: leading/trailing spaces
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill New Password with `  NewAdmin456!  `.
  2. Fill Confirm New Password with `  NewAdmin456!  `.
- **Assertions:**
  - Check if the app trims spaces or rejects them.
  - If trimmed: requirement indicators should show all met (content is valid).
  - If rejected: validation error shown.
- **Edge cases considered:**
  - Important for UX — space handling varies across apps.

#### Scenario 2.11 — New Password: extremely long password
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill New Password with a 200+ character string meeting complexity requirements.
  2. Fill Confirm New Password with the same.
- **Assertions:**
  - Check if the app enforces a maximum length.
  - If enforced: validation error or truncation.
  - If not enforced: requirement indicators should show all met (confirming the app accepts long passwords gracefully).
- **Edge cases considered:**
  - Very long inputs may cause UI layout issues or performance problems.

#### Scenario 2.12 — Confirm Password: does not match New Password
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill Current Password with `Admin123!`.
  2. Fill New Password with `NewAdmin456!`.
  3. Fill Confirm New Password with `DifferentMismatch1!`.
- **Assertions:**
  - Validation error: "Passwords do not match" or equivalent.
  - The error is shown on the Confirm New Password field.
  - Submit button is disabled OR submission is rejected.
- **Edge cases considered:**
  - Match check is usually client-side — verify no request fires.

#### Scenario 2.13 — Confirm Password: matches exactly
- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill New Password with `NewAdmin456!`.
  2. Fill Confirm New Password with the exact same value — expected: match indicator shows green/check.
- **Assertions:**
  - No mismatch error.
  - Requirement indicators update correctly.
- **Edge cases considered:**
  - Case-sensitive vs. case-insensitive comparison — verify the standard.

#### Scenario 2.14 — Reuse current password as new password
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill Current Password with `Admin123!`.
  2. Fill New Password with `Admin123!` (same as current).
  3. Fill Confirm New Password with `Admin123!`.
  4. Click submit — expected: validation error or API rejection.
- **Assertions:**
  - Error message: "New password must be different from current password" or equivalent.
- **Edge cases considered:**
  - This may be client-side (comparing fields) or server-side enforced.

#### Scenario 2.15 — Password requirement indicators update while typing
- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Type characters into New Password field one by one — expected: requirement indicators toggle from red (unmet) to green (met) as the input satisfies each rule.
- **Assertions:**
  - Each indicator updates in real time as the corresponding rule is met.
- **Edge cases considered:**
  - Deleting characters should revert indicators back to unmet state.

#### Scenario 2.16 — Save Changes button behaviour
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Observe button state when form is invalid (empty/mismatch/weak) — expected: disabled.
  2. Fill all fields with valid values — expected: enabled.
  3. Submit and observe button state during the request — expected: disabled or shows loading spinner.
  4. After success/error response — expected: re-enabled.
- **Assertions:**
  - Button is disabled when form is invalid.
  - Button shows loading/disabled state during API request.
  - Button is re-enabled after response.
- **Edge cases considered:**
  - Prevent double-submission during the API call.

#### Scenario 2.17 — Password visibility toggle works independently for each field
- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** On Change Password form, all three fields have values.
- **Steps:**
  1. Click the visibility toggle on Current Password — expected: Current Password becomes visible, others remain masked.
  2. Click the visibility toggle on New Password — expected: New Password becomes visible, others unchanged.
  3. Click the visibility toggle on Confirm New Password — expected: Confirm New Password becomes visible.
  4. Toggle each back to hidden — expected: each field re-masks independently.
- **Assertions:**
  - Each field's `type` attribute toggles independently between `password` and `text`.
  - The toggle button's accessible name updates (Show/Hide).
- **Edge cases considered:**
  - Toggling one field should not affect the others.

#### Scenario 2.18 — Successful password change
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** On Change Password form.
- **Steps:**
  1. Fill Current Password with `Admin123!`.
  2. Fill New Password with `NewAdmin456!`.
  3. Fill Confirm New Password with `NewAdmin456!`.
  4. Click Save/Change Password — expected: API accepts, success message appears.
- **Assertions:**
  - Success toast/message visible (e.g. "Password changed successfully").
  - No console errors.
  - API response has success status.
  - All password fields are cleared after success.
- **Edge cases considered:**
  - [CRITICAL] Shared staging account password is now changed — reset after test.

#### Scenario 2.19 — Success message appearance and content
- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Scenario 2.18 executed successfully.
- **Steps:**
  1. Observe the success message — expected: a visible, dismissible toast or banner.
- **Assertions:**
  - Message is visible on screen.
  - Text clearly indicates the password was changed successfully.
  - Message auto-dismisses or has a close/dismiss action.
- **Edge cases considered:**
  - No duplicate success messages.
  - Verify the message is accessible (role="status" or similar).

#### Scenario 2.20 — Log out
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Password was changed (Scenario 2.18), still authenticated.
- **Steps:**
  1. Click the Logout button/menu option — expected: session cleared, redirect to login.
- **Assertions:**
  - URL is `/admin/login`.
  - `localStorage['storaby-auth']` is cleared or null.
- **Edge cases considered:**
  - Logout should clear all session data.

#### Scenario 2.21 — Login with old password fails
- **Priority:** P0
- **Tags:** @critical @regression
- **Preconditions:** Logged out, password was changed in Scenario 2.18.
- **Steps:**
  1. Navigate to `/admin/login`.
  2. Fill Email with `admin@storaby.com`, Password with `Admin123!` (old password).
  3. Click Login — expected: authentication fails.
- **Assertions:**
  - Error message "Incorrect email or password" is shown.
  - URL remains `/admin/login`.
- **Edge cases considered:**
  - Confirms the old password is truly invalidated server-side.

#### Scenario 2.22 — Login with new password succeeds
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Logged out, password was changed in Scenario 2.18.
- **Steps:**
  1. On `/admin/login`, fill Email with `admin@storaby.com`, Password with `NewAdmin456!`.
  2. Click Login — expected: successful authentication.
- **Assertions:**
  - URL navigates to `/admin/dashboard`.
  - Dashboard heading "Welcome storaby!" is visible.
- **Edge cases considered:**
  - Confirms the new password is immediately active.

---

## Network/API Inspection

- Capture the request payload for the password change API.
- Verify the response status code and body.
- Check for duplicate requests (when rapidly clicking).
- Check browser console for errors throughout all scenarios.
- Inspect the profile update API payloads.

## UI / Visual Checks (across all scenarios)

- Alignment of form fields and labels.
- Responsive layout (test at 1280px, 768px, 375px viewport widths).
- Keyboard navigation and logical Tab order.
- Labels associated with each field via `for` attribute or `aria-label`.
- Placeholder text in empty fields.
- Button states: disabled, enabled, loading, hover.
- Loading spinner during save operations.

## Screenshots to capture

- Initial Profile Settings tab (before editing).
- After successful profile save (name update, image upload).
- Validation errors (empty name, long name, special characters, unsupported file, oversized file).
- Change Password initial form.
- Each validation error (empty fields, incorrect current, mismatch, weak password, spaces, re-use).
- Password requirement indicators in progress (partial typing).
- Success message after password change.
- Login error with old password.
- Dashboard after login with new password.
- Any UI defects found.

## Debugging data on failure

- Continue testing all remaining scenarios.
- Capture screenshot of the failure state.
- Capture browser console logs.
- Capture the failed network request and response payload.
- Record exact step-by-step reproduction steps.

## Report summary format

At the end of execution, produce a comprehensive report containing:
- **Passed checks** — list of scenarios that passed.
- **Failed checks** — list of scenarios that failed with reproduction steps.
- **Functional bugs** — issues affecting core functionality.
- **UI bugs** — visual/layout issues.
- **Validation issues** — missing, incorrect, or inconsistent validation.
- **Accessibility observations** — ARIA roles, focus order, color contrast, labels.
- **Console errors** — JS errors, warnings, deprecations.
- **API failures** — unexpected status codes, payload issues, network errors.
- **Overall assessment** — pass/fail/blocked summary and recommendation.

## Not covered (and why)

- **Profile image crop/edit** — if the app offers crop/zoom on upload, it's not tested.
- **Forgot password / reset via email** — covered separately in the login plan.
- **Rate-limiting on change-password endpoint** — not observed; not asserted.
- **Password history / re-use beyond current password** — if the app blocks re-using the last N passwords, this is not tested.
- **Security scanning (XSS, SQLi)** — out of scope for this functional plan.
- **Accessibility audit** — no axe/core scan was run; manual observations only.
