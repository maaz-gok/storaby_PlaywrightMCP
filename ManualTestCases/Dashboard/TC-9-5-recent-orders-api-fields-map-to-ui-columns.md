# Recent Orders: API fields map to UI columns

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Row 1: Order ID = `data[0].orderNumber`, Customer = `data[0].customerName`, Story = `data[0].storyTitle`.
- Row 2 (if exists): matches `data[1]`.
- Status badge text uses the human-readable label for `data[i].status` (e.g. `GENERATING_FINAL` → "Generating Final").
- Row order is identical to API response order.
- Action button `aria-label` contains the order number.


## Notes

Refer to the automated test in `tests/admin/Dashboard/data-consistency.spec.js` for implementation details.
