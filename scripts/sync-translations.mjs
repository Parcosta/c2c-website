#!/usr/bin/env node
/**
 * Translation Sync Script
 *
 * This script helps keep translations in sync between:
 * 1. public/locales/en/translation.json (English translations)
 * 2. public/locales/es/translation.json (Spanish translations)
 * 3. Sanity uiContent documents (CMS source of truth)
 *
 * Usage:
 *   node scripts/sync-translations.mjs check     # Check for missing translations
 *   node scripts/sync-translations.mjs validate  # Validate all keys have translations
 *   node scripts/sync-translations.mjs export    # Export to Sanity import format
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// File paths
const enTranslationsPath = join(rootDir, "public/locales/en/translation.json");
const esTranslationsPath = join(rootDir, "public/locales/es/translation.json");

// Colors for output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m"
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Load translations from JSON file
 */
function loadTranslations(filePath) {
  try {
    const content = readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    log(`Error loading ${filePath}: ${error.message}`, "red");
    return {};
  }
}

/**
 * Flatten nested translation object to dot-notation keys
 */
function flattenTranslations(obj, prefix = "") {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenTranslations(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

/**
 * Compare two translation objects and find differences
 */
function findDifferences(source, target) {
  const missing = [];

  for (const key of Object.keys(source)) {
    if (!(key in target)) {
      missing.push({ key, value: source[key] });
    }
  }

  return missing;
}

/**
 * Check command - Compare translations between EN and ES
 */
function check() {
  log("\n🔍 Checking translation consistency...\n", "cyan");

  const enTranslations = loadTranslations(enTranslationsPath);
  const esTranslations = loadTranslations(esTranslationsPath);

  const enFlat = flattenTranslations(enTranslations);
  const esFlat = flattenTranslations(esTranslations);

  const missingInEs = findDifferences(enFlat, esFlat);
  const missingInEn = findDifferences(esFlat, enFlat);

  let hasIssues = false;

  if (missingInEs.length > 0) {
    log(`❌ Missing ES translations for ${missingInEs.length} keys:`, "red");
    missingInEs.forEach(({ key }) => log(`   - ${key}`, "yellow"));
    hasIssues = true;
  }

  if (missingInEn.length > 0) {
    log(`❌ Missing EN translations for ${missingInEn.length} keys:`, "red");
    missingInEn.forEach(({ key }) => log(`   - ${key}`, "yellow"));
    hasIssues = true;
  }

  // Summary
  log(`\n📊 Summary:`, "blue");
  log(`   EN keys: ${Object.keys(enFlat).length}`, "green");
  log(`   ES keys: ${Object.keys(esFlat).length}`, "green");

  if (!hasIssues) {
    log(`\n✅ All translations are in sync!`, "green");
    process.exit(0);
  } else {
    process.exit(1);
  }
}

/**
 * Validate command - Check all EN keys have ES translations
 */
function validate() {
  log("\n✅ Validating translations...\n", "cyan");

  const enTranslations = loadTranslations(enTranslationsPath);
  const esTranslations = loadTranslations(esTranslationsPath);

  const enFlat = flattenTranslations(enTranslations);
  const esFlat = flattenTranslations(esTranslations);

  const missingInEs = findDifferences(enFlat, esFlat);
  const missingInEn = findDifferences(esFlat, enFlat);

  let hasErrors = false;

  if (missingInEs.length > 0) {
    log(`❌ Missing ES translations for ${missingInEs.length} keys:`, "red");
    missingInEs.forEach(({ key }) => log(`   - ${key}`, "yellow"));
    hasErrors = true;
  }

  if (missingInEn.length > 0) {
    log(`❌ Missing EN translations for ${missingInEn.length} keys:`, "red");
    missingInEn.forEach(({ key }) => log(`   - ${key}`, "yellow"));
    hasErrors = true;
  }

  // Check for potentially untranslated strings (EN value == ES value)
  const potentiallyUntranslated = [];
  for (const [key, enValue] of Object.entries(enFlat)) {
    if (esFlat[key] && enValue === esFlat[key]) {
      potentiallyUntranslated.push(key);
    }
  }

  if (potentiallyUntranslated.length > 0) {
    log(`\n⚠️  ${potentiallyUntranslated.length} keys have identical EN/ES values:`, "yellow");
    potentiallyUntranslated.slice(0, 10).forEach((key) => log(`   - ${key}`, "yellow"));
    if (potentiallyUntranslated.length > 10) {
      log(`   ... and ${potentiallyUntranslated.length - 10} more`, "yellow");
    }
  }

  if (!hasErrors) {
    log(`✅ All ${Object.keys(enFlat).length} keys have both EN and ES translations!`, "green");
    process.exit(0);
  } else {
    process.exit(1);
  }
}

/**
 * Export command - Generate Sanity import JSON
 */
function exportToSanity() {
  log("\n📤 Exporting translations for Sanity import...\n", "cyan");

  const enTranslations = loadTranslations(enTranslationsPath);
  const esTranslations = loadTranslations(esTranslationsPath);

  const enFlat = flattenTranslations(enTranslations);

  const documents = [];

  for (const [key, enValue] of Object.entries(enFlat)) {
    // Get nested value from ES translations
    const keyParts = key.split(".");
    let esValue = esTranslations;
    for (const part of keyParts) {
      esValue = esValue?.[part];
    }

    if (!esValue) {
      esValue = enValue;
    }

    // Determine category from key prefix
    const category = key.split(".")[0] || "common";

    documents.push({
      _type: "uiContent",
      _id: `uiContent.${key.replace(/\./g, "_")}`,
      key,
      category,
      text: {
        en: enValue,
        es: esValue
      },
      description: `Auto-exported from translation.json`
    });
  }

  const outputPath = join(rootDir, "translations-sanity-import.ndjson");
  const ndjson = documents.map((doc) => JSON.stringify(doc)).join("\n");

  writeFileSync(outputPath, ndjson);

  log(`✅ Exported ${documents.length} translations to:`, "green");
  log(`   ${outputPath}`, "cyan");
  log(`\n💡 Import to Sanity with:`, "blue");
  log(`   sanity dataset import ${outputPath}`, "cyan");
}

// Main
const command = process.argv[2];

switch (command) {
  case "check":
    check();
    break;
  case "validate":
    validate();
    break;
  case "export":
    exportToSanity();
    break;
  default:
    log("\nTranslation Sync Tool\n", "cyan");
    log("Usage: node scripts/sync-translations.mjs <command>\n", "blue");
    log("Commands:", "blue");
    log("  check     - Check for missing translations between EN/ES");
    log("  validate  - Validate all keys have EN/ES translations");
    log("  export    - Export to Sanity import format (NDJSON)\n");
    process.exit(1);
}
