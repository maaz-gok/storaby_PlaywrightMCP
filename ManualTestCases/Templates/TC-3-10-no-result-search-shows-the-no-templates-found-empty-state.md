# No-result search shows the "No templates found." empty state

## Summary

**Priority:** P0
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Search for a string guaranteed to match nothing (e.g. "zzzzzzzzqqqqqqqq").
4. Wait for results to return.


## Expected Result

- The empty state with the text "No templates found." is visible.
- Zero cards render.
- No error is thrown.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
