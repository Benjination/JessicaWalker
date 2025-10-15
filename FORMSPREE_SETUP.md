# Formspree Contact Form Setup Guide

## Step 1: Create Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account (allows 50 submissions/month)
3. Verify your email address

## Step 2: Create a New Form
1. In your Formspree dashboard, click "New Form"
2. Give your form a name like "Jessica Walker Contact Form"
3. Copy the form endpoint URL (it will look like: `https://formspree.io/f/YOUR_FORM_ID`)

## Step 3: Update Your Website
1. Open `index.html`
2. Find this line:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID

## Step 4: Configure Formspree Settings (Optional)
In your Formspree dashboard, you can:
- Set up email notifications
- Configure spam protection
- Set up custom thank you pages
- Add webhooks for integrations

## Step 5: Test Your Form
1. Submit a test message through your contact form
2. Check your email for the submission
3. Verify the form messages display correctly on your website

## What's Already Set Up:
✅ Form HTML with proper field names
✅ Honeypot spam protection (`_gotcha` field)
✅ JavaScript handling with loading states
✅ Success/error message display with your lace theme
✅ Form validation and user feedback
✅ Responsive styling for all devices

## Form Features:
- **Loading animation** during submission
- **Success message** with confirmation
- **Error handling** with helpful messages
- **Spam protection** via honeypot field
- **Form reset** after successful submission
- **Beautiful styling** matching your lace theme

## Support:
- Formspree Documentation: https://help.formspree.io/
- Free tier: 50 submissions/month
- Paid tiers available for higher volume

Once you get your Formspree form ID, just replace `YOUR_FORM_ID` in the index.html file and your contact form will be fully functional!