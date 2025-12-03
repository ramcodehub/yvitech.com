const fetch = require('node-fetch');

async function testChatAPI() {
  try {
    const response = await fetch('http://localhost:3001/api/chat/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello, how are you?',
      }),
    });

    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testChatAPI();