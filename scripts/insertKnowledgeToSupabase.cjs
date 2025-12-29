#!/usr/bin/env node

/**
 * Script to insert processed knowledge from final_knowledge.json into Supabase chatbot_knowledge table
 * 
 * This script:
 * 1. Reads the final knowledge from final_knowledge.json
 * 2. Inserts each entry into the chatbot_knowledge table in Supabase
 * 3. Handles database insertion with proper error handling
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });

// Dynamically import Supabase client
async function insertKnowledgeToSupabase() {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    // Validate environment variables
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase environment variables');
      console.error('Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in backend/.env');
      process.exit(1);
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🚀 Starting knowledge insertion to Supabase...');

    // Read the final knowledge
    const finalPath = path.resolve(__dirname, '../frontend/data/final_knowledge.json');
    const finalEntries = JSON.parse(fs.readFileSync(finalPath, 'utf8'));

    console.log(`Loaded ${finalEntries.length} final entries`);

    // Insert entries one by one
    let insertedCount = 0;
    let updatedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < finalEntries.length; i++) {
      const entry = finalEntries[i];
      
      try {
        // Prepare the entry data
        const entryData = {
          category: entry.category,
          title: entry.title,
          description: entry.description,
          keywords: entry.keywords
        };

        // Try to insert the entry
        const { data, error } = await supabase
          .from('chatbot_knowledge')
          .insert([entryData])
          .select();

        if (error) {
          // If insert fails due to duplicate, try to update
          if (error.message.includes('duplicate') || error.message.includes('unique')) {
            const { data: updateData, error: updateError } = await supabase
              .from('chatbot_knowledge')
              .update(entryData)
              .eq('category', entry.category)
              .eq('title', entry.title);

            if (updateError) {
              console.error(`Error updating entry "${entry.title}":`, updateError.message);
              errorCount++;
            } else {
              updatedCount++;
              console.log(`🔄 Updated: ${entry.title}`);
            }
          } else {
            console.error(`Error inserting entry "${entry.title}":`, error.message);
            errorCount++;
          }
        } else {
          insertedCount++;
          console.log(`✅ Inserted: ${entry.title}`);
        }
      } catch (entryError) {
        console.error(`Error processing entry "${entry.title}":`, entryError.message);
        errorCount++;
      }

      // Add a small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    console.log('\n📊 Insertion Summary:');
    console.log(`  ➕ Entries inserted: ${insertedCount}`);
    console.log(`  🔄 Entries updated: ${updatedCount}`);
    console.log(`  ❌ Entries with errors: ${errorCount}`);
    console.log(`  📝 Total processed: ${finalEntries.length}`);

    console.log('\n✅ Knowledge insertion completed!');

    return { insertedCount, updatedCount, errorCount };
  } catch (error) {
    console.error('❌ Error in knowledge insertion process:', error);
    process.exit(1);
  }
}

// Main function to run the insertion
async function main() {
  try {
    await insertKnowledgeToSupabase();
  } catch (error) {
    console.error('❌ Error in main insertion process:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { insertKnowledgeToSupabase };