
import { useEffect, useRef } from 'react';
import { useConversionAnalytics } from './useConversionAnalytics';

export const useScrollTracking = () => {
  const { trackEvent } = useConversionAnalytics();
  const sectionsViewed = useRef<Set<string>>(new Set());

  const trackSectionView = (sectionId: string, sectionName: string) => {
    if (sectionsViewed.current.has(sectionId)) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            sectionsViewed.current.add(sectionId);
            trackEvent('section_view', 'view', sectionId, sectionName, {
              intersectionRatio: entry.intersectionRatio,
              boundingRect: entry.boundingClientRect,
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  };

  return { trackSectionView };
};
