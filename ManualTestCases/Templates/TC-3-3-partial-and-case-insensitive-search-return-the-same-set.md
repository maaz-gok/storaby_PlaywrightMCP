# Partial and case-insensitive search return the same set

## Summary

**Priority:** P0
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Pick a real template name, e.g. "Bedtime Stories".
4. Search for the full name, a partial fragment (e.g. "Bed"), and an upper/lowercase variant.


## Expected Result

- Partial and case-variant searches return the same set as the full-name search.
- Search results contain the queried template(s).
- No exact-match requirement is implied — results are backend-defined.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
