
import { useCallback } from 'react';
import { useEnhancedConversionAnalytics } from './useEnhancedConversionAnalytics';
import { useAdvancedFormTracking } from './useAdvancedFormTracking';

export const useEnhancedFormTracking = () => {
  const { trackEvent, trackFunnelStep } = useEnhancedConversionAnalytics();
  const { trackFieldFocus, trackFieldBlur, getFormAnalytics } = useAdvancedFormTracking();

  const trackFormStart = useCallback((formType: string = 'typeform') => {
    trackEvent('enhanced_form_start', 'start', 'form_modal', 'form', {
      formType,
      startTime: new Date().toISOString(),
      enhanced_tracking: true
    });
    trackFunnelStep('form_start', 'Form Started', true);
  }, [trackEvent, trackFunnelStep]);

  const trackFormStep = useCallback((step: number, totalSteps: number, fieldName: string) => {
    const analytics = getFormAnalytics();
    
    trackEvent('enhanced_form_step_complete', 'complete', `step_${step}`, 'form', {
      step,
      totalSteps,
      fieldName,
      progress: Math.round((step / totalSteps) * 100),
      formAnalytics: analytics,
      enhanced_tracking: true
    });
    
    trackFunnelStep(`form_step_${step}`, `Form Step ${step} - ${fieldName}`, true);
  }, [trackEvent, trackFunnelStep, getFormAnalytics]);

  const trackFormFieldInteraction = useCallback((fieldName: string, action: 'focus' | 'blur', value?: string) => {
    if (action === 'focus') {
      trackFieldFocus(fieldName);
      trackEvent('form_field_focus', 'focus', fieldName, 'form', {
        fieldName,
        enhanced_tracking: true
      });
    } else {
      trackFieldBlur(fieldName, value || '');
      trackEvent('form_field_blur', 'blur', fieldName, 'form', {
        fieldName,
        fieldValue: value ? 'filled' : 'empty',
        enhanced_tracking: true
      });
    }
  }, [trackEvent, trackFieldFocus, trackFieldBlur]);

  const trackFormAbandon = useCallback((step: number, totalSteps: number, reason?: string) => {
    const analytics = getFormAnalytics();
    
    trackEvent('enhanced_form_abandon', 'abandon', `step_${step}`, 'form', {
      abandonedAtStep: step,
      totalSteps,
      progress: Math.round((step / totalSteps) * 100),
      reason,
      formAnalytics: analytics,
      enhanced_tracking: true
    });
    
    trackFunnelStep(`form_abandon_${step}`, `Form Abandoned at Step ${step}`, false);
  }, [trackEvent, trackFunnelStep, getFormAnalytics]);

  const trackFormComplete = useCallback((totalSteps: number, completionTime: number) => {
    const analytics = getFormAnalytics();
    
    trackEvent('enhanced_form_complete', 'complete', 'form_modal', 'form', {
      totalSteps,
      completionTime,
      completionRate: 100,
      formAnalytics: analytics,
      enhanced_tracking: true
    });
    
    trackFunnelStep('form_complete', 'Form Completed Successfully', true);
  }, [trackEvent, trackFunnelStep, getFormAnalytics]);

  const trackPremiumLead = useCallback((revenue: string, leadType: 'standard' | 'growth' | 'premium' | 'executive' | 'vip') => {
    trackEvent('enhanced_premium_lead_identified', 'identify', 'revenue_step', 'form', {
      revenueRange: revenue,
      leadType,
      isPremium: ['premium', 'executive', 'vip'].includes(leadType),
      isExecutive: ['executive', 'vip'].includes(leadType),
      isVip: leadType === 'vip',
      identifiedAt: new Date().toISOString(),
      enhanced_tracking: true
    });
    
    trackFunnelStep(`premium_lead_${leadType}`, `Premium Lead Identified - ${leadType}`, true);
  }, [trackEvent, trackFunnelStep]);

  return {
    trackFormStart,
    trackFormStep,
    trackFormFieldInteraction,
    trackFormAbandon,
    trackFormComplete,
    trackPremiumLead,
    getFormAnalytics
  };
};
