# Search by order number prefix returns matching orders

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Type "ST-8" in the search input and wait for the response.


## Expected Result

- A `GET /admin/orders?search=ST-8` request returns 200.
- All displayed rows have order numbers starting with "ST-8".
- At least one row is returned.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
