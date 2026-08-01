# Pagination button disabled states are correct

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Observe states on page 1, navigate to a middle page, then to the last page.


## Expected Result

- Page 1: First disabled, Previous disabled, Next enabled, Last enabled.
- Middle page: all four buttons enabled.
- Last page: First enabled, Previous enabled, Next disabled, Last disabled.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/pagination.spec.js` for implementation details.
