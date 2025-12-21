# AI Assistant Implementation Review

This report provides a detailed overview of how the AI assistant is implemented in the YVI Tech project.

## 1. Frontend & Backend Implementation

### Frontend
- **Framework:** React.js (Vite)
- **Component:** `ChatWidget.jsx` (located in `frontend/src/components/Chat/`)
- **UI Logic:**
  - Manages chat state (open/close, minimize/maximize).
  - Handles user input (text and voice typing via `SpeechRecognition`).
  - Displays messages with a "typing effect" for the bot.
  - Shows dynamic suggestion chips based on the last response.
  - **Initial Screen:** Offers categorized prompt shortcuts (About, Services, AI, Cloud, etc.) driven by `promptCategories.ts`.

### Backend
- **Framework:** Node.js with Express
- **Server File:** `backend/server.js` sets up the server and middleware (CORS, JSON parsing).
- **Logic File:** `backend/routes/chat.js` contains the core AI logic.
- **Workflow:**
  1.  Receives user message.
  2.  Generates an embedding for the message using Google's `embedding-001` model.
  3.  Performs a vector similarity search in the Supabase database to find relevant company knowledge.
  4.  Constructs a context-aware prompt using the retrieved knowledge.
  5.  Sends the prompt to Google Gemini LLM (`gemini-1.5-flash`) to generate a response.
  6.  Generates dynamic follow-up suggestions.
  7.  Logs the interaction to the database.

## 2. Database Models (Schema)

The project uses **Supabase (PostgreSQL)** with the `pgvector` extension for vector similarity search.

### Tables
1.  **`chatbot_knowledge`**
    - **Purpose:** Stores the knowledge base for the AI (RAG source).
    - **Columns:** `id`, `category`, `title`, `description`, `content` (implied), `embedding` (vector).

2.  **`chatbot_logs`**
    - **Purpose:** Stores the history of all chat interactions.
    - **Columns:**
        - `id`
        - `user_query` (Text: User's message)
        - `bot_response` (Text: AI's reply)
        - `matched_category` (Text: Detected category)
        - `source` (Text: e.g., 'web_widget')
        - `match_score` (Float: Similarity score)
        - `response_source` (Text: 'database' or 'gemini')
        - `created_at` (Timestamp)

3.  **`chat_suggestions`**
    - **Purpose:** Stores predefined suggestions for dynamic follow-up.
    - **Columns:** `display_text`, `full_question`, `category`, `is_active`, `priority`.

### Functions
- **`match_documents` (RPC):** A PostgreSQL function that takes a query embedding and returns the most similar documents from `chatbot_knowledge` based on cosine similarity.

## 3. Connection between Frontend and Backend

The connection is established via **REST API** calls over HTTP.

1.  **Frontend Request:**
    - The `sendMessage` function in `ChatWidget.jsx` sends a `POST` request.
    - **URL:** `https://your-backend-url/api/chat/chat` (configured via `API_BASE`).
    - **Payload:**
      ```json
      {
        "message": "User's input text",
        "sessionId": "current_session_id"
      }
      ```

2.  **Backend Processing:**
    - Express router receives the request at `/api/chat`.
    - It processes the request (Embedding -> Vector Search -> LLM Generation).

3.  **Backend Response:**
    - Returns a JSON object:
      ```json
      {
        "success": true,
        "response": "The AI's answer...",
        "suggestions": [...],
        "responseSource": "gemini",
        "sessionId": "..."
      }
      ```

## 4. Used APIs

- **Google Gemini API:**
    - **Model:** `gemini-1.5-flash` (for text generation), `embedding-001` (for vector embeddings).
    - **Usage:** Generates natural language responses and converts text to vector representations for search.
- **Supabase API:**
    - **Usage:** Acts as the database and vector store. Client library `@supabase/supabase-js` is used in the backend to query data and invoke RPC functions.
- **Nodemailer:**
    - **Usage:** Used in `server.js` (`/api/send-email`) to handle contact form submissions via SMTP.

## 5. Why Gemini API? (vs. others)

**Rationale for choosing Google Gemini:**
1.  **Cost-Effectiveness:** `gemini-1.5-flash` is extremely cost-efficient (often free tier available for low volume) compared to GPT-4o, making it ideal for high-frequency chat interactions.
2.  **Speed:** The "Flash" model is optimized for low latency, which is critical for a smooth chatbot user experience.
3.  **Context Window:** Gemini models typically offer a large context window, allowing for more extensive knowledge base injection if needed.
4.  **Integration:** Seamless integration with Google's ecosystem (if potential future expansions involve Google Cloud).

**Difference from others (e.g., OpenAI):**
- While OpenAI's GPT-4 is often considered the "smartest," it is more expensive and slower. Gemini Flash strikes a better balance for a customer support bot where speed and cost are major factors, and the task complexity is moderate (RAG-based Q&A).

## 6. Final Sample Prompts

### System Prompt (The AI's Persona)
Defined in `backend/config/ai-config.js`:
> "You are an AI assistant for YVI Tech, a technology solutions company. Your role is to help visitors learn about our services and answer their questions..."
>
> **Key Instructions:**
> - Format service names in **bold**.
> - Use bullet points for lists.
> - Be professional yet friendly.
> - Use knowledge base info when relevant.

### User Interface Prompts (Categories)
Defined in `frontend/src/data/promptCategories.ts`. These are clickable options for the user:

**1. About YVI (`about`)**
- "Company overview and mission"
- "Leadership team and expertise"
- "Years of industry experience"

**2. Our Services (`services`)**
- "Complete service portfolio"
- "Custom software development"
- "Digital transformation consulting"

**3. AI & Automation (`ai`)**
- "Machine learning solutions"
- "Process automation capabilities"
- "Data analytics and insights"

**4. Cloud & DevOps (`cloud`)**
- "Cloud migration strategies"
- "Multi-cloud management"
- "CI/CD pipeline setup"

**5. ERP Solutions (`erp`)**
- "Oracle implementation services"
- "SAP module customization"
- "Legacy system modernization"
