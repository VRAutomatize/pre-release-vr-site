
import { useCallback, useRef, useEffect } from 'react';

interface FunnelStep {
  step_id: string;
  step_name: string;
  timestamp: number;
  completed: boolean;
}

export const useFunnelTracking = () => {
  const funnelSteps = useRef<FunnelStep[]>([]);
  const currentStep = useRef<string>('page_entry');
  const lastActiveStep = useRef<string>('page_entry');

  const trackFunnelStep = useCallback((stepId: string, stepName: string, completed: boolean = false) => {
    const step: FunnelStep = {
      step_id: stepId,
      step_name: stepName,
      timestamp: Date.now(),
      completed
    };

    funnelSteps.current.push(step);
    currentStep.current = stepId;
    
    if (completed) {
      lastActiveStep.current = stepId;
    }
  }, []);

  const getLastFunnelStep = useCallback(() => {
    const completedSteps = funnelSteps.current.filter(step => step.completed);
    return completedSteps.length > 0 
      ? completedSteps[completedSteps.length - 1].step_id 
      : 'page_entry';
  }, []);

  const getFunnelProgress = useCallback(() => {
    return {
      steps: funnelSteps.current,
      current_step: currentStep.current,
      last_completed_step: getLastFunnelStep(),
      total_steps: funnelSteps.current.length,
      completion_rate: funnelSteps.current.filter(s => s.completed).length / Math.max(funnelSteps.current.length, 1)
    };
  }, [getLastFunnelStep]);

  // Track page entry
  useEffect(() => {
    trackFunnelStep('page_entry', 'Page Entry', true);
  }, [trackFunnelStep]);

  return {
    trackFunnelStep,
    getLastFunnelStep,
    getFunnelProgress,
    currentStep: currentStep.current
  };
};
