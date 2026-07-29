# Orders page search

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/recent-orders.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Typing triggers a new API request with `search` param: `GET /admin/orders?page=1&limit=10&search=<query>`.
- The table updates to show matching results.


## Notes

Refer to the automated test in `tests/admin/Dashboard/recent-orders.spec.js` for implementation details.
