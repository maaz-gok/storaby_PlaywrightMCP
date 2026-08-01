# Page indicator shows correct ranges

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Record page 1 range, click "Next page", then click "Last page".


## Expected Result

- Page 1 shows `1-10 of <total>`.
- Page 2 shows `11-20 of <total>`.
- Last page shows the correct final range (e.g. `81-85 of 85`).
- Ranges follow: first = (page-1)*limit + 1; last = min(page*limit, total).

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/pagination.spec.js` for implementation details.
