
import React, { useEffect, useState } from 'react';
import { useAdvancedAnalytics } from './AdvancedAnalyticsProvider';
import { PremiumCard, PremiumBadge } from './PremiumComponents';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

interface PersonalizationData {
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendedContent: string[];
  ctaVariant: 'standard' | 'premium' | 'urgent' | 'vip';
  messagingTone: 'informative' | 'persuasive' | 'urgent' | 'exclusive';
}

const DynamicPersonalization: React.FC = () => {
  const { executiveProfile, getEngagementScore, getPremiumReadinessScore, trackExecutiveEvent } = useAdvancedAnalytics();
  const [personalization, setPersonalization] = useState<PersonalizationData>({
    urgencyLevel: 'medium',
    recommendedContent: [],
    ctaVariant: 'standard',
    messagingTone: 'informative'
  });

  useEffect(() => {
    const engagementScore = getEngagementScore();
    const premiumScore = getPremiumReadinessScore();
    
    // Determine personalization strategy
    const newPersonalization: PersonalizationData = {
      urgencyLevel: executiveProfile.urgency,
      recommendedContent: getRecommendedContent(executiveProfile, engagementScore),
      ctaVariant: getCTAVariant(executiveProfile, premiumScore),
      messagingTone: getMessagingTone(executiveProfile, engagementScore)
    };
    
    setPersonalization(newPersonalization);
    
    // Track personalization applied
    trackExecutiveEvent('personalization_applied', {
      personalization: newPersonalization,
      engagement_score: engagementScore,
      premium_score: premiumScore
    });
  }, [executiveProfile, getEngagementScore, getPremiumReadinessScore]);

  const getRecommendedContent = (profile: any, engagement: number): string[] => {
    const content = [];
    
    if (profile.segment === 'fortune500' || profile.budgetRange === 'over1m') {
      content.push('Enterprise Case Studies', 'ROI Calculator Advanced', 'Executive Consultation');
    }
    
    if (engagement > 70) {
      content.push('Premium Resources', 'Methodology Deep Dive', 'Implementation Timeline');
    }
    
    if (profile.urgency === 'critical' || profile.urgency === 'high') {
      content.push('Fast Track Implementation', 'Emergency Automation', 'Rapid ROI Program');
    }
    
    return content;
  };

  const getCTAVariant = (profile: any, premiumScore: number): 'standard' | 'premium' | 'urgent' | 'vip' => {
    if (profile.segment === 'fortune500' && premiumScore > 80) return 'vip';
    if (profile.urgency === 'critical') return 'urgent';
    if (premiumScore > 70 || profile.budgetRange === 'over1m') return 'premium';
    return 'standard';
  };

  const getMessagingTone = (profile: any, engagement: number): 'informative' | 'persuasive' | 'urgent' | 'exclusive' => {
    if (profile.segment === 'fortune500') return 'exclusive';
    if (profile.urgency === 'critical') return 'urgent';
    if (engagement > 60) return 'persuasive';
    return 'informative';
  };

  const getUrgencyMessage = () => {
    switch (personalization.urgencyLevel) {
      case 'critical':
        return {
          icon: Zap,
          text: "Implementação de emergência disponível em 48h",
          color: "text-red-400",
          bg: "bg-red-500/10 border-red-500/20"
        };
      case 'high':
        return {
          icon: Clock,
          text: "Apenas 3 vagas restantes para Q1 2025",
          color: "text-orange-400",
          bg: "bg-orange-500/10 border-orange-500/20"
        };
      case 'medium':
        return {
          icon: Target,
          text: "Garanta sua vaga para implementação prioritária",
          color: "text-premium-gold",
          bg: "bg-premium-gold/10 border-premium-gold/20"
        };
      default:
        return {
          icon: TrendingUp,
          text: "Consultoria executiva personalizada disponível",
          color: "text-premium-blue-light",
          bg: "bg-premium-blue/10 border-premium-blue/20"
        };
    }
  };

  const urgencyData = getUrgencyMessage();

  return (
    <div className="space-y-6">
      {/* Dynamic Urgency Banner */}
      <PremiumCard className={`p-6 ${urgencyData.bg} border`}>
        <div className="flex items-center gap-4">
          <urgencyData.icon className={`w-6 h-6 ${urgencyData.color}`} />
          <div className="flex-1">
            <p className={`font-semibold ${urgencyData.color}`}>
              {urgencyData.text}
            </p>
            {personalization.urgencyLevel === 'critical' && (
              <p className="text-white/70 text-sm mt-1">
                Suporte 24/7 • Implementação acelerada • Garantia de resultados
              </p>
            )}
          </div>
        </div>
      </PremiumCard>

      {/* Recommended Content */}
      {personalization.recommendedContent.length > 0 && (
        <PremiumCard className="p-6">
          <h4 className="text-white font-semibold mb-4">Recomendado para seu perfil:</h4>
          <div className="flex flex-wrap gap-2">
            {personalization.recommendedContent.map((content, index) => (
              <PremiumBadge key={index} variant="gold" size="sm">
                {content}
              </PremiumBadge>
            ))}
          </div>
        </PremiumCard>
      )}

      {/* Executive Profile Indicator */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-premium-gold text-sm">
          <div className="w-2 h-2 bg-premium-gold rounded-full animate-pulse"></div>
          <span>
            Perfil: {executiveProfile.segment.charAt(0).toUpperCase() + executiveProfile.segment.slice(1)} | 
            Urgência: {executiveProfile.urgency} | 
            Orçamento: {executiveProfile.budgetRange}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DynamicPersonalization;
