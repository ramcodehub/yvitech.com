# Render Deployment Instructions

## Prerequisites
1. GitHub account
2. Render account (free tier available)
3. Completed environment configuration

## Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Connect to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New Web Service"
3. Connect your GitHub account
4. Select your repository
5. Configure the service:
   - Name: `yvi-soft-email-server`
   - Runtime: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
   - Root Directory: `/`

### 3. Configure Environment Variables

In the Render dashboard, add these environment variables:
```
EMAIL_USER=your-go-daddy-email@yvisoft.com
EMAIL_PASS=your-email-password
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
VITE_SUPABASE_URL=your-supabase-url
PORT=3001
```

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Note the generated URL (will be in the format `https://yvi-soft-email-server.onrender.com`)

### 5. Update Frontend Configuration

Make sure your frontend is configured to use the Render backend URL:
- Check `frontend/.env.production`
- Verify `VITE_BACKEND_URL` points to your Render URL

### 6. Redeploy Frontend

After updating the backend URL, rebuild and redeploy your frontend to GoDaddy.

## Monitoring and Maintenance

- View logs in the Render dashboard
- Set up health checks using the `/health` endpoint
- Monitor usage and performance metrics
- Configure auto-deploys from GitHub for continuous integration

## Troubleshooting

- If emails aren't sending, verify SMTP credentials
- If the service crashes, check logs for error messages
- For CORS issues, verify allowed origins in `server.js`
- For database connection issues, verify Supabase credentials