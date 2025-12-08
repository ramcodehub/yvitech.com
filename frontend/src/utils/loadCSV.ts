import { parse } from 'csv-parse/browser/esm/sync';

// Function to load and parse a CSV file
export async function loadCSV(path: string): Promise<any[]> {
  try {
    // Dynamically import the CSV file
    const csvModule = await import(/* @vite-ignore */ path);
    const csvContent = csvModule.default;
    
    // Parse CSV content into JSON rows
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    // Replace any remaining "YVI Soft Solutions" with "YVI Technologies"
    return records.map((record: any) => {
      const updatedRecord: any = {};
      for (const key in record) {
        if (typeof record[key] === 'string') {
          updatedRecord[key] = record[key].replace(/YVI Soft Solutions/g, 'YVI Technologies');
        } else {
          updatedRecord[key] = record[key];
        }
      }
      return updatedRecord;
    });
  } catch (error) {
    console.error(`Error loading CSV file ${path}:`, error);
    return [];
  }
}

// Function to load all knowledge CSVs
export async function loadAllKnowledgeCSVs(): Promise<any[]> {
  // List of CSV files to load (based on what's actually available)
  const csvFiles = [
    '../data/Home_Page_cleaned.csv',
    '../data/Explore_YVITech_cleaned_v3.csv',
    '../data/Services_cleaned_v2.csv',
    '../data/Enterprise_Services_cleaned_v2.csv',
    '../data/AI_Data_Solutions_cleaned.csv', // Will be skipped if doesn't exist
    '../data/Cloud_DevOps_cleaned.csv', // Will be skipped if doesn't exist
    '../data/Oracle_SAP_cleaned.csv' // Will be skipped if doesn't exist
  ];
  
  // Load all CSV files and combine results
  const allRecords: any[] = [];
  
  for (const filePath of csvFiles) {
    try {
      const records = await loadCSV(filePath);
      allRecords.push(...records);
    } catch (error) {
      console.warn(`Skipping ${filePath} (file not found or error):`, error.message);
    }
  }
  
  return allRecords;
}

// Function to convert CSV data to knowledge base format
export function convertToKnowledgeBaseFormat(csvData: any[]): any {
  const knowledgeBase: any = {};
  
  // Group data by section
  csvData.forEach(record => {
    if (record.section && record.content) {
      if (!knowledgeBase[record.section]) {
        knowledgeBase[record.section] = [];
      }
      knowledgeBase[record.section].push(record.content);
    }
  });
  
  return knowledgeBase;
}