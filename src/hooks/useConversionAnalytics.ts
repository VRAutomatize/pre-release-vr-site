
import { useEffect, useCallback, useRef } from 'react';
import { useAnalyticsCore } from './analytics/useAnalyticsCore';
import { useScrollTracking } from './analytics/useScrollTracking';
import { useEventTracking } from './analytics/useEventTracking';

export const useConversionAnalytics = () => {
  const { pendingEvents } = useAnalyticsCore();
  const { trackScroll: trackScrollDepth, getMaxScrollDepth } = useScrollTracking();
  const { trackEvent } = useEventTracking();
  const isUnloading = useRef<boolean>(false);

  // Track scroll with milestone events
  const trackScroll = useCallback(() => {
    trackScrollDepth((milestone) => {
      trackEvent(`scroll_${milestone}`, 'scroll', 'page', 'general', {
        scrollPercent: milestone,
        actualPercent: getMaxScrollDepth(),
      });
    });
  }, [trackScrollDepth, trackEvent, getMaxScrollDepth]);

  // Track page exit
  const trackPageExit = useCallback(() => {
    isUnloading.current = true;
    const finalEvent = {
      tag: 'page_exit',
      action: 'unload',
      element: 'page',
      section: 'general',
      timestamp: new Date().toISOString(),
      sessionData: {
        timeOnPage: Date.now(),
        scrollDepth: getMaxScrollDepth(),
        device: 'unknown',
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      },
      metadata: {
        finalScrollDepth: getMaxScrollDepth(),
      },
    };

    // Send final event and any pending events
    const allEvents = [...pendingEvents.current, finalEvent];
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        'https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/metricas', 
        JSON.stringify({ batch: allEvents })
      );
    }
  }, [getMaxScrollDepth, pendingEvents]);

  // Track exit intent (mouse leaving viewport)
  const trackExitIntent = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0) {
      trackEvent('exit_intent', 'mouse_leave', 'viewport', 'general', {
        timeBeforeExit: Date.now(),
      });
    }
  }, [trackEvent]);

  // Setup event listeners
  useEffect(() => {
    // Track page load
    trackEvent('page_load', 'load', 'page', 'general', {
      url: window.location.href,
    });

    // Scroll tracking
    const scrollHandler = () => trackScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Exit intent tracking
    document.addEventListener('mouseleave', trackExitIntent);

    // Page unload tracking
    const unloadHandler = () => trackPageExit();
    window.addEventListener('beforeunload', unloadHandler);
    window.addEventListener('pagehide', unloadHandler);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('mouseleave', trackExitIntent);
      window.removeEventListener('beforeunload', unloadHandler);
      window.removeEventListener('pagehide', unloadHandler);
    };
  }, [trackEvent, trackScroll, trackExitIntent, trackPageExit]);

  return {
    trackEvent,
    trackScroll,
  };
};
