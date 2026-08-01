# "Hide" flow makes a visible template hidden and is restored

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/visibility-toggle.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Locate a visible template on page 1.
4. Click its "Hide" button.
5. Confirm with "Yes, hide".
6. Reload the page.


## Expected Result

- A dialog titled "Hide template" appears ("You are about to hide this template.").
- A PATCH request fires; the badge flips to "Hidden" (amber).
- **Simulated test flow:** the automated test intercepts the PATCH and fakes a success response — the change must NOT persist after reload, so the template is visible again afterwards. Manual run should use disposable data only.

## Notes

Refer to the automated test in `tests/admin/Templates/visibility-toggle.spec.js` for implementation details.
