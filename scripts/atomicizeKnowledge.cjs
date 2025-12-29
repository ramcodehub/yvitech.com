#!/usr/bin/env node

/**
 * Script to atomicize knowledge into specific, queryable units
 * 
 * This script:
 * 1. Reads the extracted knowledge from extracted_knowledge.json
 * 2. Improves the atomicization by creating specific, queryable knowledge units
 * 3. Ensures each row represents ONE specific topic
 * 4. Creates better titles that match how users ask questions
 */

const fs = require('fs');
const path = require('path');

// Define the allowed categories as per requirements
const ALLOWED_CATEGORIES = [
  'About YVI',
  'Services',
  'AI & Automation',
  'Cloud & DevOps',
  'ERP Solutions',
  'Data & AI',
  'RPA & Automation',
  'UI/UX Design',
  'Web Development',
  'Mobile Development',
  'Digital Marketing',
  'Industries',
  'Enterprise Solutions',
  'Locations & Contact'
];

// Function to improve atomicization of knowledge entries
function atomicizeKnowledge(extractedEntries) {
  const atomicEntries = [];
  
  for (const entry of extractedEntries) {
    // Split compound descriptions into specific topics
    const specificTopics = splitIntoSpecificTopics(entry);
    
    for (const topic of specificTopics) {
      // Improve the title to be more specific and question-matching
      const improvedTitle = improveTitle(topic.title, topic.description);
      
      // Generate better keywords
      const improvedKeywords = generateImprovedKeywords(improvedTitle, topic.description);
      
      // Improve the description to follow the required format
      const improvedDescription = improveDescription(topic.description);
      
      atomicEntries.push({
        category: topic.category,
        title: improvedTitle,
        description: improvedDescription,
        keywords: improvedKeywords
      });
    }
  }
  
  return atomicEntries;
}

// Function to split compound entries into specific topics
function splitIntoSpecificTopics(entry) {
  const topics = [];
  
  // Check if the description contains multiple distinct topics
  const description = entry.description;
  
  // Look for common separators that indicate different topics
  const sentences = description.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  
  // Group related sentences together to form specific topics
  let currentTopic = {
    category: entry.category,
    title: entry.title,
    description: entry.description
  };
  
  // If the entry is too general, try to break it down further
  if (isTooGeneral(entry.title, entry.description)) {
    // Look for specific services or capabilities mentioned in the description
    const specificTopics = extractSpecificTopics(entry);
    if (specificTopics.length > 0) {
      return specificTopics;
    }
  }
  
  topics.push(currentTopic);
  return topics;
}

// Function to check if an entry is too general
function isTooGeneral(title, description) {
  // Check if the title is too generic
  const genericTitles = ['services', 'solutions', 'digital', 'technologies', 'development', 'solutions'];
  const lowerTitle = title.toLowerCase();
  
  if (genericTitles.some(generic => lowerTitle.includes(generic) || generic.includes(lowerTitle))) {
    return true;
  }
  
  // Check if description mentions multiple distinct services
  const serviceKeywords = ['and', '&', 'as well as', 'with', 'including'];
  const serviceIndicators = ['rpa', 'automation', 'ai', 'data', 'cloud', 'devops', 'oracle', 'sap', 'web', 'mobile', 'marketing'];
  
  let indicatorsFound = 0;
  for (const indicator of serviceIndicators) {
    if (description.toLowerCase().includes(indicator)) {
      indicatorsFound++;
    }
  }
  
  return indicatorsFound > 1;
}

