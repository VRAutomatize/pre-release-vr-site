
import { useCallback, useRef } from 'react';

export const useScrollTracking = () => {
  const maxScrollDepth = useRef<number>(0);

  const trackScroll = useCallback((onMilestone?: (milestone: number) => void) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
    
    if (scrollPercent > maxScrollDepth.current) {
      maxScrollDepth.current = scrollPercent;
      
      // Track milestone scrolls
      const milestones = [25, 50, 75, 100];
      const currentMilestone = milestones.find(m => 
        scrollPercent >= m && scrollPercent < m + 5 // Small buffer to avoid duplicate calls
      );
      
      if (currentMilestone && onMilestone) {
        onMilestone(currentMilestone);
      }
    }
  }, []);

  return {
    trackScroll,
    getMaxScrollDepth: () => maxScrollDepth.current
  };
};
