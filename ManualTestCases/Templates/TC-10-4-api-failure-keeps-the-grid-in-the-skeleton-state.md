# API failure keeps the grid in the skeleton state

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. (Automated test) intercept the list API and return a 500 / disconnect.


## Expected Result

- The grid does not crash and does not render an error flash of fake data.
- Skeleton/loading state is retained (or a graceful fallback) until a successful response arrives.
- A subsequent successful request restores the grid.

## Notes

Refer to the automated test in `tests/admin/Templates/loading-empty-error.spec.js` for implementation details.
