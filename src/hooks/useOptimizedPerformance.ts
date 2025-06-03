
import { useCallback, useEffect, useState, useRef } from 'react';

interface PerformanceMetrics {
  lcp: number;
  cls: number;
  fid: number;
}

export const useOptimizedPerformance = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const observerRef = useRef<PerformanceObserver>();

  const updateMetric = useCallback((name: keyof PerformanceMetrics, value: number) => {
    setMetrics(prev => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    // Apenas em produção e com throttling
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    try {
      if ('PerformanceObserver' in window) {
        observerRef.current = new PerformanceObserver((list) => {
          // Processar com delay para não bloquear main thread
          requestIdleCallback(() => {
            list.getEntries().forEach((entry) => {
              if (entry.entryType === 'largest-contentful-paint') {
                updateMetric('lcp', entry.startTime);
              }
            });
          });
        });

        // Observar apenas LCP para reduzir overhead
        observerRef.current.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    } catch (error) {
      // Ignorar silenciosamente
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [updateMetric]);

  const getPerformanceScore = useCallback(() => {
    const { lcp = 0 } = metrics;
    
    let score = 100;
    if (lcp > 4000) score -= 30;
    else if (lcp > 2500) score -= 15;
    
    return Math.max(0, Math.min(100, score));
  }, [metrics]);

  return {
    metrics,
    performanceScore: getPerformanceScore(),
    isMonitoring: !!observerRef.current
  };
};
