import { useEffect, useCallback, useRef } from 'react';
import { useIsMobile } from './useIsMobile';
import { ConversionEvent } from '@/types/analytics';
import { useFunnelTracking } from './useFunnelTracking';
import { useAdvancedFormTracking } from './useAdvancedFormTracking';
import { useSectionTimeTracking } from './useSectionTimeTracking';
import { useCTRTracking } from './useCTRTracking';
import { useTrafficSourceDetection } from './useTrafficSourceDetection';
import { useBounceAnalysis } from './useBounceAnalysis';
import { usePerformanceTracking } from './usePerformanceTracking';
import { useABTesting } from './useABTesting';
import { useHeatmapTracking } from './useHeatmapTracking';
import { useDetailedConversionFunnel } from './useDetailedConversionFunnel';

const ANALYTICS_ENDPOINT = 'https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/metricas';

export const useEnhancedConversionAnalytics = () => {
  const isMobile = useIsMobile();
  const sessionStartTime = useRef<number>(Date.now());
  const sentEvents = useRef<Set<string>>(new Set());
  const pendingEvents = useRef<ConversionEvent[]>([]);
  const isUnloading = useRef<boolean>(false);

  // Initialize all tracking hooks
  const { getLastFunnelStep, trackFunnelStep } = useFunnelTracking();
  const { getFormAnalytics } = useAdvancedFormTracking();
  const { getSectionTimes, getEngagementHotspot } = useSectionTimeTracking();
  const { getCTRData } = useCTRTracking();
  const { trafficSource } = useTrafficSourceDetection();
  const { getBounceAnalytics } = useBounceAnalysis();
  const { getPerformanceMetrics } = usePerformanceTracking();
  
  // New Phase 5 hooks
  const { getVariant, getVariantConfig, trackConversion } = useABTesting();
  const { sendHeatmapData } = useHeatmapTracking();
  const { trackFunnelStep: trackDetailedFunnelStep, getFunnelMetrics, completeFunnel } = useDetailedConversionFunnel();

  // Get URL parameters for UTM tracking
  const getUtmParams = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utmSource: urlParams.get('utm_source') || undefined,
      utmMedium: urlParams.get('utm_medium') || undefined,
      utmCampaign: urlParams.get('utm_campaign') || undefined,
    };
  }, []);

  // Create enhanced session data with Phase 5 analytics
  const createEnhancedSessionData = useCallback(() => {
    const timeOnPage = Date.now() - sessionStartTime.current;
    const formAnalytics = getFormAnalytics();
    const bounceAnalytics = getBounceAnalytics();
    const performanceMetrics = getPerformanceMetrics();
    const funnelMetrics = getFunnelMetrics();
    
    return {
      timeOnPage,
      scrollDepth: bounceAnalytics.max_scroll_depth,
      device: isMobile ? 'mobile' : 'desktop',
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      // Enhanced analytics data
      traffic_source: trafficSource,
      is_returning_user: false, // Simplified since we removed user session tracking
      bounce_probability_score: bounceAnalytics.bounce_probability_score,
      engagement_hotspot_percent: getEngagementHotspot(),
      perceived_page_speed_score: performanceMetrics.perceived_page_speed_score,
      last_funnel_step: getLastFunnelStep(),
      time_per_section: getSectionTimes(),
      ctr_elements: getCTRData(),
      form_fields_filled: formAnalytics.form_fields_filled,
      form_fields_left_blank: formAnalytics.form_fields_left_blank,
      // Phase 5 - Advanced analytics
      detailed_funnel_metrics: funnelMetrics,
      ab_test_variants: {
        hero_headline: getVariant('hero_headline'),
        cta_primary: getVariant('cta_primary')
      },
      ...getUtmParams(),
    };
  }, [
    isMobile, 
    trafficSource, 
    getFormAnalytics, 
    getSectionTimes, 
    getCTRData, 
    getEngagementHotspot, 
    getLastFunnelStep, 
    getBounceAnalytics, 
    getPerformanceMetrics,
    getFunnelMetrics,
    getVariant,
    getUtmParams
  ]);

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
      console.warn('Enhanced analytics event failed:', error);
      pendingEvents.current.push(event);
    }
  }, []);

  // Track enhanced conversion event with Phase 5 features
  const trackEvent = useCallback((
    tag: string,
    action: string,
    element: string,
    section: string,
    metadata?: Record<string, any>
  ) => {
    const eventKey = `${tag}_${element}_${action}`;
    
    // Prevent duplicate events (except for repeated actions)
    if (!tag.includes('scroll') && !tag.includes('time') && sentEvents.current.has(eventKey)) {
      return;
    }
    
    sentEvents.current.add(eventKey);

    const event: ConversionEvent = {
      tag,
      action,
      element,
      section,
      timestamp: new Date().toISOString(),
      sessionData: createEnhancedSessionData(),
      metadata: {
        ...metadata,
        enhanced_tracking: true,
        tracking_version: '3.0',
        phase_5_enabled: true
      },
    };

    if (isUnloading.current) {
      pendingEvents.current.push(event);
    } else {
      sendEvent(event);
    }

    // Track in detailed funnel
    trackDetailedFunnelStep(eventKey, metadata);

    // Track A/B test conversions for relevant events
    if (tag.includes('cta') || tag.includes('form') || tag.includes('conversion')) {
      trackConversion('hero_headline', action);
      trackConversion('cta_primary', action);
    }

    // Also track funnel progression for specific events
    if (tag.includes('form') || tag.includes('cta') || tag.includes('step')) {
      trackFunnelStep(eventKey, `${tag}_${action}`, action === 'complete');
    }
  }, [createEnhancedSessionData, sendEvent, trackFunnelStep, trackDetailedFunnelStep, trackConversion]);

  // Track page exit with Phase 5 enhanced data
  const trackPageExit = useCallback(() => {
    isUnloading.current = true;
    
    // Send final heatmap data
    sendHeatmapData();
    
    // Complete funnel analysis
    const funnelMetrics = getFunnelMetrics();
    completeFunnel(funnelMetrics.category);
    
    const finalEvent: ConversionEvent = {
      tag: 'phase5_enhanced_page_exit',
      action: 'unload',
      element: 'page',
      section: 'general',
      timestamp: new Date().toISOString(),
      sessionData: createEnhancedSessionData(),
      metadata: {
        final_analysis: {
          session_summary: getBounceAnalytics(),
          form_completion: getFormAnalytics(),
          engagement_summary: {
            sections_viewed: Object.keys(getSectionTimes()).length,
            total_engagement_time: Object.values(getSectionTimes()).reduce((a, b) => a + b, 0),
            ctr_performance: getCTRData()
          },
          funnel_completion: funnelMetrics,
          ab_test_exposure: {
            hero_headline: getVariant('hero_headline'),
            cta_primary: getVariant('cta_primary')
          }
        },
        enhanced_tracking: true,
        tracking_version: '3.0',
        phase_5_complete: true
      },
    };

    // Send final event and any pending events
    const allEvents = [...pendingEvents.current, finalEvent];
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ANALYTICS_ENDPOINT, JSON.stringify({ 
        batch: allEvents,
        final_session_data: true,
        phase_5_analytics: true
      }));
    }
  }, [
    createEnhancedSessionData, 
    getBounceAnalytics, 
    getFormAnalytics, 
    getSectionTimes, 
    getCTRData,
    getFunnelMetrics,
    completeFunnel,
    sendHeatmapData,
    getVariant
  ]);

  // Setup enhanced event listeners with Phase 5 features
  useEffect(() => {
    // Track enhanced page load with A/B test variants
    trackEvent('phase5_enhanced_page_load', 'load', 'page', 'general', {
      page_url: window.location.href,
      page_title: document.title,
      load_timestamp: Date.now(),
      ab_variants: {
        hero_headline: getVariant('hero_headline'),
        cta_primary: getVariant('cta_primary')
      }
    });

    // Page unload tracking
    const unloadHandler = () => trackPageExit();
    window.addEventListener('beforeunload', unloadHandler);
    window.addEventListener('pagehide', unloadHandler);

    return () => {
      window.removeEventListener('beforeunload', unloadHandler);
      window.removeEventListener('pagehide', unloadHandler);
    };
  }, [trackEvent, trackPageExit, getVariant]);

  return {
    trackEvent,
    // Expose individual tracking methods for specific use cases
    trackFunnelStep,
    getFormAnalytics,
    getSectionTimes,
    getCTRData,
    getBounceAnalytics,
    getPerformanceMetrics,
    // Phase 5 methods
    getVariant,
    getVariantConfig,
    trackConversion,
    getFunnelMetrics,
    completeFunnel,
    sendHeatmapData
  };
};
