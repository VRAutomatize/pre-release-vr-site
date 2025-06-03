
import { useCallback } from 'react';
import { useEnhancedConversionAnalytics } from './useEnhancedConversionAnalytics';

export const useOptimizedTracking = () => {
  const { 
    trackEvent, 
    getVariant, 
    getVariantConfig,
    trackConversion,
    getFunnelMetrics 
  } = useEnhancedConversionAnalytics();

  // Track CTA clicks with A/B test context
  const trackCTAClick = useCallback((ctaId: string, section: string, metadata?: Record<string, any>) => {
    const variant = getVariant('cta_primary');
    
    trackEvent('optimized_cta_click', 'click', ctaId, section, {
      ...metadata,
      ab_variant: variant,
      optimization_tracking: true
    });
    
    trackConversion('cta_primary', 'click');
  }, [trackEvent, getVariant, trackConversion]);

  // Track form interactions with optimization context
  const trackFormInteraction = useCallback((action: string, step?: string, metadata?: Record<string, any>) => {
    const funnelMetrics = getFunnelMetrics();
    
    trackEvent('optimized_form_interaction', action, step || 'form', 'form', {
      ...metadata,
      funnel_stage: funnelMetrics.category,
      conversion_probability: funnelMetrics.conversionRate,
      optimization_tracking: true
    });
  }, [trackEvent, getFunnelMetrics]);

  // Track calculator usage with optimization data
  const trackCalculatorUsage = useCallback((action: string, value?: number, metadata?: Record<string, any>) => {
    trackEvent('optimized_calculator_usage', action, 'calculator', 'roi-calculator', {
      ...metadata,
      calculated_value: value,
      optimization_tracking: true
    });
  }, [trackEvent]);

  // Track section engagement with optimization insights
  const trackSectionEngagement = useCallback((sectionId: string, engagementType: string, metadata?: Record<string, any>) => {
    const funnelMetrics = getFunnelMetrics();
    
    trackEvent('optimized_section_engagement', engagementType, sectionId, sectionId, {
      ...metadata,
      user_segment: funnelMetrics.category,
      optimization_tracking: true
    });
  }, [trackEvent, getFunnelMetrics]);

  return {
    trackCTAClick,
    trackFormInteraction,
    trackCalculatorUsage,
    trackSectionEngagement,
    getVariant,
    getVariantConfig,
    getFunnelMetrics
  };
};
