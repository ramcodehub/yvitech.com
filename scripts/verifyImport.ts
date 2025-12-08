#!/usr/bin/env node

/**
 * Script to verify that knowledge was imported to Supabase
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
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyImport() {
  try {
    console.log('🔍 Verifying knowledge import to Supabase...\n');
    
    // Get all entries to count by category
    const { data: allEntries, error: entriesError } = await supabase
      .from('chatbot_knowledge')
      .select('category');
    
    if (entriesError) {
      console.error('❌ Error fetching entries:', entriesError.message);
      process.exit(1);
    }
    
    // Count entries by category
    const categoryCounts: { [key: string]: number } = {};
    allEntries.forEach(entry => {
      categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1;
    });
    
    console.log('📚 Knowledge base categories:');
    let totalCount = 0;
    for (const [category, count] of Object.entries(categoryCounts)) {
      console.log(`  ${category}: ${count} entries`);
      totalCount += count;
    }
    
    console.log(`\n📈 Total entries in knowledge base: ${totalCount}`);
    
    // Show sample entries
    console.log('\n📝 Sample entries:');
    const { data: samples, error: samplesError } = await supabase
      .from('chatbot_knowledge')
      .select('category, title, description')
      .limit(5);
    
    if (samplesError) {
      console.error('❌ Error fetching samples:', samplesError.message);
    } else {
      samples.forEach((sample, index) => {
        console.log(`  ${index + 1}. [${sample.category}] ${sample.title}`);
        console.log(`     ${sample.description.substring(0, 100)}${sample.description.length > 100 ? '...' : ''}`);
      });
    }
    
    console.log('\n✅ Verification completed successfully!');
    
  } catch (error: any) {
    console.error('❌ Unexpected error during verification:', error.message);
    process.exit(1);
  }
}

verifyImport();