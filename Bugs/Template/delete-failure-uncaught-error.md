# Deleting a template shows "Delete failed" twice and throws a hidden error

## Summary

When a delete fails, the page shows the "Delete failed" message twice and also throws an error in the browser console that the app never catches.

## Description

### Steps to Reproduce

1. Log in as an admin and open the Templates page.
2. Click "Delete" on a template.
3. Click "Yes, Delete" while the server is refusing the delete.

### Actual Result

The "Delete failed" message appears twice, the popup stays open, and the browser console logs an unhandled error.

### Expected Result

A single "Delete failed" message, no console error, and the popup closes.
