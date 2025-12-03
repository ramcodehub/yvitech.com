// Script to list available Gemini models
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

async function listModels() {
  try {
    // Initialize Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    console.log('Fetching available models...');
    
    // List models
    const models = await genAI.listModels();
    
    console.log('Available models:');
    models.models.forEach(model => {
      console.log(`- ${model.name}: ${model.displayName}`);
    });
    
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
    process.exit(1);
  }
}

// Run the script
listModels();