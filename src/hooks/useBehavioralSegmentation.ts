
import { useState, useEffect, useRef } from 'react';
import { useConversionAnalytics } from './useConversionAnalytics';

export interface UserSegment {
  type: 'high_intent' | 'medium_intent' | 'low_intent' | 'price_sensitive' | 'feature_focused' | 'executive';
  confidence: number;
  triggers: string[];
}

export interface BehavioralData {
  timeOnPage: number;
  scrollDepth: number;
  sectionsViewed: string[];
  ctaClicks: number;
  calculatorUsage: boolean;
  assessmentCompleted: boolean;
  priceChecks: number;
  featureInteractions: string[];
}

export const useBehavioralSegmentation = () => {
  const { trackEvent } = useConversionAnalytics();
  const [currentSegment, setCurrentSegment] = useState<UserSegment>({
    type: 'medium_intent',
    confidence: 0.5,
    triggers: []
  });
  
  const behaviorData = useRef<BehavioralData>({
    timeOnPage: 0,
    scrollDepth: 0,
    sectionsViewed: [],
    ctaClicks: 0,
    calculatorUsage: false,
    assessmentCompleted: false,
    priceChecks: 0,
    featureInteractions: []
  });

  const updateBehavior = (update: Partial<BehavioralData>) => {
    behaviorData.current = { ...behaviorData.current, ...update };
    analyzeSegment();
  };

  const analyzeSegment = () => {
    const data = behaviorData.current;
    let segment: UserSegment;

    // High Intent Signals
    if (data.calculatorUsage && data.assessmentCompleted && data.ctaClicks >= 2) {
      segment = {
        type: 'high_intent',
        confidence: 0.9,
        triggers: ['calculator_used', 'assessment_completed', 'multiple_cta_clicks']
      };
    }
    // Executive Segment
    else if (data.sectionsViewed.includes('executive-assessment') && data.timeOnPage > 120000) {
      segment = {
        type: 'executive',
        confidence: 0.8,
        triggers: ['executive_assessment_viewed', 'high_engagement_time']
      };
    }
    // Price Sensitive
    else if (data.priceChecks >= 3 || data.sectionsViewed.includes('pricing')) {
      segment = {
        type: 'price_sensitive',
        confidence: 0.7,
        triggers: ['multiple_price_checks', 'pricing_focused']
      };
    }
    // Feature Focused
    else if (data.featureInteractions.length >= 3) {
      segment = {
        type: 'feature_focused',
        confidence: 0.75,
        triggers: ['high_feature_interaction']
      };
    }
    // Low Intent
    else if (data.timeOnPage < 30000 && data.scrollDepth < 25) {
      segment = {
        type: 'low_intent',
        confidence: 0.8,
        triggers: ['low_engagement', 'minimal_scroll']
      };
    }
    // Default Medium Intent
    else {
      segment = {
        type: 'medium_intent',
        confidence: 0.6,
        triggers: ['standard_behavior']
      };
    }

    if (segment.type !== currentSegment.type) {
      setCurrentSegment(segment);
      trackEvent('user_segment_change', 'segment', segment.type, 'behavioral', {
        confidence: segment.confidence,
        triggers: segment.triggers,
        behaviorData: data,
        phase5_optimization: true
      });
    }
  };

  const trackCalculatorUsage = () => {
    updateBehavior({ calculatorUsage: true });
  };

  const trackAssessmentCompletion = () => {
    updateBehavior({ assessmentCompleted: true });
  };

  const trackCTAClick = () => {
    updateBehavior({ ctaClicks: behaviorData.current.ctaClicks + 1 });
  };

  const trackPriceCheck = () => {
    updateBehavior({ priceChecks: behaviorData.current.priceChecks + 1 });
  };

  const trackSectionView = (sectionId: string) => {
    const sections = behaviorData.current.sectionsViewed;
    if (!sections.includes(sectionId)) {
      updateBehavior({ sectionsViewed: [...sections, sectionId] });
    }
  };

  const trackFeatureInteraction = (feature: string) => {
    const interactions = behaviorData.current.featureInteractions;
    if (!interactions.includes(feature)) {
      updateBehavior({ featureInteractions: [...interactions, feature] });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateBehavior({ timeOnPage: Date.now() - performance.now() });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    currentSegment,
    behaviorData: behaviorData.current,
    trackCalculatorUsage,
    trackAssessmentCompletion,
    trackCTAClick,
    trackPriceCheck,
    trackSectionView,
    trackFeatureInteraction,
    updateBehavior
  };
};
