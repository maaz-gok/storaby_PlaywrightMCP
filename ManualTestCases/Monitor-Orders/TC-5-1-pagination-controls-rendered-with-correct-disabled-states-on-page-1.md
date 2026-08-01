# Pagination controls rendered with correct disabled states on page 1

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- Pagination text matches the format `N-N of N` (e.g. "1-10 of 85").
- On page 1: First and Previous buttons are disabled; Next and Last buttons are enabled.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/pagination.spec.js` for implementation details.
