# Profile dropdown opens with Settings and Sign out

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/admin-profile.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- A dropdown menu appears with `role="menu"`.
- Menu contains "Settings" option.
- Menu contains "Sign out" option.
- Admin name and email are displayed at the top of the dropdown.


## Notes

Refer to the automated test in `tests/admin/Dashboard/admin-profile.spec.js` for implementation details.
