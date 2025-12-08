# GoDaddy Deployment Instructions

## Prerequisites
1. GoDaddy hosting account with cPanel access
2. File Manager access in cPanel
3. Node.js installed locally (for building)

## Deployment Steps

### 1. Build the Frontend
```bash
cd frontend
npm run build
```

This creates a `dist` folder with all production files.

### 2. Upload Files to GoDaddy

1. Log in to your GoDaddy cPanel
2. Open File Manager
3. Navigate to your hosting directory (usually `public_html` or a subdirectory)
4. Upload all contents from the `frontend/dist` folder:
   - `index.html`
   - `assets/` folder
   - All other generated files

### 3. Configure Environment Variables

Create a `.env.production` file in your frontend directory with:
```
VITE_BACKEND_URL=https://yvi-soft-email-server.onrender.com
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Set Up Domain and SSL

1. In GoDaddy, point your domain to your hosting
2. Enable SSL certificate through GoDaddy's SSL management
3. Configure any necessary redirects

### 5. Test Your Deployment

1. Visit your domain to ensure the site loads correctly
2. Test the contact form to verify it connects to your Render backend
3. Check that all images and assets load properly

## Troubleshooting

- If the site doesn't load, check file permissions (should be 644 for files, 755 for directories)
- If the contact form doesn't work, verify the backend URL in your environment variables
- Clear your browser cache if changes aren't appearing