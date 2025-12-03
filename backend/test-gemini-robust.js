// Robust test script for Gemini API functionality
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

async function testGemini() {
  try {
    console.log('Testing Gemini API functionality...');
    
    // Check if API key is provided
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY is not set in environment variables');
      process.exit(1);
    }
    
    console.log('Using API key:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');
    
    // Initialize Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try different model names
    const modelNames = [
      'gemini-pro',
      'gemini-1.0-pro',
      'gemini-1.5-pro-latest',
      'gemini-1.5-flash-latest'
    ];
    
    for (const modelName of modelNames) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Test message
        const testMessage = "Hello, what services does YVI Tech offer?";
        
        console.log('Test message:', testMessage);

        // Generate AI response
        const result = await model.generateContent(testMessage);
        const response = await result.response;
        const text = response.text();

        console.log(`✅ Gemini API test with ${modelName} completed successfully!`);
        console.log('Response:', text.substring(0, 100) + '...');
        return; // Exit after first successful test
      } catch (modelError) {
        console.log(`⚠️  Model ${modelName} failed:`, modelError.message.split('.')[0]);
      }
    }
    
    console.error('❌ All model tests failed');
    process.exit(1);
    
  } catch (error) {
    console.error('❌ Gemini API test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testGemini();