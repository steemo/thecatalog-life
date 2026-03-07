/**
 * Sources & References Page
 * Created by: Tiko Abousteit
 * Date: 5 March 2026
 *
 * Description:
 *     Comprehensive page showcasing all academic sources and references
 *     that form the intellectual foundation of The Catalog.
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useText, useAppStore, useDirection } from '@/lib/store';
import { catalogSources, sourcesByCategory, getCategoryLabel, getCategoryIcon } from '@/data/sources';
import type { Source } from '@/data/sources';
import Head from '@/features/shared/Head';

export default function SourcesPage() {
  const language = useAppStore((state) => state.language);
  const direction = useDirection();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const pageTitle = useText({
    ar: 'المصادر والمراجع',
    en: 'Sources & References',
    ur: 'ذرائع اور حوالہ جات',
    fr: '',
    es: '',
  });

  const pageSubtitle = useText({
    ar: 'الأساس العلمي والأكاديمي للكتالوج',
    en: 'The Academic Foundation of The Catalog',
    ur: 'کیٹلاگ کی علمی اور تعلیمی بنیاد',
    fr: '',
    es: '',
  });

  const introText = useText({
    ar: 'الكتالوج ليس من اختراعنا - إنه مبني على أساس متين من العلماء والباحثين والعلماء. كل يوم، كل فكرة، كل تحدي مدعوم بمصادر موثوقة من أربع مجالات: الدين الإسلامي، علم النفس، الطب، والاجتماع.',
    en: 'The Catalog is not our invention - it\'s built on a solid foundation of scholars, researchers, and scientists. Every day, every idea, every challenge is backed by credible sources from four fields: Islamic theology, psychology, medicine, and sociology.',
    ur: 'کیٹلاگ ہماری ایجاد نہیں ہے - یہ علماء، محققین اور سائنسدانوں کی مضبوط بنیاد پر تعمیر شدہ ہے۔ ہر دن، ہر خیال، ہر چیلنج چار شعبوں سے قابل اعتماد ذرائع سے تائید یافتہ ہے: اسلامی الہیات، نفسیات، طب اور سماجیات۔',
    fr: '',
    es: '',
  });

  const renderSourceCard = (source: Source, index: number) => (
    <motion.div
      key={source.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center text-2xl flex-shrink-0">
          {getCategoryIcon(source.category)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            {language === 'ar' ? source.title.arabic : source.title.english}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'ar' ? source.author.arabic : source.author.english}
            {source.year && ` (${source.year})`}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
        {language === 'ar' ? source.description.arabic : source.description.english}
      </p>

      {/* Key Insight */}
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 mb-4 border-l-4 border-primary-500">
        <p className="text-sm font-semibold text-primary-900 dark:text-primary-100 mb-1">
          {useText({ ar: 'الفكرة الأساسية:', en: 'Key Insight:', ur: 'اہم نکتہ:', fr: '', es: '' })}
        </p>
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          {language === 'ar' ? source.keyInsight.arabic : source.keyInsight.english}
        </p>
      </div>

      {/* Used in Days */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          {useText({ ar: 'مستخدم في:', en: 'Used in:', ur: 'میں استعمال:', fr: '', es: '' })}
        </span>
        {source.usedInDays.map((day) => (
          <span
            key={day}
            className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300"
          >
            {useText({ ar: `اليوم ${day}`, en: `Day ${day}`, ur: `دن ${day}`, fr: '', es: '' })}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Head
        config={{
          title: 'Sources & References - The Catalog',
          description:
            'Academic sources and references from Islamic theology, psychology, medicine, and sociology that form the foundation of The Catalog.',
          keywords: [
            'sources',
            'references',
            'academic',
            'Islamic',
            'psychology',
            'medicine',
            'sociology',
            'The Catalog',
          ],
          type: 'website',
        }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='60' cy='0' r='2'/%3E%3Ccircle cx='0' cy='60' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <BookOpen className="w-8 h-8" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-arabic">{pageTitle}</h1>
            <p className="text-xl text-white/90 mb-6">{pageSubtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-12"
        >
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">{introText}</p>
        </motion.div>
      </div>

      {/* Sources by Category */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {(['islamic', 'psychology', 'medical', 'sociology'] as const).map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              className="mb-16"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center text-2xl">
                  {getCategoryIcon(category)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {getCategoryLabel(category, language === 'ar' ? 'ar' : 'en')}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {sourcesByCategory[category].length}{' '}
                    {useText({ ar: 'مصدر', en: 'source', ur: 'ذریعہ', fr: '', es: '' })}
                    {sourcesByCategory[category].length > 1 &&
                      (language === 'ar' || language === 'ur' ? '' : 's')}
                  </p>
                </div>
              </div>

              {/* Sources Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {sourcesByCategory[category].map((source, index) =>
                  renderSourceCard(source, index)
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: useText({ ar: 'إجمالي المصادر', en: 'Total Sources', ur: 'کل ذرائع', fr: '', es: '' }),
                value: catalogSources.length,
              },
              {
                label: useText({ ar: 'أيام الكتالوج', en: 'Catalog Days', ur: 'کیٹلاگ کے دن', fr: '', es: '' }),
                value: 23,
              },
              {
                label: useText({ ar: 'مجالات البحث', en: 'Research Fields', ur: 'تحقیق کے شعبے', fr: '', es: '' }),
                value: 4,
              },
              {
                label: useText({ ar: 'سنوات البحث', en: 'Years of Research', ur: 'تحقیق کے سال', fr: '', es: '' }),
                value: '80+',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 text-center"
              >
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            {useText({
              ar: 'جاهز لبدء الرحلة؟',
              en: 'Ready to Start Your Journey?',
              ur: 'سفر شروع کرنے کے لیے تیار ہیں؟',
              fr: '',
              es: '',
            })}
          </h3>
          <p className="text-white/90 mb-6">
            {useText({
              ar: 'الآن بعد أن تعرفت على المصادر، ابدأ رحلتك مع الكتالوج',
              en: 'Now that you know the sources, start your journey with The Catalog',
              ur: 'اب جب آپ ذرائع کو جانتے ہیں، کیٹلاگ کے ساتھ اپنا سفر شروع کریں',
              fr: '',
              es: '',
            })}
          </p>
          <a
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-primary-600 font-bold hover:bg-white/90 transition-colors"
          >
            {useText({ ar: 'ابدأ الآن', en: 'Start Now', ur: 'ابھی شروع کریں', fr: '', es: '' })}
            {direction === 'rtl' ? (
              <ArrowLeft className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
