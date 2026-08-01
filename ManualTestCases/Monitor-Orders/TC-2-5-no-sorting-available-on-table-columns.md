# No sorting available on table columns

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/orders-table.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- No table header has an `aria-sort` attribute.
- Columns are presentation-only; no sorting is implemented.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/orders-table.spec.js` for implementation details.
