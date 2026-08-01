# Search with an exact full name

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Type the exact full name of a known template into the search input.
4. Submit the search.


## Expected Result

- The returned results contain that exact template.
- The request includes `q=<full name>` (URL-encoded) with `page=1`.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
