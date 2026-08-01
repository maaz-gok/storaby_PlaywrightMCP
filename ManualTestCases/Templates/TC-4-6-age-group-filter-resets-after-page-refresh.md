# Age Group filter resets after page refresh

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/age-group-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Select "Age 2-4" and wait for results.
4. Reload the page.


## Expected Result

- The filter resets to "All" (default) after refresh.
- The grid shows the full list without an `ageGroup` parameter.

## Notes

Refer to the automated test in `tests/admin/Templates/age-group-filter.spec.js` for implementation details.
