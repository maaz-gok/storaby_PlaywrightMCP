# Filtering by "Hidden" returns inactive templates

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/visibility-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Click "Visibility" and select "Hidden".
4. Wait for the list to reload.


## Expected Result

- The request fires with `visibility=hidden` (or the mapped value) and `page=1`.
- Every rendered card shows an amber "Hidden" badge.
- The button label updates to "Hidden".

## Notes

Refer to the automated test in `tests/admin/Templates/visibility-filter.spec.js` for implementation details.
