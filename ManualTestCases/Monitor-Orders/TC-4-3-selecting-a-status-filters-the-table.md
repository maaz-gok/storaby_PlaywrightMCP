# Selecting a status filters the table

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/status-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Open the "Statuses" dropdown and select "Printing".


## Expected Result

- An API request fires: `GET /admin/orders?page=1&limit=10&status=PRINTING`.
- The filter button text updates to "Printing".
- All displayed rows have the "Printing" status.
- At least one row is returned.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/status-filter.spec.js` for implementation details.
