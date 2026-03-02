/**
 * Surah Sections Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { motion } from 'framer-motion';
import type { Section } from '@/types/surah';
import { useText } from '@/lib/store';

interface SurahSectionsProps {
  sections: Section[];
}

export default function SurahSections({ sections }: SurahSectionsProps) {
  const title = useText({
    arabic: 'الأقسام الرئيسية',
    english: 'Major Sections',
  });

  return (
    <section>
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 font-arabic">
        {title}
      </h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-0 bottom-0 ltr:left-4 rtl:right-4 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500" />

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const sectionTitle = useText(section.title);
            const description = useText(section.description);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative ltr:pl-12 rtl:pr-12"
              >
                {/* Timeline Dot */}
                <div className="absolute top-2 ltr:left-0 rtl:right-0 w-8 h-8 rounded-full bg-primary-500 border-4 border-white dark:border-neutral-900 flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>

                {/* Content Card */}
                <div className="card p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-arabic">
                      {sectionTitle}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium whitespace-nowrap">
                      {section.verses}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
