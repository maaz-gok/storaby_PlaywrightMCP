# Search with numbers returns empty state

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Type a numeric-only query, e.g. "12345678", and submit.


## Expected Result

- The grid shows the "No templates found." empty state (zero cards).
- The empty state markup is present.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
