# Orders page pagination

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/recent-orders.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Pagination shows current page and total pages (e.g. "1-10 of 63").
- Next/previous buttons or page numbers are clickable.
- Clicking page 2 triggers: `GET /admin/orders?page=2&limit=10`.
- The table updates to show the next page of results.


## Notes

Refer to the automated test in `tests/admin/Dashboard/recent-orders.spec.js` for implementation details.
