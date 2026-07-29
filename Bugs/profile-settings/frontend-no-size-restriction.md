# Frontend does not restrict oversized image uploads

## Summary

The frontend allows selecting files of any size for the profile image without any client-side validation. No file size limit is shown to the user.

## Description

### Steps to Reproduce

1. Go to /admin/settings
2. Click "Change profile photo"
3. Select a file that exceeds the allowed size (e.g. Resources/LargeFile.png — 3.9MB)

### Actual Result

The file is selected without any warning or validation. No file size limit is displayed anywhere on the UI. The user can proceed to click Save and only then receive an unclear error.

### Expected Result

The frontend should:
1. Display the maximum allowed file size near the upload button (e.g. "Max file size: X MB")
2. Validate the file size immediately on selection and show a clear error if exceeded
3. Disable the Save button or prevent uploading files over the limit
