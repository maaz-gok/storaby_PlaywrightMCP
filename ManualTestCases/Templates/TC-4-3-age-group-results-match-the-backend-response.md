# Age Group results match the backend response

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/age-group-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply the "Age 4-8" filter and capture the API response.
4. Compare the rendered cards with `response.data.items`.


## Expected Result

- The number of cards equals `response.data.items.length`.
- Every card corresponds to an item in the response (name + age tag match).
- Filtering happens on the backend — the UI renders exactly what the API returns.

## Notes

Refer to the automated test in `tests/admin/Templates/age-group-filter.spec.js` for implementation details.
