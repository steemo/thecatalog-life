/**
 * Tailwind CSS Configuration
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Islamic-themed design system with RTL support.
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary - Deep Blue (Trust, Wisdom)
        primary: {
          50: '#EEF2F8',
          100: '#D4DEF0',
          200: '#A9BDE1',
          300: '#7E9CD2',
          400: '#537BC3',
          500: '#1F4788',
          600: '#193A6D',
          700: '#132C52',
          800: '#0D1F37',
          900: '#06111C',
        },
        // Secondary - Gold (Nobility, Divine)
        secondary: {
          50: '#FBF8EF',
          100: '#F5EDD5',
          200: '#EBDBAB',
          300: '#E1C981',
          400: '#D7B757',
          500: '#D4AF37',
          600: '#B8960F',
          700: '#8A710B',
          800: '#5C4B08',
          900: '#2E2604',
        },
        // Accent - Green (Islam, Growth)
        accent: {
          50: '#F0F5EC',
          100: '#D9E6CF',
          200: '#B3CD9F',
          300: '#8DB46F',
          400: '#679B3F',
          500: '#2D5016',
          600: '#244012',
          700: '#1B300D',
          800: '#122009',
          900: '#091004',
        },
      },
      fontFamily: {
        arabic: ['Amiri', 'Noto Naskh Arabic', 'Traditional Arabic', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'arabic-sm': ['0.875rem', { lineHeight: '1.75' }],
        'arabic-base': ['1rem', { lineHeight: '2' }],
        'arabic-lg': ['1.125rem', { lineHeight: '2' }],
        'arabic-xl': ['1.25rem', { lineHeight: '2' }],
        'arabic-2xl': ['1.5rem', { lineHeight: '1.75' }],
        'arabic-3xl': ['1.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
