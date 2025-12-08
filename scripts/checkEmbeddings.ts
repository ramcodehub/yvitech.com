#!/usr/bin/env node

/**
 * Script to check if embeddings have been generated for chatbot knowledge base entries
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

async function checkEmbeddings() {
  try {
    console.log('🔍 Checking embeddings status...\n');
    
    // Fetch all knowledge base entries
    const { data: entries, error: fetchError } = await supabase
      .from('chatbot_knowledge')
      .select('id, category, title, embedding')
      .order('id');
    
    if (fetchError) {
      console.error('❌ Error fetching knowledge base entries:', fetchError.message);
      process.exit(1);
    }
    
    console.log(`📋 Found ${entries.length} knowledge base entries`);
    
    // Count entries with and without embeddings
    let withEmbeddings = 0;
    let withoutEmbeddings = 0;
    
    entries.forEach(entry => {
      if (entry.embedding && Array.isArray(entry.embedding) && entry.embedding.length > 0) {
        withEmbeddings++;
      } else {
        withoutEmbeddings++;
      }
    });
    
    console.log(`\n📊 Embeddings Status:`);
    console.log(`  ✅ Entries with embeddings: ${withEmbeddings}`);
    console.log(`  ❌ Entries without embeddings: ${withoutEmbeddings}`);
    
    if (entries.length > 0) {
      console.log(`  📈 Percentage with embeddings: ${((withEmbeddings / entries.length) * 100).toFixed(1)}%`);
    }
    
    // Show sample entries
    console.log('\n📝 Sample entries:');
    
    // Show entries with embeddings
    const entriesWithEmbeddings = entries.filter(e => e.embedding && Array.isArray(e.embedding) && e.embedding.length > 0);
    if (entriesWithEmbeddings.length > 0) {
      console.log('\n✅ Entries with embeddings:');
      entriesWithEmbeddings.slice(0, 3).forEach((entry, index) => {
        console.log(`  ${index + 1}. [${entry.category}] ${entry.title}`);
        console.log(`     Embedding dimensions: ${entry.embedding.length}`);
      });
    }
    
    // Show entries without embeddings
    const entriesWithoutEmbeddings = entries.filter(e => !e.embedding || !Array.isArray(e.embedding) || e.embedding.length === 0);
    if (entriesWithoutEmbeddings.length > 0) {
      console.log('\n❌ Entries without embeddings:');
      entriesWithoutEmbeddings.slice(0, 3).forEach((entry, index) => {
        console.log(`  ${index + 1}. [${entry.category}] ${entry.title}`);
      });
      
      if (entriesWithoutEmbeddings.length > 3) {
        console.log(`     ... and ${entriesWithoutEmbeddings.length - 3} more`);
      }
    }
    
    console.log('\n✅ Embeddings check completed!');
    
  } catch (error: any) {
    console.error('❌ Unexpected error during embeddings check:', error.message);
    process.exit(1);
  }
}

checkEmbeddings();