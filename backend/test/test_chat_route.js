// Simple test script to verify the chat route functionality
import dotenv from 'dotenv';
dotenv.config();

// Test the chat route
async function testChatRoute() {
  try {
    console.log('Testing chat route...');
    
    const response = await fetch('http://localhost:3001/api/chat/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello, what services do you offer?',
        sessionId: 'test-session-id'
      }),
    });
    
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ Chat route test passed');
      console.log('Response source:', data.responseSource);
      console.log('Response:', data.response.substring(0, 100) + '...');
      console.log('Suggestions:', data.suggestions);
    } else {
      console.log('❌ Chat route test failed');
      console.log('Error:', data.error);
    }
  } catch (error) {
    console.error('Error testing chat route:', error.message);
  }
}

// Run the test
testChatRoute();