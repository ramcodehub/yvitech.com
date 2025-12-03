// Test script for chat functionality
import dotenv from 'dotenv';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

dotenv.config();

async function testChat() {
  try {
    // Initialize OpenAI client
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Test message
    const testMessage = "Hello, what services does YVI Tech offer?";
    
    console.log('Testing chat functionality...');
    console.log('Test message:', testMessage);

    // Generate AI response
    const { text: aiResponse } = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: testMessage,
    });

    console.log('AI Response:', aiResponse);
    console.log('✅ Chat test completed successfully!');
  } catch (error) {
    console.error('❌ Chat test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testChat();