/**
 * Surah Gems Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Gem } from '@/types/surah';
import { useText } from '@/lib/store';

interface SurahGemsProps {
  gems: Gem[];
}

export default function SurahGems({ gems }: SurahGemsProps) {
  const title = useText({
    arabic: 'لطائف السورة',
    english: 'Gems & Insights',
  });

  return (
    <section>
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 font-arabic">
        {title}
      </h2>

      <div className="space-y-12">
        {gems.map((item: any, categoryIndex) => {
          // Check if this is a category container or a direct gem
          if (item.category && item.gems) {
            // This is a category with nested gems
            const categoryDesc = item.description ? useText(item.description) : null;
            
            return (
              <div key={`category-${categoryIndex}`}>
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 font-arabic">
                    {item.category}
                  </h3>
                  {categoryDesc && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {categoryDesc}
                    </p>
                  )}
                </div>

                {/* Gems Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {item.gems.map((gem: any, index: number) => {
                    const gemTitle = useText(gem.title);
                    const content = useText(gem.content);

                    return (
                      <motion.div
                        key={gem.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="card p-6 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white">
                            <Sparkles className="w-5 h-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 font-arabic">
                              {gemTitle}
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                              {content}
                            </p>

                            {/* When/Purpose (if exists) */}
                            {gem.when && (
                              <div className="mt-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30">
                                <p className="text-xs font-semibold text-primary-700 dark:text-primary-300 mb-1">
                                  When to use:
                                </p>
                                <p className="text-xs text-primary-600 dark:text-primary-400">
                                  {useText(gem.when)}
                                </p>
                              </div>
                            )}
                            {gem.purpose && (
                              <div className="mt-3 p-3 rounded-lg bg-secondary-50 dark:bg-secondary-900/30">
                                <p className="text-xs font-semibold text-secondary-700 dark:text-secondary-300 mb-1">
                                  Purpose:
                                </p>
                                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                                  {useText(gem.purpose)}
                                </p>
                              </div>
                            )}

                            {/* Verse (if exists) */}
                            {gem.verse && (
                              <div className="mt-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-900/30 border-l-4 border-accent-500">
                                <p className="text-xs text-accent-700 dark:text-accent-300 italic">
                                  {useText(gem.verse)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            // This is a direct gem (legacy format)
            const gemTitle = useText(item.title);
            const content = useText(item.content);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                className="card p-6 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 font-arabic">
                      {gemTitle}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          }
        })}
      </div>
    </section>
  );
}
