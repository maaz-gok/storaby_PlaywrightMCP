# Empty state markup for no results

## Summary

**Priority:** P0
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Templates/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Search for a query guaranteed to return zero results.


## Expected Result

- The empty state renders: an icon, the heading "No templates found.", and a sub-line.
- Zero template cards are present.
- No error is thrown.

## Notes

Refer to the automated test in `tests/admin/Templates/loading-empty-error.spec.js` for implementation details.
