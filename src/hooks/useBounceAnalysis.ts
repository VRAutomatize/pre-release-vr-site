
import { useCallback, useRef, useEffect } from 'react';

export const useBounceAnalysis = () => {
  const sessionStartTime = useRef<number>(Date.now());
  const maxScrollDepth = useRef<number>(0);
  const interactionCount = useRef<number>(0);
  const hasEngagement = useRef<boolean>(false);

  const trackInteraction = useCallback(() => {
    interactionCount.current += 1;
    hasEngagement.current = true;
  }, []);

  const updateScrollDepth = useCallback((scrollPercent: number) => {
    if (scrollPercent > maxScrollDepth.current) {
      maxScrollDepth.current = scrollPercent;
    }
  }, []);

  const calculateBounceScore = useCallback(() => {
    const timeOnPage = (Date.now() - sessionStartTime.current) / 1000; // seconds
    const scrollDepth = maxScrollDepth.current;
    const interactions = interactionCount.current;
    
    // Bounce probability factors
    let bounceScore = 100; // Start with high bounce probability
    
    // Time factor (more time = less likely to bounce)
    if (timeOnPage > 30) bounceScore -= 30;
    else if (timeOnPage > 10) bounceScore -= 15;
    else if (timeOnPage > 5) bounceScore -= 5;
    
    // Scroll factor (more scroll = less likely to bounce)
    if (scrollDepth > 75) bounceScore -= 25;
    else if (scrollDepth > 50) bounceScore -= 15;
    else if (scrollDepth > 25) bounceScore -= 10;
    
    // Interaction factor (any interaction = much less likely to bounce)
    if (interactions > 3) bounceScore -= 30;
    else if (interactions > 1) bounceScore -= 20;
    else if (interactions > 0) bounceScore -= 10;
    
    // Engagement factor
    if (hasEngagement.current) bounceScore -= 15;
    
    return Math.max(0, Math.min(100, bounceScore));
  }, []);

  const getBounceAnalytics = useCallback(() => {
    return {
      bounce_probability_score: calculateBounceScore(),
      time_on_page: Math.round((Date.now() - sessionStartTime.current) / 1000),
      max_scroll_depth: maxScrollDepth.current,
      interaction_count: interactionCount.current,
      has_meaningful_engagement: hasEngagement.current
    };
  }, [calculateBounceScore]);

  // Track various user interactions
  useEffect(() => {
    const handleClick = () => trackInteraction();
    const handleKeydown = () => trackInteraction();
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
      updateScrollDepth(scrollPercent);
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackInteraction, updateScrollDepth]);

  return {
    trackInteraction,
    updateScrollDepth,
    calculateBounceScore,
    getBounceAnalytics
  };
};
