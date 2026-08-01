# Search by customer name returns filtered results

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Type "usman" in the search input and wait for the response.


## Expected Result

- A `GET /admin/orders?search=usman` request returns 200 with at least one item.
- Results are filtered to orders whose customer name or email contains "usman" (case-insensitive).

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
