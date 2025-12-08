# Database Setup for Vector Similarity Search

This directory contains the SQL scripts needed to set up vector similarity search for the chatbot.

## Prerequisites

Before running these scripts, ensure you have:

1. Enabled the pgvector extension in your Supabase project
2. Added the embedding column to your chatbot_knowledge table

## Setup Steps

1. **Enable pgvector extension** (if not already done):
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

2. **Add embedding column** (if not already done):
   ```sql
   ALTER TABLE chatbot_knowledge ADD COLUMN IF NOT EXISTS embedding vector(768);
   ```

3. **Create the vector similarity function** by running:
   ```sql
   -- Execute the contents of vector_similarity_function.sql
   ```

4. **Create index for fast similarity search** (recommended):
   ```sql
   CREATE INDEX IF NOT EXISTS knowledge_embedding_idx ON chatbot_knowledge USING ivfflat (embedding vector_cosine_ops);
   ```

## Vector Similarity Function

The `match_documents` function performs cosine similarity search on the chatbot_knowledge table:

- Takes a query embedding and optional threshold/count parameters
- Returns documents with similarity scores above the threshold
- Orders results by similarity (most similar first)

## Usage

The function can be called from the backend like this:

```javascript
const { data, error } = await supabase
  .rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.80,
    match_count: 1
  });
```

## Parameters

- `query_embedding`: The vector embedding of the user's query
- `match_threshold`: Minimum similarity score (default 0.80)
- `match_count`: Maximum number of results to return (default 10)

## Returns

A table with the following columns:
- `id`: Document ID
- `category`: Document category
- `title`: Document title
- `description`: Document description
- `similarity`: Cosine similarity score (0-1)