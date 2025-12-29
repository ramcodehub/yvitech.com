#!/usr/bin/env node

/**
 * Script to create descriptions following the specified writing rules
 * 
 * This script:
 * 1. Reads the improved knowledge from improved_knowledge.json
 * 2. Improves descriptions to follow the specified writing rules:
 *    - Start with "YVI Technologies..."
 *    - Be factual (2–4 sentences)
 *    - Avoid promises
 *    - Avoid buzzwords
 */

const fs = require('fs');
const path = require('path');

// Function to improve descriptions following the specified writing rules
function improveDescriptions(knowledgeEntries) {
  const improvedEntries = [];
  
  for (const entry of knowledgeEntries) {
    // Improve the description to follow the writing rules
    const improvedDescription = createRuleCompliantDescription(entry.title, entry.description);
    
    improvedEntries.push({
      ...entry,
      description: improvedDescription
    });
  }
  
  return improvedEntries;
}

// Function to create a description that follows the specified writing rules
function createRuleCompliantDescription(title, originalDescription) {
  // Ensure the description starts with "YVI Technologies..."
  let description = originalDescription.trim();
  
  if (!description.startsWith('YVI Technologies')) {
    // Remove any "YVI Technologies" that might be in the middle and move it to the front
    const yviIndex = description.toLowerCase().indexOf('yvi technologies');
    if (yviIndex !== -1) {
      const before = description.substring(0, yviIndex).trim();
      const after = description.substring(yviIndex).trim();
      description = `${after} ${before}`.trim();
    }
    
    // Add "YVI Technologies" at the beginning if not already present
    if (!description.toLowerCase().startsWith('yvi technologies')) {
      description = `YVI Technologies ${description}`;
    }
  }
  
  // Clean up buzzwords and promises
  description = removeBuzzwordsAndPromises(description);
  
  // Ensure it's factual and limited to 2-4 sentences
  description = limitToFactualSentences(description);
  
  // Ensure proper formatting
  description = description.replace(/\s+/g, ' ').trim();
  
  return description;
}

