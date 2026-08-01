# Search with special characters is URL-encoded

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Type a query containing special characters, e.g. `Princess & the "<Frog>"`, and submit.
4. Capture the outgoing request URL.


## Expected Result

- The request URL is valid (no malformed characters) and `q` is percent-encoded (e.g. `%26`, `%22`).
- The page does not error; results (if any) render normally.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
