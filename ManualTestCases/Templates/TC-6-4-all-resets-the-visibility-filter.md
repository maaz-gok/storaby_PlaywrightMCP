# "All" resets the Visibility filter

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/visibility-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Select "Visible", wait for filtered results.
4. Re-open the dropdown and select "All".
5. Wait for the list to reload.


## Expected Result

- The request is re-sent without a `visibility` parameter (page 1).
- The full unfiltered template list renders.
- The button label resets to "Visibility".

## Notes

Refer to the automated test in `tests/admin/Templates/visibility-filter.spec.js` for implementation details.
