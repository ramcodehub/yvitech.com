// Comprehensive test to check all environment variable sources
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

console.log('=== Comprehensive Environment Variable Test ===\n');

// 1. Check current environment variables before loading .env
console.log('1. Current Environment Variables (before dotenv):');
console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY ? 'SET' : 'NOT SET');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET' : 'NOT SET');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET');

// 2. Check for .env file in current directory
const currentDirEnvPath = path.resolve('./.env');
console.log('\n2. Checking .env file in current directory:');
console.log('Path:', currentDirEnvPath);
console.log('Exists:', fs.existsSync(currentDirEnvPath));

if (fs.existsSync(currentDirEnvPath)) {
  const content = fs.readFileSync(currentDirEnvPath, 'utf8');
  console.log('Content preview:');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.includes('GROQ_API_KEY') || line.includes('SUPABASE')) {
      console.log(`  Line ${index + 1}: ${line}`);
    }
  });
}

// 3. Load environment variables
console.log('\n3. Loading environment variables with dotenv...');
const result = dotenv.config();

if (result.error) {
  console.log('Error loading .env file:', result.error.message);
} else {
  console.log('Successfully loaded .env file');
}

// 4. Check environment variables after loading
console.log('\n4. Environment Variables (after dotenv):');
console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY ? 'SET' : 'NOT SET');
if (process.env.GROQ_API_KEY) {
  console.log('  Length:', process.env.GROQ_API_KEY.length);
  console.log('  Preview:', process.env.GROQ_API_KEY.substring(0, Math.min(30, process.env.GROQ_API_KEY.length)) + (process.env.GROQ_API_KEY.length > 30 ? '...' : ''));
}

console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET' : 'NOT SET');
if (process.env.SUPABASE_URL) {
  console.log('  Preview:', process.env.SUPABASE_URL.substring(0, Math.min(30, process.env.SUPABASE_URL.length)) + (process.env.SUPABASE_URL.length > 30 ? '...' : ''));
}

console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET');
if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log('  Length:', process.env.SUPABASE_SERVICE_ROLE_KEY.length);
  console.log('  Preview:', process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, Math.min(30, process.env.SUPABASE_SERVICE_ROLE_KEY.length)) + (process.env.SUPABASE_SERVICE_ROLE_KEY.length > 30 ? '...' : ''));
}

// 5. Check if there are any other .env files in parent directories
console.log('\n5. Checking for .env files in parent directories:');
let currentDir = process.cwd();
let rootReached = false;

while (!rootReached) {
  const parentEnvPath = path.join(currentDir, '.env');
  if (fs.existsSync(parentEnvPath)) {
    console.log('  Found .env at:', parentEnvPath);
    const parentContent = fs.readFileSync(parentEnvPath, 'utf8');
    const parentLines = parentContent.split('\n');
    parentLines.forEach((line, index) => {
      if (line.includes('GROQ_API_KEY') || line.includes('SUPABASE')) {
        console.log(`    Line ${index + 1}: ${line}`);
      }
    });
  }
  
  const parentDir = path.dirname(currentDir);
  if (parentDir === currentDir) {
    rootReached = true;
  }
  currentDir = parentDir;
}

console.log('\n=== Test Complete ===');