
import { useCallback, useRef, useEffect } from 'react';
import { useConversionAnalytics } from './useConversionAnalytics';

interface FunnelStep {
  stepId: string;
  stepName: string;
  category: 'awareness' | 'interest' | 'consideration' | 'intent' | 'purchase';
  timestamp: number;
  metadata?: Record<string, any>;
}

interface FunnelMetrics {
  totalSteps: number;
  conversionRate: number;
  averageTime: number;
  dropOffPoints: string[];
  category: string;
}

export const useDetailedConversionFunnel = () => {
  const { trackEvent } = useConversionAnalytics();
  const funnelSteps = useRef<FunnelStep[]>([]);
  const sessionStart = useRef<number>(Date.now());

  // Define funnel step hierarchy
  const stepHierarchy = {
    // Awareness
    page_view: { category: 'awareness' as const, weight: 1 },
    scroll_25: { category: 'awareness' as const, weight: 2 },
    
    // Interest
    scroll_50: { category: 'interest' as const, weight: 3 },
    calculator_view: { category: 'interest' as const, weight: 4 },
    case_study_view: { category: 'interest' as const, weight: 4 },
    
    // Consideration
    calculator_interact: { category: 'consideration' as const, weight: 5 },
    assessment_start: { category: 'consideration' as const, weight: 6 },
    pricing_view: { category: 'consideration' as const, weight: 6 },
    
    // Intent
    form_start: { category: 'intent' as const, weight: 7 },
    assessment_50_percent: { category: 'intent' as const, weight: 8 },
    multiple_cta_clicks: { category: 'intent' as const, weight: 8 },
    
    // Purchase
    form_complete: { category: 'purchase' as const, weight: 10 },
    calendar_book: { category: 'purchase' as const, weight: 10 },
    whatsapp_click: { category: 'purchase' as const, weight: 9 }
  };

  // Track funnel step
  const trackFunnelStep = useCallback((stepId: string, metadata?: Record<string, any>) => {
    const stepConfig = stepHierarchy[stepId as keyof typeof stepHierarchy];
    if (!stepConfig) return;

    const step: FunnelStep = {
      stepId,
      stepName: stepId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: stepConfig.category,
      timestamp: Date.now(),
      metadata
    };

    // Check if step already exists (avoid duplicates)
    const existingStep = funnelSteps.current.find(s => s.stepId === stepId);
    if (existingStep) return;

    funnelSteps.current.push(step);

    // Track the funnel progression
    trackEvent('funnel_step', 'progress', stepId, stepConfig.category, {
      stepId,
      stepName: step.stepName,
      category: stepConfig.category,
      weight: stepConfig.weight,
      timeFromStart: Date.now() - sessionStart.current,
      totalSteps: funnelSteps.current.length,
      metadata
    });
  }, [trackEvent]);

  // Calculate funnel metrics
  const getFunnelMetrics = useCallback((): FunnelMetrics => {
    const steps = funnelSteps.current;
    const totalTime = steps.length > 0 ? 
      Math.max(...steps.map(s => s.timestamp)) - Math.min(...steps.map(s => s.timestamp)) : 0;

    // Identify drop-off points (missing expected steps)
    const dropOffPoints: string[] = [];
    const stepIds = steps.map(s => s.stepId);

    // Check for common drop-off patterns
    if (stepIds.includes('calculator_view') && !stepIds.includes('calculator_interact')) {
      dropOffPoints.push('calculator_abandon');
    }
    if (stepIds.includes('assessment_start') && !stepIds.includes('form_complete')) {
      dropOffPoints.push('assessment_abandon');
    }
    if (stepIds.includes('form_start') && !stepIds.includes('form_complete')) {
      dropOffPoints.push('form_abandon');
    }

    // Calculate conversion rate based on highest category reached
    const categories = steps.map(s => s.category);
    let conversionRate = 0;
    if (categories.includes('purchase')) conversionRate = 100;
    else if (categories.includes('intent')) conversionRate = 80;
    else if (categories.includes('consideration')) conversionRate = 60;
    else if (categories.includes('interest')) conversionRate = 40;
    else if (categories.includes('awareness')) conversionRate = 20;

    return {
      totalSteps: steps.length,
      conversionRate,
      averageTime: totalTime / Math.max(steps.length, 1),
      dropOffPoints,
      category: categories.includes('purchase') ? 'converted' : 
                categories.includes('intent') ? 'high_intent' :
                categories.includes('consideration') ? 'considering' :
                categories.includes('interest') ? 'interested' : 'aware'
    };
  }, []);

  // Send funnel completion data
  const completeFunnel = useCallback((conversionType: string = 'standard') => {
    const metrics = getFunnelMetrics();
    
    trackEvent('funnel_complete', 'complete', conversionType, 'conversion', {
      ...metrics,
      conversionType,
      sessionDuration: Date.now() - sessionStart.current,
      steps: funnelSteps.current,
      completedAt: new Date().toISOString()
    });
  }, [getFunnelMetrics, trackEvent]);

  // Auto-track common funnel steps
  useEffect(() => {
    // Track page view
    trackFunnelStep('page_view');

    // Track scroll milestones
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 25 && !funnelSteps.current.find(s => s.stepId === 'scroll_25')) {
        trackFunnelStep('scroll_25', { scrollPercent: 25 });
      }
      if (scrollPercent >= 50 && !funnelSteps.current.find(s => s.stepId === 'scroll_50')) {
        trackFunnelStep('scroll_50', { scrollPercent: 50 });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackFunnelStep]);

  return {
    trackFunnelStep,
    getFunnelMetrics,
    completeFunnel,
    getCurrentSteps: () => [...funnelSteps.current],
    getHighestCategory: () => {
      const categories = funnelSteps.current.map(s => s.category);
      if (categories.includes('purchase')) return 'purchase';
      if (categories.includes('intent')) return 'intent';
      if (categories.includes('consideration')) return 'consideration';
      if (categories.includes('interest')) return 'interest';
      return 'awareness';
    }
  };
};
