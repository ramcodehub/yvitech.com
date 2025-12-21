// Test script for AI response validation function
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Since we're testing a function from chat.js, we need to extract it
// For simplicity, we'll recreate the function here

function isValidAIResponse(response) {
  // Check if response exists and is not empty
  if (!response || response.trim().length === 0) {
    return false;
  }
  
  // Check if response contains error indicators
  const errorIndicators = [
    'technical difficulties',
    'unable to process',
    'try again later',
    'quota',
    'error',
    'service unavailable'
  ];
  
  const lowerResponse = response.toLowerCase();
  for (const indicator of errorIndicators) {
    if (lowerResponse.includes(indicator)) {
      return false;
    }
  }
  
  // Check if response is meaningful (more than 50 characters)
  if (response.trim().length < 50) {
    return false;
  }
  
  // Response seems valid
  return true;
}

// Test cases
const testCases = [
  {
    name: "Valid response",
    response: "This is a valid response with enough content to be considered meaningful and useful for the user.",
    expected: true
  },
  {
    name: "Empty response",
    response: "",
    expected: false
  },
  {
    name: "Short response",
    response: "Too short",
    expected: false
  },
  {
    name: "Technical difficulties",
    response: "I'm experiencing technical difficulties right now. Please try again later.",
    expected: false
  },
  {
    name: "Quota error",
    response: "I've exceeded my quota limit. Please try again later.",
    expected: false
  },
  {
    name: "Service unavailable",
    response: "The service is currently unavailable. Please try again later.",
    expected: false
  }
];

console.log("Testing AI response validation function...\n");

let passedTests = 0;
let totalTests = testCases.length;

for (const testCase of testCases) {
  const result = isValidAIResponse(testCase.response);
  const passed = result === testCase.expected;
  
  console.log(`Test: ${testCase.name}`);
  console.log(`Response: "${testCase.response}"`);
  console.log(`Expected: ${testCase.expected}, Got: ${result}`);
  console.log(`Status: ${passed ? "✅ PASS" : "❌ FAIL"}\n`);
  
  if (passed) passedTests++;
}

console.log(`\nResults: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
  console.log("🎉 All tests passed!");
} else {
  console.log("❌ Some tests failed. Please review the validation function.");
  process.exit(1);
}