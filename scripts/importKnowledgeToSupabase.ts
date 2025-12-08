#!/usr/bin/env node

/**
 * Script to import knowledge from CSV files to Supabase
 * 
 * This script reads all CSV files from frontend/src/data and imports them into the 
 * chatbot_knowledge table in Supabase.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

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

// Function to generate keywords from text
function generateKeywords(text: string): string[] {
  if (!text) return [];
  
  // Convert to lowercase and remove special characters
  const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  
  // Split into words and filter out common stop words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);
  
  const words = cleanText.split(/\s+/).filter(word => word.length > 2 && !stopWords.has(word));
  
  // Get unique words and limit to 10
  return Array.from(new Set(words)).slice(0, 10);
}

// Function to process a single CSV file
async function processCSVFile(filePath: string, categoryName: string): Promise<{ inserted: number, updated: number, skipped: number }> {
  try {
    // Read the CSV file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse CSV content
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`Processing ${records.length} records from ${path.basename(filePath)} as category "${categoryName}"`);
    
    // Convert records to knowledge base entries
    const knowledgeEntries = records.map((record: any, index: number) => {
      // Handle different CSV structures
      let title = '';
      let description = '';
      
      // Check for common column names
      const columnNames = Object.keys(record);
      
      if (columnNames.includes('section') && columnNames.includes('content')) {
        // Structure: section, content
        title = record.section || '';
        description = record.content || '';
      } else if (columnNames.length >= 2) {
        // Generic approach: use first two columns
        const firstColumn = columnNames[0];
        const secondColumn = columnNames[1];
        title = record[firstColumn] || '';
        description = record[secondColumn] || '';
      } else if (columnNames.length === 1) {
        // Single column
        title = record[columnNames[0]] || '';
        description = '';
      } else {
        // No columns
        title = `Entry ${index + 1}`;
        description = JSON.stringify(record);
      }
      
      // Skip empty entries
      if (!title && !description) {
        return null;
      }
      
      // Replace "YVI Soft Solutions" with "YVI Technologies"
      title = title.replace(/YVI Soft Solutions/g, 'YVI Technologies');
      description = description.replace(/YVI Soft Solutions/g, 'YVI Technologies');
      
      // Generate keywords from title and description
      const keywords = generateKeywords(`${title} ${description}`);
      
      return {
        category: categoryName,
        title: title,
        description: description,
        keywords: keywords
      };
    }).filter((entry: any) => entry !== null && (entry.title || entry.description)); // Filter out empty entries
    
    if (knowledgeEntries.length === 0) {
      console.log(`No valid entries found in ${filePath}`);
      return { inserted: 0, updated: 0, skipped: 0 };
    }
    
    // First, try to insert entries
    let insertedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const entry of knowledgeEntries) {
      // Skip null entries (TypeScript safety)
      if (!entry) continue;
      
      try {
        // Try to insert first
        const { data: insertData, error: insertError } = await supabase
          .from('chatbot_knowledge')
          .insert([entry]);
        
        if (insertError) {
          // If insert fails due to duplicate, try to update
          if (insertError.message.includes('duplicate') || insertError.message.includes('unique')) {
            const { data: updateData, error: updateError } = await supabase
              .from('chatbot_knowledge')
              .update(entry)
              .eq('category', entry.category)
              .eq('title', entry.title);
            
            if (updateError) {
              console.error(`Error updating entry "${entry.title}":`, updateError.message);
              skippedCount++;
            } else {
              updatedCount++;
            }
          } else {
            console.error(`Error inserting entry "${entry.title}":`, insertError.message);
            skippedCount++;
          }
        } else {
          insertedCount++;
        }
      } catch (entryError: any) {
        console.error(`Error processing entry "${entry.title}":`, entryError.message);
        skippedCount++;
      }
    }
    
    console.log(`✅ Processed ${knowledgeEntries.length} entries from ${filePath}: ${insertedCount} inserted, ${updatedCount} updated, ${skippedCount} skipped`);
    return { inserted: insertedCount, updated: updatedCount, skipped: skippedCount };
  } catch (error: any) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { inserted: 0, updated: 0, skipped: 0 };
  }
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting knowledge import to Supabase...\n');
    
    // Define the data directory
    const dataDir = path.resolve(__dirname, '../frontend/src/data');
    
    // Check if data directory exists
    if (!fs.existsSync(dataDir)) {
      console.error(`❌ Data directory not found: ${dataDir}`);
      process.exit(1);
    }
    
    // Get all CSV files from the data directory
    const files = fs.readdirSync(dataDir).filter(file => 
      path.extname(file).toLowerCase() === '.csv' && 
      file.startsWith('.') === false // Skip hidden files
    );
    
    if (files.length === 0) {
      console.log('ℹ️  No CSV files found in the data directory');
      process.exit(0);
    }
    
    console.log(`Found ${files.length} CSV files to process:\n${files.join('\n')}\n`);
    
    // Process each CSV file
    let totalInserted = 0;
    let totalUpdated = 0;
    let totalSkipped = 0;
    let totalFilesProcessed = 0;
    
    for (const file of files) {
      try {
        const filePath = path.join(dataDir, file);
        // Use filename without extension as category name
        const categoryName = path.basename(file, '.csv');
        const counts = await processCSVFile(filePath, categoryName);
        
        totalInserted += counts.inserted;
        totalUpdated += counts.updated;
        totalSkipped += counts.skipped;
        
        if (counts.inserted + counts.updated > 0) {
          totalFilesProcessed++;
        }
      } catch (error: any) {
        console.error(`Error processing file ${file}:`, error.message);
      }
    }
    
    console.log('\n📊 Import Summary:');
    console.log(`  📁 Files processed: ${totalFilesProcessed}/${files.length}`);
    console.log(`  ➕ Entries inserted: ${totalInserted}`);
    console.log(`  🔄 Entries updated: ${totalUpdated}`);
    console.log(`  ⏭️  Entries skipped: ${totalSkipped}`);
    console.log('\n✅ Knowledge import completed successfully!');
    
  } catch (error: any) {
    console.error('❌ Unexpected error during import:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

export { processCSVFile, generateKeywords };