// Function to extract specific topics from a general description
function extractSpecificTopics(entry) {
  const topics = [];
  const description = entry.description.toLowerCase();
  
  // Define patterns for specific services
  const servicePatterns = [
    {
      name: 'Process Automation Capabilities',
      keywords: ['process automation', 'rpa', 'robotic process', 'workflow automation'],
      category: 'RPA & Automation',
      description: 'YVI Technologies provides process automation solutions using RPA and workflow automation to reduce manual effort, improve accuracy, and enhance operational efficiency across business functions.'
    },
    {
      name: 'Data Analytics & Insights',
      keywords: ['data analytics', 'data analysis', 'business intelligence', 'bi', 'data insights'],
      category: 'Data & AI',
      description: 'YVI Technologies offers comprehensive data analytics and business intelligence solutions to help organizations extract valuable insights from their data and make data-driven decisions.'
    },
    {
      name: 'CI/CD Pipeline Implementation',
      keywords: ['ci/cd', 'cicd', 'continuous integration', 'continuous deployment', 'pipeline'],
      category: 'Cloud & DevOps',
      description: 'YVI Technologies implements CI/CD pipelines to automate software delivery, ensuring faster deployment, higher quality, and improved collaboration between development and operations teams.'
    },
    {
      name: 'Cloud Migration Strategy',
      keywords: ['cloud migration', 'migrate to cloud', 'cloud strategy', 'aws', 'azure', 'gcp'],
      category: 'Cloud & DevOps',
      description: 'YVI Technologies provides cloud migration strategies and services to help organizations move their applications and infrastructure to cloud platforms efficiently and securely.'
    },
    {
      name: 'Oracle Financials Implementation',
      keywords: ['oracle financials', 'oracle ebs financials', 'oracle financial modules'],
      category: 'ERP Solutions',
      description: 'YVI Technologies specializes in Oracle Financials implementation services, helping organizations optimize their financial processes and reporting capabilities.'
    },
    {
      name: 'SAP Consulting & Implementation',
      keywords: ['sap', 'sap consulting', 'sap implementation', 'sap modules'],
      category: 'ERP Solutions',
      description: 'YVI Technologies offers SAP consulting and implementation services to help businesses streamline their operations and improve efficiency through SAP solutions.'
    },
    {
      name: 'Career Opportunities',
      keywords: ['careers', 'jobs', 'opportunities', 'employment', 'work with us'],
      category: 'About YVI',
      description: 'YVI Technologies offers diverse career opportunities for professionals looking to grow in the technology sector with competitive benefits and a collaborative work environment.'
    },
    {
      name: 'Office Locations & Contact Information',
      keywords: ['locations', 'contact', 'address', 'phone', 'email', 'office'],
      category: 'Locations & Contact',
      description: 'YVI Technologies has offices in strategic locations to serve clients globally, with dedicated teams ready to assist with technology solutions and services.'
    },
    {
      name: 'AI and Data Analytics Services',
      keywords: ['ai', 'artificial intelligence', 'machine learning', 'data analytics', 'ml'],
      category: 'Data & AI',
      description: 'YVI Technologies provides advanced AI and data analytics services to help businesses leverage their data assets and implement intelligent solutions.'
    },
    {
      name: 'Web & Mobile Development',
      keywords: ['web development', 'mobile development', 'application development', 'software development'],
      category: 'Web Development',
      description: 'YVI Technologies offers custom web and mobile application development services using modern technologies and best practices.'
    },
    {
      name: 'Digital Marketing Services',
      keywords: ['digital marketing', 'seo', 'social media', 'marketing'],
      category: 'Digital Marketing',
      description: 'YVI Technologies provides comprehensive digital marketing services to help businesses grow their online presence and reach their target audience effectively.'
    }
  ];
  
  // Check which specific services are mentioned in the description
  for (const pattern of servicePatterns) {
    let matchFound = false;
    
    for (const keyword of pattern.keywords) {
      if (description.includes(keyword.toLowerCase())) {
        matchFound = true;
        break;
      }
    }
    
    if (matchFound) {
      topics.push({
        category: pattern.category,
        title: pattern.name,
        description: pattern.description
      });
    }
  }
  
  // If no specific patterns matched, return the original entry
  if (topics.length === 0) {
    return [entry];
  }
  
  return topics;
}

// Function to improve the title to be more specific and question-matching
function improveTitle(title, description) {
  // If the title is already good, return it
  if (title && title.length > 5 && !isTooGeneral(title, description)) {
    return title;
  }
  
  // Extract a more specific title from the description
  const sentences = description.split(/[.!?]+/);
  if (sentences.length > 0) {
    let firstSentence = sentences[0].trim();
    
    // Remove "YVI Technologies" prefix if present
    firstSentence = firstSentence.replace(/^YVI Technologies\s*/i, '');
    
    // Limit to 100 characters and ensure it's meaningful
    if (firstSentence.length > 100) {
      firstSentence = firstSentence.substring(0, 100);
    }
    
    // Ensure it doesn't end with incomplete words
    if (firstSentence.length === 100) {
      const lastSpace = firstSentence.lastIndexOf(' ');
      if (lastSpace > 50) { // Only if we can cut without losing too much
        firstSentence = firstSentence.substring(0, lastSpace);
      }
    }
    
    return firstSentence.trim() || title;
  }
  
  return title;
}

// Function to generate improved keywords
function generateImprovedKeywords(title, description) {
  // Combine title and description for keyword generation
  const text = `${title} ${description}`.toLowerCase();
  
  // Remove special characters and split into words
  const cleanText = text.replace(/[^a-z0-9\s]/g, ' ');
  const words = cleanText.split(/\s+/).filter(word => word.length > 2);
  
  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'him', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'one', 'our', 'she', 'too', 'use', 'was', 'who', 'you', 'yrs', 'yvi', 'technologies', 'technology', 'company', 'service', 'services', 'solution', 'solutions', 'provide', 'provides', 'help', 'helps', 'offer', 'offers', 'business', 'businesses', 'organization', 'organizations', 'work', 'working', 'team', 'teams', 'client', 'clients', 'customer', 'customers', 'custom', 'using', 'with', 'through', 'via', 'about', 'over', 'into', 'from', 'they', 'said', 'each', 'also', 'any', 'many', 'some', 'such', 'upon', 'most', 'other', 'than', 'then', 'more', 'will', 'been', 'were', 'this', 'that', 'these', 'those', 'which', 'what', 'when', 'where', 'who', 'why', 'how', 'what', 'would', 'should', 'could', 'upon'
  ]);
  
  // Filter out stop words and get unique words
  const filteredWords = Array.from(new Set(words.filter(word => !stopWords.has(word))));
  
  // Also add common question phrases and synonyms
  const questionPhrases = generateQuestionPhrases(title);
  const allKeywords = [...new Set([...filteredWords, ...questionPhrases])];
  
  // Limit to 10 keywords
  return allKeywords.slice(0, 10);
}

