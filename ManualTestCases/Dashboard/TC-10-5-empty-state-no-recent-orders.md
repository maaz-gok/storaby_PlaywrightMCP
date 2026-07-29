# Empty state: No recent orders

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/loading-states.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- The Recent Orders table shows "No recent orders." empty message.
- No table rows are rendered.


## Notes

Refer to the automated test in `tests/admin/Dashboard/loading-states.spec.js` for implementation details.
