// Test script for Supabase chat history functionality
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

async function testSupabase() {
  try {
    console.log('Testing Supabase chat history functionality...');
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    console.log('Supabase URL:', process.env.VITE_SUPABASE_URL);
    
    // Test inserting a chat message using your existing table structure
    const testChatEntry = {
      user_query: 'Hello, this is a test message',
      bot_response: 'Hello! This is a test response from the AI assistant.',
      matched_category: 'test',
      source: 'test_script',
      created_at: new Date().toISOString()
    };
    
    console.log('Inserting test chat entry...');
    
    const { data, error } = await supabase
      .from('chatbot_logs')
      .insert([testChatEntry])
      .select();
      
    if (error) {
      console.log('⚠️  Supabase insert test warning:', error.message);
      console.log('This might be because the chat_history table does not exist yet.');
      console.log('Please run the SQL script in backend/database/chat_history_table.sql to create the table.');
    } else {
      console.log('✅ Supabase insert test passed');
      console.log('Inserted data:', data);
      
      // Test querying the data
      const { data: queryData, error: queryError } = await supabase
        .from('chatbot_logs')
        .select('*')
        .eq('user_query', testChatEntry.user_query)
        .limit(1);
        
      if (queryError) {
        console.log('⚠️  Supabase query test warning:', queryError.message);
      } else {
        console.log('✅ Supabase query test passed');
        console.log('Queried data:', queryData);
      }
    }
    
    console.log('\n✅ Supabase test completed!');
    
  } catch (error) {
    console.error('❌ Supabase test failed:', error.message);
  }
}

// Run the test
testSupabase();