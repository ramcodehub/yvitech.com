# AI Chat Feature for YVI Tech Website

## Overview
This document explains how to set up and use the AI chat feature that has been integrated into the YVI Tech website.

## Prerequisites
1. OpenAI API key
2. Supabase project (for chat history storage)
3. Node.js environment

## Setup Instructions

### 1. Environment Configuration
Create a `.env` file in the `backend` directory with the following variables:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=1000

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Email Configuration (from existing setup)
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
EMAIL_USER=your_email@yvisoft.com
EMAIL_PASS=your_email_password
EMAIL_TO=contact@yvisoft.com

# Frontend URL (for CORS)
FRONTEND_URL=https://yvitech.com

# Node Environment
NODE_ENV=production
PORT=3001
```

### 2. Database Setup
Run the SQL script in `database/chat_history_table.sql` to create the chat history table in your Supabase database.

### 3. Install Dependencies
Navigate to both the `frontend` and `backend` directories and run:
```bash
npm install
```

### 4. Start the Application
From the root directory, run:
```bash
npm run dev
```

## Testing
To test the chat functionality, run:
```bash
node test-chat.js
```

## Customization
- Modify the system prompt in `backend/config/ai-config.js` to change the AI's personality and knowledge
- Adjust the UI styling in `frontend/src/components/Chat/ChatWidget.css`
- Update the chat widget position or behavior in `frontend/src/components/Chat/ChatWidget.jsx`