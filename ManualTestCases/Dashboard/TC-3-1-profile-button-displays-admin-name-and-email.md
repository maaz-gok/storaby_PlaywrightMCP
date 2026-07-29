# Profile button displays admin name and email

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/admin-profile.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- The profile section displays the admin avatar image.
- The admin display name is visible (e.g. "updated admin name").
- The admin email is visible (e.g. "usman+admin@geeksofkolachi.com").
- The avatar `alt` attribute matches the admin name.


## Notes

Refer to the automated test in `tests/admin/Dashboard/admin-profile.spec.js` for implementation details.
