# Search with leading/trailing spaces

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Type `"  usman  "` (spaces around the query) in the search input.


## Expected Result

- The API request is sent with the query trimmed (`search=usman`).
- The request returns 200 and results are returned.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
