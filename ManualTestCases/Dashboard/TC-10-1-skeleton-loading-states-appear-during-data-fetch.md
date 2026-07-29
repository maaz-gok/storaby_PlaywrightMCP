# Skeleton loading states appear during data fetch

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/loading-states.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Summary cards show animated pulse placeholders (class contains `animate-pulse`) instead of values while loading.
- Charts show loading skeletons or placeholders.
- "No recent orders." empty message is shown while loading.


## Notes

Refer to the automated test in `tests/admin/Dashboard/loading-states.spec.js` for implementation details.
