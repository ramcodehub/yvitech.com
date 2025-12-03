-- Create chat_history table for storing AI chat conversations
CREATE TABLE IF NOT EXISTS chat_history (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_history_session_id ON chat_history(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_timestamp ON chat_history(timestamp);

-- Enable Row Level Security (RLS) for the table
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read and write their own chat history
-- This assumes you have authentication set up in your Supabase project
CREATE POLICY "Users can view their own chat history" 
  ON chat_history FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own chat history" 
  ON chat_history FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Grant access to the table for authenticated users
GRANT ALL ON TABLE chat_history TO authenticated;