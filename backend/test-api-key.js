// Script to test API key directly with HTTP request
import dotenv from 'dotenv';
import { request } from 'undici';

dotenv.config();

async function testApiKey() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = 'gemini-pro';
    
    console.log('Testing API key directly...');
    console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
    
    if (!apiKey) {
      console.error('❌ API key not found');
      process.exit(1);
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const requestBody = {
      contents: [{
        parts: [{
          text: "Hello, what services does YVI Tech offer?"
        }]
      }]
    };
    
    console.log('Making request to:', url);
    
    const { statusCode, body } = await request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log('Status Code:', statusCode);
    
    const responseText = await body.text();
    console.log('Response:', responseText.substring(0, 200) + '...');
    
    if (statusCode === 200) {
      console.log('✅ API key is valid!');
    } else {
      console.log('❌ API key test failed');
    }
    
  } catch (error) {
    console.error('❌ API key test failed with error:', error.message);
  }
}

testApiKey();