/**
 * Language Configuration
 * Created by: Tiko Abousteit
 * Date: 7 March 2026
 *
 * Description:
 *     Centralised language configuration for the application.
 *     Defines all supported languages with metadata for easy maintenance and scalability.
 */

export type LanguageCode = 'ar' | 'en' | 'ur' | 'fr' | 'es';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'rtl' | 'ltr';
  available: boolean; // Whether content is available in this language
}

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
    available: true,
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
    available: true,
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    flag: '🇵🇰',
    direction: 'rtl',
    available: true,
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    available: false, // Coming soon
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
    available: false, // Coming soon
  },
};

export const AVAILABLE_LANGUAGES = Object.values(LANGUAGES);

export const getLanguageConfig = (code: LanguageCode): LanguageConfig => {
  return LANGUAGES[code];
};


/** Get available languages only (exclude coming soon) */
export const getAvailableLanguages = (): LanguageConfig[] => {
  return AVAILABLE_LANGUAGES.filter(lang => lang.available);
};

/** Check if a language has content available */
export const isLanguageAvailable = (code: LanguageCode): boolean => {
  return LANGUAGES[code]?.available ?? false;
};
