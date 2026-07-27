# Manual Test Cases — Storaby Admin Settings

Manual QA test cases for the scenarios covered by the automated Playwright suite in `tests/admin/Settings/`. Each file below corresponds 1:1 to an automated test that is currently passing against `https://staging.storaby.com/admin/settings`.

Source plan: [specs/admin-settings.md](../../specs/admin-settings.md)

## Index — Profile Settings

| Test Case ID | Title | Priority | Type | Automated Spec |
|---|---|---|---|---|
| [TC-1.1](ProfileSettings/TC-1.1-profile-settings-tab-loads.md) | Profile Settings tab loads successfully | P0 | Smoke | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.2](ProfileSettings/TC-1.2-profile-image-displayed.md) | Profile image is displayed | P1 | Smoke | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.3](ProfileSettings/TC-1.3-full-name-prefilled.md) | Full Name field is prefilled correctly | P1 | Smoke | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.4](ProfileSettings/TC-1.4-email-prefilled-disabled.md) | Email field is prefilled correctly and disabled | P1 | Smoke | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.5](ProfileSettings/TC-1.5-save-button-disabled-no-changes.md) | Save Changes button is disabled when no changes made | P1 | Smoke | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.6](ProfileSettings/TC-1.6-save-without-changes.md) | Save without making any changes | P2 | Regression | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.7](ProfileSettings/TC-1.7-update-full-name-valid.md) | Update Full Name with a valid value | P0 | Smoke, Critical | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.8](ProfileSettings/TC-1.8-leading-trailing-spaces.md) | Leading/trailing spaces in Full Name | P2 | Regression | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.9](ProfileSettings/TC-1.9-clear-full-name-validation.md) | Clear Full Name and verify validation | P1 | Regression | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.10](ProfileSettings/TC-1.10-very-long-full-name.md) | Very long Full Name | P2 | Regression | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.11](ProfileSettings/TC-1.11-special-chars-full-name.md) | Special characters and numbers in Full Name | P2 | Regression | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.12](ProfileSettings/TC-1.12-email-not-editable.md) | Email field is not editable | P1 | Regression | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.13](ProfileSettings/TC-1.13-rapid-click-save.md) | Rapidly click Save Changes multiple times | P2 | Regression | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |
| [TC-1.14](ProfileSettings/TC-1.14-refresh-persistence.md) | Refresh page and verify saved values persist | P0 | Critical, Smoke | `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` |

## Index — Change Password

| Test Case ID | Title | Priority | Type | Automated Spec |
|---|---|---|---|---|
| [TC-2.1](ChangePassword/TC-2.1-change-password-form-renders.md) | Change Password form renders all expected elements | P0 | Smoke | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.2](ChangePassword/TC-2.2-empty-submission-validation.md) | Empty submission validation | P1 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.3](ChangePassword/TC-2.3-incorrect-current-password.md) | Incorrect current password | P1 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.4](ChangePassword/TC-2.4-correct-current-valid-new.md) | Correct current password with valid new password (form acceptance) | P1 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.5](ChangePassword/TC-2.5-new-password-too-short.md) | New Password: less than 8 characters | P1 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.6](ChangePassword/TC-2.6-new-password-no-uppercase.md) | New Password: no uppercase letter | P2 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.7](ChangePassword/TC-2.7-new-password-no-lowercase.md) | New Password: no lowercase letter | P2 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.8](ChangePassword/TC-2.8-new-password-no-number.md) | New Password: no number | P2 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.9](ChangePassword/TC-2.9-new-password-spaces-only.md) | New Password: spaces only | P2 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.10](ChangePassword/TC-2.10-new-password-leading-trailing-spaces.md) | New Password: leading/trailing spaces | P2 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.11](ChangePassword/TC-2.11-new-password-extremely-long.md) | New Password: extremely long password | P2 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.12](ChangePassword/TC-2.12-confirm-password-mismatch.md) | Confirm Password: does not match New Password | P1 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.13](ChangePassword/TC-2.13-confirm-password-matches.md) | Confirm Password: matches exactly | P1 | Smoke, Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.14](ChangePassword/TC-2.14-reuse-current-password.md) | Reuse current password as new password | P1 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.15](ChangePassword/TC-2.15-requirement-indicators-typing.md) | Password requirement indicators update while typing | P2 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.16](ChangePassword/TC-2.16-save-button-states.md) | Save Changes button states | P1 | Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.17](ChangePassword/TC-2.17-visibility-toggle-independent.md) | Password visibility toggle works independently for each field | P1 | Smoke, Regression | `tests/admin/Settings/ChangePassword/change-password.spec.js` |
| [TC-2.18](ChangePassword/TC-2.18-full-password-change-flow.md) | Full password change flow: change, success, logout, verify old fails, verify new works | P0 | Smoke, Critical | `tests/admin/Settings/ChangePassword/change-password.spec.js` |

**Total: 32 test cases** (14 Profile Settings + 18 Change Password).

## Shared preconditions (apply to all test cases)

- Environment: `https://staging.storaby.com`
- Test account: `admin@storaby.com` / current password from `tests/data/users.json`
- Start from a logged-in state on `/admin/settings`. The Profile Settings tab is active by default. For Change Password scenarios, click the "Change Password" tab first.
