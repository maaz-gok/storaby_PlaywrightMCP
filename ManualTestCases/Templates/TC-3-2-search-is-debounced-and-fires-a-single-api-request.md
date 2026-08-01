# Search is debounced and fires a single API request

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Type a query into the search input quickly (multiple keystrokes in under 500ms).
4. Count the `/story-templates/admin/all` requests fired.


## Expected Result

- Exactly 1 search API request fires after the typing pauses.
- The request includes `q=<query>` and `page=1`.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
