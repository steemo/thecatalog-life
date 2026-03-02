/**
 * Footer Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { useText } from '@/lib/store';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const copyright = useText({
    arabic: `© ${currentYear} الكتالوج. جميع الحقوق محفوظة.`,
    english: `© ${currentYear} The Catalog. All rights reserved.`,
  });

  const madeWith = useText({
    arabic: 'صُنع بـ',
    english: 'Made with',
  });

  const toAllah = useText({
    arabic: 'لله',
    english: 'to Allah',
  });

  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {copyright}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
            {madeWith}
            <span className="text-red-500">♥</span>
            <span>{toAllah}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
