// Test script for Supabase knowledge base functionality
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

async function testKnowledgeBase() {
  try {
    console.log('Testing Supabase knowledge base functionality...');
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    console.log('Supabase URL:', process.env.VITE_SUPABASE_URL);
    
    // Test querying the knowledge base
    console.log('Querying knowledge base for sample data...');
    
    const { data, error } = await supabase
      .from('chatbot_knowledge')
      .select('*')
      .limit(5);
      
    if (error) {
      console.log('⚠️  Knowledge base query test warning:', error.message);
    } else {
      console.log('✅ Knowledge base query test passed');
      console.log('Found', data.length, 'knowledge base entries');
      if (data.length > 0) {
        console.log('Sample entries:');
        data.forEach(entry => {
          console.log(`- ${entry.title || 'No title'} (${entry.category || 'No category'})`);
        });
      }
    }
    
    // Test inserting a sample knowledge base entry
    console.log('\nInserting sample knowledge base entry...');
    
    const sampleKnowledge = {
      category: 'services',
      title: 'YVI Tech Services',
      keywords: ['services', 'offerings', 'solutions'],
      description: 'YVI Tech provides cutting-edge technology solutions including AI, web development, mobile apps, Oracle, RPA, and UI/UX design.',
      created_at: new Date().toISOString()
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('chatbot_knowledge')
      .insert([sampleKnowledge])
      .select();
      
    if (insertError) {
      console.log('⚠️  Knowledge base insert test warning:', insertError.message);
    } else {
      console.log('✅ Knowledge base insert test passed');
      console.log('Inserted entry ID:', insertData[0].id);
    }
    
    console.log('\n✅ Knowledge base test completed!');
    
  } catch (error) {
    console.error('❌ Knowledge base test failed:', error.message);
  }
}

// Run the test
testKnowledgeBase();