
import { useCallback, useRef, useEffect } from 'react';
import { SectionTimeData } from '@/types/analytics';

export const useSectionTimeTracking = () => {
  const sectionTimes = useRef<Map<string, SectionTimeData>>(new Map());
  const observers = useRef<Map<string, IntersectionObserver>>(new Map());
  const activeSection = useRef<string | null>(null);

  const trackSection = useCallback((sectionId: string) => {
    if (observers.current.has(sectionId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const now = Date.now();
          
          if (entry.isIntersecting) {
            // Section entered view
            if (!sectionTimes.current.has(sectionId)) {
              sectionTimes.current.set(sectionId, {
                section_id: sectionId,
                time_spent: 0,
                entry_time: now,
                exit_time: 0
              });
            } else {
              const sectionData = sectionTimes.current.get(sectionId)!;
              sectionData.entry_time = now;
            }
            activeSection.current = sectionId;
          } else {
            // Section left view
            const sectionData = sectionTimes.current.get(sectionId);
            if (sectionData && sectionData.entry_time > 0) {
              sectionData.exit_time = now;
              sectionData.time_spent += now - sectionData.entry_time;
            }
            if (activeSection.current === sectionId) {
              activeSection.current = null;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
      observers.current.set(sectionId, observer);
    }
  }, []);

  const getSectionTimes = useCallback(() => {
    const times: Record<string, number> = {};
    
    sectionTimes.current.forEach((data, sectionId) => {
      let totalTime = data.time_spent;
      
      // If section is currently active, add current session time
      if (activeSection.current === sectionId && data.entry_time > 0) {
        totalTime += Date.now() - data.entry_time;
      }
      
      times[sectionId] = Math.round(totalTime / 1000); // Convert to seconds
    });
    
    return times;
  }, []);

  const getEngagementHotspot = useCallback(() => {
    const times = getSectionTimes();
    const totalTime = Object.values(times).reduce((sum, time) => sum + time, 0);
    
    if (totalTime === 0) return 0;
    
    let maxTime = 0;
    let hotspotSection = '';
    
    Object.entries(times).forEach(([section, time]) => {
      if (time > maxTime) {
        maxTime = time;
        hotspotSection = section;
      }
    });
    
    // Return approximate percentage based on section position
    const sectionOrder = ['hero', 'benefits', 'features', 'testimonials', 'pricing', 'form', 'footer'];
    const index = sectionOrder.indexOf(hotspotSection);
    return index >= 0 ? Math.round((index / sectionOrder.length) * 100) : 50;
  }, [getSectionTimes]);

  // Cleanup observers on unmount
  useEffect(() => {
    return () => {
      observers.current.forEach(observer => observer.disconnect());
    };
  }, []);

  return {
    trackSection,
    getSectionTimes,
    getEngagementHotspot
  };
};
