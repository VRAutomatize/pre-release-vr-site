
import { useCallback } from 'react';
import { useAnalyticsCore } from './useAnalyticsCore';

export const useEventTracking = () => {
  const { createSessionData, sendEvent, sentEvents } = useAnalyticsCore();

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

    const event = {
      tag,
      action,
      element,
      section,
      timestamp: new Date().toISOString(),
      sessionData: createSessionData(),
      metadata,
    };

    sendEvent(event);
  }, [createSessionData, sendEvent, sentEvents]);

  return { trackEvent };
};
