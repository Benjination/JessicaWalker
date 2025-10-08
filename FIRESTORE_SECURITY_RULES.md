# Firestore Security Rules Configuration

## Issue: Blog Posts Not Loading on Page Load

If blog posts don't load when the page first loads, but work after republishing posts, this indicates a Firestore security rules permission issue.

## Root Cause

The current Firestore security rules likely require authentication for all read operations. However, for a public blog, published posts should be readable by anyone without authentication.

## Solution: Update Firestore Security Rules

### Current Rules (Likely)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Updated Rules (Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts collection
    match /JessBlogs/{postId} {
      // Anyone can read published blog posts
      allow read: if resource.data.published == true;
      
      // Only authenticated users can write (create, update, delete)
      allow write: if request.auth != null;
    }
    
    // All other collections require authentication
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## How to Update Security Rules

### Step 1: Open Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`portfolio-7148b`)
3. Navigate to **Firestore Database**
4. Click on the **Rules** tab

### Step 2: Update the Rules
1. Replace the existing rules with the recommended rules above
2. Click **Publish** to deploy the changes

### Step 3: Test
1. Refresh your website
2. Blog posts should now load immediately on page load
3. Published posts will be visible to all visitors
4. Draft posts will only be visible to authenticated administrators

## Alternative: More Restrictive Rules

If you want additional security, you can also add conditions:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /JessBlogs/{postId} {
      // Read published posts, but only if they have required fields
      allow read: if resource.data.published == true 
                  && resource.data.title is string
                  && resource.data.body is string
                  && resource.data.createdAt != null;
      
      // Write operations require authentication
      allow write: if request.auth != null 
                   && request.auth.token.email != null;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Verification

After updating the rules, you can verify they work correctly:

1. **Test Public Access**: Open an incognito browser window and visit your site
2. **Test Admin Access**: Sign in with your admin account and verify you can still create/edit posts
3. **Check Console**: Look for any permission errors in the browser console

## Security Considerations

- ✅ **Published posts**: Publicly readable (safe for blog content)
- ✅ **Draft posts**: Only readable by authenticated users
- ✅ **Post creation/editing**: Only allowed for authenticated users
- ✅ **Other collections**: Protected and require authentication

This configuration provides the right balance of public access for blog readers while maintaining security for administrative functions.