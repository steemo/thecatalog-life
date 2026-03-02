/**
 * Application State Store
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Zustand store for global application state.
 *     Manages language preference and theme with localStorage persistence.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language, ThemeMode } from '../types/surah';

interface AppState {
  // State
  language: Language;
  theme: ThemeMode;

  // Actions
  setLanguage: (lang: Language) => void;
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
  return language === 'ar' ? 'rtl' : 'ltr';
};

/** Hook to get text based on current language */
export const useText = <T extends { arabic: string; english: string }>(
  text: T
): string => {
  const language = useAppStore((state) => state.language);
  return language === 'ar' ? text.arabic : text.english;
};
