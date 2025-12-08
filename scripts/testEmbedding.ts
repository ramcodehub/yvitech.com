#!/usr/bin/env node

/**
 * Simple test script to verify embedding generation works
 */

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

// Validate environment variables
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  console.error('❌ Missing Gemini API key');
  console.error('Please ensure GEMINI_API_KEY is set in backend/.env');
  process.exit(1);
}

async function testEmbedding() {
  try {
    console.log('🧪 Testing embedding generation...\n');
    
    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(geminiApiKey!);
    const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
    
    // Test content
    const testContent = "This is a test sentence to generate an embedding for.";
    
    console.log('📝 Generating embedding for:', testContent);
    
    // Generate embedding
    const result = await embeddingModel.embedContent(testContent);
    const embedding = result.embedding.values;
    
    console.log(`✅ Successfully generated embedding with ${embedding.length} dimensions`);
    console.log('📋 First 10 values:', embedding.slice(0, 10));
    
    console.log('\n✅ Embedding test completed successfully!');
    
  } catch (error: any) {
    console.error('❌ Error during embedding test:', error.message);
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      console.log('\n⚠️  Rate limit error detected.');
      console.log('💡 This is expected if you\'ve hit your daily quota.');
      console.log('💡 Try again tomorrow or upgrade your Gemini API plan.');
      console.log('💡 For more information: https://ai.google.dev/gemini-api/docs/rate-limits');
    }
  }
}

testEmbedding();