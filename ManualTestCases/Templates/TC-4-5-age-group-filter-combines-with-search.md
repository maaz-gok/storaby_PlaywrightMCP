# Age Group filter combines with search

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/age-group-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Select an age group (e.g. "Age 2-4").
4. Type a search query and submit.
5. Capture the outgoing requests.


## Expected Result

- The request includes both `q=<query>` and `ageGroup=2-4`.
- Results satisfy both constraints (backend-side intersection).
- Changing either control re-queries with both parameters preserved.

## Notes

Refer to the automated test in `tests/admin/Templates/age-group-filter.spec.js` for implementation details.
