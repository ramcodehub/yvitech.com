#!/usr/bin/env node

/**
 * Script to extract content from Yvi_Tech_Data.pdf and prepare it for knowledge base insertion
 * 
 * This script:
 * 1. Reads the PDF file from frontend/data/Yvi_Tech_Data.pdf
 * 2. Extracts the text content
 * 3. Cleans the content by removing marketing fluff and repetitive text
 * 4. Normalizes company names
 * 5. Structures the content for knowledge base insertion
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface KnowledgeEntry {
  category: string;
  title: string;
  description: string;
  keywords: string[];
}

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

// Function to clean extracted PDF text
function cleanPDFText(text: string): string {
  // Remove common marketing fluff and repetitive sentences
  let cleanedText = text;
  
  // Remove common marketing phrases
  const marketingFluff = [
    /contact us today for a free consultation/gi,
    /get in touch with us/gi,
    /reach out to us/gi,
    /contact our experts/gi,
    /for more information/gi,
    /learn more about/gi,
    /get started today/gi,
    /request a quote/gi,
    /schedule a meeting/gi,
    /call us now/gi,
    /visit our website/gi,
    /follow us on social media/gi,
    /sign up now/gi,
    /limited time offer/gi,
    /act now/gi,
    /don't miss out/gi,
    /special discount/gi,
    /exclusive offer/gi,
    /satisfaction guaranteed/gi,
    /trusted by thousands/gi,
    /leading provider/gi,
    /industry leader/gi,
    /best in class/gi,
    /cutting edge/gi,
    /state of the art/gi,
    /world class/gi,
    /innovative solutions/gi,
    /premium quality/gi,
    /top notch/gi,
    /first class/gi,
    /award winning/gi,
    /proven results/gi,
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
    /high quality output/gi,
    /high quality results/gi,
    /high quality service/gi,
    /high quality product/gi,
    /high quality solution/gi,
    /high quality software/gi,
    /high quality hardware/gi,
    /high quality system/gi,
    /high quality platform/gi,
    /high quality tool/gi,
    /high quality application/gi,
    /high quality website/gi,
    /high quality app/gi,
    /high quality interface/gi,
    /high quality design/gi,
    /high quality development/gi,
    /high quality implementation/gi,
    /high quality maintenance/gi,
    /high quality support/gi,
    /high quality training/gi,
    /high quality documentation/gi,
    /high quality testing/gi,
    /high quality security/gi,
    /high quality performance/gi,
    /high quality scalability/gi,
    /high quality reliability/gi,
    /high quality availability/gi,
    /high quality efficiency/gi,
    /high quality effectiveness/gi,
    /high quality usability/gi,
    /high quality accessibility/gi,
    /high quality compatibility/gi,
    /high quality integration/gi,
    /high quality customization/gi,
    /high quality optimization/gi,
    /high quality enhancement/gi,
    /high quality improvement/gi,
    /high quality upgrade/gi,
    /high quality update/gi,
    /high quality patch/gi,
    /high quality fix/gi,
    /high quality solution/gi,
    /high quality product/gi,
    /high quality service/gi,
    /high quality system/gi,
    /high quality platform/gi,
    /high quality application/gi,
    /high quality software/gi,
    /high quality tool/gi,
    /high quality interface/gi,
    /high quality design/gi,
    /high quality development/gi,
    /high quality implementation/gi,
    /high quality maintenance/gi,
    /high quality support/gi,
    /high quality training/gi,
    /high quality documentation/gi,
    /high quality testing/gi,
    /high quality security/gi,
    /high quality performance/gi,
    /high quality scalability/gi,
    /high quality reliability/gi,
    /high quality availability/gi,
    /high quality efficiency/gi,
    /high quality effectiveness/gi,
    /high quality usability/gi,
    /high quality accessibility/gi,
    /high quality compatibility/gi,
    /high quality integration/gi,
    /high quality customization/gi,
    /high quality optimization/gi,
    /high quality enhancement/gi,
    /high quality improvement/gi,
    /high quality upgrade/gi,
    /high quality update/gi,
    /high quality patch/gi,
    /high quality fix/gi
  ];

  for (const pattern of marketingFluff) {
    cleanedText = cleanedText.replace(pattern, '');
  }

  // Normalize company name everywhere
  cleanedText = cleanedText.replace(/YVI Soft Solutions/g, 'YVI Technologies');
  cleanedText = cleanedText.replace(/YVI Soft/g, 'YVI Technologies');
  cleanedText = cleanedText.replace(/YVI/g, 'YVI Technologies');
  
  // Remove extra whitespace and normalize line breaks
  cleanedText = cleanedText.replace(/\s+/g, ' ');
  cleanedText = cleanedText.replace(/\n+/g, '\n');
  cleanedText = cleanedText.trim();

  return cleanedText;
}

// Function to extract and structure content from PDF
async function extractAndStructurePDFContent(): Promise<KnowledgeEntry[]> {
  try {
    const pdfPath = path.resolve(__dirname, '../frontend/data/Yvi_Tech_Data.pdf');
    
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF file not found at ${pdfPath}`);
    }

    console.log(`Reading PDF file: ${pdfPath}`);
    
    // Dynamically import pdfjs-dist
    const { getDocument } = await import('pdfjs-dist');
    
    // Read and parse the PDF
    const pdfBuffer = fs.readFileSync(pdfPath);
    
    // Setup PDF.js worker
    const pdfjsLib = await import('pdfjs-dist');
    
    // Set the worker path
    pdfjsLib.GlobalWorkerOptions.workerSrc = `node_modules/pdfjs-dist/build/pdf.worker.js`;
    
    // Load the PDF
    const typedArray = new Uint8Array(pdfBuffer);
    const pdf = await pdfjsLib.getDocument(typedArray).promise;
    
    // Extract text from all pages
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .filter(item => 'str' in item)
        .map(item => (item as any).str)
        .join(' ');
      fullText += pageText + ' ';
    }
    
    const pdfData = { text: fullText };
    
    console.log(`PDF contains ${pdfData.text.length} characters of text`);
    
    // Clean the extracted text
    const cleanedText = cleanPDFText(pdfData.text);
    
    console.log(`Cleaned text contains ${cleanedText.length} characters`);
    
    // Structure the content into knowledge entries
    const structuredEntries = structureContent(cleanedText);
    
    console.log(`Structured ${structuredEntries.length} knowledge entries`);
    
    return structuredEntries;
  } catch (error) {
    console.error('Error extracting PDF content:', error);
    throw error;
  }
}

// Function to structure content into atomic knowledge units
function structureContent(text: string): KnowledgeEntry[] {
  // This is a simplified approach - in a real implementation, you'd want more sophisticated parsing
  // For now, we'll identify sections based on common headings and structure them
  
  const entries: KnowledgeEntry[] = [];
  
  // Split text into sections based on common headings
  // This is a basic approach - a more sophisticated parser would identify actual section headers
  const sections = splitIntoSections(text);
  
  for (const section of sections) {
    const entry = processSection(section);
    if (entry) {
      entries.push(entry);
    }
  }
  
  return entries;
}

// Function to split content into sections
function splitIntoSections(text: string): string[] {
  // This is a simplified approach - in reality, you'd want to identify actual section headers
  // For now, we'll split by common keywords that might indicate section breaks
  
  // Common section headers that might appear in the PDF
  const sectionHeaders = [
    'About', 'Services', 'AI', 'Automation', 'Cloud', 'DevOps', 'ERP', 'Data', 
    'RPA', 'UI', 'UX', 'Web', 'Mobile', 'Development', 'Digital', 'Marketing', 
    'Industries', 'Locations', 'Contact', 'Solutions', 'Enterprise', 'Oracle', 
    'SAP', 'Consulting', 'Implementation', 'Careers', 'Opportunities', 'Team'
  ];
  
  // Create a regex pattern to split on these headers
  const pattern = new RegExp(`\\b(${sectionHeaders.join('|')})\\b`, 'gi');
  const parts = text.split(pattern);
  
  // Reconstruct sections by combining header with content
  const sections: string[] = [];
  let currentHeader: string | null = null;
  
  for (const part of parts) {
    if (part.trim() === '') continue;
    
    // Check if this part is a header
    const matches = part.match(new RegExp(`\\b(${sectionHeaders.join('|')})\\b`, 'gi'));
    
    if (matches && part.trim().length < 50) { // Likely a header if short
      currentHeader = part.trim();
    } else {
      // This is content - combine with the current header if available
      const sectionContent = currentHeader ? `${currentHeader}: ${part}` : part;
      sections.push(sectionContent);
      currentHeader = null; // Reset after using the header
    }
  }
  
  return sections;
}

// Function to process a section and return a structured knowledge entry
function processSection(section: string): KnowledgeEntry | null {
  // Skip very short sections that might be navigation or repetitive text
  if (section.length < 50) {
    return null;
  }
  
  // Extract title (first part of the section)
  let title = '';
  let content = section;
  
  // Look for a colon separator which often indicates title: content
  const colonIndex = section.indexOf(':');
  if (colonIndex > 0 && colonIndex < 50) { // Only if colon is early in the section
    title = section.substring(0, colonIndex).trim();
    content = section.substring(colonIndex + 1).trim();
  } else {
    // Try to extract a title based on the first sentence
    const sentences = section.split(/[.!?]/);
    if (sentences.length > 0) {
      title = sentences[0].substring(0, 100).trim(); // First sentence as title
      if (title.length < 20) {
        // If the first sentence is too short, use more content for the title
        title = section.substring(0, Math.min(100, section.length)).trim();
      }
      content = section.substring(title.length).trim();
    }
  }
  
  // Determine category based on keywords in the section
  const category = determineCategory(section);
  
  // Create description starting with "YVI Technologies..."
  const description = `YVI Technologies ${content.startsWith('YVI Technologies') ? content.substring(15) : content}`;
  
  // Generate keywords from the content
  const keywords = generateKeywords(section);
  
  return {
    category,
    title,
    description,
    keywords
  };
}

// Function to determine category based on content
function determineCategory(content: string): string {
  const contentLower = content.toLowerCase();
  
  // Map keywords to categories
  if (contentLower.includes('about') || contentLower.includes('company') || contentLower.includes('overview')) {
    return 'About YVI';
  } else if (contentLower.includes('service') || contentLower.includes('consulting')) {
    return 'Services';
  } else if (contentLower.includes('ai') || contentLower.includes('artificial intelligence') || contentLower.includes('machine learning')) {
    return 'Data & AI';
  } else if (contentLower.includes('automation') || contentLower.includes('rpa')) {
    return 'RPA & Automation';
  } else if (contentLower.includes('cloud') || contentLower.includes('devops')) {
    return 'Cloud & DevOps';
  } else if (contentLower.includes('erp') || contentLower.includes('oracle') || contentLower.includes('sap')) {
    return 'ERP Solutions';
  } else if (contentLower.includes('ui') || contentLower.includes('ux') || contentLower.includes('design')) {
    return 'UI/UX Design';
  } else if (contentLower.includes('web') || contentLower.includes('website')) {
    return 'Web Development';
  } else if (contentLower.includes('mobile') || contentLower.includes('app')) {
    return 'Mobile Development';
  } else if (contentLower.includes('marketing') || contentLower.includes('seo') || contentLower.includes('social media')) {
    return 'Digital Marketing';
  } else if (contentLower.includes('industry') || contentLower.includes('sector')) {
    return 'Industries';
  } else if (contentLower.includes('location') || contentLower.includes('contact') || contentLower.includes('address')) {
    return 'Locations & Contact';
  } else if (contentLower.includes('enterprise') || contentLower.includes('solution')) {
    return 'Enterprise Solutions';
  } else {
    // Default to Services if no specific category matches
    return 'Services';
  }
}

// Function to generate keywords from text (similar to the existing script)
function generateKeywords(text: string): string[] {
  if (!text) return [];
  
  // Convert to lowercase and remove special characters
  const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  
  // Split into words and filter out common stop words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);
  
  const words = cleanText.split(/\s+/).filter(word => word.length > 2 && !stopWords.has(word));
  
  // Get unique words and limit to 10
  return Array.from(new Set(words)).slice(0, 10);
}

// Main function to run the extraction
async function main() {
  try {
    console.log('🚀 Starting PDF content extraction...');
    
    const entries = await extractAndStructurePDFContent();
    
    console.log(`\n✅ Successfully extracted ${entries.length} knowledge entries from PDF`);
    
    // Output a sample of the entries
    console.log('\n📝 Sample entries:');
    for (let i = 0; i < Math.min(5, entries.length); i++) {
      console.log(`\n${i + 1}. Category: ${entries[i].category}`);
      console.log(`   Title: ${entries[i].title.substring(0, 100)}${entries[i].title.length > 100 ? '...' : ''}`);
      console.log(`   Keywords: [${entries[i].keywords.join(', ')}]`);
      console.log(`   Description: ${entries[i].description.substring(0, 150)}${entries[i].description.length > 150 ? '...' : ''}`);
    }
    
    // Save the extracted entries to a JSON file for further processing
    const outputPath = path.resolve(__dirname, '../frontend/data/extracted_knowledge.json');
    fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2));
    console.log(`\n💾 Knowledge entries saved to: ${outputPath}`);
    
    return entries;
  } catch (error) {
    console.error('❌ Error in PDF extraction process:', error);
    process.exit(1);
  }
}

// Run the script
if (typeof require !== 'undefined' && require.main === module) {
  main();
}

// For ES modules - use different variable names to avoid conflicts
const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);

// Check if this is the main module being run
const isMainModule = () => {
  try {
    // This works for both CommonJS and ES modules
    if (typeof require !== 'undefined' && require.main === module) {
      return true;
    }
    // For ES modules, check if the current file is being executed directly
    return process.argv[1] && process.argv[1].includes(path.basename(currentFilename));
  } catch {
    return false;
  }
};

if (isMainModule()) {
  main();
}

export { extractAndStructurePDFContent };