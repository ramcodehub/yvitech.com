import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
// Supabase client for backend
import { createClient } from '@supabase/supabase-js';
import { SYSTEM_PROMPT, AI_CONFIG } from '../config/ai-config.js';

// Load environment variables
dotenv.config();

// Initialize Supabase client with better error handling
let supabase;
try {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('⚠️  WARNING: Supabase configuration missing!');
    console.error('SUPABASE_URL:', !!supabaseUrl);
    console.error('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseKey);
  }
  
  supabase = createClient(supabaseUrl || 'https://your-project.supabase.co', supabaseKey || 'your-service-role-key');
} catch (error) {
  console.error('❌ Failed to initialize Supabase client:', error);
  supabase = null;
}

const router = express.Router();

// Initialize Google Generative AI client with error handling
let genAI;
let geminiModel;
try {
  const geminiApiKey = process.env.GEMINI_API_KEY || AI_CONFIG.gemini.apiKey;
  if (!geminiApiKey) {
    console.error('⚠️  WARNING: Gemini API key not configured!');
  }
  
  genAI = new GoogleGenerativeAI(geminiApiKey || 'your-gemini-api-key-here');
  geminiModel = genAI.getGenerativeModel({ 
    model: AI_CONFIG.gemini.model || 'gemini-2.5-flash',
    generationConfig: {
      temperature: AI_CONFIG.gemini.temperature || 0.7,
      maxOutputTokens: AI_CONFIG.gemini.maxTokens || 1000
    }
  });
  console.log('✅ Gemini AI client initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Gemini AI client:', error);
  genAI = null;
  geminiModel = null;
}

// Initialize embedding model for query embeddings
let embeddingModel;
try {
  embeddingModel = genAI?.getGenerativeModel({ model: "embedding-001" });
  console.log('✅ Embedding model initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize embedding model:', error);
  embeddingModel = null;
}

// Function to generate embedding for text
async function generateEmbedding(text) {
  // Check if embedding model is available
  if (!embeddingModel) {
    console.log('Embedding model not available, skipping embedding generation');
    throw new Error('Embedding model not initialized');
  }
  
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

// Function to get dynamic suggestions from database based on response content
async function getDynamicSuggestions(responseText) {
  try {
    const lowerText = responseText.toLowerCase();
    
    // Determine the most relevant category based on keywords in the response
    let category = 'general';
    
    if (lowerText.includes('oracle') || lowerText.includes('hcm') || lowerText.includes('scm') || lowerText.includes('financials')) {
      category = 'oracle';
    } else if (lowerText.includes('sap') || lowerText.includes('salesforce')) {
      category = 'sap';
    } else if (lowerText.includes('managed') || lowerText.includes('support') || lowerText.includes('sla')) {
      category = 'managed';
    } else if (lowerText.includes('ai') || lowerText.includes('data') || lowerText.includes('machine learning') || lowerText.includes('analytics') || lowerText.includes('artificial intelligence')) {
      category = 'ai';
    } else if (lowerText.includes('web') || lowerText.includes('mobile') || lowerText.includes('app') || lowerText.includes('development') || lowerText.includes('website')) {
      category = 'web';
    } else if (lowerText.includes('marketing') || lowerText.includes('seo') || lowerText.includes('social') || lowerText.includes('digital')) {
      category = 'marketing';
    }
    
    // Query the database for suggestions in the determined category
    // Get more suggestions than needed so we can randomize selection
    const { data: categorySuggestions, error: categoryError } = await supabase
      .from('chat_suggestions')
      .select('display_text, full_question')
      .eq('category', category)
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .limit(10); // Get more suggestions to allow for randomization
    
    if (!categoryError && categorySuggestions && categorySuggestions.length > 0) {
      // Randomize the selection of suggestions
      const shuffled = categorySuggestions.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);
      
      // Transform to the format expected by the frontend
      return selected.map(suggestion => ({
        display: suggestion.display_text,
        full: suggestion.full_question
      }));
    }
    
    // Fallback to general suggestions if category-specific ones aren't found
    const { data: generalSuggestions, error: generalError } = await supabase
      .from('chat_suggestions')
      .select('display_text, full_question')
      .eq('category', 'general')
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .limit(10); // Get more suggestions to allow for randomization
    
    if (!generalError && generalSuggestions && generalSuggestions.length > 0) {
      // Randomize the selection of suggestions
      const shuffled = generalSuggestions.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);
      
      return selected.map(suggestion => ({
        display: suggestion.display_text,
        full: suggestion.full_question
      }));
    }
    
    // Final fallback to hardcoded suggestions
    return [
      {"display": "Services", "full": "What services do you offer?"},
      {"display": "Pricing", "full": "Can you provide pricing information?"},
      {"display": "Contact", "full": "How can I get in touch with your team?"},
      {"display": "More", "full": "Tell me more about your company"}
    ];
  } catch (error) {
    console.error('Error fetching dynamic suggestions:', error);
    // Fallback to hardcoded suggestions in case of error
    return [
      {"display": "Services", "full": "What services do you offer?"},
      {"display": "Pricing", "full": "Can you provide pricing information?"},
      {"display": "Contact", "full": "How can I get in touch with your team?"},
      {"display": "More", "full": "Tell me more about your company"}
    ];
  }
}

