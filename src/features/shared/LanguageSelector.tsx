/**
 * Language Selector Component
 * Created by: Tiko Abousteit
 * Date: 7 March 2026
 *
 * Description:
 *     Scalable language selector dropdown component.
 *     Displays current language prominently and allows users to switch between available languages.
 *     Supports multiple languages with flags and native names for better discoverability.
 */

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { AVAILABLE_LANGUAGES, getLanguageConfig } from '@/config/languages';
import type { LanguageCode } from '@/config/languages';

export default function LanguageSelector() {
  const { language, setLanguage } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = getLanguageConfig(language as LanguageCode);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors font-medium text-sm text-neutral-900 dark:text-white"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <span className="sm:hidden">{language.toUpperCase()}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 overflow-hidden"
          role="listbox"
        >
          <div className="py-1">
            {AVAILABLE_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                disabled={!lang.available}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                  !lang.available
                    ? 'opacity-50 cursor-not-allowed'
                    : language === lang.code
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                }`}
                role="option"
                aria-selected={language === lang.code}
                aria-disabled={!lang.available}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-medium flex items-center gap-2">
                    {lang.nativeName}
                    {!lang.available && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <div className="text-xs opacity-75">{lang.name}</div>
                </div>
                {language === lang.code && lang.available && (
                  <span className="text-primary-600 dark:text-primary-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
