# Firebase Firestore Security Rules Configuration

## Current Issue
The blog posts are not loading for public visitors because the Firestore security rules are likely set to require authentication for all reads. This needs to be changed to allow public access to published blog posts.

## Required Security Rules

Copy and paste these rules into your Firebase Console under **Firestore Database > Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts collection rules
    match /JessBlogs/{postId} {
      // Allow anyone to read published blog posts (no authentication required)
      allow read: if resource.data.published == true;
      
      // Only authenticated users can create, update, or delete blog posts
      allow write: if request.auth != null;
      
      // Allow authenticated users to read all posts (including unpublished drafts)
      allow read: if request.auth != null;
    }
    
    // Default rule - deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## How to Apply These Rules

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: portfolio-7148b
3. **Navigate to Firestore Database**
4. **Click on "Rules" tab**
5. **Replace the existing rules** with the rules above
6. **Click "Publish"**

## What These Rules Do

### Public Access (No Authentication Required)
- ✅ **READ published blog posts**: Anyone can view blog posts where `published: true`
- ❌ **READ unpublished drafts**: Hidden from public visitors
- ❌ **WRITE operations**: No one can create/edit/delete without authentication

### Authenticated Access (Admin/Jessica)
- ✅ **READ all posts**: Can see both published and unpublished posts
- ✅ **WRITE operations**: Can create, edit, delete, and publish/unpublish posts
- ✅ **Full admin control**: Complete access to blog management

## Security Benefits

1. **Public Blog Access**: Visitors can read the blog without signing up
2. **Protected Admin Area**: Only authenticated users can manage content
3. **Draft Protection**: Unpublished posts remain private
4. **No Unauthorized Changes**: Public users cannot modify any content

## Testing the Fix

After applying these rules:

1. **Test Public Access**: Visit the website without logging in - blog posts should load
2. **Test Admin Access**: Use the secret button to log in - should still work for management
3. **Test Draft Privacy**: Unpublished posts should not appear to public visitors

## Troubleshooting

If blog posts still don't load after applying these rules:

1. **Check Browser Console**: Look for any error messages
2. **Verify Rules Applied**: Ensure the rules were published successfully
3. **Clear Browser Cache**: Refresh the page with Ctrl+F5 (or Cmd+Shift+R on Mac)
4. **Check Network Tab**: Look for failed requests to Firestore

The key change is allowing `read: if resource.data.published == true` which permits public access to published posts without requiring authentication.