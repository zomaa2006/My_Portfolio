# Fix: "The recipients address is empty" Error

## The Problem
EmailJS can't find where to send the email because the template's "To Email" field is not configured.

## Solution 1: Configure Template "To Email" Field (Recommended)

### Step-by-Step Instructions:

1. **Go to EmailJS Dashboard**
   - Visit: https://dashboard.emailjs.com/
   - Log in to your account

2. **Navigate to Email Templates**
   - Click on **"Email Templates"** in the left sidebar
   - Find your template: `template_1kx3ao1`
   - Click on it to edit

3. **Find the "To Email" Field**
   - Look for a field labeled **"To Email"** or **"To"** or **"Recipient"**
   - This is usually at the TOP of the template editor
   - It might be in a section called "Settings" or "Email Settings"

4. **Enter the Variable**
   - **DELETE** any existing value in the "To Email" field
   - **TYPE EXACTLY:** `{{to_email}}`
   - Make sure:
     - Double curly braces: `{{` and `}}`
     - Lowercase: `to_email` (not `To_Email` or `TO_EMAIL`)
     - No spaces: `{{to_email}}` (not `{{ to_email }}`)

5. **Save the Template**
   - Click **"Save"** button
   - Wait for confirmation

6. **Test Again**
   - Go back to your website
   - Try "Send Verification Code" again

## Solution 2: Hardcode Email Address (Alternative)

If you always want to send to the same email, you can hardcode it:

1. In EmailJS template editor
2. In "To Email" field, enter: `kliyg00000@gmail.com` (hardcoded)
3. Save the template
4. The code will still work, but the email will always go to this address

## Visual Guide

The "To Email" field should look like this:

```
┌─────────────────────────────────┐
│ Email Template Settings          │
├─────────────────────────────────┤
│ To Email:  {{to_email}}         │  ← Enter this here
│ From Name: Portfolio Admin      │
│ Reply To:  kliyg00000@gmail.com │
│                                 │
│ Subject: Password Reset...      │
│                                 │
│ Content:                        │
│ Your code is: {{code}}          │
└─────────────────────────────────┘
```

## Still Not Working?

1. **Check Template ID**: Make sure you're editing `template_1kx3ao1`
2. **Check Service**: Verify your Gmail service is still connected
3. **Try Test Email**: In EmailJS dashboard, use "Send Test Email" to verify template works
4. **Clear Browser Cache**: Sometimes templates cache, try hard refresh (Ctrl+F5)

## Common Mistakes

❌ Wrong: `to_email` (missing curly braces)
❌ Wrong: `{{ to_email }}` (spaces inside)
❌ Wrong: `{{To_Email}}` (wrong case)
❌ Wrong: `kliyg00000@gmail.com` (hardcoded - only if you want Solution 2)

✅ Correct: `{{to_email}}`


