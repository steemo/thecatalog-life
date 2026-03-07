/**
 * Language Configuration
 * Created by: Tiko Abousteit
 * Date: 7 March 2026
 *
 * Description:
 *     Centralised language configuration for the application.
 *     Defines all supported languages with metadata for easy maintenance and scalability.
 */

export type LanguageCode = 'ar' | 'en' | 'fr' | 'ur';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'rtl' | 'ltr';
}

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    flag: '🇵🇰',
    direction: 'rtl',
  },
};

export const AVAILABLE_LANGUAGES = Object.values(LANGUAGES);

export const getLanguageConfig = (code: LanguageCode): LanguageConfig => {
  return LANGUAGES[code];
};
