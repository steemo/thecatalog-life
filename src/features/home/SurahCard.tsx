/**
 * Surah Card Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { Link } from 'react-router-dom';
import { BookOpen, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SurahCard } from '@/types/surah';
import { useText } from '@/lib/store';

interface SurahCardProps {
  surah: SurahCard;
}

export default function SurahCardComponent({ surah }: SurahCardProps) {
  const surahName = useText(surah.name);
  
  // Check if goal has nested structure (academic, psychological, summary) or simple BilingualText
  const goalText = (surah.goal as any).summary 
    ? useText((surah.goal as any).summary)  // New nested format - use summary
    : useText(surah.goal as any);           // Legacy format - use directly
  
  const typeLabel = useText({
    arabic: surah.metadata.type === 'meccan' ? 'مكية' : 'مدنية',
    english: surah.metadata.type === 'meccan' ? 'Meccan' : 'Medinan',
  });

  const versesLabel = useText({
    arabic: 'آية',
    english: 'verses',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/surah/${surah.slug}`}
        className="card p-6 block group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1 font-arabic group-hover:text-primary-500 transition-colors">
              {surahName}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {surah.name.transliteration}
            </p>
          </div>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold">
            {surah.id}
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`badge ${
              surah.metadata.type === 'meccan' ? 'badge-meccan' : 'badge-medinan'
            }`}
          >
            {typeLabel}
          </span>
          <span className="badge bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {surah.metadata.verses} {versesLabel}
          </span>
        </div>

        {/* Goal */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
          {goalText}
        </p>

        {/* Read More */}
        <div className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:gap-3 transition-all">
          <BookOpen className="w-4 h-4" />
          <span>
            {useText({
              arabic: 'اقرأ المزيد',
              english: 'Read more',
            })}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
