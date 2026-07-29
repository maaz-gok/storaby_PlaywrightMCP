# Image upload error message is not user-friendly

## Summary

Uploading a profile image that exceeds the allowed size limit shows a generic "Something went wrong" error instead of telling the user what the limit is.

## Description

### Steps to Reproduce

1. Go to /admin/settings
2. Click "Change profile photo"
3. Select a file larger than the allowed limit (e.g. Resources/LargeFile.png — 3.9MB)
4. Click "Save Changes"

### Actual Result

A generic error "Something went wrong" is displayed. The user has no information about the file size limit or why the upload failed.

### Expected Result

The error message should be user-friendly and specify the maximum allowed file size, for example: "File size exceeds the maximum limit of X MB. Please choose a smaller file."
