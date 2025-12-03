// Script to check environment variables
import dotenv from 'dotenv';

dotenv.config();

console.log('Environment Variables Check:');
console.log('========================');

console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 
  `${process.env.GEMINI_API_KEY.substring(0, 10)}...${process.env.GEMINI_API_KEY.slice(-5)}` : 
  'NOT SET');

console.log('GEMINI_MODEL:', process.env.GEMINI_MODEL || 'NOT SET');
console.log('SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? 
  `${process.env.VITE_SUPABASE_URL.substring(0, 30)}...` : 
  'NOT SET');

console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 
  `${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 10)}...${process.env.SUPABASE_SERVICE_ROLE_KEY.slice(-5)}` : 
  'NOT SET');