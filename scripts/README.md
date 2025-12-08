# Scripts

This directory contains utility scripts for the YVI Technologies project.

## importKnowledgeToSupabase.ts

A Node.js/TypeScript script that imports knowledge from CSV files to Supabase.

### Functionality

1. Connects to Supabase using environment variables from `backend/.env`
2. Reads all CSV files from `frontend/src/data`
3. For each row:
   - Uses filename as the category
   - Maps columns appropriately (handles different CSV structures)
   - Generates keywords from title and description
   - Replaces "YVI Soft Solutions" with "YVI Technologies"
4. Inserts or updates entries in the `chatbot_knowledge` table
5. Logs detailed statistics about the import process

### Requirements

- Node.js
- Supabase credentials in `backend/.env`:
  - `VITE_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Installation

```bash
# From the project root directory
npm install
```

### Usage

```bash
# From the project root directory
npm run import-knowledge
```

### How it works

1. The script scans the `frontend/src/data` directory for all `.csv` files
2. For each CSV file, it:
   - Parses the content using `csv-parse`
   - Maps columns based on detected structure:
     - If columns are `section` and `content`, uses those
     - Otherwise uses the first two columns
   - Cleans the data by replacing "YVI Soft Solutions" with "YVI Technologies"
   - Generates keywords from the title and description
   - Attempts to insert each entry into Supabase
   - If insertion fails due to a duplicate, it updates the existing entry
3. Provides detailed logging of the process:
   - Number of files processed
   - Number of entries inserted/updated/skipped
   - Any errors encountered

### Supported CSV Structures

The script handles various CSV structures:

1. **Section/Content format** (like `Home_Page_cleaned.csv`):
   ```
   section,content
   Hero,Welcome to YVI Technologies...
   About,YVI Technologies is a global...
   ```

2. **Generic two-column format**:
   ```
   title,description
   Service A,Detailed description of service A
   Service B,Detailed description of service B
   ```

### Output Example

```
🚀 Starting knowledge import to Supabase...

Found 4 CSV files to process:
Enterprise_Services_cleaned_v2.csv
Explore_YVITech_cleaned_v3.csv
Home_Page_cleaned.csv
Services_cleaned_v2.csv

Processing 3 records from Enterprise_Services_cleaned_v2.csv as category "Enterprise_Services_cleaned_v2"
✅ Processed 3 entries from C:\Users\...\frontend\src\data\Enterprise_Services_cleaned_v2.csv: 3 inserted, 0 updated, 0 skipped

📊 Import Summary:
  📁 Files processed: 4/4
  ➕ Entries inserted: 18
  🔄 Entries updated: 0
  ⏭️  Entries skipped: 0

✅ Knowledge import completed successfully!
```

## generateEmbeddings.ts

A Node.js/TypeScript script that generates embeddings for chatbot knowledge base entries using the Gemini Embeddings API and saves them to the Supabase database.

### Prerequisites

Before running this script, you must set up your Supabase database:

1. **Enable pgvector Extension**:
   Run this SQL in your Supabase SQL editor:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

2. **Add Embedding Column**:
   Run this SQL in your Supabase SQL editor:
   ```sql
   ALTER TABLE chatbot_knowledge ADD COLUMN IF NOT EXISTS embedding vector(768);
   ```

3. **Create Index for Fast Search** (optional but recommended):
   Run this SQL in your Supabase SQL editor:
   ```sql
   CREATE INDEX IF NOT EXISTS knowledge_embedding_idx ON chatbot_knowledge USING ivfflat (embedding vector_cosine_ops);
   ```

### Functionality

1. Fetches all rows from the `chatbot_knowledge` table
2. For each row:
   - Generates embeddings using the Gemini Embeddings API
   - Saves the embeddings into the "embedding" vector column
3. Provides progress logs and error handling
4. Outputs SQL command to create the pgvector index for similarity search

### Requirements

- Node.js
- Supabase credentials in `backend/.env`:
  - `VITE_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Gemini API key in `backend/.env`:
  - `GEMINI_API_KEY`

### Installation

```bash
# From the project root directory
npm install
```

### Usage

```bash
# From the project root directory
npm run generate-embeddings
```

### How it works

1. The script connects to Supabase and fetches all knowledge base entries
2. For each entry, it:
   - Combines the title and description into a single text
   - Sends the text to the Gemini Embeddings API
   - Receives a vector embedding (typically 768 dimensions)
   - Updates the entry with the embedding in the database
3. Processes entries one at a time to respect API rate limits
4. Implements retry logic for rate limit errors
5. Provides detailed logging of the process:
   - Progress by batches
   - Success/failure counts
   - Individual entry updates
6. Outputs the SQL command needed to create the vector index for fast similarity search

### Rate Limiting Considerations

The Gemini Embeddings API has strict rate limits, especially for free tier accounts:
- **Free Tier Limits**: 1500 requests/day, 360 requests/minute
- **Current Implementation**: Processes 1 entry every 2 seconds to stay within limits
- **Rate Limit Handling**: Automatic retry logic with exponential backoff
- **Quota Exhaustion**: Script will stop when daily quota is reached

### Solutions for Rate Limit Issues

1. **Upgrade Your Plan**: 
   - Upgrade to Google AI for Developers paid plan for higher quotas
   - Visit: https://ai.google.dev/pricing

2. **Stagger Processing**:
   - Run the script multiple times over several days
   - Process smaller batches each time

3. **Alternative Embedding Providers**:
   - Consider OpenAI embeddings if you have an API key
   - Modify the script to use a different provider

### Output Example

```
🚀 Starting embeddings generation for chatbot knowledge base...

📥 Fetching knowledge base entries...
📋 Found 79 knowledge base entries
🎯 Processing 79 entries for embeddings
💡 Note: Processing slowly to respect API rate limits. This may take a while...

🔄 Processing batch 1/79 (1 entries)
✅ Updated entry 1 with embedding (768 dimensions)
⏳ Waiting 5 seconds before next batch...

...

📊 Final Summary:
  ✅ Successfully processed: 50 entries
  ❌ Errors encountered: 29 entries

📈 Success rate: 63.3%

.CreateIndexing embeddings for fast similarity search...
✅ Index creation command prepared (execute in Supabase SQL editor):
   CREATE INDEX IF NOT EXISTS knowledge_embedding_idx ON chatbot_knowledge USING ivfflat (embedding vector_cosine_ops);

⚠️  Some entries failed due to API rate limits.
💡 Solutions:
   1. Upgrade your Gemini API plan for higher rate limits
   2. Run the script again later when quota resets
   3. Process entries in smaller batches over multiple runs

✅ Embeddings generation completed!
💡 Next steps:
   1. Run the SQL index creation command in Supabase if not already done
   2. Test the chatbot with similarity search capabilities
```