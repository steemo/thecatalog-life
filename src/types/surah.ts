/**
 * Surah Type Definitions
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     TypeScript interfaces for Quranic Surah data structure.
 *     Supports bilingual content (Arabic + English).
 */

/** Bilingual text content */
export interface BilingualText {
  arabic: string;
  english: string;
}

/** Surah name with transliteration */
export interface SurahName {
  id: string;
  name: BilingualText;
  reason: BilingualText;
}

/** Surah metadata */
export interface SurahMetadata {
  verses: number;
  words: number;
  type: 'meccan' | 'medinan';
  juz: string;
  order: number;
}

/** Virtue/Hadith about the Surah */
export interface Virtue {
  id: string;
  title: BilingualText;
  hadith: BilingualText;
}

/** Major section of the Surah */
export interface Section {
  id: string;
  title: BilingualText;
  verses: string;
  description: BilingualText;
}

/** Theme/topic covered in the Surah */
export interface Theme {
  id: string;
  title: BilingualText;
  icon: string;
  description: BilingualText;
}

/** Key lesson from the Surah */
export interface Lesson {
  id: string;
  title: BilingualText;
  content: BilingualText;
}

/** Gem/insight from the Surah */
export interface Gem {
  id: string;
  title: BilingualText;
  content: BilingualText;
}

/** Pillar of steadfastness (specific to Aal-Imran) */
export interface Pillar {
  id: string;
  title: BilingualText;
  verse: BilingualText;
}

/** Connection to another Surah */
export interface Connection {
  type: 'previous' | 'next' | 'related';
  surahId: number;
  surahSlug: string;
  description: BilingualText;
}

/** Surah goal structure with academic, psychological, and summary */
export interface SurahGoal {
  academic: BilingualText;
  psychological: BilingualText;
  summary: BilingualText;
}

/** Complete Surah data structure */
export interface Surah {
  id: number;
  slug: string;
  name: {
    arabic: string;
    english: string;
    transliteration: string;
  };
  metadata: SurahMetadata;
  goal: SurahGoal;
  names: SurahName[];
  virtues: Virtue[];
  sections: Section[];
  themes: Theme[];
  lessons: Lesson[];
  gems: Gem[];
  pillars?: Pillar[]; // Optional - only some Surahs have this
  connections: Connection[];
}

/** Surah card for grid display */
export interface SurahCard {
  id: number;
  slug: string;
  name: {
    arabic: string;
    english: string;
    transliteration: string;
  };
  metadata: SurahMetadata;
  goal: SurahGoal;
}

/** Language type */
export type Language = 'ar' | 'en';

/** Theme type */
export type ThemeMode = 'light' | 'dark';
