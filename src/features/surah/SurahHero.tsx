/**
 * Surah Hero Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { ArrowLeft, ArrowRight, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Surah } from '@/types/surah';
import { useText, useDirection } from '@/lib/store';

interface SurahHeroProps {
  surah: Surah;
}

export default function SurahHero({ surah }: SurahHeroProps) {
  const direction = useDirection();
  const surahName = useText(surah.name);
  const goal = useText(surah.goal);
  
  const typeLabel = useText({
    arabic: surah.metadata.type === 'meccan' ? 'مكية' : 'مدنية',
    english: surah.metadata.type === 'meccan' ? 'Meccan' : 'Medinan',
  });

  const versesLabel = useText({
    arabic: 'آية',
    english: 'verses',
  });

  const wordsLabel = useText({
    arabic: 'كلمة',
    english: 'words',
  });

  const juzLabel = useText({
    arabic: 'الجزء',
    english: 'Juz',
  });

  const BackIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
      {/* Background Pattern - Islamic Geometric Stars */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='60' cy='0' r='2'/%3E%3Ccircle cx='0' cy='60' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <BackIcon className="w-5 h-5" />
          <span>
            {useText({
              arabic: 'العودة إلى الرئيسية',
              english: 'Back to home',
            })}
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          {/* Surah Number */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
            <span className="text-2xl font-bold">{surah.id}</span>
          </div>

          {/* Surah Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-arabic">
            {surahName}
          </h1>
          <p className="text-xl text-white/80 mb-8">
            {surah.name.transliteration}
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
              {typeLabel}
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {surah.metadata.verses} {versesLabel}
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {surah.metadata.words} {wordsLabel}
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
              {juzLabel} {surah.metadata.juz}
            </span>
          </div>

          {/* Goal */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-lg font-semibold mb-4">
              {useText({
                arabic: 'هدف السورة',
                english: 'Surah Objective',
              })}
            </h2>
            
            {/* Check if goal is the new nested structure or legacy BilingualText */}
            {(surah.goal as any).academic ? (
              <div className="space-y-4">
                {/* Academic Perspective */}
                <div>
                  <h3 className="text-sm font-semibold text-white/70 mb-2">
                    {useText({
                      arabic: 'المنظور الأكاديمي',
                      english: 'Academic Perspective',
                    })}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {useText((surah.goal as any).academic)}
                  </p>
                </div>

                {/* Psychological Perspective */}
                <div>
                  <h3 className="text-sm font-semibold text-white/70 mb-2">
                    {useText({
                      arabic: 'المنظور النفسي',
                      english: 'Psychological Perspective',
                    })}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {useText((surah.goal as any).psychological)}
                  </p>
                </div>

                {/* Summary */}
                <div className="pt-3 border-t border-white/20">
                  <p className="text-white/95 leading-relaxed font-medium">
                    {useText((surah.goal as any).summary)}
                  </p>
                </div>
              </div>
            ) : (
              // Legacy format - simple BilingualText
              <p className="text-white/90 leading-relaxed text-lg">
                {useText(surah.goal as any)}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
