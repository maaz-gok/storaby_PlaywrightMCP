# First/Last page buttons navigate to boundaries

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Click Last, verify the final page, then click First.


## Expected Result

- Last navigates to `page=<totalPages>` — Last and Next become disabled.
- First navigates back to `page=1` — First and Previous become disabled.
- Requests carry the correct `page` parameter.

## Notes

Refer to the automated test in `tests/admin/Templates/pagination.spec.js` for implementation details.
