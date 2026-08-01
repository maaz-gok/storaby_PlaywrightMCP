# Orders list API returns 200

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- `GET /admin/orders?page=1&limit=10` returns status 200.
- The response body contains `data.items`, `data.total`, `data.page` (1), `data.limit` (10), and `data.totalPages`.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/data-consistency.spec.js` for implementation details.
