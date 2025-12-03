// Test script for Gemini API functionality
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

async function testGemini() {
  try {
    // Initialize Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Test message
    const testMessage = "Hello, what services does YVI Tech offer?";
    
    console.log('Testing Gemini API functionality...');
    console.log('Test message:', testMessage);

    // Generate AI response
    const result = await model.generateContent(testMessage);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini Response:', text);
    console.log('✅ Gemini API test completed successfully!');
  } catch (error) {
    console.error('❌ Gemini API test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testGemini();