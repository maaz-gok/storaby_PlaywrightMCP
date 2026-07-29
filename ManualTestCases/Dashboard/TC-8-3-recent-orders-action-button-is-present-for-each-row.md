# Recent Orders action button is present for each row

## Summary

**Priority:** P1
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Dashboard/recent-orders.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Each row contains an eye-icon button with `aria-label="Order actions"`.
- Clicking the button opens an order detail overlay/drawer (need to confirm behavior).
- The overlay can be closed by clicking outside or pressing Escape.


## Notes

Refer to the automated test in `tests/admin/Dashboard/recent-orders.spec.js` for implementation details.
