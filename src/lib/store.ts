/**
 * Application State Store
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Zustand store for global application state.
 *     Manages language preference and theme with localStorage persistence.
 *     Supports 5 languages: Arabic, English, Urdu, French (coming soon), Spanish (coming soon).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode } from '../types/surah';
import type { LanguageCode } from '../config/languages';

// Multilingual text type supporting all 5 languages
export type MultilingualText = {
  ar: string;
  en: string;
  ur: string;
  fr?: string; // Optional for coming soon languages
  es?: string; // Optional for coming soon languages
};

// Legacy type for backward compatibility during migration
export type LegacyText = {
  arabic: string;
  english: string;
};

interface AppState {
  // State
  language: LanguageCode;
  theme: ThemeMode;

  // Actions
  setLanguage: (lang: LanguageCode) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Default state
      language: 'ar',
      theme: 'light',

      // Actions
      setLanguage: (language) => set({ language }),

      setTheme: (theme) => set({ theme }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      toggleLanguage: () =>
        set((state) => ({
          language: state.language === 'ar' ? 'en' : 'ar',
        })),
    }),
    {
      name: 'quranic-app-settings',
    }
  )
);

/** Hook to get current direction based on language */
export const useDirection = () => {
  const language = useAppStore((state) => state.language);
  return language === 'ar' || language === 'ur' ? 'rtl' : 'ltr';
};

/** 
 * Hook to get text based on current language
 * Supports both new multilingual format and legacy format for backward compatibility
 */
export const useText = (text: MultilingualText | LegacyText | any): string => {
  const language = useAppStore((state) => state.language);
  
  if (!text) return '';
  
  // Check if it's the new multilingual format with short codes
  if ('ar' in text || 'en' in text || 'ur' in text) {
    const multiText = text as any;
    // Return text in selected language, fallback to English if not available
    return multiText[language] || multiText.en || multiText.ar || '';
  }
  
  // Legacy format support (arabic/english)
  if ('arabic' in text || 'english' in text) {
    const legacyText = text as LegacyText;
    return language === 'ar' ? legacyText.arabic : legacyText.english;
  }
  
  return '';
};
