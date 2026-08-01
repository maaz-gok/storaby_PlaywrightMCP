# Search matches name, genre, and prompt text

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Choose a keyword known to appear in a template's name, genre, or prompt (e.g. a genre word such as "Adventure" or a prompt fragment).
4. Type it into search and submit.


## Expected Result

- Templates matching the keyword across name, genre, or prompt text are returned.
- Results reflect the backend's `q` matching behaviour, not UI-side filtering.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
