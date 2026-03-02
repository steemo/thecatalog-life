/**
 * Catalog Page
 * Created by: Tiko Abousteit
 * Date: 1 March 2026
 *
 * Description:
 *     30-day journey displayed as an engaging timeline.
 *     Creative layout with animations and visual hierarchy.
 */

import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getCatalogCards } from '@/data/catalog';
import { useText } from '@/lib/store';
import type { CatalogCard } from '@/types/catalog';

// Separate component to handle hooks properly
function CatalogEntryCard({ entry, index }: { entry: CatalogCard; index: number }) {
  const isTeaser = entry.day === 0;
  const isEven = index % 2 === 0;

  // Call all hooks unconditionally at the top level
  const titleText = useText(entry.title);
  const subtitleText = useText(entry.subtitle || { arabic: '', english: '' });
  const hookText = useText(entry.hook);
  
  // Pre-render all possible tag texts (max 8 tags across all entries)
  // Always call 8 hooks to ensure consistent hook count
  const tags = entry.metadata.tags;
  const tag0Text = useText(tags[0] || { arabic: '', english: '' });
  const tag1Text = useText(tags[1] || { arabic: '', english: '' });
  const tag2Text = useText(tags[2] || { arabic: '', english: '' });
  // Call remaining hooks but don't use them (to maintain consistent hook count)
  useText(tags[3] || { arabic: '', english: '' });
  useText(tags[4] || { arabic: '', english: '' });
  useText(tags[5] || { arabic: '', english: '' });
  useText(tags[6] || { arabic: '', english: '' });
  useText(tags[7] || { arabic: '', english: '' });
  
  // Only use the first 3 for display
  const displayTags = [tag0Text, tag1Text, tag2Text].slice(0, Math.min(3, tags.length));

  const dayLabel = useText({ arabic: 'اليوم', english: 'Day' });
  const teaserLabel = useText({ arabic: 'تشويق', english: 'Teaser' });
  const minLabel = useText({ arabic: 'دقيقة', english: 'min' });
  const startLabel = useText({ arabic: 'ابدأ الرحلة', english: 'Start Journey' });

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative"
    >
      <Link to={`/catalog/${entry.slug}`} className="block group">
        <div className="flex items-start gap-6 md:gap-8">
          {/* Day Number Circle */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex-shrink-0 relative z-10"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg transition-all duration-300 ${
              isTeaser
                ? 'bg-gradient-to-br from-accent-500 to-accent-600 group-hover:shadow-accent-500/50'
                : 'bg-gradient-to-br from-primary-500 to-primary-600 group-hover:shadow-primary-500/50'
            }`}>
              {isTeaser ? (
                <Sparkles className="w-7 h-7" />
              ) : (
                <span className="text-2xl">{entry.day}</span>
              )}
            </div>
          </motion.div>

          {/* Card Content */}
          <motion.div
            whileHover={{ y: -4 }}
            className="flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent group-hover:border-primary-500 dark:group-hover:border-primary-400"
          >
            {/* Card Header with Gradient */}
            <div className={`p-6 ${
              isTeaser
                ? 'bg-gradient-to-br from-accent-500 to-accent-600'
                : 'bg-gradient-to-br from-primary-500 to-primary-600'
            } text-white`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isTeaser ? teaserLabel : `${dayLabel} ${entry.day}`}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>{entry.metadata.readTime} {minLabel}</span>
                </div>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 font-arabic group-hover:scale-105 transition-transform">
                {titleText}
              </h3>
              
              {entry.subtitle && (
                <p className="text-white/90 text-base">
                  {subtitleText}
                </p>
              )}
            </div>

            {/* Card Body */}
            <div className="p-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                {hookText}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {displayTags.map((tagText, idx) => (
                  <span
                    key={`${entry.id}-tag-${idx}`}
                    className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium"
                  >
                    {tagText}
                  </span>
                ))}
              </div>

              {/* Read More Button */}
              <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold group-hover:gap-3 transition-all">
                <span>{startLabel}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CatalogPage() {
  const catalogCards = getCatalogCards();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageTitle = useText({
    arabic: 'الكتالوج للحياة',
    english: 'The Catalog for Life',
  });

  const pageSubtitle = useText({
    arabic: 'رحلة 30 يوم لفهم دينك',
    english: '30-Day Journey to Understand Your Religion',
  });

  const introText = useText({
    arabic: 'تخيل لو اشتريت أحدث طيارة في العالم، بس قررت تسوقها زي العجلة... المشكلة مش في الطيارة، المشكلة إنك رميت الكتالوج. ولله المثل الأعلى.. الإنسان هو أعقد ماكينة في الكون، والدين هو الكتالوج.',
    english: 'Imagine you bought the most advanced airplane in the world, but decided to drive it like a bicycle... The problem is not with the airplane, the problem is you threw away the catalog. And to Allah belongs the highest example... The human is the most complex machine in the universe, and religion is the catalog.',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='60' cy='0' r='2'/%3E%3Ccircle cx='0' cy='60' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mb-8"
            >
              <BookOpen className="w-10 h-10" />
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-arabic">
              {pageTitle}
            </h1>
            
            <p className="text-2xl text-white/90 mb-8">
              {pageSubtitle}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-3xl mx-auto"
            >
              <p className="text-white/90 leading-relaxed text-lg">
                {introText}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Line (Timeline) */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200 dark:from-primary-800 dark:via-primary-700 dark:to-primary-800 hidden md:block" />

            {/* Timeline Entries */}
            <div className="space-y-8">
              {catalogCards.map((entry, index) => (
                <CatalogEntryCard key={entry.id} entry={entry} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
