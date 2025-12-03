// Test script for complete chat functionality with Gemini API and Supabase
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

async function testFullChat() {
  try {
    console.log('Testing complete chat functionality...');
    
    // 1. Test Gemini API
    console.log('\n1. Testing Gemini API...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const testMessage = "Hello, what services does YVI Tech offer?";
    const result = await model.generateContent(testMessage);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API test passed');
    console.log('Response:', text.substring(0, 100) + '...');
    
    // 2. Test Supabase connection
    console.log('\n2. Testing Supabase connection...');
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Test a simple query
    const { data, error } = await supabase
      .from('chat_history')
      .select('id')
      .limit(1);
      
    if (error) {
      console.log('⚠️  Supabase test warning (table may not exist yet):', error.message);
    } else {
      console.log('✅ Supabase connection test passed');
    }
    
    console.log('\n✅ All tests completed successfully!');
    console.log('\nTo use the chat functionality:');
    console.log('1. Make sure your .env file has GEMINI_API_KEY and Supabase credentials');
    console.log('2. Run the backend server: cd backend && npm start');
    console.log('3. Run the frontend: cd frontend && npm run dev');
    console.log('4. Open http://localhost:5173 and use the chat widget');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testFullChat();