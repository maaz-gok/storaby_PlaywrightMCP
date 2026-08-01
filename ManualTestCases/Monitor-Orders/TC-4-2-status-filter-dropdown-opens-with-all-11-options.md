# Status filter dropdown opens with all 11 options

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/status-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Click the "Statuses" filter button.


## Expected Result

- A dropdown (`role="listbox"`) appears.
- 11 options are present in order: "All", "Pending", "Paid", "Generating Final", "Submitted To Print", "Printing", "Shipped", "Delivered", "Cancelled", "Generation Failed", "Refunded".
- "All" has `aria-selected="true"` by default.
- Pressing Escape closes the dropdown.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/status-filter.spec.js` for implementation details.
