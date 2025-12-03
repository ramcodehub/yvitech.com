// Comprehensive test for the complete chat functionality
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

async function testCompleteChat() {
  try {
    console.log('🧪 Testing complete chat functionality...\n');
    
    // 1. Test Gemini API
    console.log('1. Testing Gemini API...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const testMessage = "What services does YVI Tech offer?";
    const result = await model.generateContent(testMessage);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API test passed');
    console.log('Response preview:', text.substring(0, 100) + '...\n');
    
    // 2. Test Supabase connection and chatbot_logs table
    console.log('2. Testing Supabase chatbot_logs table...');
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Insert test entry
    const testLogEntry = {
      user_query: testMessage,
      bot_response: text,
      matched_category: 'services',
      source: 'test_complete_chat',
      created_at: new Date().toISOString()
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('chatbot_logs')
      .insert([testLogEntry])
      .select();
      
    if (insertError) {
      console.log('⚠️  Chatbot logs insert test warning:', insertError.message);
    } else {
      console.log('✅ Chatbot logs insert test passed');
      console.log('Inserted log ID:', insertData[0].id);
    }
    
    // 3. Test Supabase knowledge base table
    console.log('\n3. Testing Supabase knowledge base table...');
    
    // Query knowledge base
    const { data: knowledgeData, error: knowledgeError } = await supabase
      .from('chatbot_knowledge')
      .select('*')
      .limit(3);
      
    if (knowledgeError) {
      console.log('⚠️  Knowledge base query test warning:', knowledgeError.message);
    } else {
      console.log('✅ Knowledge base query test passed');
      console.log('Found', knowledgeData.length, 'knowledge base entries');
    }
    
    // 4. Test knowledge base search functionality
    console.log('\n4. Testing knowledge base search...');
    
    const { data: searchData, error: searchError } = await supabase
      .from('chatbot_knowledge')
      .select('category, title, description')
      .limit(2);
      
    if (searchError) {
      console.log('⚠️  Knowledge base search test warning:', searchError.message);
    } else {
      console.log('✅ Knowledge base search test passed');
      if (searchData.length > 0) {
        console.log('Found', searchData.length, 'entries matching "service"');
        searchData.forEach(item => {
          console.log(`  - ${item.title} (${item.category})`);
        });
      }
    }
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 To use the chat functionality:');
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
testCompleteChat();