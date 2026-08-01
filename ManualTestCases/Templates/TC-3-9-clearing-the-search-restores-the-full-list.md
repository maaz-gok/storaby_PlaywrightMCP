# Clearing the search restores the full list

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Type a search query and wait for filtered results.
4. Clear the search input.
5. Wait for the list to reload.


## Expected Result

- The grid returns to the full, unfiltered template list.
- The request is re-sent with the query removed (page 1).

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
