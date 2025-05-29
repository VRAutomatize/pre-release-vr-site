
import { useCallback } from 'react';
import { useConversionAnalytics } from './useConversionAnalytics';

export const useFormTracking = () => {
  const { trackEvent } = useConversionAnalytics();

  const trackFormStart = useCallback(() => {
    trackEvent('form_start', 'start', 'typeform_modal', 'form', {
      formType: 'typeform',
      startTime: new Date().toISOString(),
    });
  }, [trackEvent]);

  const trackFormStep = useCallback((step: number, totalSteps: number, fieldName: string) => {
    trackEvent('form_step_complete', 'complete', `step_${step}`, 'form', {
      step,
      totalSteps,
      fieldName,
      progress: Math.round((step / totalSteps) * 100),
    });
  }, [trackEvent]);

  const trackFormAbandon = useCallback((step: number, totalSteps: number, reason?: string) => {
    trackEvent('form_abandon', 'abandon', `step_${step}`, 'form', {
      abandonedAtStep: step,
      totalSteps,
      progress: Math.round((step / totalSteps) * 100),
      reason,
    });
  }, [trackEvent]);

  const trackFormComplete = useCallback((totalSteps: number, completionTime: number) => {
    trackEvent('form_complete', 'complete', 'typeform_modal', 'form', {
      totalSteps,
      completionTime,
      completionRate: 100,
    });
  }, [trackEvent]);

  const trackCalendarView = useCallback(() => {
    trackEvent('calendar_view', 'view', 'calendar_embed', 'form', {
      viewTime: new Date().toISOString(),
    });
  }, [trackEvent]);

  const trackPremiumLead = useCallback((revenue: string, leadType: 'standard' | 'growth' | 'premium' | 'executive' | 'vip') => {
    trackEvent('premium_lead_identified', 'identify', 'revenue_step', 'form', {
      revenueRange: revenue,
      leadType,
      isPremium: ['premium', 'executive', 'vip'].includes(leadType),
      isExecutive: ['executive', 'vip'].includes(leadType),
      isVip: leadType === 'vip',
      identifiedAt: new Date().toISOString(),
    });
  }, [trackEvent]);

  return {
    trackFormStart,
    trackFormStep,
    trackFormAbandon,
    trackFormComplete,
    trackCalendarView,
    trackPremiumLead,
  };
};
