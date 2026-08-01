# The "Are you sure?" popup doesn't keep the keyboard inside it

## Summary

While the delete/visibility popup is open, pressing Tab moves the keyboard onto the cards behind it instead of staying inside the popup.

## Description

### Steps to Reproduce

1. Log in as an admin and open the Templates page.
2. Click "Delete" on a template.
3. Press Tab.

### Actual Result

Focus jumps out of the popup onto the page behind it, and you can keep tabbing through every button while the popup is still open.

### Expected Result

Tab should only move between the popup's own buttons until you answer, then return to the button you opened it with.
