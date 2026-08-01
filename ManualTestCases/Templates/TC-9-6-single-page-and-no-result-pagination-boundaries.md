# Single-page and no-result pagination boundaries

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply a search that returns exactly 9 or fewer results.
4. Apply a search that returns zero results.


## Expected Result

- Single-page result set: all four pagination buttons are disabled.
- Zero-result set: pagination controls are hidden and the empty state is shown.
- No invalid requests fire (e.g. `page=0`).

## Notes

Refer to the automated test in `tests/admin/Templates/pagination.spec.js` for implementation details.
