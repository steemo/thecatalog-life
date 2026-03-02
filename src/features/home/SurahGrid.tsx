/**
 * Surah Grid Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import type { SurahCard } from '@/types/surah';
import SurahCardComponent from './SurahCard';

interface SurahGridProps {
  surahs: SurahCard[];
}

export default function SurahGrid({ surahs }: SurahGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {surahs.map((surah) => (
        <SurahCardComponent key={surah.id} surah={surah} />
      ))}
    </div>
  );
}
