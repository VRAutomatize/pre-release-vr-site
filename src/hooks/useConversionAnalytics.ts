
import { useEffect, useCallback, useRef } from 'react';
import { useIsMobile } from './useIsMobile';

interface ConversionEvent {
  tag: string;
  action: string;
  element: string;
  section: string;
  timestamp: string;
  sessionData: {
    timeOnPage: number;
    scrollDepth: number;
    device: string;
    referrer: string;
    userAgent: string;
    viewport: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
  metadata?: Record<string, any>;
}

const ANALYTICS_ENDPOINT = 'https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/metricas';

export const useConversionAnalytics = () => {
  const isMobile = useIsMobile();
  const sessionStartTime = useRef<number>(Date.now());
  const maxScrollDepth = useRef<number>(0);
  const sentEvents = useRef<Set<string>>(new Set());
  const pendingEvents = useRef<ConversionEvent[]>([]);
  const isUnloading = useRef<boolean>(false);

  // Get URL parameters for UTM tracking
  const getUtmParams = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utmSource: urlParams.get('utm_source') || undefined,
      utmMedium: urlParams.get('utm_medium') || undefined,
      utmCampaign: urlParams.get('utm_campaign') || undefined,
    };
  }, []);

  // Create base session data
  const createSessionData = useCallback(() => {
    const timeOnPage = Date.now() - sessionStartTime.current;
    return {
      timeOnPage,
      scrollDepth: maxScrollDepth.current,
      device: isMobile ? 'mobile' : 'desktop',
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      ...getUtmParams(),
    };
  }, [isMobile, getUtmParams]);

  // Send events to analytics endpoint
  const sendEvent = useCallback(async (event: ConversionEvent) => {
    try {
      await fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.warn('Analytics event failed:', error);
      // Store failed events for retry
      pendingEvents.current.push(event);
    }
  }, []);

  // Batch send events
  const sendBatchEvents = useCallback(async (events: ConversionEvent[]) => {
    if (events.length === 0) return;
    
    try {
      await fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ batch: events }),
      });
    } catch (error) {
      console.warn('Batch analytics failed:', error);
    }
  }, []);

  // Track conversion event
  const trackEvent = useCallback((
    tag: string,
    action: string,
    element: string,
    section: string,
    metadata?: Record<string, any>
  ) => {
    const eventKey = `${tag}_${element}_${action}`;
    
    // Prevent duplicate events (except for repeated actions like scroll)
    if (!tag.includes('scroll') && sentEvents.current.has(eventKey)) {
      return;
    }
    
    sentEvents.current.add(eventKey);

    const event: ConversionEvent = {
      tag,
      action,
      element,
      section,
      timestamp: new Date().toISOString(),
      sessionData: createSessionData(),
      metadata,
    };

    if (isUnloading.current) {
      pendingEvents.current.push(event);
    } else {
      sendEvent(event);
    }
  }, [createSessionData, sendEvent]);

  // Track scroll depth
  const trackScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
    
    if (scrollPercent > maxScrollDepth.current) {
      maxScrollDepth.current = scrollPercent;
      
      // Track milestone scrolls
      const milestones = [25, 50, 75, 100];
      const currentMilestone = milestones.find(m => 
        scrollPercent >= m && !sentEvents.current.has(`scroll_${m}`)
      );
      
      if (currentMilestone) {
        trackEvent(`scroll_${currentMilestone}`, 'scroll', 'page', 'general', {
          scrollPercent: currentMilestone,
          actualPercent: scrollPercent,
        });
      }
    }
  }, [trackEvent]);

  // Track page exit
  const trackPageExit = useCallback(() => {
    isUnloading.current = true;
    const finalEvent: ConversionEvent = {
      tag: 'page_exit',
      action: 'unload',
      element: 'page',
      section: 'general',
      timestamp: new Date().toISOString(),
      sessionData: createSessionData(),
      metadata: {
        finalScrollDepth: maxScrollDepth.current,
        totalEvents: sentEvents.current.size,
      },
    };

    // Send final event and any pending events
    const allEvents = [...pendingEvents.current, finalEvent];
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ANALYTICS_ENDPOINT, JSON.stringify({ batch: allEvents }));
    } else {
      // Fallback for browsers without sendBeacon
      sendBatchEvents(allEvents);
    }
  }, [createSessionData, sendBatchEvents]);

  // Track exit intent (mouse leaving viewport)
  const trackExitIntent = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !sentEvents.current.has('exit_intent')) {
      trackEvent('exit_intent', 'mouse_leave', 'viewport', 'general', {
        timeBeforeExit: Date.now() - sessionStartTime.current,
      });
    }
  }, [trackEvent]);

  // Setup event listeners
  useEffect(() => {
    // Track page load
    trackEvent('page_load', 'load', 'page', 'general', {
      loadTime: Date.now() - sessionStartTime.current,
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
