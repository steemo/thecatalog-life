/**
 * Performance Monitoring Hook
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 *
 * Description:
 *     Monitors Core Web Vitals and performance metrics. Useful for tracking
 *     SEO-critical metrics and identifying performance bottlenecks.
 */

import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  tti?: number; // Time to Interactive
}

/**
 * Hook to monitor Core Web Vitals
 */
export function usePerformance(): void {
  useEffect(() => {
    // Only run in production
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') return;

    const metrics: PerformanceMetrics = {};

    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const renderTime = (lastEntry as any).renderTime || (lastEntry as any).loadTime || 0;
          metrics.lcp = renderTime;
          reportMetric('LCP', metrics.lcp || 0);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
              metrics.cls = clsValue;
              reportMetric('CLS', metrics.cls);
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // CLS not supported
      }

      // First Input Delay (FID) - deprecated but still useful
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0];
          metrics.fid = (firstEntry as any).processingDuration;
          reportMetric('FID', metrics.fid || 0);
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }
    }

    // Time to First Byte (TTFB)
    if ('performance' in window && 'timing' in window.performance) {
      const timing = window.performance.timing;
      metrics.ttfb = timing.responseStart - timing.navigationStart;
      reportMetric('TTFB', metrics.ttfb);
    }

    // Time to Interactive (TTI)
    if ('PerformanceObserver' in window) {
      try {
        const ttiObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            metrics.tti = entries[entries.length - 1].startTime;
            reportMetric('TTI', metrics.tti);
          }
        });
        ttiObserver.observe({ entryTypes: ['navigation'] });
      } catch (e) {
        // TTI not supported
      }
    }

    return () => {
      // Cleanup observers if needed
    };
  }, []);
}

/**
 * Report metric to analytics or console
 */
function reportMetric(name: string, value: number): void {
  // Log to console in development
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`📊 ${name}: ${value.toFixed(2)}ms`);
  }

  // Send to analytics service (e.g., Google Analytics)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      metric_name: name,
      metric_value: value,
    });
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {};

  if ('performance' in window) {
    const timing = window.performance.timing;
    // const navigation = window.performance.navigation;

    metrics.ttfb = timing.responseStart - timing.navigationStart;
    metrics.tti = timing.loadEventEnd - timing.navigationStart;
  }

  return metrics;
}