// Function to remove buzzwords and promises
function removeBuzzwordsAndPromises(text) {
  // List of buzzwords and promise phrases to remove or replace
  const buzzwordPatterns = [
    /guarantee/gi,
    /best in class/gi,
    /world class/gi,
    /cutting edge/gi,
    /state of the art/gi,
    /award winning/gi,
    /top notch/gi,
    /first class/gi,
    /proven results/gi,
    /satisfaction guaranteed/gi,
    /trusted partner/gi,
    /expert team/gi,
    /comprehensive range/gi,
    /wide variety/gi,
    /extensive experience/gi,
    /years of experience/gi,
    /high quality/gi,
    /cost effective/gi,
    /user friendly/gi,
    /easy to use/gi,
    /seamless integration/gi,
    /scalable solutions/gi,
    /customized approach/gi,
    /tailored solutions/gi,
    /flexible options/gi,
    /reliable service/gi,
    /professional service/gi,
    /dedicated support/gi,
    /24\/7 support/gi,
    /round the clock support/gi,
    /customer satisfaction/gi,
    /client satisfaction/gi,
    /quality assurance/gi,
    /quality control/gi,
    /continuous improvement/gi,
    /best practices/gi,
    /industry standards/gi,
    /cutting edge technology/gi,
    /latest technology/gi,
    /advanced technology/gi,
    /modern technology/gi,
    /sophisticated technology/gi,
    /powerful solutions/gi,
    /robust solutions/gi,
    /effective solutions/gi,
    /efficient solutions/gi,
    /optimal solutions/gi,
    /superior results/gi,
    /outstanding performance/gi,
    /exceptional quality/gi,
    /unmatched quality/gi,
    /unparalleled quality/gi,
    /unrivaled quality/gi,
    /unbeatable quality/gi,
    /premium service/gi,
    /world class service/gi,
    /first rate service/gi,
    /superior service/gi,
    /excellent service/gi,
    /outstanding service/gi,
    /exceptional service/gi,
    /top quality service/gi,
    /high performance/gi,
    /high efficiency/gi,
    /high reliability/gi,
    /high availability/gi,
    /high security/gi,
    /high speed/gi,
    /high capacity/gi,
    /high precision/gi,
    /high accuracy/gi,
    /high fidelity/gi,
    /high resolution/gi,
    /high definition/gi,
    /innovative/gi,
    /revolutionary/gi,
    /game changing/gi,
    /paradigm shifting/gi,
    /cutting edge/gi,
    /bleeding edge/gi,
    /next generation/gi,
    /future proof/gi,
    /industry leading/gi,
    /market leading/gi,
    /award winning/gi,
    /award - winning/gi,
    /world renowned/gi,
    /globally recognized/gi,
    /trusted by/gi,
    /reliable/gi,
    /proven/gi,
    /established/gi,
    /veteran/gi,
    /seasoned/gi,
    /expert/gi,
    /specialized/gi,
    /certified/gi,
    /professional/gi,
    /advanced/gi,
    /sophisticated/gi,
    /comprehensive/gi,
    /complete/gi,
    /full service/gi,
    /end to end/gi,
    /one stop/gi,
    /turnkey/gi,
    /plug and play/gi,
    /ready to use/gi,
    /out of the box/gi,
    /zero downtime/gi,
    /seamless/gi,
    /frictionless/gi,
    /effortless/gi,
    /painless/gi,
    /hassle free/gi,
    /stress free/gi,
    /no risk/gi,
    /risk free/gi,
    /cost effective/gi,
    /value for money/gi,
    /affordable/gi,
    /budget friendly/gi,
    /economical/gi,
    /cost efficient/gi,
    /maximize/gi,
    /optimize/gi,
    /enhance/gi,
    /leverage/gi,
    /streamline/gi,
    /transform/gi,
    /revolutionize/gi,
    /disrupt/gi,
    /empower/gi,
    /enable/gi,
    /facilitate/gi,
    /drive/gi,
    /boost/gi,
    /increase/gi,
    /improve/gi,
    /enhance/gi,
    /accelerate/gi,
    /amplify/gi,
    /multiply/gi,
    /amplify/gi,
    /exponential/gi,
    /exponentially/gi,
    /dramatically/gi,
    /significantly/gi,
    /substantially/gi,
    /markedly/gi,
    /considerably/gi,
    /tremendously/gi,
    /immensely/gi,
    /enormously/gi,
    /vastly/gi,
    /substantially/gi,
    /radically/gi,
    /completely/gi,
    /totally/gi,
    /absolutely/gi,
    /incredibly/gi,
    /incredibly/gi,
    /amazingly/gi,
    /remarkably/gi,
    /exceptionally/gi,
    /extraordinarily/gi,
    /unusually/gi,
    /particularly/gi,
    /especially/gi,
    /notably/gi,
    /prominently/gi,
    /significantly/gi,
    /substantially/gi,
    /markedly/gi,
    /noticeably/gi,
    /considerably/gi,
    /appreciably/gi,
    /measurably/gi,
    /substantially/gi,
    /dramatically/gi,
    /radically/gi,
    /fundamentally/gi,
    /completely/gi,
    /totally/gi,
    /entirely/gi,
    /wholly/gi,
    /fully/gi,
    /absolutely/gi,
    /completely/gi,
    /totally/gi,
    /entirely/gi,
    /wholly/gi,
    /fully/gi,
    /absolutely/gi
  ];
  
  let cleanedText = text;
  for (const pattern of buzzwordPatterns) {
    cleanedText = cleanedText.replace(pattern, '');
  }
  
  // Remove extra spaces created by removals
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
  
  return cleanedText;
}

// Function to limit description to 2-4 factual sentences
function limitToFactualSentences(text) {
  // Split into sentences
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  
  // Limit to 2-4 sentences
  const limitedSentences = sentences.slice(0, 4);
  
  // Join them back with proper punctuation
  let result = limitedSentences.join('. ') + '.';
  
  // Clean up any double punctuation
  result = result.replace(/\.\.+/g, '.').replace(/\s+/g, ' ').trim();
  
  return result;
}

// Main function to run the description improvement
async function main() {
  try {
    console.log('🚀 Starting description improvement...');
    
    // Read the improved knowledge
    const improvedPath = path.resolve(__dirname, '../frontend/data/improved_knowledge.json');
    const improvedEntries = JSON.parse(fs.readFileSync(improvedPath, 'utf8'));
    
    console.log(`Loaded ${improvedEntries.length} improved entries`);
    
    // Improve descriptions
    const finalEntries = improveDescriptions(improvedEntries);
    
    console.log(`Improved descriptions for ${finalEntries.length} entries`);
    
    // Output a sample of the final entries
    console.log('\n📝 Sample final entries with rule-compliant descriptions:');
    for (let i = 0; i < Math.min(5, finalEntries.length); i++) {
      console.log(`\n${i + 1}. Category: ${finalEntries[i].category}`);
      console.log(`   Title: ${finalEntries[i].title}`);
      console.log(`   Keywords: [${finalEntries[i].keywords.join(', ')}]`);
      console.log(`   Description: ${finalEntries[i].description}`);
    }
    
    // Save the final entries to a new JSON file
    const outputPath = path.resolve(__dirname, '../frontend/data/final_knowledge.json');
    fs.writeFileSync(outputPath, JSON.stringify(finalEntries, null, 2));
    console.log(`\n💾 Final knowledge entries saved to: ${outputPath}`);
    
    return finalEntries;
  } catch (error) {
    console.error('❌ Error in description improvement process:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { improveDescriptions };