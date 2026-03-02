/**
 * Surah Detail Page Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { useParams, Navigate } from 'react-router-dom';
import { getSurahBySlug } from '@/data';
import Head from '../shared/Head';
import SurahHero from './SurahHero';
import SurahSections from './SurahSections';
import SurahThemes from './SurahThemes';
import SurahLessons from './SurahLessons';
import SurahGems from './SurahGems';

export default function SurahPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const surah = getSurahBySlug(slug);

  if (!surah) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen">
      <Head
        config={{
          title: `${surah.name.english} (${surah.name.transliteration}) - Quranic App`,
          description: `Explore ${surah.name.english} with interactive visualisations, themes, lessons, and insights. ${surah.metadata.verses} verses, ${surah.metadata.type} Surah.`,
          keywords: [
            surah.name.english,
            surah.name.transliteration,
            'Quran',
            'Surah',
            surah.metadata.type,
            'Islamic',
          ],
          type: 'article',
          image: `https://quranic-app.com/og-${surah.slug}.png`,
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: surah.name.english, url: `/surah/${surah.slug}` },
        ]}
        isArticle
      />
      {/* Hero Section */}
      <SurahHero surah={surah} />

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Sections Timeline */}
        <SurahSections sections={surah.sections} />

        {/* Themes */}
        <SurahThemes themes={surah.themes} />

        {/* Lessons */}
        <SurahLessons lessons={surah.lessons} />

        {/* Gems */}
        <SurahGems gems={surah.gems} />
      </div>
    </div>
  );
}
