/**
 * Header Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { Link } from 'react-router-dom';
import { Moon, Sun, Languages, BookOpen } from 'lucide-react';
import { useAppStore, useText } from '@/lib/store';

export default function Header() {
  const { theme, language, toggleTheme, toggleLanguage } = useAppStore();
  
  const title = useText({
    arabic: 'الكتالوج',
    english: 'The Catalog',
  });

  const catalogLabel = useText({
    arabic: 'الكتالوج',
    english: 'The Catalog',
  });

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
              📖
            </div>
            <span className="text-xl font-bold text-neutral-900 dark:text-white font-arabic">
              {title}
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium"
            >
              {useText({ arabic: 'الرئيسية', english: 'Home' })}
            </Link>
            <Link
              to="/surahs"
              className="px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium flex items-center gap-2"
            >
              <span>💚</span>
              {useText({ arabic: 'النسيج القرآني', english: 'Quranic Fabric' })}
            </Link>
            <Link
              to="/catalog"
              className="px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              {catalogLabel}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="btn-ghost p-2 rounded-lg"
              aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Languages className="w-5 h-5" />
              <span className="sr-only">
                {language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-ghost p-2 rounded-lg"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
              <span className="sr-only">
                {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
