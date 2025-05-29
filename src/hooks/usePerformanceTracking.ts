
import { useCallback, useEffect, useState } from 'react';

export const usePerformanceTracking = () => {
  const [performanceScore, setPerformanceScore] = useState<number>(0);

  const calculatePerformanceScore = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domComplete = navigation.domComplete - navigation.domLoading;
        const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0];
        
        // Calculate score based on load times
        let score = 100;
        
        // Penalize slow load times
        if (loadTime > 3000) score -= 40;
        else if (loadTime > 2000) score -= 25;
        else if (loadTime > 1000) score -= 10;
        
        // Penalize slow DOM completion
        if (domComplete > 2000) score -= 20;
        else if (domComplete > 1000) score -= 10;
        
        // Penalize slow FCP
        if (firstContentfulPaint && firstContentfulPaint.startTime > 2000) {
          score -= 25;
        } else if (firstContentfulPaint && firstContentfulPaint.startTime > 1000) {
          score -= 15;
        }
        
        return Math.max(0, Math.min(100, score));
      }
    }
    
    return 75; // Default score if no performance API
  }, []);

  const getPerformanceMetrics = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        perceived_page_speed_score: performanceScore,
        load_time: navigation ? Math.round(navigation.loadEventEnd - navigation.loadEventStart) : 0,
        dom_complete_time: navigation ? Math.round(navigation.domComplete - navigation.domLoading) : 0,
        first_contentful_paint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
        connection_type: (navigator as any).connection?.effectiveType || 'unknown'
      };
    }
    
    return {
      perceived_page_speed_score: 75,
      load_time: 0,
      dom_complete_time: 0,
      first_contentful_paint: 0,
      connection_type: 'unknown'
    };
  }, [performanceScore]);

  useEffect(() => {
    // Calculate performance score after page load
    const timer = setTimeout(() => {
      const score = calculatePerformanceScore();
      setPerformanceScore(score);
    }, 2000);

    return () => clearTimeout(timer);
  }, [calculatePerformanceScore]);

  return {
    performanceScore,
    getPerformanceMetrics
  };
};
