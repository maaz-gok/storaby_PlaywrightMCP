# Next page loads new data

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Click "Next page".


## Expected Result

- An API request fires: `GET /admin/orders?page=2&limit=10`.
- 10 rows are displayed.
- The first order number on page 2 differs from page 1.
- Pagination text updates to `11-20 of <total>`.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/pagination.spec.js` for implementation details.
