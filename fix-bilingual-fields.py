#!/usr/bin/env python3
"""
Fix Bilingual Fields in Surah JSON Files
Created by: Tiko Abousteit
Date: 3 March 2026

Description:
    Consolidates 'when' and 'purpose' fields into the main 'content' field
    to ensure all content is properly bilingual without mixed English/Arabic.
"""

import json
import os
from pathlib import Path

def consolidate_fields(item):
    """Consolidate when/purpose fields into content field."""
    if not isinstance(item, dict):
        return item
    
    # Check if this item has content, when, or purpose fields
    if 'content' in item and isinstance(item['content'], dict):
        content_ar = item['content'].get('arabic', '')
        content_en = item['content'].get('english', '')
        
        # Add 'when' field content if it exists
        if 'when' in item and isinstance(item['when'], dict):
            when_ar = item['when'].get('arabic', '')
            when_en = item['when'].get('english', '')
            if when_ar:
                content_ar = f"{content_ar} {when_ar}"
            if when_en:
                content_en = f"{content_en} {when_en}"
            del item['when']
        
        # Add 'purpose' field content if it exists
        if 'purpose' in item and isinstance(item['purpose'], dict):
            purpose_ar = item['purpose'].get('arabic', '')
            purpose_en = item['purpose'].get('english', '')
            if purpose_ar:
                content_ar = f"{content_ar} {purpose_ar}"
            if purpose_en:
                content_en = f"{content_en} {purpose_en}"
            del item['purpose']
        
        # Update content
        item['content'] = {
            'arabic': content_ar.strip(),
            'english': content_en.strip()
        }
    
    # Recursively process nested structures
    for key, value in list(item.items()):
        if isinstance(value, dict):
            item[key] = consolidate_fields(value)
        elif isinstance(value, list):
            item[key] = [consolidate_fields(v) if isinstance(v, dict) else v for v in value]
    
    return item

def fix_surah_file(filepath):
    """Fix a single surah JSON file."""
    print(f"Processing: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Process the entire data structure
    data = consolidate_fields(data)
    
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
    
    print("🔧 Fixing bilingual fields in surah files...\n")
    
    for filename in files_to_fix:
        filepath = surahs_dir / filename
        if filepath.exists():
            fix_surah_file(filepath)
        else:
            print(f"⚠ File not found: {filename}")
    
    print(f"\n✅ Fixed {len(files_to_fix)} surah files")

if __name__ == '__main__':
    main()
