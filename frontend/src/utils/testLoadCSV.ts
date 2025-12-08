import { loadAllKnowledgeCSVs, convertToKnowledgeBaseFormat } from './loadCSV';

// Test the CSV loading functionality
async function testLoadCSV() {
  console.log('Testing CSV loading...');
  
  try {
    const data = await loadAllKnowledgeCSVs();
    console.log(`Loaded ${data.length} records from CSV files`);
    
    if (data.length > 0) {
      console.log('First few records:', data.slice(0, 3));
      
      // Test conversion to knowledge base format
      const knowledgeBase = convertToKnowledgeBaseFormat(data);
      console.log('Knowledge base structure:', Object.keys(knowledgeBase));
      
      // Show sample of converted data
      const firstSection = Object.keys(knowledgeBase)[0];
      if (firstSection) {
        console.log(`Sample from section "${firstSection}":`, knowledgeBase[firstSection].slice(0, 2));
      }
    } else {
      console.log('No data loaded from CSV files');
    }
  } catch (error) {
    console.error('Error testing CSV loading:', error);
  }
}

// Run the test
testLoadCSV();