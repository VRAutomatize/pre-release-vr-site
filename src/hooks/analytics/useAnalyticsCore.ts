
import { useCallback, useRef } from 'react';
import { useIsMobile } from '../useIsMobile';

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

export const useAnalyticsCore = () => {
  const isMobile = useIsMobile();
  const sessionStartTime = useRef<number>(Date.now());
  const sentEvents = useRef<Set<string>>(new Set());
  const pendingEvents = useRef<ConversionEvent[]>([]);

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
      scrollDepth: 0, // Will be updated by scroll tracking
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
      pendingEvents.current.push(event);
    }
  }, []);

  return {
    createSessionData,
    sendEvent,
    sentEvents,
    pendingEvents,
    sessionStartTime: sessionStartTime.current
  };
};
