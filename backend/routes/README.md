# Chat Route (/api/chat/chat)

This document describes the updated functionality of the chat route with vector similarity search.

## New Flow

1. **Receive user query**
2. **Generate embedding for query** using Gemini Embeddings API
3. **Perform vector similarity search** against chatbot_knowledge table
   - If similarity score > 0.80 → return database answer
   - Else → fallback to Gemini LLM
4. **Add metadata** to response:
   - `responseSource`: "database" or "gemini"
5. **Log query, response, match score** into chatbot_logs table
6. **Return suggestions** from chat_suggestions table

## API Endpoint

```
POST /api/chat/chat
```

### Request Body

```json
{
  "message": "string",           // Required: User's query
  "sessionId": "string",         // Optional: Session identifier
  "userId": "string"             // Optional: User identifier
}
```

### Response

```json
{
  "success": true,
  "response": "string",          // AI response or database answer
  "suggestions": [               // Dynamic suggestions based on response
    {
      "display": "string",       // Short display text
      "full": "string"           // Full question text
    }
  ],
  "responseSource": "database|gemini",  // Source of the response
  "sessionId": "string"          // Session identifier
}
```

## Vector Similarity Search

The chat route now performs vector similarity search using pgvector in Supabase:

1. **Query Embedding Generation**: User queries are converted to embeddings using Gemini's embedding model
2. **Similarity Search**: Embeddings are compared against the knowledge base using cosine similarity
3. **Threshold Matching**: Only matches above 80% similarity are considered
4. **Fallback Mechanism**: If no high-confidence matches are found, falls back to LLM generation

## Database Schema Requirements

### chatbot_knowledge Table

Must have an `embedding` column of type `vector(768)`:

```sql
ALTER TABLE chatbot_knowledge ADD COLUMN IF NOT EXISTS embedding vector(768);
```

### chatbot_logs Table

Should have additional columns for tracking:

```sql
ALTER TABLE chatbot_logs ADD COLUMN IF NOT EXISTS match_score float;
ALTER TABLE chatbot_logs ADD COLUMN IF NOT EXISTS response_source text;
```

To add these columns to an existing table:

```sql
-- Add match_score column
ALTER TABLE chatbot_logs 
ADD COLUMN IF NOT EXISTS match_score float DEFAULT 0;

-- Add response_source column
ALTER TABLE chatbot_logs 
ADD COLUMN IF NOT EXISTS response_source text DEFAULT 'gemini';
```

## Error Handling

The route gracefully handles various error conditions:

- **Embedding Generation Failures**: Falls back to LLM
- **Vector Search Failures**: Falls back to LLM
- **Database Connection Issues**: Continues with LLM fallback
- **API Rate Limits**: Returns appropriate error messages

## Logging

All interactions are logged to the `chatbot_logs` table with:

- User query
- Bot response
- Match score (0 if no vector match)
- Response source ("database" or "gemini")
- Timestamp

## Testing

To test the route:

1. Ensure the backend server is running
2. Send a POST request to `/api/chat/chat` with a message
3. Verify the response includes the new metadata fields

Example test request:
```bash
curl -X POST https://yvitech-com.onrender.com/api/chat/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What services do you offer?", "sessionId": "test-123"}'
```