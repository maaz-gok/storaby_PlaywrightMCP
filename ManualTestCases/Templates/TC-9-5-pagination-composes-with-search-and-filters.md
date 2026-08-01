# Pagination composes with search and filters

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply a search and an age-group filter that return multiple pages.
4. Navigate to page 2, then change the filter/search.


## Expected Result

- Page 2 requests carry `q` and `ageGroup` along with `page=2`.
- Changing a filter/search resets to `page=1` with all other parameters preserved.
- The pagination indicator reflects the filtered total.

## Notes

Refer to the automated test in `tests/admin/Templates/pagination.spec.js` for implementation details.
