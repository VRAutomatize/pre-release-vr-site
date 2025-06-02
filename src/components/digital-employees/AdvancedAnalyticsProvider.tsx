
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useEnhancedConversionAnalytics } from '@/hooks/useEnhancedConversionAnalytics';

interface AdvancedAnalyticsContextType {
  trackExecutiveEvent: (event: string, data?: any) => void;
  getEngagementScore: () => number;
  getPremiumReadinessScore: () => number;
  isHighValueProspect: boolean;
  executiveProfile: ExecutiveProfile;
}

interface ExecutiveProfile {
  segment: 'startup' | 'scaleup' | 'enterprise' | 'fortune500';
  industry: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  budgetRange: 'under100k' | '100k-500k' | '500k-1m' | 'over1m';
  decisionMaking: 'explorer' | 'evaluator' | 'ready' | 'urgent';
}

const AdvancedAnalyticsContext = createContext<AdvancedAnalyticsContextType | null>(null);

export const useAdvancedAnalytics = () => {
  const context = useContext(AdvancedAnalyticsContext);
  if (!context) {
    throw new Error('useAdvancedAnalytics must be used within AdvancedAnalyticsProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const AdvancedAnalyticsProvider: React.FC<Props> = ({ children }) => {
  const { trackEvent, getBounceAnalytics, getSectionTimes } = useEnhancedConversionAnalytics();
  const [executiveProfile, setExecutiveProfile] = useState<ExecutiveProfile>({
    segment: 'enterprise',
    industry: 'technology',
    urgency: 'medium',
    budgetRange: '500k-1m',
    decisionMaking: 'evaluator'
  });
  const [isHighValueProspect, setIsHighValueProspect] = useState(false);

  // Advanced executive event tracking
  const trackExecutiveEvent = (event: string, data?: any) => {
    const executiveData = {
      ...data,
      executive_profile: executiveProfile,
      timestamp: Date.now(),
      engagement_score: getEngagementScore(),
      premium_readiness: getPremiumReadinessScore()
    };

    trackEvent('executive_action', event, 'premium_page', 'executive_analytics', executiveData);
    
    // Update executive profile based on behavior
    updateExecutiveProfile(event, data);
  };

  // Calculate engagement score based on behavior
  const getEngagementScore = (): number => {
    const bounceAnalytics = getBounceAnalytics();
    const sectionTimes = getSectionTimes();
    
    const timeScore = Math.min(bounceAnalytics.total_time_on_page / 180000, 1) * 30; // Max 30 points for 3+ minutes
    const scrollScore = bounceAnalytics.max_scroll_depth * 0.25; // Max 25 points for 100% scroll
    const sectionScore = Object.keys(sectionTimes).length * 5; // 5 points per section viewed
    const interactionScore = bounceAnalytics.interaction_count * 2; // 2 points per interaction
    
    return Math.min(timeScore + scrollScore + sectionScore + interactionScore, 100);
  };

  // Calculate premium readiness score
  const getPremiumReadinessScore = (): number => {
    const engagementScore = getEngagementScore();
    const sectionTimes = getSectionTimes();
    
    // High value sections
    const calculatorTime = sectionTimes['roi-calculator'] || 0;
    const caseStudyTime = sectionTimes['case-studies'] || 0;
    const strategyTime = sectionTimes['strategy-section'] || 0;
    
    const premiumSectionScore = (calculatorTime + caseStudyTime + strategyTime) / 1000 * 10; // 10 points per minute in premium sections
    const profileScore = getProfileScore() * 20; // Max 20 points based on profile
    
    return Math.min(engagementScore * 0.5 + premiumSectionScore + profileScore, 100);
  };

  // Get profile-based score
  const getProfileScore = (): number => {
    let score = 0;
    
    // Segment scoring
    switch (executiveProfile.segment) {
      case 'fortune500': score += 1; break;
      case 'enterprise': score += 0.8; break;
      case 'scaleup': score += 0.6; break;
      case 'startup': score += 0.4; break;
    }
    
    // Urgency scoring
    switch (executiveProfile.urgency) {
      case 'critical': score += 1; break;
      case 'high': score += 0.8; break;
      case 'medium': score += 0.6; break;
      case 'low': score += 0.3; break;
    }
    
    return score / 2; // Normalize to 0-1
  };

  // Update executive profile based on behavior
  const updateExecutiveProfile = (event: string, data?: any) => {
    setExecutiveProfile(prev => {
      const updated = { ...prev };
      
      // Update urgency based on time spent and interactions
      if (event.includes('calculator') || event.includes('form')) {
        if (updated.urgency === 'low') updated.urgency = 'medium';
        else if (updated.urgency === 'medium') updated.urgency = 'high';
      }
      
      // Update decision making stage
      if (event.includes('pricing') || event.includes('contact')) {
        updated.decisionMaking = 'ready';
      } else if (event.includes('case_study') || event.includes('roi')) {
        if (updated.decisionMaking === 'explorer') updated.decisionMaking = 'evaluator';
      }
      
      // Update budget range based on engagement with premium content
      if (event.includes('enterprise') || event.includes('advanced')) {
        if (updated.budgetRange === 'under100k') updated.budgetRange = '100k-500k';
        else if (updated.budgetRange === '100k-500k') updated.budgetRange = '500k-1m';
      }
      
      return updated;
    });
  };

  // Check if high value prospect
  useEffect(() => {
    const engagementScore = getEngagementScore();
    const premiumScore = getPremiumReadinessScore();
    
    const isHighValue = engagementScore > 70 || 
                       premiumScore > 80 || 
                       executiveProfile.segment === 'fortune500' ||
                       (executiveProfile.urgency === 'critical' && executiveProfile.budgetRange === 'over1m');
    
    setIsHighValueProspect(isHighValue);
    
    if (isHighValue) {
      trackExecutiveEvent('high_value_prospect_identified', {
        engagement_score: engagementScore,
        premium_readiness: premiumScore,
        profile: executiveProfile
      });
    }
  }, [executiveProfile]);

  return (
    <AdvancedAnalyticsContext.Provider value={{
      trackExecutiveEvent,
      getEngagementScore,
      getPremiumReadinessScore,
      isHighValueProspect,
      executiveProfile
    }}>
      {children}
    </AdvancedAnalyticsContext.Provider>
  );
};
