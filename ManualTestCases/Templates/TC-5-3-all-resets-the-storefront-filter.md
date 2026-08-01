# "All" resets the Storefront filter

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Templates/storefront-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Select "Kids Corner", wait for filtered results.
4. Re-open the dropdown and select "All".
5. Wait for the list to reload.


## Expected Result

- The request is re-sent without a `storefrontSection` parameter (page 1).
- The full unfiltered template list renders.
- The button label resets to "Storefront section".

## Notes

Refer to the automated test in `tests/admin/Templates/storefront-filter.spec.js` for implementation details.
