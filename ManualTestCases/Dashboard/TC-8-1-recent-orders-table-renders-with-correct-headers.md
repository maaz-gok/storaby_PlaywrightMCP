# Recent Orders table renders with correct headers

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/recent-orders.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Section title is "Recent Orders".
- A "View All" button is visible in the section header.
- Table headers are: "Order ID", "Customer", "Story", "Status", "Action".
- The table displays up to 10 rows.
- Each row has a visible action button (aria-label "Order actions").


## Notes

Refer to the automated test in `tests/admin/Dashboard/recent-orders.spec.js` for implementation details.
