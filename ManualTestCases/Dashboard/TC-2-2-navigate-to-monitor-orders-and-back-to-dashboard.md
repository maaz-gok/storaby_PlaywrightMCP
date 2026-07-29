# Navigate to Monitor Orders and back to Dashboard

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/sidebar-navigation.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- After step 1: URL is `/admin/orders`, page heading is "Order Management".
- Monitor Orders nav item is highlighted as active.
- Dashboard nav item is not active.
- After step 4: URL is `/admin/dashboard`, Dashboard nav item is highlighted as active.


## Notes

Refer to the automated test in `tests/admin/Dashboard/sidebar-navigation.spec.js` for implementation details.
