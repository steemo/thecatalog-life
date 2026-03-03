/**
 * Surah Data Index
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Central export for all Surah data.
 *     Provides helper functions for data access.
 */

import type { Surah, SurahCard } from '../types/surah';

// Import Surah data
import alBaqarah from './surahs/al-baqarah.json';
import aalImran from './surahs/aal-imran.json';
import anNisa from './surahs/an-nisa.json';
import atTawbah from './surahs/at-tawbah.json';
import anNahl from './surahs/an-nahl.json';
import taha from './surahs/taha.json';
import yasin from './surahs/yasin.json';
import adhDhariyat from './surahs/adh-dhariyat.json';
import anNajm from './surahs/an-najm.json';
import alWaqiah from './surahs/al-waqiah.json';
import alMulk from './surahs/al-mulk.json';
import abasa from './surahs/abasa.json';
import alBalad from './surahs/al-balad.json';
import ashShams from './surahs/ash-shams.json';
import alLayl from './surahs/al-layl.json';
import adDuha from './surahs/ad-duha.json';
import ashSharh from './surahs/ash-sharh.json';
import atTakathur from './surahs/at-takathur.json';
import alMaun from './surahs/al-maun.json';
import alKawthar from './surahs/al-kawthar.json';

/** All Surahs data */
export const surahs: Surah[] = [
  alBaqarah as Surah,
  aalImran as Surah,
  anNisa as Surah,
  atTawbah as Surah,
  anNahl as Surah,
  taha as Surah,
  yasin as Surah,
  adhDhariyat as Surah,
  anNajm as Surah,
  alWaqiah as Surah,
  alMulk as Surah,
  abasa as Surah,
  alBalad as Surah,
  ashShams as Surah,
  alLayl as Surah,
  adDuha as Surah,
  ashSharh as Surah,
  atTakathur as Surah,
  alMaun as Surah,
  alKawthar as Surah,
];

/** Get all Surahs as cards (for grid display) */
export const getSurahCards = (): SurahCard[] => {
  return surahs.map(({ id, slug, name, metadata, goal }) => ({
    id,
    slug,
    name,
    metadata,
    goal,
  }));
};

/** Get a single Surah by slug */
export const getSurahBySlug = (slug: string): Surah | undefined => {
  return surahs.find((s) => s.slug === slug);
};

/** Get a single Surah by ID */
export const getSurahById = (id: number): Surah | undefined => {
  return surahs.find((s) => s.id === id);
};

/** Get all Surah slugs (for prerendering) */
export const getAllSurahSlugs = (): string[] => {
  return surahs.map((s) => s.slug);
};

/** Filter Surahs by type */
export const getSurahsByType = (type: 'meccan' | 'medinan'): Surah[] => {
  return surahs.filter((s) => s.metadata.type === type);
};

/** Search Surahs by name */
export const searchSurahs = (query: string): Surah[] => {
  const lowerQuery = query.toLowerCase();
  return surahs.filter(
    (s) =>
      s.name.arabic.includes(query) ||
      s.name.english.toLowerCase().includes(lowerQuery) ||
      s.name.transliteration.toLowerCase().includes(lowerQuery)
  );
};

export default surahs;
