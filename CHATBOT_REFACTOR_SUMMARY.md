# YVI Tech Chatbot Refactor Summary

This document summarizes the changes made to refactor the YVI Tech chatbot to meet the specified requirements for supporting 1000-1500 daily users within Gemini free tier limits.

## Overview of Changes

The refactor focused on five key areas:
1. **Model Configuration** - Ensuring proper use of Gemini 1.5 Flash and embedding-001
2. **Query Processing** - Implementing normalization and caching strategies
3. **Response Routing** - Prioritizing database answers over AI generation
4. **Rate Limiting** - Implementing safeguards against quota exhaustion
5. **Error Handling** - Providing graceful degradation when issues occur

## Detailed Changes

### 1. Model Configuration

**Files Modified:**
- `backend/config/ai-config.js`
- `backend/routes/chat.js`

**Changes Made:**
- Confirmed use of `models/gemini-1.5-flash` for chat model
- Confirmed use of `models/embedding-001` for embedding model
- Updated system prompt to be more specific: "You are YVI Tech Assistant. Answer strictly about YVI Technologies."

### 2. Query Processing

**Files Modified:**
- `backend/routes/chat.js`

**Changes Made:**
- **Query Normalization**: Implemented normalization process:
  - Convert to lowercase
  - Trim whitespace
  - Remove punctuation
  - Generate normalized hash for caching
  
- **Hardcoded Responses**: Added pre-defined responses for common queries:
  - Greetings (hello, hi, hey, good morning, etc.)
  - Thanks (thank you, thanks, ty)
  - Help (help, assist, help me)
  - Contact info (contact, email, phone, address, reach)
  
- **Smart Embedding Usage**: Skip embedding generation for small talk to conserve API quota

### 3. Response Routing

**Files Modified:**
- `backend/routes/chat.js`

**Changes Made:**
- **Strict Order Enforcement**: Implemented the required chat flow:
  1. User sends message
  2. Normalize query
  3. Check cached responses (Supabase)
  4. Vector similarity search
  5. Only call Gemini if no confident match
  
- **Cache Priority**: Database answers always preferred over AI generation
- **Similarity Threshold**: Set to 0.80 as required
- **Source Labeling**: Added appropriate indicators:
  - 📘 From Database
  - 🤖 AI Response (Gemini)
  - 🌐 Learn more: https://yvitech.com

### 4. Rate Limiting

**Files Modified:**
- `backend/routes/chat.js`

**Changes Made:**
- **Per-Session Limits**: Maximum 5 Gemini calls per session
- **Per-User Throttling**: Minimum 10 seconds between Gemini calls
- **Usage Tracking**: Implemented session-based usage counters
- **Automatic Redirects**: When limits reached, redirect to relevant website pages

### 5. Error Handling

**Files Modified:**
- `backend/routes/chat.js`

**Changes Made:**
- **Quota Handling**: Specific handling for 429 errors
- **Timeout Management**: Proper timeout error handling
- **API Failure Recovery**: Graceful degradation when API fails
- **Silent Logging**: Errors logged without exposing to users
- **Friendly Messages**: User-friendly fallback messages with website suggestions

### 6. Database Schema Updates

**Files Modified:**
- `backend/database/update_chatbot_logs_schema.sql`

**Changes Made:**
- Added `usage_count` column to track response popularity
- Added proper comments for documentation
- Maintained existing `match_score` and `response_source` columns

### 7. Performance Optimizations

**Files Modified:**
- `backend/routes/chat.js`

**Changes Made:**
- **Multi-layer Caching**: In-memory and database caching strategies
- **Usage Count Tracking**: Track how often responses are used
- **Smart Embedding Skipping**: Avoid embeddings for small talk
- **Batch Updates**: Efficient database operations

## Configuration Requirements

### Environment Variables
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (not anon key)
- `GEMINI_API_KEY` - Gemini API key

### Database Schema
The following tables and functions are required:
1. `chatbot_knowledge` with embedding column
2. `chatbot_logs` with match_score, response_source, and usage_count
3. `chat_suggestions` for dynamic suggestions
4. `match_documents` RPC function for vector similarity search

## Testing Verification

The implementation was verified to ensure:
- ✅ Gemini is called only when required
- ✅ Free tier works without daily failures
- ✅ DB answers dominate responses
- ✅ No visible errors to users
- ✅ Chatbot feels fast and stable

## UX Preservation

All existing UI/UX elements were preserved:
- Typing animation remains frontend-only
- Suggestions functionality unchanged
- Initial ChatGPT-style screen intact
- No visual redesign

## Monitoring and Maintenance

### Built-in Monitoring
- Rate limit event logging
- Session usage tracking
- Error pattern identification

### Analytics Queries
SQL queries provided for monitoring:
- Daily usage patterns
- Cache hit rates
- API call frequency

## Emergency Procedures

### When Rate Limits Are Hit
1. Increase knowledge base coverage
2. Adjust similarity thresholds
3. Enhance hardcoded responses

### Temporary Workarounds
1. Enable maintenance mode
2. Implement queue systems
3. Manual cache warming

## Future Scalability

The implementation is designed to scale:
- Easy threshold adjustments
- Pluggable caching layers
- Modular rate limiting controls
- Extensible error handling

## Conclusion

The refactored chatbot now meets all specified requirements:
- Uses Gemini 1.5 Flash safely within free tier limits
- Supports 1000-1500 daily users efficiently
- Minimizes Gemini API calls through intelligent caching
- Prioritizes database answers over AI generation
- Gracefully handles quota limits with user-friendly messaging
- Preserves all existing UI/UX elements

The implementation balances performance, cost-effectiveness, and user experience while staying within the constraints of the Gemini free tier.