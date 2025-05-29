
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

  return {
    trackFormStart,
    trackFormStep,
    trackFormAbandon,
    trackFormComplete,
    trackCalendarView,
  };
};
