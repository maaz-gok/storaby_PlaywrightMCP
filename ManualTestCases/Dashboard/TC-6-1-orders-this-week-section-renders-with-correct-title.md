# Orders This Week section renders with correct title

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/orders-this-week.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Section title is "Order this week".
- A bar chart is rendered with 7 bars (one per day, Sunday–Saturday).
- Y-axis shows percentage values: 0%, 20%, 40%, 60%, 80%, 100%.
- X-axis shows day labels: Sun, Mon, Tue, Wed, Thu, Fri, Sat.


## Notes

Refer to the automated test in `tests/admin/Dashboard/orders-this-week.spec.js` for implementation details.
