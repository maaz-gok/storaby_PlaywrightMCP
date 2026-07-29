# Recent Orders data matches API response

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/recent-orders.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- "Order ID" column displays `orderNumber` (e.g. `ST-I95F`).
- "Customer" column displays `customerName` (fallback to `email` if customerName is null/empty).
- "Story" column displays `storyTitle` (italicized, fallback to `—` if null).
- "Status" column displays a styled badge matching the `status` field. Badge color/text:
- `PENDING` → "Pending" (likely gray/yellow)
- `GENERATING_FINAL` → "Generating Final" (likely blue)
- `SUBMITTED_TO_PRINT` → "Submitted To Print" (likely teal)
- `PRINTING` → "Printing" (likely indigo)
- Delivered/Shipped → green variants
- Failed/Cancelled → red variants
- The number of displayed rows matches the number of items in the API response (up to 10).
- Row order matches the API response order (most recent first).


## Notes

Refer to the automated test in `tests/admin/Dashboard/recent-orders.spec.js` for implementation details.
