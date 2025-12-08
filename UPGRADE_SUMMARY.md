# Chatbot Vector Similarity Search Upgrade Summary

This document summarizes the changes made to implement vector similarity search in the chatbot.

## Overview

The chat route has been upgraded to include vector similarity search capabilities:

1. **Embedding Generation**: User queries are converted to embeddings using Gemini's embedding model
2. **Vector Search**: Embeddings are compared against the knowledge base using cosine similarity
3. **Intelligent Routing**: High-confidence matches (>80%) are served from the database, others use the LLM
4. **Enhanced Logging**: All interactions are logged with metadata for analysis
5. **Improved Suggestions**: Dynamic suggestions based on response content

## Files Modified

### Backend Changes

1. **`backend/routes/chat.js`** - Main chat route implementation:
   - Added embedding generation using Gemini Embeddings API
   - Implemented vector similarity search with fallback to LLM
   - Added response source tracking ("database" vs "gemini")
   - Enhanced logging with match scores and response sources
   - Improved error handling for vector search failures

2. **`backend/database/vector_similarity_function.sql`** - SQL function for vector search:
   - Created `match_documents` RPC function
   - Performs cosine similarity search on chatbot_knowledge table
   - Configurable threshold and result count parameters

3. **`backend/database/update_chatbot_logs_schema.sql`** - Database schema updates:
   - Added `match_score` column to track similarity scores
   - Added `response_source` column to track response origins

4. **`backend/routes/README.md`** - Documentation:
   - Detailed explanation of new chat route functionality
   - API endpoint specifications
   - Database schema requirements
   - Testing instructions

5. **`backend/database/README.md`** - Database setup documentation:
   - Prerequisites for vector similarity search
   - Step-by-step setup instructions
   - Usage examples

### Test Files

1. **`backend/test/test_chat_route.js`** - Simple test script:
   - Basic functionality test for the updated chat route
   - Validates response structure and metadata

## New Flow

1. **Receive user query**
2. **Generate embedding** for query using Gemini Embeddings API
3. **Perform vector similarity search** against chatbot_knowledge:
   - If score > 0.80 → return database answer
   - Else → fallback to Gemini LLM
4. **Add metadata**:
   - `responseSource`: "database" or "gemini"
5. **Log query, response, match score** into chatbot_logs
6. **Return suggestions** from chat_suggestions table

## Database Requirements

### Extensions
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### Table Columns
```sql
-- Add embedding column to chatbot_knowledge
ALTER TABLE chatbot_knowledge ADD COLUMN IF NOT EXISTS embedding vector(768);

-- Add metadata columns to chatbot_logs
ALTER TABLE chatbot_logs ADD COLUMN IF NOT EXISTS match_score float DEFAULT 0;
ALTER TABLE chatbot_logs ADD COLUMN IF NOT EXISTS response_source text DEFAULT 'gemini';
```

### Functions
```sql
-- Create vector similarity search function
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(768),
  match_threshold float DEFAULT 0.80,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  category text,
  title text,
  description text,
  similarity float
)
LANGUAGE sql
AS $$
  SELECT
    chatbot_knowledge.id,
    chatbot_knowledge.category,
    chatbot_knowledge.title,
    chatbot_knowledge.description,
    1 - (chatbot_knowledge.embedding <=> query_embedding) AS similarity
  FROM chatbot_knowledge
  WHERE 1 - (chatbot_knowledge.embedding <=> query_embedding) >= match_threshold
  ORDER BY chatbot_knowledge.embedding <=> query_embedding
  LIMIT match_count;
$$;
```

## API Response Changes

The chat API now returns additional metadata:

```json
{
  "success": true,
  "response": "AI response or database answer",
  "suggestions": [...],
  "responseSource": "database|gemini",
  "sessionId": "session-id"
}
```

## Benefits

1. **Faster Responses**: High-confidence queries served directly from database
2. **Cost Reduction**: Reduced LLM API usage for common queries
3. **Consistency**: Standardized responses for frequently asked questions
4. **Analytics**: Track which queries are served from database vs LLM
5. **Performance Monitoring**: Measure similarity scores for query effectiveness

## Rollout Instructions

1. **Database Setup**:
   - Run the SQL scripts in `backend/database/` directory
   - Ensure pgvector extension is enabled
   - Add required columns to existing tables

2. **Backend Deployment**:
   - Deploy updated `chat.js` route
   - Verify Gemini API key has embedding permissions

3. **Testing**:
   - Test both database and LLM fallback scenarios
   - Verify logging includes new metadata fields
   - Confirm suggestions are still generated correctly

4. **Monitoring**:
   - Monitor chatbot_logs for response sources
   - Track match scores to optimize threshold
   - Watch for embedding generation errors

## Future Improvements

1. **Dynamic Threshold Adjustment**: Adjust similarity threshold based on query patterns
2. **Multi-match Selection**: Return multiple relevant documents for complex queries
3. **Feedback Loop**: Allow users to rate response accuracy for training
4. **Query Expansion**: Expand queries with synonyms before embedding generation
5. **Caching Layer**: Cache frequent embeddings to reduce API calls