
import { useCallback, useRef, useEffect } from 'react';
import { ElementCTRData } from '@/types/analytics';

export const useCTRTracking = () => {
  const elementData = useRef<Map<string, ElementCTRData>>(new Map());
  const impressionObservers = useRef<Map<string, IntersectionObserver>>(new Map());

  const trackElementImpression = useCallback((elementId: string) => {
    if (impressionObservers.current.has(elementId)) return;

    if (!elementData.current.has(elementId)) {
      elementData.current.set(elementId, {
        element_id: elementId,
        impressions: 0,
        clicks: 0,
        ctr: 0
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const data = elementData.current.get(elementId)!;
            data.impressions += 1;
            data.ctr = data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0;
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector(`[data-ctr-id="${elementId}"]`) || document.getElementById(elementId);
    if (element) {
      observer.observe(element);
      impressionObservers.current.set(elementId, observer);
    }
  }, []);

  const trackElementClick = useCallback((elementId: string) => {
    if (!elementData.current.has(elementId)) {
      elementData.current.set(elementId, {
        element_id: elementId,
        impressions: 1, // Assume at least 1 impression if clicked
        clicks: 0,
        ctr: 0
      });
    }

    const data = elementData.current.get(elementId)!;
    data.clicks += 1;
    data.ctr = data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0;
  }, []);

  const getCTRData = useCallback(() => {
    const ctrElements: Record<string, number> = {};
    
    elementData.current.forEach((data, elementId) => {
      ctrElements[elementId] = Number(data.ctr.toFixed(2));
    });
    
    return ctrElements;
  }, []);

  // Cleanup observers
  useEffect(() => {
    return () => {
      impressionObservers.current.forEach(observer => observer.disconnect());
    };
  }, []);

  return {
    trackElementImpression,
    trackElementClick,
    getCTRData
  };
};
