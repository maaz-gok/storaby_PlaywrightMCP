# Status filtered list: all rows belong to selected status

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Select the "Printing" status filter and capture the response.


## Expected Result

- The response is `GET /admin/orders?status=PRINTING` with items whose status is `PRINTING`.
- Every rendered row shows the "Printing" status.
- Row order and order numbers match the API response items.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/data-consistency.spec.js` for implementation details.
