/**
 * Surah Themes Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Theme, ThemeCategory } from '@/types/surah';
import { useText } from '@/lib/store';

interface SurahThemesProps {
  themes: Theme[] | ThemeCategory[] | any[];
}

export default function SurahThemes({ themes }: SurahThemesProps) {
  const title = useText({
    arabic: 'المحاور الرئيسية',
    english: 'Key Themes',
  });

  return (
    <section>
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 font-arabic">
        {title}
      </h2>

      <div className="space-y-12">
        {themes.map((item: any, categoryIndex) => {
          // Check if this is a category container or a direct theme
          if (item.category && item.themes) {
            // This is a category with nested themes
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

                {/* Themes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {item.themes.map((theme: any, index: number) => {
                    const themeTitle = useText(theme.title);
                    const description = useText(theme.description);
                    const IconComponent = (Icons as any)[theme.icon] || Icons.BookOpen;

                    return (
                      <motion.div
                        key={theme.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="card p-6 hover:shadow-lg transition-shadow"
                      >
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white mb-4">
                          <IconComponent className="w-6 h-6" />
                        </div>

                        {/* Floor Badge (if exists) */}
                        {theme.floor && (
                          <div className="inline-block px-2 py-1 mb-3 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                            Floor {theme.floor}
                          </div>
                        )}

                        {/* Title */}
                        <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 font-arabic">
                          {themeTitle}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                          {description}
                        </p>

                        {/* Verse (if exists) */}
                        {theme.verse && (
                          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <p className="text-xs text-neutral-500 dark:text-neutral-500 italic">
                              {useText(theme.verse)}
                            </p>
                          </div>
                        )}

                        {/* Practical (if exists) */}
                        {theme.practical && (
                          <div className="mt-3 p-3 rounded-lg bg-secondary-50 dark:bg-secondary-900/30">
                            <p className="text-xs text-secondary-700 dark:text-secondary-300">
                              💡 {useText(theme.practical)}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            // This is a direct theme (legacy format)
            const themeTitle = useText(item.title);
            const description = useText(item.description);
            const IconComponent = (Icons as any)[item.icon] || Icons.BookOpen;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white mb-4">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 font-arabic">
                  {themeTitle}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {description}
                </p>
              </motion.div>
            );
          }
        })}
      </div>
    </section>
  );
}
