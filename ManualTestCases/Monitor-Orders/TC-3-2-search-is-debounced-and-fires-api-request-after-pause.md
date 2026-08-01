# Search is debounced and fires API request after pause

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Type "S", then "T", then "-", then "8" in quick succession, then pause ~2s.


## Expected Result

- Only 1 API request fires after typing stops (debounced), not one per keystroke.
- The request URL contains `search=ST-8`.
- The table updates with matching results.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
