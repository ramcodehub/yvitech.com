#!/usr/bin/env node

/**
 * Script to test the knowledge base with the specified validation queries
 * 
 * This script tests that the following queries return DB answers:
 * - "What process automation capabilities are offered by YVI Technologies?"
 * - "How does YVI Technologies implement CI/CD pipelines?"
 * - "Do you provide Oracle Financials implementation?"
 * - "What AI and data analytics services do you offer?"
 * - "Are there career opportunities at YVI Technologies?"
 * - "Where are your office locations?"
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });

// Dynamically import Supabase client
async function testKnowledgeBase() {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    // Validate environment variables
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase environment variables');
      console.error('Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in backend/.env');
      process.exit(1);
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🚀 Starting knowledge base validation tests...\n');

    // Define the test queries as specified in the requirements
    const testQueries = [
      "What process automation capabilities are offered by YVI Technologies?",
      "How does YVI Technologies implement CI/CD pipelines?",
      "Do you provide Oracle Financials implementation?",
      "What AI and data analytics services do you offer?",
      "Are there career opportunities at YVI Technologies?",
      "Where are your office locations?"
    ];

    // Test each query
    let passedTests = 0;
    let totalTests = testQueries.length;

    for (let i = 0; i < testQueries.length; i++) {
      const query = testQueries[i];
      console.log(`🔍 Testing query ${i + 1}/${testQueries.length}: "${query}"`);
      
      // Perform keyword-based matching similar to the chat route
      const { data: allKnowledge, error: knowledgeFetchError } = await supabase
        .from('chatbot_knowledge')
        .select('id, category, title, description, keywords');
      
      if (knowledgeFetchError) {
        console.error(`❌ Error fetching knowledge base for query: ${knowledgeFetchError.message}`);
        continue;
      }
      
      // Normalize query for matching (similar to the chat route)
      const normalizeQuery = (query) => {
        let normalized = query.toLowerCase().trim();
        const questionWords = ['how', 'does', 'what', 'where', 'when', 'why', 'which', 'who', 'can', 'do', 'is', 'are', 'will', 'would', 'could', 'should', 'implement', 'provide', 'offer', 'tell', 'me', 'about', 'the', 'a', 'an'];
        normalized = normalized.split(' ')
          .filter(word => !questionWords.includes(word))
          .join(' ');
        return normalized;
      };
      
      const normalizedQuery = normalizeQuery(query);
      console.log(`   Normalized query: "${normalizedQuery}"`);
      
      // Find best match using keyword matching
      let bestMatch = null;
      let bestScore = 0;
      
      for (const item of allKnowledge) {
        const itemTitleNormalized = normalizeQuery(item.title);
        const itemDescriptionNormalized = normalizeQuery(item.description);
        
        // Simple word overlap score for title
        const queryWordsArray = normalizedQuery.split(' ').filter(w => w.length > 0);
        const titleWordsArray = itemTitleNormalized.split(' ').filter(w => w.length > 0);
        const descriptionWordsArray = itemDescriptionNormalized.split(' ').filter(w => w.length > 0);
        
        const queryWords = new Set(queryWordsArray);
        const titleWords = new Set(titleWordsArray);
        const descriptionWords = new Set(descriptionWordsArray);
        
        // Calculate scores for title
        let titleOverlap = 0;
        for (const word of queryWords) {
          if (titleWords.has(word)) titleOverlap++;
        }
        const titleOverlapScore = queryWords.size > 0 ? titleOverlap / Math.max(queryWords.size, titleWords.size) : 0;
        
        // Calculate scores for description
        let descriptionOverlap = 0;
        for (const word of queryWords) {
          if (descriptionWords.has(word)) descriptionOverlap++;
        }
        const descriptionOverlapScore = queryWords.size > 0 ? descriptionOverlap / Math.max(queryWords.size, descriptionWords.size) : 0;
        
        // Check if query matches any keywords in the knowledge entry
        let keywordScore = 0;
        if (item.keywords && Array.isArray(item.keywords)) {
          const keywordMatches = item.keywords.filter(keyword => 
            normalizedQuery.includes(keyword.toLowerCase()) || 
            keyword.toLowerCase().includes(normalizedQuery)
          );
          
          if (keywordMatches.length > 0) {
            keywordScore = Math.min(0.3 * keywordMatches.length, 0.5); // Max 0.5 boost
          }
        }
        
        // Calculate a composite similarity score
        let compositeScore = Math.max(
          titleOverlapScore * 1.2,  // Slightly higher weight for title
          descriptionOverlapScore,
          keywordScore
        );
        
        if (compositeScore > bestScore && compositeScore >= 0.05) {
          bestScore = compositeScore;
          bestMatch = item;
        }
      }
      
      if (bestMatch && bestScore >= 0.1) {
        console.log(`   ✅ DB match found with score: ${bestScore.toFixed(3)}`);
        console.log(`      Title: ${bestMatch.title}`);
        console.log(`      Category: ${bestMatch.category}`);
        console.log(`      Description preview: ${bestMatch.description.substring(0, 100)}...`);
        passedTests++;
      } else {
        console.log(`   ❌ No DB match found, best score was: ${bestScore.toFixed(3)}`);
        console.log(`      This means the query would fall back to AI generation instead of DB answer.`);
      }
      
      console.log(''); // Add spacing between tests
    }
    
    // Summary
    console.log('📊 Test Summary:');
    console.log(`   ✅ Passed: ${passedTests}`);
    console.log(`   ❌ Failed: ${totalTests - passedTests}`);
    console.log(`   📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (passedTests === totalTests) {
      console.log('\n🎉 All validation tests passed! The knowledge base is working as expected.');
      console.log('✅ Database is the single source of truth for all specified queries.');
      console.log('✅ No vague fallback responses for known topics.');
    } else {
      console.log('\n⚠️  Some validation tests failed. The knowledge base needs improvement.');
      console.log('💡 Consider adding more specific content or improving keyword matching for failed queries.');
    }
    
    return { passedTests, totalTests, successRate: (passedTests / totalTests) * 100 };
  } catch (error) {
    console.error('❌ Error in knowledge base validation:', error);
    process.exit(1);
  }
}

// Main function to run the tests
async function main() {
  try {
    await testKnowledgeBase();
  } catch (error) {
    console.error('❌ Error in main validation process:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { testKnowledgeBase };