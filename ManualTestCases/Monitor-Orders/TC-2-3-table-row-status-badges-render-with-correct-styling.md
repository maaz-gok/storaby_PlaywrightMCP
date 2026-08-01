# Table row status badges render with correct styling

## Summary

**Priority:** P1
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Monitor-Orders/orders-table.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- Every row's Order Status cell contains a badge (`span.inline-flex`).
- Each badge is visible and contains at least one inline SVG icon.
- Badge text is the human-readable status label (e.g. "Generating Final", "Paid").

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/orders-table.spec.js` for implementation details.
