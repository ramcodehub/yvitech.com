// Test to check environment variables in server context
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('=== Server Context Environment Variables ===');
console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY ? 'SET' : 'NOT SET');
if (process.env.GROQ_API_KEY) {
  console.log('GROQ_API_KEY length:', process.env.GROQ_API_KEY.length);
  console.log('GROQ_API_KEY starts with:', process.env.GROQ_API_KEY.substring(0, Math.min(10, process.env.GROQ_API_KEY.length)) + (process.env.GROQ_API_KEY.length > 10 ? '...' : ''));
  console.log('GROQ_API_KEY ends with:', process.env.GROQ_API_KEY.substring(Math.max(0, process.env.GROQ_API_KEY.length - 10)));
}

// Test the actual validation that happens in chat.js
const isConfigured = !!(process.env.GROQ_API_KEY);
console.log('\n=== Configuration Check ===');
console.log('AI service configured:', isConfigured);

if (!isConfigured) {
  console.log('❌ AI service not configured - this would cause the error you\'re seeing');
} else {
  console.log('✅ AI service is configured');
}