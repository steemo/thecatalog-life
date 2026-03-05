/**
 * Main Application Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useAppStore, useDirection } from './lib/store';
import { usePerformance } from './hooks';
import Layout from './features/shared/Layout';
import HomePage from './features/home/HomePage';
import SurahsPage from './pages/SurahsPage';
import SurahPage from './features/surah/SurahPage';
import CatalogPage from './pages/CatalogPage';
import CatalogEntryPage from './pages/CatalogEntryPage';
import SourcesPage from './pages/SourcesPage';

function App() {
  const theme = useAppStore((state) => state.theme);
  const language = useAppStore((state) => state.language);
  const direction = useDirection();

  // Monitor performance metrics
  usePerformance();

  // Apply theme and direction to document
  useEffect(() => {
    const root = document.documentElement;

    // Theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Direction and language
    root.setAttribute('dir', direction);
    root.setAttribute('lang', language);
  }, [theme, direction, language]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="surahs" element={<SurahsPage />} />
          <Route path="surah/:slug" element={<SurahPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:slug" element={<CatalogEntryPage />} />
          <Route path="sources" element={<SourcesPage />} />
        </Route>
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
