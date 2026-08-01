# All list requests return 200 with the expected envelope

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Perform search, filter, and pagination actions while capturing every `/story-templates/admin/all` request.


## Expected Result

- Every list request returns HTTP 200.
- Each response body has the envelope shape `{ data: { items: [], total, limit, totalPages } }`.
- `limit` equals 9 and `totalPages` equals `Math.ceil(total / 9)`.

## Notes

Refer to the automated test in `tests/admin/Templates/data-consistency.spec.js` for implementation details.