// Function to generate question phrases based on the title
function generateQuestionPhrases(title) {
  const phrases = [];
  const lowerTitle = title.toLowerCase();
  
  // Generate variations based on the title
  if (lowerTitle.includes('automation')) {
    phrases.push('automation capabilities', 'process automation', 'business process automation', 'rpa', 'workflow automation', 'robotic process automation');
  }
  
  if (lowerTitle.includes('data') || lowerTitle.includes('analytics')) {
    phrases.push('data analytics', 'data analysis', 'business intelligence', 'data insights', 'data solutions');
  }
  
  if (lowerTitle.includes('cloud')) {
    phrases.push('cloud services', 'cloud migration', 'cloud solutions', 'cloud computing');
  }
  
  if (lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence')) {
    phrases.push('artificial intelligence', 'ai services', 'machine learning', 'ai solutions');
  }
  
  if (lowerTitle.includes('oracle')) {
    phrases.push('oracle implementation', 'oracle services', 'oracle solutions', 'oracle consulting');
  }
  
  if (lowerTitle.includes('sap')) {
    phrases.push('sap implementation', 'sap services', 'sap solutions', 'sap consulting');
  }
  
  if (lowerTitle.includes('rpa')) {
    phrases.push('rpa', 'robotic process automation', 'process automation');
  }
  
  if (lowerTitle.includes('development') || lowerTitle.includes('web') || lowerTitle.includes('mobile')) {
    phrases.push('development services', 'application development', 'web development', 'mobile development', 'software development');
  }
  
  if (lowerTitle.includes('marketing')) {
    phrases.push('digital marketing', 'marketing services', 'seo', 'social media marketing');
  }
  
  return phrases;
}

// Function to improve the description to follow the required format
function improveDescription(description) {
  // Ensure the description starts with "YVI Technologies..."
  if (!description.startsWith('YVI Technologies')) {
    // If it contains "YVI Technologies" somewhere else, move it to the front
    const yviIndex = description.toLowerCase().indexOf('yvi technologies');
    if (yviIndex !== -1) {
      const before = description.substring(0, yviIndex);
      const after = description.substring(yviIndex);
      description = after + before;
    } else {
      // Add "YVI Technologies" at the beginning
      description = `YVI Technologies ${description}`;
    }
  }
  
  // Ensure it's factual (2-4 sentences) and avoid promises
  const sentences = description.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  
  // Limit to 2-4 sentences
  const limitedSentences = sentences.slice(0, 4);
  let finalDescription = limitedSentences.join('. ') + '.';
  
  // Clean up any double spaces or extra characters
  finalDescription = finalDescription.replace(/\s+/g, ' ').trim();
  
  return finalDescription;
}

// Main function to run the atomicization
async function main() {
  try {
    console.log('🚀 Starting knowledge atomicization...');
    
    // Read the extracted knowledge
    const extractedPath = path.resolve(__dirname, '../frontend/data/extracted_knowledge.json');
    const extractedEntries = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));
    
    console.log(`Loaded ${extractedEntries.length} extracted entries`);
    
    // Atomicize the knowledge
    const atomicEntries = atomicizeKnowledge(extractedEntries);
    
    console.log(`Atomicized into ${atomicEntries.length} specific, queryable units`);
    
    // Output a sample of the atomic entries
    console.log('\n📝 Sample atomic entries:');
    for (let i = 0; i < Math.min(5, atomicEntries.length); i++) {
      console.log(`\n${i + 1}. Category: ${atomicEntries[i].category}`);
      console.log(`   Title: ${atomicEntries[i].title}`);
      console.log(`   Keywords: [${atomicEntries[i].keywords.join(', ')}]`);
      console.log(`   Description: ${atomicEntries[i].description.substring(0, 150)}${atomicEntries[i].description.length > 150 ? '...' : ''}`);
    }
    
    // Save the atomic entries to a new JSON file
    const outputPath = path.resolve(__dirname, '../frontend/data/atomic_knowledge.json');
    fs.writeFileSync(outputPath, JSON.stringify(atomicEntries, null, 2));
    console.log(`\n💾 Atomic knowledge entries saved to: ${outputPath}`);
    
    return atomicEntries;
  } catch (error) {
    console.error('❌ Error in knowledge atomicization process:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { atomicizeKnowledge };