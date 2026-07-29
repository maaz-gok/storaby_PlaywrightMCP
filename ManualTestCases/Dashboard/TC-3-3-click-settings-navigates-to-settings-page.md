# Click Settings navigates to settings page

## Summary

**Priority:** P1
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Dashboard/admin-profile.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- URL changes to `/admin/settings`.
- Settings page heading "Profile Settings" is visible.
- Both "Profile Settings" and "Change Password" tabs are present.


## Notes

Refer to the automated test in `tests/admin/Dashboard/admin-profile.spec.js` for implementation details.
