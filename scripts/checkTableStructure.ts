#!/usr/bin/env node

/**
 * Script to check the structure of the chatbot_knowledge table
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

// Validate environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in backend/.env');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTableStructure() {
  try {
    console.log('🔍 Checking chatbot_knowledge table structure...\n');
    
    // Try to get table info
    const { data, error } = await supabase
      .from('chatbot_knowledge')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error accessing chatbot_knowledge table:', error.message);
      
      // Try a simpler query
      const { data: simpleData, error: simpleError } = await supabase
        .from('chatbot_knowledge')
        .select('id, category, title, description')
        .limit(1);
      
      if (simpleError) {
        console.error('❌ Still unable to access table:', simpleError.message);
        process.exit(1);
      } else {
        console.log('✅ Successfully accessed table with basic columns');
        console.log('📋 Sample entry:', simpleData[0]);
        
        // Check if embedding column exists
        const entryKeys = Object.keys(simpleData[0]);
        if (entryKeys.includes('embedding')) {
          console.log('✅ Embedding column exists');
        } else {
          console.log('❌ Embedding column does not exist');
          console.log('💡 You may need to add the embedding column to your table');
          console.log('💡 Run this SQL in your Supabase SQL editor:');
          console.log('   ALTER TABLE chatbot_knowledge ADD COLUMN embedding vector(768);');
        }
      }
    } else {
      console.log('✅ Successfully accessed table');
      console.log('📋 Sample entry:', data[0]);
      
      // Check if embedding column exists
      const entryKeys = Object.keys(data[0]);
      if (entryKeys.includes('embedding')) {
        console.log('✅ Embedding column exists');
      } else {
        console.log('❌ Embedding column does not exist');
        console.log('💡 You may need to add the embedding column to your table');
        console.log('💡 Run this SQL in your Supabase SQL editor:');
        console.log('   ALTER TABLE chatbot_knowledge ADD COLUMN embedding vector(768);');
      }
    }
    
    console.log('\n✅ Table structure check completed!');
    
  } catch (error: any) {
    console.error('❌ Unexpected error during table structure check:', error.message);
    process.exit(1);
  }
}

checkTableStructure();