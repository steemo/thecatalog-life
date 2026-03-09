/**
 * Catalog Data Index
 * Created by: Tiko Abousteit
 * Date: 28 February 2026
 *
 * Description:
 *     Central export for all Catalog entries.
 *     30-day journey to understand religion.
 */

import type { CatalogEntry, CatalogCard } from '@/types/catalog';

// Import Catalog entries
import teaser from './teaser.json';
import day1Manifesto from './day-1-manifesto.json';
import day2HardwareSoftware from './day-2-hardware-software.json';
import day3DoesAllahNeedPrayer from './day-3-does-allah-need-prayer.json';
import day4FivePillarsEcosystem from './day-4-five-pillars-ecosystem.json';
import day5ShahadaLiberation from './day-5-shahada-liberation.json';
import day6ProphetRoleModel from './day-6-prophet-role-model.json';
import day7QadarAnxietyAntidote from './day-7-qadar-anxiety-antidote.json';
import day8WuduDecompression from './day-8-wudu-decompression.json';
import day9PrayerAirplaneMode from './day-9-prayer-airplane-mode.json';
import day10PrayerTiming from './day-10-prayer-timing.json';
import day11BodyLanguageSujood from './day-11-body-language-sujood.json';
import day12FatihaDailyCovenant from './day-12-fatiha-daily-covenant.json';
import day13KhushooMindfulness from './day-13-khushoo-mindfulness.json';
import day14DuaaTalkTherapy from './day-14-duaa-talk-therapy.json';
import day15FastingWillpower from './day-15-fasting-willpower.json';
import day16AutophagyMaintenance from './day-16-autophagy-maintenance.json';
import day17SoulDetoxDopamine from './day-17-soul-detox-dopamine.json';
import day18ZakatDetachment from './day-18-zakat-detachment.json';
import day19GivingPsychology from './day-19-giving-psychology.json';
import day20SupportNetwork from './day-20-support-network.json';
import day21LaylatAlQadr from './day-21-laylat-al-qadr.json';
import day22HajjComfortZone from './day-22-hajj-comfort-zone.json';
import day23ProhibitionsFirewall from './day-23-prohibitions-firewall.json';
import day24ReadCriticalThinking from './day-24-read-critical-thinking.json';
import day25EthicsDailyInteractions from './day-25-ethics-daily-interactions.json';
import day26EarthStewardship from './day-26-earth-stewardship.json';
import day27TrialsTribulations from './day-27-trials-tribulations.json';

/** All Catalog entries */
export const catalogEntries: CatalogEntry[] = [
  teaser as CatalogEntry,
  day1Manifesto as CatalogEntry,
  day2HardwareSoftware as CatalogEntry,
  day3DoesAllahNeedPrayer as CatalogEntry,
  day4FivePillarsEcosystem as CatalogEntry,
  day5ShahadaLiberation as CatalogEntry,
  day6ProphetRoleModel as CatalogEntry,
  day7QadarAnxietyAntidote as CatalogEntry,
  day8WuduDecompression as CatalogEntry,
  day9PrayerAirplaneMode as CatalogEntry,
  day10PrayerTiming as CatalogEntry,
  day11BodyLanguageSujood as CatalogEntry,
  day12FatihaDailyCovenant as CatalogEntry,
  day13KhushooMindfulness as CatalogEntry,
  day14DuaaTalkTherapy as CatalogEntry,
  day15FastingWillpower as CatalogEntry,
  day16AutophagyMaintenance as CatalogEntry,
  day17SoulDetoxDopamine as CatalogEntry,
  day18ZakatDetachment as CatalogEntry,
  day19GivingPsychology as CatalogEntry,
  day20SupportNetwork as CatalogEntry,
  day21LaylatAlQadr as CatalogEntry,
  day22HajjComfortZone as CatalogEntry,
  day23ProhibitionsFirewall as CatalogEntry,
  day24ReadCriticalThinking as CatalogEntry,
  day25EthicsDailyInteractions as CatalogEntry,
  day26EarthStewardship as CatalogEntry,
  day27TrialsTribulations as CatalogEntry,
];

/** Get all Catalog entries as cards (for grid display) */
export const getCatalogCards = (): CatalogCard[] => {
  return catalogEntries.map(({ id, slug, day, title, subtitle, metadata, hook }) => ({
    id,
    slug,
    day,
    title,
    subtitle,
    metadata,
    hook,
  }));
};

/** Get a single Catalog entry by slug */
export const getCatalogBySlug = (slug: string): CatalogEntry | undefined => {
  return catalogEntries.find((entry) => entry.slug === slug);
};

/** Get a single Catalog entry by day number */
export const getCatalogByDay = (day: number): CatalogEntry | undefined => {
  return catalogEntries.find((entry) => entry.day === day);
};

/** Get all Catalog entry slugs (for routing) */
export const getAllCatalogSlugs = (): string[] => {
  return catalogEntries.map((entry) => entry.slug);
};

/** Get catalog entries by type */
export const getCatalogByType = (type: string): CatalogEntry[] => {
  return catalogEntries.filter((entry) => entry.metadata.type === type);
};

export default catalogEntries;
