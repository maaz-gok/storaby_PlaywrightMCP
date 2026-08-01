# Filtering by "Visible" returns active templates

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/visibility-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Click "Visibility" and select "Visible".
4. Wait for the list to reload.


## Expected Result

- The request fires with `visibility=visible` (or the mapped value) and `page=1`.
- Every rendered card shows a green "Visible" badge.
- The button label updates to "Visible".

## Notes

Refer to the automated test in `tests/admin/Templates/visibility-filter.spec.js` for implementation details.
