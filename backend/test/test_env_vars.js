// Test script to verify environment variables are loaded correctly
import dotenv from 'dotenv';
import { AI_CONFIG } from '../config/ai-config.js';

dotenv.config();

console.log('=== Environment Variables Check ===');
console.log('GROQ_API_KEY from process.env:', process.env.GROQ_API_KEY ? 'SET' : 'NOT SET');
console.log('GROQ_API_KEY length:', process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0);
console.log('GROQ_API_KEY starts with:', process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.substring(0, 10) + '...' : 'N/A');

console.log('\n=== AI_CONFIG Check ===');
console.log('AI_CONFIG.groq.apiKey:', AI_CONFIG.groq.apiKey ? 'SET' : 'NOT SET');
console.log('AI_CONFIG.groq.apiKey length:', AI_CONFIG.groq.apiKey ? AI_CONFIG.groq.apiKey.length : 0);
console.log('AI_CONFIG.groq.apiKey starts with:', AI_CONFIG.groq.apiKey ? AI_CONFIG.groq.apiKey.substring(0, 10) + '...' : 'N/A');

console.log('\n=== Supabase Config Check ===');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET' : 'NOT SET');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET');