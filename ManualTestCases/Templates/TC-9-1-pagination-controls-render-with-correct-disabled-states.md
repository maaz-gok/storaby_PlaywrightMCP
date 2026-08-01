# Pagination controls render with correct disabled states

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates


## Expected Result

- Pagination controls are visible: pagination text plus First, Previous, Next, Last buttons.
- On page 1, First and Previous are disabled.
- Next and Last are enabled when more than one page exists.

## Notes

Refer to the automated test in `tests/admin/Templates/pagination.spec.js` for implementation details.
