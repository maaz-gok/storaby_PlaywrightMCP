# Search trims leading/trailing spaces

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Search for `"  Bedtime  "` (leading/trailing spaces).
4. Capture the `q` parameter sent in the request.


## Expected Result

- The request sends `q=Bedtime` — spaces trimmed.
- Results match the trimmed query.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