// Chat endpoint
router.post('/chat', async (req, res) => {
  console.log('=== CHAT REQUEST RECEIVED ===');
  console.log('Request body:', req.body);
  console.log('Environment variables check:');
  console.log('- GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
  console.log('- SUPABASE URL exists:', !!(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL));
  console.log('- SUPABASE SERVICE KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  // Log the actual values (masked for security)
  if (process.env.GEMINI_API_KEY) {
    console.log('- GEMINI_API_KEY length:', process.env.GEMINI_API_KEY.length);
  }
  if (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) {
    console.log('- SUPABASE_URL:', process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL);
  }
  
  try {
    const { message, sessionId, userId } = req.body;
    console.log('Processing message:', message);

    // Validate input
    if (!message) {
      console.log('Validation failed: Message is required');
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    // Check if Supabase is initialized
    if (!supabase) {
      console.error('❌ Supabase client not initialized');
      return res.status(500).json({ 
        success: false, 
        error: 'Database service unavailable' 
      });
    }

    // Check if AI service is configured
    if (!(process.env.GEMINI_API_KEY || AI_CONFIG.gemini.apiKey)) {
      console.error('❌ AI service not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'AI service not configured' 
      });
    }

    // Mock response for testing when MOCK_CHAT is enabled
    if (process.env.MOCK_CHAT === 'true') {
      // Get dynamic suggestions even for mock responses
      const mockSuggestions = await getDynamicSuggestions("This is a mock response about our services.");
      
      return res.json({ 
        success: true, 
        response: "This is a mock response for testing purposes. In a production environment, this would be a response from our AI assistant.",
        suggestions: mockSuggestions,
        responseSource: "gemini", // Default to gemini for mock
        sessionId: sessionId || generateSessionId()
      });
    }

    // Generate embedding for the user query
    let queryEmbedding;
    try {
      queryEmbedding = await generateEmbedding(message);
    } catch (embeddingError) {
      console.error('Error generating query embedding:', embeddingError);
      // Fallback to LLM if embedding fails
      queryEmbedding = null;
    }

    let responseSource = "gemini";
    let aiResponse = "";
    let matchScore = 0;

    // If we successfully generated an embedding, perform vector similarity search
    if (queryEmbedding) {
      try {
        // Perform vector similarity search against chatbot_knowledge
        const { data: similarityResults, error: similarityError } = await supabase
          .rpc('match_documents', {
            query_embedding: queryEmbedding,
            match_threshold: 0.80, // 80% similarity threshold
            match_count: 1
          });

        if (!similarityError && similarityResults && similarityResults.length > 0) {
          const bestMatch = similarityResults[0];
          matchScore = bestMatch.similarity;
          
          // If score > 0.80, return DB answer
          if (matchScore > 0.80) {
            aiResponse = bestMatch.description || bestMatch.content || "No detailed information available.";
            responseSource = "database";
          }
        }
      } catch (similarityError) {
        console.log('Vector similarity search error (non-fatal):', similarityError.message);
        // If RPC function doesn't exist, we'll fall back to LLM
        if (similarityError.message && similarityError.message.includes('function')) {
          console.log('Vector similarity function not found, falling back to LLM');
        }
      }
    }

    // If we didn't get a high-confidence match from the database, fallback to Gemini LLM
    if (responseSource === "gemini") {
      // Check if AI models are initialized
      if (!genAI || !geminiModel) {
        console.error('❌ AI models not initialized');
        return res.status(500).json({ 
          success: false, 
          error: 'AI service not available' 
        });
      }
      
      // Query knowledge base for relevant information (fallback method)
      let knowledgeBaseInfo = '';
      try {
        const { data: knowledgeData, error: knowledgeError } = await supabase
          .from('chatbot_knowledge')
          .select('category, title, description')
          .limit(3);

        if (!knowledgeError && knowledgeData && knowledgeData.length > 0) {
          knowledgeBaseInfo = '\n\nRelevant information from our knowledge base:\n';
          knowledgeData.forEach(item => {
            knowledgeBaseInfo += `- ${item.title}: ${item.description}\n`;
          });
        }
      } catch (kbError) {
        console.log('Knowledge base query error (non-fatal):', kbError.message);
      }

      // Generate AI response with system prompt and knowledge base info using Gemini
      const fullPrompt = SYSTEM_PROMPT + knowledgeBaseInfo + '\n\nUser question: ' + message;
      console.log('Sending prompt to Gemini:', fullPrompt.substring(0, 100) + '...');
      
      try {
        const result = await geminiModel.generateContent(fullPrompt);
        aiResponse = result.response.text();
        console.log('Received response from Gemini, length:', aiResponse.length);
      } catch (aiError) {
        console.error('❌ Error generating AI response:', aiError);
        console.error('Error name:', aiError.name);
        console.error('Error message:', aiError.message);
        if (aiError.response) {
          console.error('Error response:', aiError.response);
        }
        throw aiError; // Re-throw to be caught by outer try/catch
      }
    }

    // Log the full AI response for debugging
    console.log('Full AI Response:', aiResponse);

    // Remove any JSON suggestions that might be at the end of the response
    try {
      // Simple pattern to match the JSON suggestions format
      const suggestionsIndex = aiResponse.lastIndexOf('{"suggestions"');
      if (suggestionsIndex !== -1) {
        aiResponse = aiResponse.substring(0, suggestionsIndex).trim();
      }
    } catch (error) {
      console.log('Could not remove potential JSON suggestions from AI response');
    }

    // Get dynamic suggestions from database based on the AI response
    const suggestions = await getDynamicSuggestions(aiResponse);

    // Log final response and suggestions
    console.log('Final response:', aiResponse);
    console.log('Final suggestions:', suggestions);

    // Save chat to Supabase using chatbot_logs table
    const { data, error } = await supabase
      .from('chatbot_logs')
      .insert([
        {
          user_query: message,
          bot_response: aiResponse,
          matched_category: 'general',
          source: 'web_widget',
          match_score: matchScore,
          response_source: responseSource,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error saving chat to Supabase:', error);
    }

    // Return AI response with suggestions and metadata
    res.json({ 
      success: true, 
      response: aiResponse,
      suggestions: suggestions,
      responseSource: responseSource,
      sessionId: sessionId || generateSessionId()
    });
  } catch (error) {
    console.error('=== DETAILED ERROR ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error status:', error.status);
    
    // Check for specific error types
    if (error.name === 'GoogleGenerativeAIError' || error.message.includes('API key')) {
      console.error('This is likely an API key or Google AI configuration issue');
    }
    
    if (error.message.includes('Supabase') || error.message.includes('supabase')) {
      console.error('This is likely a Supabase connection or query issue');
    }
    
    // Provide more specific error messages based on error type
    let errorMessage = 'Failed to process chat message';
    if (error.status === 403) {
      errorMessage = 'AI service is temporarily unavailable. Please contact support.';
    } else if (error.message && error.message.includes('API key')) {
      errorMessage = 'AI service configuration error. Please contact support.';
    }
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Generate a simple session ID
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export default router;