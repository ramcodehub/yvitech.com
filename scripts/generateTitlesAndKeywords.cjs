#!/usr/bin/env node

/**
 * Script to generate titles and keywords following the specified engineering rules
 * 
 * This script:
 * 1. Reads the atomic knowledge from atomic_knowledge.json
 * 2. Improves titles to match how users ask questions
 * 3. Generates comprehensive keyword sets with question variants and synonyms
 */

const fs = require('fs');
const path = require('path');

// Function to improve titles to match how users ask questions
function improveTitlesAndKeywords(atomicEntries) {
  const improvedEntries = [];
  
  for (const entry of atomicEntries) {
    // Improve the title to match user questions
    const improvedTitle = generateQuestionMatchingTitle(entry.title, entry.description);
    
    // Generate comprehensive keywords with question variants and synonyms
    const improvedKeywords = generateComprehensiveKeywords(improvedTitle, entry.description);
    
    improvedEntries.push({
      ...entry,
      title: improvedTitle,
      keywords: improvedKeywords
    });
  }
  
  return improvedEntries;
}

// Function to generate titles that match how users ask questions
function generateQuestionMatchingTitle(title, description) {
  // If the title is already good, return it
  if (isGoodTitle(title)) {
    return title;
  }
  
  // Extract key phrases from the description that could be good titles
  const keyPhrases = extractKeyPhrases(description);
  
  // Find the most question-like phrase or create one
  let questionMatchingTitle = title;
  
  // Look for specific service or capability patterns
  const servicePatterns = [
    { pattern: /process automation|robotic process|workflow automation/i, title: "Process Automation Capabilities" },
    { pattern: /data analytics|business intelligence|data analysis|bi/i, title: "Data Analytics & Insights" },
    { pattern: /ci\/cd|continuous integration|continuous deployment|pipeline/i, title: "CI/CD Pipeline Implementation" },
    { pattern: /cloud migration|move to cloud|cloud strategy/i, title: "Cloud Migration Strategy" },
    { pattern: /oracle financials|oracle ebs financials|oracle financial modules/i, title: "Oracle Financials Implementation" },
    { pattern: /sap|sap consulting|sap implementation/i, title: "SAP Consulting & Implementation" },
    { pattern: /careers|jobs|opportunities|employment/i, title: "Career Opportunities" },
    { pattern: /locations|contact|address|office/i, title: "Office Locations & Contact Information" },
    { pattern: /ai|artificial intelligence|machine learning/i, title: "AI and Data Analytics Services" },
    { pattern: /web development|mobile development|application development/i, title: "Web & Mobile Development" },
    { pattern: /digital marketing|seo|social media|marketing/i, title: "Digital Marketing Services" }
  ];
  
  for (const pattern of servicePatterns) {
    if (description.toLowerCase().includes(pattern.pattern.source.toLowerCase().replace(/\//g, ''))) {
      questionMatchingTitle = pattern.title;
      break;
    }
  }
  
  return questionMatchingTitle;
}

// Function to check if a title is already good
function isGoodTitle(title) {
  // A good title should be specific, not too generic, and represent a single capability
  const genericWords = ['services', 'solutions', 'digital', 'technologies', 'technology', 'company'];
  
  const lowerTitle = title.toLowerCase();
  const isTooGeneric = genericWords.some(word => lowerTitle.includes(word));
  
  // A good title should be 5-100 characters and not too generic
  return title.length >= 5 && title.length <= 100 && !isTooGeneric;
}

// Function to extract key phrases from the description
function extractKeyPhrases(description) {
  // Extract phrases that contain service or capability related terms
  const sentences = description.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  const keyPhrases = [];
  
  for (const sentence of sentences) {
    // Look for phrases that contain action words or specific services
    if (sentence.toLowerCase().includes('provides') || 
        sentence.toLowerCase().includes('offers') || 
        sentence.toLowerCase().includes('implements') ||
        sentence.toLowerCase().includes('services') ||
        sentence.toLowerCase().includes('solutions')) {
      keyPhrases.push(sentence);
    }
  }
  
  return keyPhrases;
}

// Function to generate comprehensive keywords with question variants and synonyms
function generateComprehensiveKeywords(title, description) {
  const keywords = new Set();
  
  // Add original title and description keywords
  const titleKeywords = extractKeywords(title);
  const descriptionKeywords = extractKeywords(description);
  
  // Add title and description keywords
  titleKeywords.forEach(k => keywords.add(k));
  descriptionKeywords.forEach(k => keywords.add(k));
  
  // Add question variants
  const questionVariants = generateQuestionVariants(title, description);
  questionVariants.forEach(q => keywords.add(q));
  
  // Add synonyms and related terms
  const synonyms = generateSynonyms(title, description);
  synonyms.forEach(s => keywords.add(s));
  
  // Add action words
  const actionWords = generateActionWords(title, description);
  actionWords.forEach(a => keywords.add(a));
  
  // Convert to array and limit to 10-15 keywords
  return Array.from(keywords).slice(0, 15);
}

// Function to extract basic keywords from text
function extractKeywords(text) {
  // Remove "YVI Technologies" and common phrases
  let cleanText = text.replace(/YVI Technologies/gi, '');
  
  // Remove special characters and split into words
  cleanText = cleanText.replace(/[^a-z0-9\s]/gi, ' ');
  const words = cleanText.split(/\s+/).filter(word => word.length > 2);
  
  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'him', 
    'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'one', 'our', 
    'she', 'too', 'use', 'was', 'who', 'you', 'yrs', 'this', 'that', 'these', 'those', 'which', 
    'what', 'when', 'where', 'who', 'why', 'how', 'would', 'should', 'could', 'upon', 'most', 
    'other', 'than', 'then', 'more', 'will', 'been', 'were', 'they', 'said', 'each', 'also', 
    'any', 'many', 'some', 'such', 'upon', 'about', 'over', 'into', 'from', 'they', 'said', 
    'each', 'also', 'any', 'many', 'some', 'such', 'upon', 'most', 'other', 'than', 'then', 
    'more', 'will', 'been', 'were', 'this', 'that', 'these', 'those', 'which', 'what', 'when', 
    'where', 'who', 'why', 'how', 'what', 'would', 'should', 'could', 'upon', 'provides', 
    'providing', 'provide', 'offers', 'offering', 'offer', 'implements', 'implementing', 
    'implement', 'includes', 'including', 'include', 'uses', 'using', 'use', 'helps', 'helping', 
    'help', 'assists', 'assisting', 'assist'
  ]);
  
  // Filter out stop words and get unique words
  return words.filter(word => !stopWords.has(word.toLowerCase()));
}

