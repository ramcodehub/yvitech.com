// Script to list available models via API
import dotenv from 'dotenv';

dotenv.config();

async function listModels() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log('Listing available models via API...');
    console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
    
    if (!apiKey) {
      console.error('❌ API key not found');
      process.exit(1);
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    
    console.log('Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Status Code:', response.status);
    
    const responseText = await response.text();
    console.log('Response:', responseText);
    
    if (response.status === 200) {
      console.log('✅ Successfully listed models!');
      const data = JSON.parse(responseText);
      if (data.models) {
        console.log('Available models:');
        data.models.forEach(model => {
          console.log(`- ${model.name}: ${model.displayName || 'No display name'}`);
        });
      }
    } else {
      console.log('❌ Failed to list models');
    }
    
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
  }
}

listModels();