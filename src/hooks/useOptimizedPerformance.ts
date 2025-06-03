
import { useCallback, useEffect, useState, useRef } from 'react';

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  ttfb: number;
}

export const useOptimizedPerformance = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const metricsRef = useRef<Partial<PerformanceMetrics>>({});
  const observerRef = useRef<PerformanceObserver>();

  const updateMetric = useCallback((name: keyof PerformanceMetrics, value: number) => {
    metricsRef.current[name] = value;
    setMetrics({ ...metricsRef.current });
  }, []);

  useEffect(() => {
    // Only measure performance in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    try {
      // Observe Web Vitals with minimal overhead
      if ('PerformanceObserver' in window) {
        observerRef.current = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            switch (entry.entryType) {
              case 'paint':
                if (entry.name === 'first-contentful-paint') {
                  updateMetric('fcp', entry.startTime);
                }
                break;
              case 'largest-contentful-paint':
                updateMetric('lcp', entry.startTime);
                break;
              case 'layout-shift':
                if (!(entry as any).hadRecentInput) {
                  updateMetric('cls', (metricsRef.current.cls || 0) + (entry as any).value);
                }
                break;
              case 'first-input':
                updateMetric('fid', (entry as any).processingStart - entry.startTime);
                break;
              case 'navigation':
                const navEntry = entry as PerformanceNavigationTiming;
                updateMetric('ttfb', navEntry.responseStart - navEntry.requestStart);
                break;
            }
          });
        });

        // Observe with minimal types to reduce overhead
        observerRef.current.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

        // Add layout-shift and first-input observers conditionally
        setTimeout(() => {
          if (observerRef.current) {
            try {
              observerRef.current.observe({ entryTypes: ['layout-shift'] });
              observerRef.current.observe({ entryTypes: ['first-input'] });
            } catch (e) {
              // Ignore if not supported
            }
          }
        }, 1000);
      }

      // Fallback TTFB measurement
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          const entry = navigationEntries[0];
          updateMetric('ttfb', entry.responseStart - entry.requestStart);
        }
      }
    } catch (error) {
      console.warn('Performance monitoring not available:', error);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [updateMetric]);

  const getPerformanceScore = useCallback(() => {
    const { fcp = 0, lcp = 0, cls = 0, fid = 0 } = metricsRef.current;
    
    let score = 100;
    
    // FCP scoring (Good: <1.8s, Needs Improvement: 1.8s-3s, Poor: >3s)
    if (fcp > 3000) score -= 25;
    else if (fcp > 1800) score -= 10;
    
    // LCP scoring (Good: <2.5s, Needs Improvement: 2.5s-4s, Poor: >4s)
    if (lcp > 4000) score -= 30;
    else if (lcp > 2500) score -= 15;
    
    // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (cls > 0.25) score -= 25;
    else if (cls > 0.1) score -= 10;
    
    // FID scoring (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
    if (fid > 300) score -= 20;
    else if (fid > 100) score -= 10;
    
    return Math.max(0, Math.min(100, score));
  }, []);

  return {
    metrics,
    performanceScore: getPerformanceScore(),
    isMonitoring: !!observerRef.current
  };
};
