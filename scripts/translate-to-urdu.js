/**
 * Translation Script - Arabic/English to Urdu
 * Created by: Tiko Abousteit
 * Date: 7 March 2026
 *
 * Description:
 *     Converts catalog JSON files from {arabic, english} format to {ar, en, ur, fr, es} format.
 *     Uses AI to translate content to Urdu while preserving structure.
 *     Marks French and Spanish as coming soon (empty strings for now).
 */

const fs = require('fs');
const path = require('path');

// This script will be run manually with AI assistance
// It reads a JSON file, extracts all text fields, and prepares them for translation

function extractTextsForTranslation(obj, prefix = '') {
  const texts = [];
  
  function traverse(current, path) {
    if (typeof current === 'object' && current !== null) {
      // Check if it's a bilingual text object
      if ('arabic' in current && 'english' in current) {
        texts.push({
          path,
          arabic: current.arabic,
          english: current.english
        });
      } else if (Array.isArray(current)) {
        current.forEach((item, index) => {
          traverse(item, `${path}[${index}]`);
        });
      } else {
        Object.keys(current).forEach(key => {
          traverse(current[key], path ? `${path}.${key}` : key);
        });
      }
    }
  }
  
  traverse(obj, prefix);
  return texts;
}

function convertToMultilingual(obj) {
  function transform(current) {
    if (typeof current === 'object' && current !== null) {
      // Check if it's a bilingual text object
      if ('arabic' in current && 'english' in current) {
        return {
          ar: current.arabic,
          en: current.english,
          ur: '', // To be filled by AI translation
          fr: '', // Coming soon
          es: ''  // Coming soon
        };
      } else if (Array.isArray(current)) {
        return current.map(item => transform(item));
      } else {
        const result = {};
        Object.keys(current).forEach(key => {
          result[key] = transform(current[key]);
        });
        return result;
      }
    }
    return current;
  }
  
  return transform(obj);
}

// Usage example
const inputFile = process.argv[2];
if (!inputFile) {
  console.log('Usage: node translate-to-urdu.js <input-file>');
  process.exit(1);
}

const content = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
const texts = extractTextsForTranslation(content);

console.log(`Found ${texts.length} text fields to translate`);
console.log('\nSample texts:');
texts.slice(0, 3).forEach((t, i) => {
  console.log(`\n${i + 1}. Path: ${t.path}`);
  console.log(`   Arabic: ${t.arabic.substring(0, 100)}...`);
  console.log(`   English: ${t.english.substring(0, 100)}...`);
});

// Convert structure
const converted = convertToMultilingual(content);
const outputFile = inputFile.replace('.json', '-multilingual.json');
fs.writeFileSync(outputFile, JSON.stringify(converted, null, 2), 'utf8');
console.log(`\nConverted structure saved to: ${outputFile}`);
console.log('Now ready for Urdu translation!');
