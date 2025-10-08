# Blog Management System Setup

## Overview
Your website now has a complete hidden blog management system accessible through the secret authentication portal.

## How to Access
1. Click on the "W" in "Website by BNiccum" in the footer
2. Enter your authentication credentials
3. The blog management modal will automatically open after successful login

## Features

### Create Posts
- **Title**: Required field for the blog post title
- **Featured Image**: Dropdown of available images from your Images folder
- **Content**: Rich text area for the blog post body
- **Publish Toggle**: Choose whether to publish immediately or save as draft

### Manage Posts
- View all existing blog posts (published and drafts)
- Edit existing posts
- Toggle publish/unpublish status
- Delete posts (with confirmation)
- Posts are ordered by creation date (newest first)

## Image Management
Images are managed through your local Images folder. The dropdown in "Create Post" shows all available images from your Images folder.

### Current Available Images:
- Butterfly1.png through Butterfly4.png
- Girly1.png through Girly3.png  
- Jessica1.png through Jessica5.png

### To Add New Images:
1. Add image files directly to your local `Images` folder
2. Git commit & push the changes to your repository
3. The new images will be available in the Featured Image dropdown

## Firebase Storage
Blog posts are stored in Firebase Firestore in a collection called `JessBlogs` (separate from your existing blogs collection). Each post includes:
- `title`: The post title
- `body`: The post content
- `image`: Filename of the featured image (optional)
- `published`: Boolean indicating if the post is published
- `createdAt`: Timestamp when the post was created
- `updatedAt`: Timestamp when the post was last modified

## Security
- Only authenticated users can access the blog management system
- Authentication is handled through Firebase Auth
- The secret access point is hidden in the footer

## Next Steps
You may want to:
1. Create a public blog section on your website to display published posts
2. Add rich text editing capabilities (WYSIWYG editor)
3. Add categories or tags to blog posts
4. Implement blog post search functionality
5. Add comments system for blog posts

The foundation is now in place for a complete blog management system!