# Storefront filter combines with Age Group and search

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/storefront-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply a storefront section (e.g. "Book Details") and an age group (e.g. "Age 2-4").
4. Type a search query and submit.
5. Capture the outgoing requests.


## Expected Result

- The request includes `q`, `ageGroup`, and `storefrontSection` parameters together.
- Results satisfy all three constraints (backend-side intersection).
- Changing any control re-queries with the other parameters preserved.

## Notes

Refer to the automated test in `tests/admin/Templates/storefront-filter.spec.js` for implementation details.
