# Search persists across pagination

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Search for a query that returns more than 9 results (e.g. a short common keyword).
4. Navigate to page 2 via Next/Last.
5. Capture the outgoing request.


## Expected Result

- The request keeps `q=<query>` while changing `page`.
- The search input still contains the query on page 2.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
