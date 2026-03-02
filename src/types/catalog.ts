/**
 * Catalog Entry Types
 * Created by: Tiko Abousteit
 * Date: 28 February 2026
 *
 * Description:
 *     TypeScript interfaces for "The Religion Catalog" - 30-day learning journey
 */

export interface BilingualText {
  arabic: string;
  english: string;
}

export interface CatalogMetadata {
  day: number; // 0 for teaser, 1-30 for days
  type: 'teaser' | 'manifesto' | 'practice' | 'concept';
  readTime: number; // minutes
  tags: string[];
}

export interface CatalogSection {
  id: string;
  title: BilingualText;
  icon?: string;
  content: BilingualText;
}

export interface CatalogAnalogy {
  id: string;
  title: BilingualText;
  description: BilingualText;
  example: BilingualText;
}

export interface CatalogPractical {
  id: string;
  title: BilingualText;
  action: BilingualText;
  benefit: BilingualText;
}

export interface CatalogEntry {
  id: string;
  slug: string;
  day: number;
  title: BilingualText;
  subtitle?: BilingualText;
  metadata: CatalogMetadata;
  
  // Main content
  hook: BilingualText; // Opening hook/question
  mainConcept: BilingualText;
  
  // Flexible sections (can be spiritual, scientific, practical, or custom)
  sections?: CatalogSection[];
  
  // Three languages approach (deprecated - use sections instead)
  spiritual?: CatalogSection; // Language of the soul
  scientific?: CatalogSection; // Language of science
  practical?: CatalogSection; // Language of life
  
  // Supporting content
  analogies?: CatalogAnalogy[];
  keyTakeaways?: BilingualText[];
  practicalSteps?: CatalogPractical[];
  dailyAction?: BilingualText;
  conclusion?: BilingualText;
  
  // Connections
  relatedSurahs?: string[]; // Surah slugs
  nextEntry?: string; // Next catalog entry slug
  prevEntry?: string; // Previous catalog entry slug
}

export interface CatalogCard {
  id: string;
  slug: string;
  day: number;
  title: BilingualText;
  subtitle?: BilingualText;
  metadata: CatalogMetadata;
  hook: BilingualText;
}
