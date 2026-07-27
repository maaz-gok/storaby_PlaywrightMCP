# Bug: Change Password allows current and new password to match

## Summary
The Admin Settings Change Password flow permits the user to submit a new password that is identical to the current password.

## Steps to reproduce
1. Log in as admin using the current credentials.
2. Navigate to `/admin/settings`.
3. Open the `Change Password` tab.
4. Enter the current password in the `Current Password` field.
5. Enter the same password in the `New Password` and `Confirm New Password` fields.
6. Click `Save Changes`.

## Actual result
The form accepts the submission and does not enforce a rule preventing the new password from being the same as the current password.

## Expected result
The application should reject the change and display a validation error stating that the new password must differ from the current password.

## Environment
- Repository: Storaby
- Flow: Admin Settings > Change Password
- Test data: `tests/data/users.json`

## Related tests
- `tests/admin/Settings/ChangePassword/change-password.spec.js`
- `tests/admin/Settings/ProfileSettings/profile-settings.spec.js`

## Notes
This is a functional validation bug and should be addressed before the Change Password workflow is considered complete.
