# CSV Loading Utility

This utility provides functions to load and process CSV files containing knowledge base data for the YVI Technologies chatbot.

## Files

- `loadCSV.ts` - Main utility functions
- `testLoadCSV.ts` - Test script to verify functionality
- `chatbotIntegrationExample.ts` - Example of how to integrate with the chatbot

## Functions

### `loadCSV(path: string): Promise<any[]>`

Loads and parses a single CSV file, converting it to JSON format.

- **Parameters**: `path` - Path to the CSV file (relative to the src directory)
- **Returns**: Promise resolving to an array of objects representing the CSV rows
- **Features**:
  - Automatically converts CSV to JSON
  - Replaces "YVI Soft Solutions" with "YVI Technologies"
  - Handles errors gracefully

### `loadAllKnowledgeCSVs(): Promise<any[]>`

Loads all known knowledge base CSV files and combines them into a single array.

- **Returns**: Promise resolving to a combined array of all CSV data
- **Note**: Non-existent files are skipped with a warning

### `convertToKnowledgeBaseFormat(csvData: any[]): any`

Converts the flat CSV data structure into a hierarchical knowledge base format.

- **Parameters**: `csvData` - Array of CSV records
- **Returns**: Object with sections as keys and arrays of content as values

## Usage Example

```typescript
import { loadAllKnowledgeCSVs, convertToKnowledgeBaseFormat } from './utils/loadCSV';

// Load all CSV data
const csvData = await loadAllKnowledgeCSVs();

// Convert to knowledge base format
const knowledgeBase = convertToKnowledgeBaseFormat(csvData);

// Use the data in your application
console.log(knowledgeBase);
```

## Available CSV Files

The utility attempts to load these files from `src/data/`:

1. `Home_Page_cleaned.csv`
2. `Explore_YVITech_cleaned_v3.csv`
3. `Services_cleaned_v2.csv`
4. `Enterprise_Services_cleaned_v2.csv`
5. `AI_Data_Solutions_cleaned.csv` (if exists)
6. `Cloud_DevOps_cleaned.csv` (if exists)
7. `Oracle_SAP_cleaned.csv` (if exists)

## Testing

To test the utility, run:

```bash
# From the frontend directory
node testLoadCSV.ts
```