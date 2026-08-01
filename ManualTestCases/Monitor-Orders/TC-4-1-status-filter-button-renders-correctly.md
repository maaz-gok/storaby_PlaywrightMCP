# Status filter button renders correctly

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/status-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- The status filter button is visible.
- It has `aria-label="Statuses"`, `aria-haspopup="listbox"`, and contains the text "Statuses".

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/status-filter.spec.js` for implementation details.