// Function to generate question variants based on the title and description
function generateQuestionVariants(title, description) {
  const variants = [];
  
  // Generate question-based variants
  const lowerTitle = title.toLowerCase();
  const lowerDesc = description.toLowerCase();
  
  // Process automation related
  if (lowerTitle.includes('process automation') || lowerDesc.includes('process automation') || 
      lowerTitle.includes('rpa') || lowerDesc.includes('rpa') || 
      lowerTitle.includes('workflow') || lowerDesc.includes('workflow')) {
    variants.push('process automation', 'automation capabilities', 'business process automation', 
                  'rpa', 'workflow automation', 'robotic process automation');
  }
  
  // Data analytics related
  if (lowerTitle.includes('data') || lowerDesc.includes('data') || 
      lowerTitle.includes('analytics') || lowerDesc.includes('analytics') || 
      lowerTitle.includes('bi') || lowerDesc.includes('bi') || 
      lowerTitle.includes('business intelligence') || lowerDesc.includes('business intelligence')) {
    variants.push('data analytics', 'data analysis', 'business intelligence', 
                  'data insights', 'data solutions', 'analytics services');
  }
  
  // CI/CD related
  if (lowerTitle.includes('ci/cd') || lowerDesc.includes('ci/cd') || 
      lowerTitle.includes('continuous integration') || lowerDesc.includes('continuous integration') || 
      lowerTitle.includes('pipeline') || lowerDesc.includes('pipeline')) {
    variants.push('ci/cd', 'continuous integration', 'continuous deployment', 
                  'pipeline implementation', 'devops pipeline', 'deployment pipeline');
  }
  
  // Cloud related
  if (lowerTitle.includes('cloud') || lowerDesc.includes('cloud') || 
      lowerTitle.includes('migration') || lowerDesc.includes('migration')) {
    variants.push('cloud services', 'cloud migration', 'cloud solutions', 
                  'aws', 'azure', 'gcp', 'cloud computing');
  }
  
  // Oracle related
  if (lowerTitle.includes('oracle') || lowerDesc.includes('oracle')) {
    variants.push('oracle implementation', 'oracle services', 'oracle solutions', 
                  'oracle consulting', 'oracle financials', 'oracle scm', 'oracle hcm');
  }
  
  // SAP related
  if (lowerTitle.includes('sap') || lowerDesc.includes('sap')) {
    variants.push('sap implementation', 'sap services', 'sap solutions', 
                  'sap consulting', 'sap modules');
  }
  
  // Career related
  if (lowerTitle.includes('career') || lowerTitle.includes('jobs') || 
      lowerTitle.includes('opportunities') || lowerDesc.includes('career') || 
      lowerDesc.includes('jobs') || lowerDesc.includes('opportunities')) {
    variants.push('careers', 'jobs', 'job opportunities', 'employment', 
                  'work with us', 'career opportunities');
  }
  
  // Location related
  if (lowerTitle.includes('location') || lowerTitle.includes('contact') || 
      lowerDesc.includes('location') || lowerDesc.includes('contact')) {
    variants.push('locations', 'contact information', 'contact details', 
                  'office locations', 'contact us', 'addresses');
  }
  
  // AI related
  if (lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence') || 
      lowerDesc.includes('ai') || lowerDesc.includes('artificial intelligence')) {
    variants.push('artificial intelligence', 'ai services', 'machine learning', 
                  'ai solutions', 'intelligent systems');
  }
  
  // Development related
  if (lowerTitle.includes('development') || lowerTitle.includes('web') || 
      lowerTitle.includes('mobile') || lowerDesc.includes('development') || 
      lowerDesc.includes('web') || lowerDesc.includes('mobile')) {
    variants.push('development services', 'application development', 'web development', 
                  'mobile development', 'software development', 'app development');
  }
  
  // Marketing related
  if (lowerTitle.includes('marketing') || lowerDesc.includes('marketing') || 
      lowerTitle.includes('seo') || lowerDesc.includes('seo')) {
    variants.push('digital marketing', 'marketing services', 'seo', 
                  'social media marketing', 'online marketing');
  }
  
  return variants;
}

