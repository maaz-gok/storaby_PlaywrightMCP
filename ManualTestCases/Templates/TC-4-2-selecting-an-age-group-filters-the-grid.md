# Selecting an age group filters the grid

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/age-group-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Click "Age Group" and select "Age 4-8".
4. Wait for the list to reload.


## Expected Result

- The request fires with `ageGroup=4-8` and `page=1`.
- Every rendered card's age tag reads "Age 4-8" (or maps to the 4-8 version).
- The button label updates to show the selected value.

## Notes

Refer to the automated test in `tests/admin/Templates/age-group-filter.spec.js` for implementation details.
