/**
 * Catalog Entry Page
 * Created by: Tiko Abousteit
 * Date: 28 February 2026
 *
 * Description:
 *     Detailed view of a single catalog entry.
 */

import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { getCatalogBySlug } from '@/data/catalog';
import { useText, useDirection, useAppStore } from '@/lib/store';
import type { CatalogSection, BilingualText } from '@/types/catalog';

// Helper component to render bilingual text
function BilingualContent({ text }: { text: BilingualText }) {
  const language = useAppStore((state) => state.language);
  return <>{language === 'ar' ? text.arabic : text.english}</>;
}

export default function CatalogEntryPage() {
  const { slug } = useParams<{ slug: string }>();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]); // Re-scroll when slug changes
  const direction = useDirection();
  const entry = slug ? getCatalogBySlug(slug) : undefined;

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!entry) {
    return <Navigate to="/catalog" replace />;
  }

  const BackIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  const dayLabel = useText({
    arabic: 'اليوم',
    english: 'Day',
  });

  const teaserLabel = useText({
    arabic: 'تشويق',
    english: 'Teaser',
  });

  const minLabel = useText({
    arabic: 'دقيقة قراءة',
    english: 'min read',
  });

  const keyTakeawaysTitle = useText({
    arabic: 'النقاط الرئيسية',
    english: 'Key Takeaways',
  });

  const analogiesTitle = useText({
    arabic: 'أمثلة وتشبيهات',
    english: 'Analogies & Examples',
  });

  const practicalStepsTitle = useText({
    arabic: 'خطوات عملية',
    english: 'Practical Steps',
  });

  const conclusionTitle = useText({
    arabic: 'الخلاصة',
    english: 'Conclusion',
  });

  const dailyActionTitle = useText({
    arabic: 'خطة العمل اليومية',
    english: 'Daily Action Plan',
  });

  const actionLabel = useText({
    arabic: 'الإجراء:',
    english: 'Action:',
  });

  const benefitLabel = useText({
    arabic: 'الفائدة:',
    english: 'Benefit:',
  });

  const backToCatalog = useText({
    arabic: 'العودة إلى الكتالوج',
    english: 'Back to Catalog',
  });

  const previousLabel = useText({
    arabic: 'السابق',
    english: 'Previous',
  });

  const nextLabel = useText({
    arabic: 'التالي',
    english: 'Next',
  });

  // Pre-render all text that might be conditional - ALWAYS call these hooks
  const titleText = useText(entry.title);
  const subtitleText = useText(entry.subtitle || { arabic: '', english: '' });
  const hookText = useText(entry.hook);
  const mainConceptText = useText(entry.mainConcept);
  const dailyActionText = useText((entry as any).dailyAction || { arabic: '', english: '' });
  const conclusionText = useText((entry as any).conclusion || { arabic: '', english: '' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
        {/* Background Pattern - Islamic Geometric */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='60' cy='0' r='2'/%3E%3Ccircle cx='0' cy='60' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {/* Back Button */}
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <BackIcon className="w-5 h-5" />
            <span>{backToCatalog}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Day Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                {entry.day === 0 ? teaserLabel : `${dayLabel} ${entry.day}`}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-arabic">
              {titleText}
            </h1>

            {entry.subtitle && (
              <p className="text-xl text-white/80 mb-8">
                {subtitleText}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {entry.metadata.readTime} {minLabel}
              </span>
              {entry.metadata.tags.map((tag, idx) => (
                <span
                  key={`tag-${idx}`}
                  className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  {useText(tag)}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hook */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8 border border-slate-200 dark:border-slate-700"
          >
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {hookText}
            </p>
          </motion.div>

          {/* Main Concept */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8 mb-8 border border-primary-200 dark:border-primary-800"
          >
            <p className="text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
              {mainConceptText}
            </p>
          </motion.div>

          {/* Sections */}
          {entry.sections && entry.sections.map((section: CatalogSection, index: number) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8 border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                <BilingualContent text={section.title} />
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  <BilingualContent text={section.content} />
                </p>
              </div>
            </motion.div>
          ))}

          {/* Analogies */}
          {entry.analogies && entry.analogies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                {analogiesTitle}
              </h2>
              <div className="space-y-6">
                {entry.analogies.map((analogy) => (
                  <div
                    key={analogy.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                  >
                    <h3 className="text-xl font-bold mb-3 text-primary-600 dark:text-primary-400">
                      <BilingualContent text={analogy.title} />
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                      <BilingualContent text={analogy.description} />
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border-l-4 border-primary-500">
                      <p className="text-slate-600 dark:text-slate-400 italic">
                        <BilingualContent text={analogy.example} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Key Takeaways */}
          {entry.keyTakeaways && entry.keyTakeaways.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8 border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                {keyTakeawaysTitle}
              </h2>
              <ul className="space-y-4">
                {entry.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold mt-1">
                      {index + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      <BilingualContent text={takeaway} />
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Practical Steps */}
          {entry.practicalSteps && entry.practicalSteps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
                {practicalStepsTitle}
              </h2>
              <div className="space-y-6">
                {entry.practicalSteps.map((step) => (
                  <div
                    key={step.id}
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 border border-green-200 dark:border-green-800"
                  >
                    <h3 className="text-xl font-bold mb-3 text-green-700 dark:text-green-400">
                      <BilingualContent text={step.title} />
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                      <strong>{actionLabel}</strong> <BilingualContent text={step.action} />
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      <strong>{benefitLabel}</strong> <BilingualContent text={step.benefit} />
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Daily Action */}
          {(entry as any).dailyAction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl p-8 shadow-lg mb-8 border-2 border-amber-300 dark:border-amber-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-2xl">
                  📋
                </div>
                <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                  {dailyActionTitle}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-amber-900 dark:text-amber-100 whitespace-pre-line">
                {dailyActionText}
              </p>
            </motion.div>
          )}

          {/* Conclusion */}
          {(entry as any).conclusion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">
                {conclusionTitle}
              </h2>
              <p className="text-lg leading-relaxed">
                {conclusionText}
              </p>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-700"
          >
            {entry.prevEntry ? (
              <Link
                to={`/catalog/${entry.prevEntry}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{previousLabel}</span>
              </Link>
            ) : (
              <div />
            )}

            {entry.nextEntry && (
              <Link
                to={`/catalog/${entry.nextEntry}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white transition-colors"
              >
                <span>{nextLabel}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
