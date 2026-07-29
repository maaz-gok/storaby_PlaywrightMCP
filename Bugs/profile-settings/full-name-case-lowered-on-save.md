# Full Name is lowercased on save

**Severity:** Medium
**Status:** Open

## Summary

When the user saves a Full Name containing uppercase letters (e.g. "Administrator"), the name is automatically lowercased to "administrator" after save. Case is not preserved.

## Steps to Reproduce

1. Log in as an admin user.
2. Navigate to `/admin/settings`.
3. In the Full Name field, type `Administrator` (capital A).
4. Click "Save Changes".
5. Wait for the success toast.
6. Refresh the page or navigate away and back.
7. Observe the Full Name field value.

## Actual Result

The Full Name field displays `administrator` (all lowercase). The uppercase `A` is lost.

## Expected Result

The Full Name should preserve the original casing — `Administrator` should remain `Administrator`.

## Environment

- **Repo:** Storaby (Playwright TypeScript)
- **URL:** `https://staging.storaby.com/admin/settings`
- **Auth:** `usman+admin@geeksofkolachi.com` (admin)
- **API:** Likely a server-side transform (`.toLowerCase()`) on the PATCH/PUT handler for the name field

## Related Tests

- `tests/admin/Settings/ProfileSettings/profile-settings.spec.js` — test **1.8** (`Full Name preserves case after save`) asserts this behavior and currently fails
- The existing test **1.7** only verified the success toast appeared, not the persisted value

## Notes

- Confirmed via Playwright: saving `"Administrator"` returns `"administrator"` on re-read.
- The transform happens server-side (the API response or the persisted value is lowercased).
- This affects all users saving names with uppercase letters.
