# Page indicator ranges are correct

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Read the pagination text, then navigate to the final page and read it again.


## Expected Result

- Page 1 text matches `1-<count> of <total>`.
- Final page text matches `<first>-<last> of <total>` with `last` correctly derived from `Math.min(total, page*limit)`.
- Ranges never exceed the total.

## Notes

Refer to the automated test in `tests/admin/Templates/pagination.spec.js` for implementation details.
