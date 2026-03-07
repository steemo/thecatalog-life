/**
 * Table of Contents - Sticky Sidebar Navigation
 * Created by: Tiko Abousteit
 * Date: 5 March 2026
 *
 * Description:
 *     Sticky sidebar showing all catalog days with quick navigation.
 *     Highlights current day based on scroll position.
 *     Responsive: sidebar on desktop, drawer on mobile.
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Menu, X, Home } from 'lucide-react';
import { useText, useDirection } from '@/lib/store';
import { getCatalogCards } from '@/data/catalog';
import { useNavigate } from 'react-router-dom';

export default function TableOfContents() {
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const direction = useDirection();
  const navigate = useNavigate();
  const catalogCards = getCatalogCards();
  const rafRef = useRef<number | null>(null);

  const tocLabel = useText({ arabic: 'جدول المحتويات', english: 'Table of Contents' });
  const backToTopLabel = useText({ arabic: 'العودة للأعلى', english: 'Back to Top' });
  const homeLabel = useText({ arabic: 'الرئيسية', english: 'Home' });
  const dayLabel = useText({ arabic: 'اليوم', english: 'Day' });
  const teaserLabel = useText({ arabic: 'تشويق', english: 'Teaser' });

  // Track scroll position to highlight current day with debouncing
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const entries = catalogCards.filter((c) => c.day !== 0);

        for (let i = entries.length - 1; i >= 0; i--) {
          const element = document.getElementById(`day-${entries[i].day}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200) {
              setCurrentDay(entries[i].day);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [catalogCards]);

  const scrollToDay = (day: number) => {
    const element = document.getElementById(`day-${day}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const goHome = () => {
    navigate('/');
    setIsOpen(false);
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <motion.div
      initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`hidden lg:flex fixed top-32 ${
        direction === 'rtl' ? 'left-6' : 'right-6'
      } w-64 flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto z-40`}
    >
      {/* Home Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={goHome}
        className="w-full px-4 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
      >
        <Home className="w-5 h-5" />
        {homeLabel}
      </motion.button>

      {/* Back to Top Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="w-full px-4 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
      >
        <ChevronUp className="w-5 h-5" />
        {backToTopLabel}
      </motion.button>

      {/* Days List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-sm">
          {tocLabel}
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {catalogCards.map((entry) => (
            <motion.button
              key={entry.id}
              whileHover={{ x: direction === 'rtl' ? -4 : 4 }}
              onClick={() => scrollToDay(entry.day)}
              className={`w-full px-4 py-3 text-sm font-medium transition-all text-left ${
                currentDay === entry.day
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>
                  {entry.day === 0 ? teaserLabel : `${dayLabel} ${entry.day}`}
                </span>
                {currentDay === entry.day && (
                  <motion.div
                    layoutId="indicator"
                    className="w-2 h-2 rounded-full bg-primary-500"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Mobile Floating Button + Drawer
  const MobileDrawer = () => (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-lg flex items-center justify-center z-40 transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Drawer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-800 shadow-2xl z-40 overflow-y-auto"
          >
            <div className="sticky top-0 px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">{tocLabel}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {/* Home Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goHome}
                className="w-full px-4 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-bold transition-colors flex items-center justify-center gap-2 mb-2"
              >
                <Home className="w-5 h-5" />
                {homeLabel}
              </motion.button>

              {/* Back to Top Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToTop}
                className="w-full px-4 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold transition-colors flex items-center justify-center gap-2 mb-4"
              >
                <ChevronUp className="w-5 h-5" />
                {backToTopLabel}
              </motion.button>

              {/* Days List */}
              <div className="space-y-1">
                {catalogCards.map((entry) => (
                  <motion.button
                    key={entry.id}
                    whileHover={{ x: 4 }}
                    onClick={() => scrollToDay(entry.day)}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                      currentDay === entry.day
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>
                        {entry.day === 0 ? teaserLabel : `${dayLabel} ${entry.day}`}
                      </span>
                      {currentDay === entry.day && (
                        <motion.div
                          layoutId="mobile-indicator"
                          className="w-2 h-2 rounded-full bg-primary-500"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileDrawer />
    </>
  );
}
