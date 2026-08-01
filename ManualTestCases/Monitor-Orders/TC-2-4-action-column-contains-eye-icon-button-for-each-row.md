# Action column contains eye-icon button for each row

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/orders-table.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- Every row's Action column contains a visible button.
- Each button has an `aria-label` matching `/^View order ST-/`.
- The "Action" header is center-aligned.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/orders-table.spec.js` for implementation details.
