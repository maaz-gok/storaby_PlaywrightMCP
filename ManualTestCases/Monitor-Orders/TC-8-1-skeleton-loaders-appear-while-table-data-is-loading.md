# Skeleton loaders appear while table data is loading

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Simulate a slow API (delay the orders endpoint by ~2s).
3. Navigate to /admin/orders and observe during loading.


## Expected Result

- Skeleton rows are present in the table while data loads.
- Once data loads, skeletons are replaced with actual data rows.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/loading-empty-error.spec.js` for implementation details.
