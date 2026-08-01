# Search and status filter combination

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Select the "Printing" status filter.
4. Type "usman" in the search input and wait for the combined response.


## Expected Result

- The API request includes both `status=PRINTING` and `search=usman` and returns 200.
- All displayed rows have the "Printing" status.
- At least one row is returned.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
