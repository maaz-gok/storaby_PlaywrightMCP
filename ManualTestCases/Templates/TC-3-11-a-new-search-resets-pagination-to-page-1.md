# A new search resets pagination to page 1

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Navigate to a later page (e.g. page 2).
4. Type a new search query and submit.
5. Inspect the outgoing request and pagination indicator.


## Expected Result

- The search request contains `page=1`.
- The pagination indicator resets to `1-<n> of <total>`.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
