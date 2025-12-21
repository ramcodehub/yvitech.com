# Gemini Rate Limit Guidance for YVI Tech Chatbot

## Understanding Gemini Free Tier Limits

The Gemini API free tier has specific rate limits that can cause issues when serving 1000-1500 daily users:

### Free Tier Limits (as of 2024)
- **Requests Per Minute (RPM)**: 15-30 RPM depending on model
- **Requests Per Day (RPD)**: 1,000-2,000 RPD depending on model
- **Embedding Requests**: Separate limits, typically more restrictive

### Common Rate Limit Errors
- `429 Too Many Requests`
- `Quota exceeded for metric`
- `You exceeded your current quota`

## Optimization Strategies Implemented

### 1. Multi-Layer Caching Strategy

The chatbot now implements a robust caching strategy to minimize API calls:

#### In-Memory Cache
- Stores responses for 1 hour
- Immediate response for repeated queries
- No API calls required

#### Database Cache
- Persistent storage of responses
- Tracks usage frequency
- Shared across all server instances

#### Hardcoded Responses
- Pre-defined responses for common queries (greetings, thanks, help, contact)
- Zero API calls for small talk
- Improves response time significantly

### 2. Rate Limiting Controls

#### Per-Session Limits
- Maximum 5 Gemini calls per session
- Prevents abuse by single users
- Automatically redirects to website after limit

#### Per-User Throttling
- Minimum 10 seconds between Gemini calls
- Smooths out request spikes
- Fair resource distribution

### 3. Intelligent Query Routing

#### Vector Similarity Search Priority
- Database answers preferred over AI generation
- Threshold set to 0.80 for confidence
- Reduces need for API calls

#### Smart Embedding Usage
- Skips embedding generation for small talk
- Saves embedding API quota
- Focuses resources on complex queries

## Monitoring and Alerting

### Built-in Monitoring
The chatbot now includes enhanced logging for rate limit events:

```javascript
// Logs rate limit events
console.log('Rate limit exceeded for session:', sessionId);
console.log('Session limit reached for session:', sessionId);
```

### Error Handling
Graceful degradation when rate limits are hit:

```javascript
// Friendly fallback messages
aiResponse = "I'm currently experiencing high demand. For immediate assistance, please visit our website: https://yvitech.com";
```

## Scaling Recommendations

### 1. Optimize Knowledge Base Coverage

Ensure your `chatbot_knowledge` table has comprehensive coverage of common questions:

- Regularly analyze chat logs for frequently asked questions
- Add high-frequency queries to the knowledge base
- Update embeddings regularly

### 2. Fine-tune Response Threshold

Adjust the similarity threshold based on your needs:

- Higher threshold (0.85-0.90): More precise matches, more API calls
- Lower threshold (0.75-0.80): More matches, fewer API calls

### 3. Implement Usage Analytics

Track API usage patterns to optimize resource allocation:

```sql
-- Monitor usage patterns
SELECT 
  DATE(created_at) as day,
  COUNT(*) as total_queries,
  SUM(CASE WHEN response_source = 'gemini' THEN 1 ELSE 0 END) as gemini_calls,
  SUM(CASE WHEN response_source = 'database' THEN 1 ELSE 0 END) as db_matches
FROM chatbot_logs 
GROUP BY DATE(created_at)
ORDER BY day DESC
LIMIT 30;
```

## Emergency Procedures

### When Rate Limits Are Consistently Hit

1. **Increase Knowledge Base Coverage**
   - Add more entries to `chatbot_knowledge`
   - Improve embedding quality
   - Expand similarity search effectiveness

2. **Adjust Threshold Settings**
   - Temporarily lower similarity threshold
   - Accept slightly less precise matches to reduce API calls

3. **Enhance Hardcoded Responses**
   - Add more common queries to hardcoded responses
   - Reduce reliance on AI for predictable questions

### Temporary Workarounds

1. **Enable Maintenance Mode**
   - Temporarily disable AI calls
   - Route all traffic to database/cache
   - Display maintenance message

2. **Implement Queue System**
   - Add requests to queue when rate-limited
   - Process in batch during low-traffic periods

## Best Practices for Free Tier Usage

### 1. Query Optimization
- Encourage users to ask specific questions
- Implement query preprocessing to improve match rates
- Use clearer prompts to get better embeddings

### 2. Usage Distribution
- Spread usage throughout the day
- Avoid traffic spikes
- Implement client-side rate limiting hints

### 3. Content Strategy
- Regular content updates to improve match quality
- Seasonal content adjustments
- Regional content variations

## Cost-Effective Alternatives

If free tier limits continue to be problematic:

### 1. Paid Tier Upgrade
- Small monthly fee for higher limits
- Predictable costs
- Better reliability

### 2. Hybrid Approach
- Use free tier for basic queries
- Paid tier for complex requests
- Conditional routing based on query complexity

### 3. Multi-Model Strategy
- Use cheaper models for simple tasks
- Reserve advanced models for complex queries
- Implement model selection logic

## Troubleshooting Checklist

When encountering rate limit issues:

1. **Verify API Key**
   - Ensure using correct API key
   - Check key hasn't been revoked
   - Confirm key has proper permissions

2. **Check Usage Dashboard**
   - Visit Google AI Studio dashboard
   - Review current usage vs limits
   - Identify peak usage times

3. **Review Cache Effectiveness**
   - Analyze cache hit rates
   - Identify frequently uncached queries
   - Optimize cache strategy

4. **Monitor Error Logs**
   - Look for specific error patterns
   - Identify problematic query types
   - Adjust accordingly

By implementing these strategies, the YVI Tech chatbot should be able to serve 1000-1500 daily users effectively within the Gemini free tier limits while maintaining a high-quality user experience.