# Contact Form Email Setup

## Create EmailJS Template for Contact Form

To enable the contact form to send emails, you need to create a new template in EmailJS:

### Step 1: Create New Template
1. Go to: https://dashboard.emailjs.com/
2. Click **"Email Templates"**
3. Click **"Create New Template"**

### Step 2: Configure Template

**Template Name:** Contact Form Messages

**To Email:** `{{to_email}}` or hardcode `kliyg00000@gmail.com`

**Subject:** `New Contact Form Message from {{user_name}}`

**Content:**
```
You have received a new message from your portfolio contact form.

From: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
Reply to: {{user_email}}
```

### Step 3: Save and Get Template ID
1. Click **"Save"**
2. Copy the **Template ID** (looks like `template_xxxxx`)
3. Update `CONTACT_TEMPLATE_ID` in `main.js`:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_tmghbuc',
  TEMPLATE_ID: 'template_1kx3ao1',      // Password reset template
  CONTACT_TEMPLATE_ID: 'template_idkuzxu', // Your new contact form template ID
  PUBLIC_KEY: 'gc57f1JVi2IwpjKLX'
};
```

### Step 4: Test
1. Go to your website
2. Fill out the contact form
3. Submit
4. Check your email at kliyg00000@gmail.com

## Template Variables Used

- `{{to_email}}` - Your email address (kliyg00000@gmail.com)
- `{{user_name}}` - Name of the person contacting you
- `{{user_email}}` - Email of the person contacting you
- `{{message}}` - The message content
- `{{subject}}` - Email subject line
- `{{reply_to}}` - Reply-to address (set to user's email)

## Alternative: Use Same Template

If you want to use the same template for both password reset and contact form, you can set:
```javascript
CONTACT_TEMPLATE_ID: 'template_idkuzxu'
```

But it's recommended to create a separate template for better organization.


