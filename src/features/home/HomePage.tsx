/**
 * Home Page Component - Landing Page
 * Created by: Tiko Abousteit
 * Date: 28 February 2026
 *
 * Description:
 *     Landing page introducing both Quranic Fabric and The Catalog.
 *     Gateway to understanding the dual approach to spiritual growth.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Compass, Heart, Lightbulb, ArrowRight, Layers, Map } from 'lucide-react';
import { useText } from '@/lib/store';
import Head from '../shared/Head';

export default function HomePage() {
  const heroTitle = useText({
    arabic: 'نظام التشغيل الروحي الكامل',
    english: 'Your Complete Spiritual Operating System',
  });

  const heroSubtitle = useText({
    arabic: 'رحلتان متكاملتان لفهم دينك وشفاء نفسك',
    english: 'Two complementary journeys to understand your religion and heal your soul',
  });

  const fabricTitle = useText({
    arabic: 'النسيج القرآني',
    english: 'Quranic Fabric',
  });

  const fabricTagline = useText({
    arabic: 'الشفاء النفسي من خلال السور',
    english: 'Psychological Healing Through Surahs',
  });

  const fabricDesc = useText({
    arabic: 'كل سورة تعالج قضية نفسية محددة. غوص عميق في مشاكل الحياة مع حلول روحية مستهدفة.',
    english: 'Each Surah addresses a specific psychological issue. Deep dive into life problems with targeted spiritual solutions.',
  });

  const catalogTitle = useText({
    arabic: 'الكتالوج',
    english: 'The Catalog',
  });

  const catalogTagline = useText({
    arabic: 'رحلة 30 يوم لفهم دينك',
    english: '30-Day Journey to Understand Your Religion',
  });

  const catalogDesc = useText({
    arabic: 'الدين كدليل استخدام للإنسان. فهم عملي وعصري للممارسات الإسلامية بلغة جيلك.',
    english: 'Religion as user manual for humans. Practical, modern understanding of Islamic practices in your generation\'s language.',
  });

  const whyBothTitle = useText({
    arabic: 'لماذا الاثنان معاً؟',
    english: 'Why Both Together?',
  });

  const exploreBtn = useText({
    arabic: 'استكشف السور',
    english: 'Explore Surahs',
  });

  const startJourneyBtn = useText({
    arabic: 'ابدأ الرحلة',
    english: 'Start Journey',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Head
        config={{
          title: 'The Catalog - Your Life\'s User Manual',
          description:
            'Two complementary journeys: Quranic Fabric for psychological healing through Surahs, and The Catalog for understanding your religion in 30 days.',
          keywords: [
            'The Catalog',
            'Islam',
            'spiritual growth',
            'psychological healing',
            'religion',
            'understanding Islam',
            'operating system',
            'user manual',
            'Arabic',
            'English',
          ],
          type: 'website',
        }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='60' cy='0' r='2'/%3E%3Ccircle cx='0' cy='60' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mb-8">
              <Compass className="w-10 h-10" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-arabic">
              {heroTitle}
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/surahs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-bold hover:bg-white/90 transition-colors shadow-lg"
              >
                <Heart className="w-5 h-5" />
                {exploreBtn}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-colors border-2 border-white/30"
              >
                <BookOpen className="w-5 h-5" />
                {startJourneyBtn}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Two Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Quranic Fabric Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/surahs"
              className="block group h-full"
            >
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border-2 border-transparent group-hover:border-primary-500 dark:group-hover:border-primary-400">
                {/* Card Header */}
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-8 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Heart className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold font-arabic">{fabricTitle}</h2>
                      <p className="text-white/80 text-sm mt-1">{fabricTagline}</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                    {fabricDesc}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Layers className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        {useText({
                          arabic: 'عمق عمودي - كل سورة تعالج مشكلة محددة',
                          english: 'Vertical Depth - Each Surah addresses a specific problem',
                        })}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lightbulb className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        {useText({
                          arabic: 'حلول روحية مستهدفة للقلق، الإحباط، الخوف، والمزيد',
                          english: 'Targeted spiritual solutions for anxiety, frustration, fear, and more',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:gap-2 transition-all">
                    <span>{exploreBtn}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* The Catalog Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/catalog"
              className="block group h-full"
            >
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border-2 border-transparent group-hover:border-accent-500 dark:group-hover:border-accent-400">
                {/* Card Header */}
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-8 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold font-arabic">{catalogTitle}</h2>
                      <p className="text-white/80 text-sm mt-1">{catalogTagline}</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                    {catalogDesc}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Map className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        {useText({
                          arabic: 'اتساع أفقي - أساس شامل للدين',
                          english: 'Horizontal Breadth - Comprehensive foundation of religion',
                        })}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lightbulb className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        {useText({
                          arabic: 'أمثلة تقنية عصرية - الصلاة كمحطة شحن، غض البصر كحماية RAM',
                          english: 'Modern tech analogies - Prayer as charging station, lowering gaze as RAM protection',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-accent-600 dark:text-accent-400 font-bold group-hover:gap-2 transition-all">
                    <span>{startJourneyBtn}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Why Both Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 font-arabic">
              {whyBothTitle}
            </h2>
            <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                {useText({
                  arabic: '🎯 النسيج القرآني = عمق عمودي (حلول مستهدفة لمشاكل محددة)',
                  english: '🎯 Quranic Fabric = Vertical Depth (targeted solutions for specific problems)',
                })}
              </p>
              <p>
                {useText({
                  arabic: '📚 الكتالوج = اتساع أفقي (أساس شامل للدين)',
                  english: '📚 The Catalog = Horizontal Breadth (comprehensive foundation of religion)',
                })}
              </p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400 pt-4">
                {useText({
                  arabic: 'معاً = نظام التشغيل الروحي الكامل',
                  english: 'Together = Complete Spiritual Operating System',
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
