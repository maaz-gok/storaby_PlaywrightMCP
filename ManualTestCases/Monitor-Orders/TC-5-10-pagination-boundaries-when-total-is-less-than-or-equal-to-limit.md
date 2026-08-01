# Pagination boundaries when total <= limit

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Select the "Paid" status filter (few results).


## Expected Result

- When the result set fits on a single page, all four pagination buttons are disabled.
- The single page of results is displayed.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/pagination.spec.js` for implementation details.
