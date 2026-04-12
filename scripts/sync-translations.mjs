#!/usr/bin/env node
/**
 * Translation Sync Script
 * 
 * This script helps keep translations in sync between:
 * 1. src/i18n/index.ts (client-side fallbacks)
 * 2. src/lib/i18n-server.ts (server-side fallbacks)
 * 3. Sanity uiContent documents (CMS source of truth)
 * 
 * Usage:
 *   node scripts/sync-translations.mjs check     # Check for missing translations
 *   node scripts/sync-translations.mjs sync      # Sync server fallbacks from client
 *   node scripts/sync-translations.mjs export     # Export to Sanity import format
 *   node scripts/sync-translations.mjs validate   # Validate all keys have translations
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// File paths
const clientI18nPath = join(rootDir, 'src/i18n/index.ts');
const serverI18nPath = join(rootDir, 'src/lib/i18n-server.ts');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Extract translations from a TypeScript file
 * Uses a simpler approach - match all "key": "value" or key: "value" patterns
 */
function extractTranslations(filePath, locale) {
  const content = readFileSync(filePath, 'utf-8');
  const translations = {};
  
  // Find the locale section
  let section;
  
  // Try to find the section between locale: { ... } and the next locale or end
  if (locale === 'en') {
    // Match en: { ... } followed by es: or end of object
    const match = content.match(/en:\s*\{([\s\S]*?)\n  \}(?:,\s*\n  es:|\s*\n\};)/m);
    section = match?.[1];
  } else {
    const match = content.match(/es:\s*\{([\s\S]*?)\n  \}\n\};/m);
    section = match?.[1];
  }
  
  if (!section) {
    return translations;
  }
  
  // Match all translation entries
  // Pattern: "key": "value" or key: "value" (handles both quoted and unquoted keys)
  // Updated to handle the synced format (no comments, just entries)
  const pattern = /(?:^|\n)\s*(?:"?([\w.]+)"?)\s*:\s*"([^"]+)"/gm;
  let match;
  
  while ((match = pattern.exec(section)) !== null) {
    const [, key, value] = match;
    if (key && value) {
      translations[key] = value;
    }
  }
  
  return translations;
}

/**
 * Compare two translation objects and find differences
 */
function findDifferences(source, target) {
  const missing = [];
  const extra = [];
  
  for (const key of Object.keys(source)) {
    if (!(key in target)) {
      missing.push({ key, value: source[key] });
    }
  }
  
  for (const key of Object.keys(target)) {
    if (!(key in source)) {
      extra.push({ key, value: target[key] });
    }
  }
  
  return { missing, extra };
}

/**
 * Check command - Compare translations between files
 */
function check() {
  log('\n🔍 Checking translation consistency...\n', 'cyan');
  
  const clientEn = extractTranslations(clientI18nPath, 'en');
  const clientEs = extractTranslations(clientI18nPath, 'es');
  const serverEn = extractTranslations(serverI18nPath, 'en');
  const serverEs = extractTranslations(serverI18nPath, 'es');
  
  let hasIssues = false;
  
  // Check EN translations
  const enDiff = findDifferences(clientEn, serverEn);
  if (enDiff.missing.length > 0) {
    log(`❌ Server EN missing ${enDiff.missing.length} keys:`, 'red');
    enDiff.missing.forEach(({ key }) => log(`   - ${key}`, 'yellow'));
    hasIssues = true;
  }
  if (enDiff.extra.length > 0) {
    log(`⚠️  Server EN has ${enDiff.extra.length} extra keys:`, 'yellow');
    enDiff.extra.forEach(({ key }) => log(`   - ${key}`, 'yellow'));
  }
  
  // Check ES translations
  const esDiff = findDifferences(clientEs, serverEs);
  if (esDiff.missing.length > 0) {
    log(`❌ Server ES missing ${esDiff.missing.length} keys:`, 'red');
    esDiff.missing.forEach(({ key }) => log(`   - ${key}`, 'yellow'));
    hasIssues = true;
  }
  if (esDiff.extra.length > 0) {
    log(`⚠️  Server ES has ${esDiff.extra.length} extra keys:`, 'yellow');
    esDiff.extra.forEach(({ key }) => log(`   - ${key}`, 'yellow'));
  }
  
  // Summary
  log(`\n📊 Summary:`, 'blue');
  log(`   Client EN: ${Object.keys(clientEn).length} keys`, 'green');
  log(`   Server EN: ${Object.keys(serverEn).length} keys`, 'green');
  log(`   Client ES: ${Object.keys(clientEs).length} keys`, 'green');
  log(`   Server ES: ${Object.keys(serverEs).length} keys`, 'green');
  
  if (hasIssues) {
    log(`\n💡 Run 'node scripts/sync-translations.mjs sync' to fix`, 'cyan');
    process.exit(1);
  } else {
    log(`\n✅ All translations are in sync!`, 'green');
    process.exit(0);
  }
}

/**
 * Sync command - Copy client translations to server file
 */
