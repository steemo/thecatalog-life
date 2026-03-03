#!/usr/bin/env python3
"""
Fix Bilingual Fields in Surah JSON Files - Version 2
Created by: Tiko Abousteit
Date: 3 March 2026

Description:
    Properly structures 'when' and 'purpose' fields as separate bilingual sections
    within the content, maintaining clear separation and readability.
"""

import json
import os
from pathlib import Path

def restructure_fields(item):
    """Restructure when/purpose fields into structured bilingual content."""
    if not isinstance(item, dict):
        return item
    
    # Check if this item has content, when, or purpose fields
    if 'content' in item and isinstance(item['content'], dict):
        content_ar = item['content'].get('arabic', '')
        content_en = item['content'].get('english', '')
        
        # Add 'when' field as separate section if it exists
        if 'when' in item and isinstance(item['when'], dict):
            when_ar = item['when'].get('arabic', '')
            when_en = item['when'].get('english', '')
            if when_ar and when_en:
                content_ar = f"{content_ar}\n\nمتى تستخدمه: {when_ar}"
                content_en = f"{content_en}\n\nWhen to use: {when_en}"
            del item['when']
        
        # Add 'purpose' field as separate section if it exists
        if 'purpose' in item and isinstance(item['purpose'], dict):
            purpose_ar = item['purpose'].get('arabic', '')
            purpose_en = item['purpose'].get('english', '')
            if purpose_ar and purpose_en:
                content_ar = f"{content_ar}\n\nالهدف: {purpose_ar}"
                content_en = f"{content_en}\n\nPurpose: {purpose_en}"
            del item['purpose']
        
        # Update content
        item['content'] = {
            'arabic': content_ar.strip(),
            'english': content_en.strip()
        }
    
    # Recursively process nested structures
    for key, value in list(item.items()):
        if isinstance(value, dict):
            item[key] = restructure_fields(value)
        elif isinstance(value, list):
            item[key] = [restructure_fields(v) if isinstance(v, dict) else v for v in value]
    
    return item

def fix_surah_file(filepath):
    """Fix a single surah JSON file."""
    print(f"Processing: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Process the entire data structure
    data = restructure_fields(data)
    
    # Write back with proper formatting
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Fixed: {filepath.name}")

def main():
    """Main function to fix all surah files."""
    surahs_dir = Path('src/data/surahs')
    
    # List of files with the issue
    files_to_fix = [
        'adh-dhariyat.json',
        'al-baqarah.json',
        'al-mulk.json',
        'an-nahl.json',
        'an-najm.json',
        'ash-sharh.json',
        'at-tawbah.json',
        'taha.json',
        'yasin.json'
    ]
    
    print("🔧 Fixing bilingual fields in surah files (v2)...\n")
    
    for filename in files_to_fix:
        filepath = surahs_dir / filename
        if filepath.exists():
            fix_surah_file(filepath)
        else:
            print(f"⚠ File not found: {filename}")
    
    print(f"\n✅ Fixed {len(files_to_fix)} surah files with proper structure")

if __name__ == '__main__':
    main()
