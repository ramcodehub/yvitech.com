// Detailed test to check environment variable loading
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Check if .env file exists
const envPath = path.resolve('./.env');
console.log('Looking for .env file at:', envPath);
console.log('.env file exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('\n.env file content:');
  console.log('==================');
  console.log(envContent);
  console.log('==================');
}

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.log('Error loading .env file:', result.error);
} else {
  console.log('\nEnvironment variables loaded successfully');
}

console.log('\n=== Checking Specific Variables ===');
console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY);
console.log('GROQ_API_KEY type:', typeof process.env.GROQ_API_KEY);
console.log('GROQ_API_KEY length:', process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0);

// Check if there are any hidden characters
if (process.env.GROQ_API_KEY) {
  console.log('First 10 characters:', process.env.GROQ_API_KEY.substring(0, 10));
  console.log('Last 10 characters:', process.env.GROQ_API_KEY.substring(process.env.GROQ_API_KEY.length - 10));
  
  // Check for hidden characters
  for (let i = 0; i < process.env.GROQ_API_KEY.length; i++) {
    const char = process.env.GROQ_API_KEY[i];
    const code = char.charCodeAt(0);
    if (code < 32 || code > 126) {
      console.log(`Hidden character at position ${i}: code ${code}`);
    }
  }
}

console.log('\n=== Testing Groq Client ===');
try {
  import('groq-sdk').then(({ default: Groq }) => {
    if (process.env.GROQ_API_KEY) {
      const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
      });
      console.log('Groq client created successfully');
    } else {
      console.log('Cannot create Groq client: API key not found');
    }
  }).catch(err => {
    console.log('Error importing Groq SDK:', err.message);
  });
} catch (err) {
  console.log('Error testing Groq client:', err.message);
}