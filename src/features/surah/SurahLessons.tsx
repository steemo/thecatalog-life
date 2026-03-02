/**
 * Surah Lessons Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import type { Lesson } from '@/types/surah';
import { useText } from '@/lib/store';

interface SurahLessonsProps {
  lessons: Lesson[];
}

export default function SurahLessons({ lessons }: SurahLessonsProps) {
  const title = useText({
    arabic: 'الدروس المستفادة',
    english: 'Key Lessons',
  });

  return (
    <section>
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 font-arabic">
        {title}
      </h2>

      <div className="space-y-12">
        {lessons.map((item: any, categoryIndex) => {
          // Check if this is a category container or a direct lesson
          if (item.category && item.lessons) {
            // This is a category with nested lessons
            // Always call useText unconditionally, even if description doesn't exist
            const categoryDesc = useText(item.description || { arabic: '', english: '' });
            
            return (
              <div key={`category-${categoryIndex}`}>
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 font-arabic">
                    {item.category}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {categoryDesc}
                    </p>
                  )}
                </div>

                {/* Lessons List */}
                <div className="space-y-6">
                  {item.lessons.map((lesson: any, index: number) => {
                    const lessonTitle = useText(lesson.title);
                    const content = useText(lesson.content);
                    // Call all hooks unconditionally at the top
                    const storyText = useText(lesson.story || { arabic: '', english: '' });
                    const verseText = useText(lesson.verse || { arabic: '', english: '' });
                    const applicationText = useText(lesson.application || { arabic: '', english: '' });
                    const lessonText = useText(lesson.lesson || { arabic: '', english: '' });
                    const warningText = useText(lesson.warning || { arabic: '', english: '' });
                    const principleText = useText(lesson.principle || { arabic: '', english: '' });

                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="card p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center text-secondary-700 dark:text-secondary-300">
                            <Lightbulb className="w-5 h-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            {/* Story Badge (if exists) */}
                            {lesson.story && (
                              <div className="inline-block px-2 py-1 mb-2 text-xs font-semibold rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
                                {typeof lesson.story === 'string' ? `Story: ${lesson.story}` : storyText}
                              </div>
                            )}

                            <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 font-arabic">
                              {lessonTitle}
                            </h4>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                              {content}
                            </p>

                            {/* Verse (if exists) */}
                            {lesson.verse && (
                              <div className="mt-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 border-l-4 border-primary-500">
                                <p className="text-sm text-primary-700 dark:text-primary-300 italic">
                                  {verseText}
                                </p>
                              </div>
                            )}

                            {/* Application (if exists) */}
                            {lesson.application && (
                              <div className="mt-3 p-3 rounded-lg bg-secondary-50 dark:bg-secondary-900/30">
                                <p className="text-sm text-secondary-700 dark:text-secondary-300">
                                  📌 {applicationText}
                                </p>
                              </div>
                            )}

                            {/* Lesson/Warning/Principle (if exists) */}
                            {lesson.lesson && (
                              <div className="mt-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-900/30">
                                <p className="text-sm text-accent-700 dark:text-accent-300 font-semibold">
                                  ✨ {lessonText}
                                </p>
                              </div>
                            )}
                            {lesson.warning && (
                              <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/30">
                                <p className="text-sm text-red-700 dark:text-red-300 font-semibold">
                                  ⚠️ {warningText}
                                </p>
                              </div>
                            )}
                            {lesson.principle && (
                              <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
                                <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                                  💎 {principleText}
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
            // This is a direct lesson (legacy format)
            const lessonTitle = useText(item.title);
            const content = useText(item.content);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center text-secondary-700 dark:text-secondary-300">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 font-arabic">
                      {lessonTitle}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
