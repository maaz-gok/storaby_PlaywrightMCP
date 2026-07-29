# "View All" navigates to orders management page

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/recent-orders.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- URL becomes `/admin/orders`.
- Page heading is "Order Management".
- "Monitor Orders" sidebar item is highlighted as active.
- The orders page shows a full table with additional columns: "Transaction", "Transaction Date".
- The orders page has a search input (placeholder "Search anything...").
- The orders page has a "Statuses" filter dropdown.
- The orders page has pagination showing e.g. "1-10 of 63".
- Row-level action buttons ("Order actions") are also present.


## Notes

Refer to the automated test in `tests/admin/Dashboard/recent-orders.spec.js` for implementation details.
