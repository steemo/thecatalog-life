/**
 * Surahs Page Component
 * Created by: Tiko Abousteit
 * Date: 28 February 2026
 *
 * Description:
 *     Browse and search all Quranic Surahs with filtering.
 */

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useText } from '@/lib/store';
import { getSurahCards } from '@/data';
import Head from '@/features/shared/Head';
import SurahGrid from '@/features/home/SurahGrid';

export default function SurahsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'meccan' | 'medinan'>('all');

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const surahs = getSurahCards();

  // Helper function to normalize strings for comparison (remove hyphens, spaces)
  const normalizeString = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[-\s]/g, ''); // Remove hyphens and spaces only
  };

  // Filter logic - detect language and search appropriately
  const filteredSurahs = surahs.filter((surah) => {
    if (searchQuery === '') {
      // No search query - just apply type filter
      return filterType === 'all' || surah.metadata.type === filterType;
    }

    const normalizedQuery = normalizeString(searchQuery);
    
    // Check if input contains Arabic characters
    const hasArabic = /[\u0600-\u06FF]/.test(searchQuery);
    // Check if input contains English/Latin characters
    const hasEnglish = /[a-zA-Z0-9]/.test(searchQuery);
    
    let matchesSearch = false;
    
    if (hasArabic && !hasEnglish) {
      // Pure Arabic input - search only in Arabic name
      const normalizedArabic = normalizeString(surah.name.arabic);
      matchesSearch = normalizedArabic.includes(normalizedQuery);
    } else if (hasEnglish && !hasArabic) {
      // Pure English input - search only in English name and transliteration
      const normalizedEnglish = normalizeString(surah.name.english);
      const normalizedTransliteration = normalizeString(surah.name.transliteration);
      matchesSearch =
        normalizedEnglish.includes(normalizedQuery) ||
        normalizedTransliteration.includes(normalizedQuery) ||
        surah.id.toString().includes(searchQuery);
    } else {
      // Mixed input - search in both (shouldn't happen in practice)
      const normalizedArabic = normalizeString(surah.name.arabic);
      const normalizedEnglish = normalizeString(surah.name.english);
      const normalizedTransliteration = normalizeString(surah.name.transliteration);
      matchesSearch =
        normalizedArabic.includes(normalizedQuery) ||
        normalizedEnglish.includes(normalizedQuery) ||
        normalizedTransliteration.includes(normalizedQuery) ||
        surah.id.toString().includes(searchQuery);
    }

    const matchesType = filterType === 'all' || surah.metadata.type === filterType;

    return matchesSearch && matchesType;
  });

  const title = useText({
    arabic: 'استكشف السور',
    english: 'Explore Surahs',
  });

  const subtitle = useText({
    arabic: 'رحلة تفاعلية في النسيج القرآني',
    english: 'An interactive journey through the Quranic fabric',
  });

  const searchPlaceholder = useText({
    arabic: 'ابحث عن سورة...',
    english: 'Search for a Surah...',
  });

  const filterAll = useText({
    arabic: 'الكل',
    english: 'All',
  });

  const filterMeccan = useText({
    arabic: 'مكية',
    english: 'Meccan',
  });

  const filterMedianan = useText({
    arabic: 'مدنية',
    english: 'Medinan',
  });

  const noResultsText = useText({
    arabic: 'لم يتم العثور على نتائج',
    english: 'No results found',
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Head
        config={{
          title: 'Quranic Fabric - Explore Surahs',
          description:
            'Discover the Quran through interactive visualisations, themes, lessons, and insights. Explore Surahs with bilingual support and beautiful design.',
          keywords: [
            'Quran',
            'Surahs',
            'Islamic',
            'Quranic study',
            'interactive',
            'Arabic',
            'English',
          ],
          type: 'website',
        }}
      />
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white mb-4 font-arabic">
          {title}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Search & Filter */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6 animate-slide-up">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute top-1/2 -translate-y-1/2 ltr:left-4 rtl:right-4 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full ltr:pl-12 rtl:pr-12 ltr:pr-4 rtl:pl-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setFilterType('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {filterAll}
          </button>
          <button
            onClick={() => setFilterType('meccan')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'meccan'
                ? 'bg-accent-500 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {filterMeccan}
          </button>
          <button
            onClick={() => setFilterType('medinan')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'medinan'
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {filterMedianan}
          </button>
        </div>
      </div>

      {/* Surah Grid */}
      <SurahGrid surahs={filteredSurahs} />

      {/* No Results */}
      {filteredSurahs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500 dark:text-neutral-400">
            {noResultsText}
          </p>
        </div>
      )}
    </div>
  );
}
