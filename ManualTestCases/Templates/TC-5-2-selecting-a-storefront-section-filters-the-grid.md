# Selecting a storefront section filters the grid

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/storefront-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Click "Storefront section" and select "Home Screen".
4. Wait for the list to reload.


## Expected Result

- The request fires with `storefrontSection=Home_Screen` (or the mapped API value) and `page=1`.
- Every rendered card's storefront tag reads "Home Screen".
- The button label updates to show the selected value.

## Notes

Refer to the automated test in `tests/admin/Templates/storefront-filter.spec.js` for implementation details.
