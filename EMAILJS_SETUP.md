# EmailJS Setup Guide

## Step 1: Get Your EmailJS Credentials

### 1. Service ID
- Go to EmailJS Dashboard: https://dashboard.emailjs.com/
- Navigate to **Email Services**
- Find your "Gmail" service
- Copy the **Service ID** (looks like `service_xxxxxxxxx`)

### 2. Template ID
- Go to **Email Templates** in EmailJS Dashboard
- Click **Create New Template** or use an existing one
- Use this template content:

**Subject:** Password Reset Verification Code

**Content:**
```
You have requested a password change

We received a request to reset the password for your portfolio admin panel.

Your verification code is: {{code}}

Enter this code in the website to reset your password.

This code will expire in 10 minutes.

If you didn't request this password reset, please ignore this email. Your account remains secure.

Best regards,
Portfolio Admin Team
```

**Important:** Use `{{code}}` variable (not `{{link}}`) since we're using a verification code system.

- Make sure to use `{{code}}` variable in the template
- Set **To Email** field to: `{{to_email}}`
- Save the template and copy the **Template ID** (looks like `template_xxxxxxxxx`)

### 3. Public Key
- Go to **Account** > **General**
- Find **API Keys** section
- Copy your **Public Key** (looks like `xxxxxxxxxxxxxxxx`)

## Step 2: Configure the Code

### In `index.html` (line ~15):
Replace `YOUR_PUBLIC_KEY` with your actual Public Key:
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual key
```

### In `main.js` (lines ~5-9):
Replace the placeholders in `EMAILJS_CONFIG`:
```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_tmghbuc',     // Your Service ID
  TEMPLATE_ID: 'template_1kx3ao1',   // Your Template ID
  PUBLIC_KEY: 'gc57f1JVi2IwpjKLX'       // Your Public Key
};
```

## Step 3: Test

1. Open your website
2. Click "Manage Projects"
3. Click "Forgot Password?"
4. Click "Send Verification Code"
5. Check your email at kliyg00000@gmail.com
6. Enter the code to reset your password

## Troubleshooting

- **Email not received?** Check spam folder
- **Error sending?** Verify all IDs are correct in the code
- **Template not working?** Make sure `{{code}}` variable is in your template
- **Service not connected?** Reconnect Gmail in EmailJS Dashboard

## Current Configuration

- **Email Service:** Gmail Personal
- **Daily Limit:** 500 emails/day
- **Connected Account:** kliyg00000@gmail.com

