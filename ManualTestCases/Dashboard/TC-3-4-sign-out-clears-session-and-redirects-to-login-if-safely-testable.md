# Sign out clears session and redirects to login (if safely testable)

## Summary

**Priority:** P1
**Type:** @critical @regression
**Automated Spec:** `tests/admin/Dashboard/admin-profile.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- URL becomes `/admin/login`.
- `localStorage['storaby-auth']` is null or removed.
- Navigating to `/admin/dashboard` redirects back to login.


## Notes

Refer to the automated test in `tests/admin/Dashboard/admin-profile.spec.js` for implementation details.
