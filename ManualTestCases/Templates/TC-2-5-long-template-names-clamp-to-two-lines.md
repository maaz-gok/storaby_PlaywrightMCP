# Long template names clamp to two lines

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/card-grid.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Inspect the longest available title on page 1.


## Expected Result

- The title label has `-webkit-line-clamp: 2` applied.
- The full text is present in the DOM.
- The card does not overflow its grid column.

## Notes

Refer to the automated test in `tests/admin/Templates/card-grid.spec.js` for implementation details.