function sync() {
  log('\n🔄 Syncing translations from client to server...\n', 'cyan');
  
  const clientEn = extractTranslations(clientI18nPath, 'en');
  const clientEs = extractTranslations(clientI18nPath, 'es');
  
  // Read server file
  let serverContent = readFileSync(serverI18nPath, 'utf-8');
  
  // Build EN section
  const enEntries = Object.entries(clientEn)
    .map(([key, value]) => {
      const quotedKey = key.includes('.') || key.includes('-') ? `"${key}"` : key;
      // Escape quotes in value
      const escapedValue = value.replace(/"/g, '\\"');
      return `    ${quotedKey}: "${escapedValue}"`;
    })
    .join(',\n');
  
  // Build ES section
  const esEntries = Object.entries(clientEs)
    .map(([key, value]) => {
      const quotedKey = key.includes('.') || key.includes('-') ? `"${key}"` : key;
      const escapedValue = value.replace(/"/g, '\\"');
      return `    ${quotedKey}: "${escapedValue}"`;
    })
    .join(',\n');
  
  // Find the fallbackTranslations object
  const objStart = serverContent.indexOf('const fallbackTranslations');
  const objEnd = serverContent.indexOf('export function getFallbackTranslation');
  
  if (objStart === -1 || objEnd === -1) {
    log('❌ Could not find fallbackTranslations object', 'red');
    process.exit(1);
  }
  
  // Build new content
  const newContent = `const fallbackTranslations: Record<Locale, Record<string, string>> = {
  en: {
${enEntries}
  },
  es: {
${esEntries}
  }
};

`;
  
  serverContent = serverContent.slice(0, objStart) + newContent + serverContent.slice(objEnd);
  
  writeFileSync(serverI18nPath, serverContent);
  
  log(`✅ Server translations synced!`, 'green');
  log(`   EN: ${Object.keys(clientEn).length} keys`, 'green');
  log(`   ES: ${Object.keys(clientEs).length} keys`, 'green');
}

/**
 * Export command - Generate Sanity import JSON
 */
function exportToSanity() {
  log('\n📤 Exporting translations for Sanity import...\n', 'cyan');
  
  const clientEn = extractTranslations(clientI18nPath, 'en');
  const clientEs = extractTranslations(clientI18nPath, 'es');
  
  const documents = [];
  
  for (const [key, enValue] of Object.entries(clientEn)) {
    const esValue = clientEs[key] || enValue;
    
    // Determine category from key prefix
    const category = key.split('.')[0] || 'common';
    
    documents.push({
      _type: 'uiContent',
      _id: `uiContent.${key.replace(/\./g, '_')}`,
      key,
      category,
      text: {
        en: enValue,
        es: esValue
      },
      description: `Auto-generated from i18n fallback`
    });
  }
  
  const outputPath = join(rootDir, 'translations-sanity-import.ndjson');
  const ndjson = documents.map(doc => JSON.stringify(doc)).join('\n');
  
  writeFileSync(outputPath, ndjson);
  
  log(`✅ Exported ${documents.length} translations to:`, 'green');
  log(`   ${outputPath}`, 'cyan');
  log(`\n💡 Import to Sanity with:`, 'blue');
  log(`   sanity dataset import ${outputPath}`, 'cyan');
}

/**
 * Validate command - Check all keys have both EN and ES translations
 */
function validate() {
  log('\n✅ Validating translations...\n', 'cyan');
  
  const clientEn = extractTranslations(clientI18nPath, 'en');
  const clientEs = extractTranslations(clientI18nPath, 'es');
  
  const enKeys = Object.keys(clientEn);
  const esKeys = Object.keys(clientEs);
  
  const missingInEs = enKeys.filter(key => !esKeys.includes(key));
  const missingInEn = esKeys.filter(key => !enKeys.includes(key));
  
  let hasErrors = false;
  
  if (missingInEs.length > 0) {
    log(`❌ Missing ES translations for ${missingInEs.length} keys:`, 'red');
    missingInEs.forEach(key => log(`   - ${key}`, 'yellow'));
    hasErrors = true;
  }
  
  if (missingInEn.length > 0) {
    log(`❌ Missing EN translations for ${missingInEn.length} keys:`, 'red');
    missingInEn.forEach(key => log(`   - ${key}`, 'yellow'));
    hasErrors = true;
  }
  
  // Check for potentially untranslated strings (EN value == ES value)
  const potentiallyUntranslated = [];
  for (const key of enKeys) {
    if (clientEs[key] && clientEn[key] === clientEs[key]) {
      potentiallyUntranslated.push(key);
    }
  }
  
  if (potentiallyUntranslated.length > 0) {
    log(`\n⚠️  ${potentiallyUntranslated.length} keys have identical EN/ES values:`, 'yellow');
    potentiallyUntranslated.slice(0, 10).forEach(key => log(`   - ${key}`, 'yellow'));
    if (potentiallyUntranslated.length > 10) {
      log(`   ... and ${potentiallyUntranslated.length - 10} more`, 'yellow');
    }
  }
  
  if (!hasErrors) {
    log(`✅ All ${enKeys.length} keys have both EN and ES translations!`, 'green');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

// Main
const command = process.argv[2];

switch (command) {
  case 'check':
    check();
    break;
  case 'sync':
    sync();
    break;
  case 'export':
    exportToSanity();
    break;
  case 'validate':
    validate();
    break;
  default:
    log('\nTranslation Sync Tool\n', 'cyan');
    log('Usage: node scripts/sync-translations.mjs <command>\n', 'blue');
    log('Commands:', 'blue');
    log('  check     - Check for missing translations between files');
    log('  sync      - Sync server fallbacks from client i18n');
    log('  export    - Export to Sanity import format (NDJSON)');
    log('  validate  - Validate all keys have EN/ES translations\n');
    process.exit(1);
}
