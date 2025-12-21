# Supabase Configuration Requirements for YVI Tech Chatbot

## Required Environment Variables

The chatbot requires the following environment variables to be set:

1. `SUPABASE_URL` - The Supabase project URL
2. `SUPABASE_SERVICE_ROLE_KEY` - The service role key for Supabase (not the anon key)

These should be set in your `.env` file or environment configuration.

## Required Database Tables

### 1. chatbot_knowledge Table

This table stores the knowledge base for the chatbot with vector embeddings.

```sql
CREATE TABLE IF NOT EXISTS chatbot_knowledge (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT,
  title TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add the embedding column for vector similarity search
ALTER TABLE chatbot_knowledge ADD COLUMN IF NOT EXISTS embedding vector(768);
```

### 2. chatbot_logs Table

This table stores conversation logs and cached responses.

```sql
CREATE TABLE IF NOT EXISTS chatbot_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_query TEXT,
  bot_response TEXT,
  matched_category TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  match_score FLOAT DEFAULT 0,
  response_source TEXT DEFAULT 'gemini',
  usage_count INTEGER DEFAULT 1
);
```

### 3. chat_suggestions Table

This table stores dynamic suggestions for chat responses.

```sql
CREATE TABLE IF NOT EXISTS chat_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT,
  display_text TEXT,
  full_question TEXT,
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);
```

## Required Database Extensions

The pgvector extension must be enabled:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## Required Database Functions

### Vector Similarity Search Function

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

## Performance Optimization

### Index for Fast Similarity Search

```sql
-- Create index for fast similarity search
CREATE INDEX IF NOT EXISTS knowledge_embedding_idx ON chatbot_knowledge USING ivfflat (embedding vector_cosine_ops);
```

## Row Level Security (RLS)

Depending on your security requirements, you may want to enable RLS:

```sql
-- Enable RLS on tables
ALTER TABLE chatbot_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_suggestions ENABLE ROW LEVEL SECURITY;
```

## Sample Data

### Sample chat_suggestions Data

```sql
INSERT INTO chat_suggestions (category, display_text, full_question, priority, is_active) VALUES
('general', 'Services', 'What services do you offer?', 10, true),
('general', 'Pricing', 'Can you provide pricing information?', 8, true),
('general', 'Contact', 'How can I get in touch with your team?', 9, true),
('general', 'More', 'Tell me more about your company', 7, true),
('oracle', 'HCM', 'Tell me about Oracle HCM services', 10, true),
('oracle', 'SCM', 'What Oracle SCM solutions do you provide?', 10, true),
('sap', 'ERP', 'What SAP ERP services do you offer?', 10, true),
('ai', 'Solutions', 'What AI solutions do you provide?', 10, true),
('web', 'Development', 'What web development services do you offer?', 10, true);
```

## Troubleshooting

### Common Issues

1. **Missing Service Role Key**: Make sure you're using the service role key, not the anon key.
2. **Extension Not Enabled**: Ensure the `vector` extension is enabled in your Supabase project.
3. **Missing Columns**: Run the ALTER TABLE statements to add required columns.
4. **Function Not Found**: Make sure the `match_documents` function is created.

### Testing Connection

You can test your Supabase connection with:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test query
const { data, error } = await supabase
  .from('chatbot_knowledge')
  .select('id, title')
  .limit(1);

if (error) {
  console.error('Supabase connection error:', error);
} else {
  console.log('Supabase connection successful');
}
```