// Function to generate synonyms based on the title and description
function generateSynonyms(title, description) {
  const synonyms = [];
  
  const combinedText = `${title} ${description}`.toLowerCase();
  
  // Add synonyms for common service terms
  if (combinedText.includes('service') || combinedText.includes('services')) {
    synonyms.push('consulting', 'solutions', 'support', 'assistance', 'expertise');
  }
  
  if (combinedText.includes('implementation') || combinedText.includes('implement')) {
    synonyms.push('deployment', 'setup', 'installation', 'configuration', 'integration');
  }
  
  if (combinedText.includes('solution') || combinedText.includes('solutions')) {
    synonyms.push('services', 'offerings', 'products', 'platform', 'system');
  }
  
  if (combinedText.includes('development') || combinedText.includes('develop')) {
    synonyms.push('engineering', 'building', 'creation', 'programming', 'coding');
  }
  
  if (combinedText.includes('automation') || combinedText.includes('automate')) {
    synonyms.push('streamlining', 'optimization', 'efficiency', 'process improvement');
  }
  
  return synonyms;
}

// Function to generate action words based on the title and description
function generateActionWords(title, description) {
  const actionWords = [];
  
  const combinedText = `${title} ${description}`.toLowerCase();
  
  // Add action-related keywords
  if (combinedText.includes('provide') || combinedText.includes('provides') || combinedText.includes('offering')) {
    actionWords.push('provide', 'offer', 'deliver', 'implement', 'support');
  }
  
  if (combinedText.includes('help') || combinedText.includes('helps') || combinedText.includes('assist')) {
    actionWords.push('help', 'assist', 'enable', 'empower', 'facilitate');
  }
  
  if (combinedText.includes('improve') || combinedText.includes('enhance') || combinedText.includes('optimize')) {
    actionWords.push('improve', 'enhance', 'optimize', 'streamline', 'transform');
  }
  
  return actionWords;
}

// Main function to run the title and keyword improvement
async function main() {
  try {
    console.log('🚀 Starting title and keyword improvement...');
    
    // Read the atomic knowledge
    const atomicPath = path.resolve(__dirname, '../frontend/data/atomic_knowledge.json');
    const atomicEntries = JSON.parse(fs.readFileSync(atomicPath, 'utf8'));
    
    console.log(`Loaded ${atomicEntries.length} atomic entries`);
    
    // Improve titles and keywords
    const improvedEntries = improveTitlesAndKeywords(atomicEntries);
    
    console.log(`Improved titles and keywords for ${improvedEntries.length} entries`);
    
    // Output a sample of the improved entries
    console.log('\n📝 Sample improved entries:');
    for (let i = 0; i < Math.min(5, improvedEntries.length); i++) {
      console.log(`\n${i + 1}. Category: ${improvedEntries[i].category}`);
      console.log(`   Title: ${improvedEntries[i].title}`);
      console.log(`   Keywords: [${improvedEntries[i].keywords.join(', ')}]`);
      console.log(`   Description: ${improvedEntries[i].description.substring(0, 150)}${improvedEntries[i].description.length > 150 ? '...' : ''}`);
    }
    
    // Save the improved entries to a new JSON file
    const outputPath = path.resolve(__dirname, '../frontend/data/improved_knowledge.json');
    fs.writeFileSync(outputPath, JSON.stringify(improvedEntries, null, 2));
    console.log(`\n💾 Improved knowledge entries saved to: ${outputPath}`);
    
    return improvedEntries;
  } catch (error) {
    console.error('❌ Error in title and keyword improvement process:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { improveTitlesAndKeywords };