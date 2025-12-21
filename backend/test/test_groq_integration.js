// Simple test script to verify the Groq integration
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import { AI_CONFIG } from '../config/ai-config.js';

dotenv.config();

// Test the Groq client
async function testGroqClient() {
  try {
    console.log('Testing Groq client...');
    
    const groqApiKey = process.env.GROQ_API_KEY || AI_CONFIG.groq.apiKey;
    if (!groqApiKey) {
      console.error('❌ GROQ_API_KEY not configured!');
      return;
    }
    
    const groq = new Groq({
      apiKey: groqApiKey
    });
    
    console.log('✅ Groq client initialized successfully');
    
    // Test a simple completion
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Hello, what services do you offer?"
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1,
      stream: false
    });
    
    const response = chatCompletion.choices[0]?.message?.content || "";
    console.log('✅ Groq API test passed');
    console.log('Response:', response.substring(0, 100) + '...');
    
  } catch (error) {
    console.error('❌ Error testing Groq client:', error.message);
  }
}

// Run the test
testGroqClient();