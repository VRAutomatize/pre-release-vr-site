
import React, { useEffect, useState } from 'react';
import { useAdvancedAnalytics } from './AdvancedAnalyticsProvider';
import { PremiumCard, PremiumButton } from './PremiumComponents';
import { Brain, Target, Zap, Users } from 'lucide-react';

interface OptimizationTest {
  id: string;
  name: string;
  variant: 'A' | 'B';
  conversionRate: number;
  confidence: number;
  status: 'running' | 'completed' | 'winner';
}

interface ConversionData {
  currentVariant: string;
  optimizations: string[];
  predictedLift: number;
  confidenceScore: number;
}

const ConversionOptimizationEngine: React.FC = () => {
  const { executiveProfile, getEngagementScore, getPremiumReadinessScore, trackExecutiveEvent } = useAdvancedAnalytics();
  const [activeTests, setActiveTests] = useState<OptimizationTest[]>([]);
  const [conversionData, setConversionData] = useState<ConversionData>({
    currentVariant: 'premium-v2',
    optimizations: [],
    predictedLift: 0,
    confidenceScore: 0
  });

  useEffect(() => {
    // Initialize A/B tests based on user profile
    initializeTests();
    calculateOptimizations();
  }, [executiveProfile]);

  const initializeTests = () => {
    const tests: OptimizationTest[] = [
      {
        id: 'hero-messaging',
        name: 'Hero Message Optimization',
        variant: Math.random() > 0.5 ? 'A' : 'B',
        conversionRate: 12.3,
        confidence: 95,
        status: 'running'
      },
      {
        id: 'cta-positioning',
        name: 'CTA Button Positioning',
        variant: Math.random() > 0.5 ? 'A' : 'B',
        conversionRate: 8.7,
        confidence: 87,
        status: 'running'
      },
      {
        id: 'pricing-display',
        name: 'Pricing Information Display',
        variant: Math.random() > 0.5 ? 'A' : 'B',
        conversionRate: 15.2,
        confidence: 92,
        status: 'winner'
      }
    ];

    setActiveTests(tests);
    
    // Track test assignment
    trackExecutiveEvent('ab_test_assigned', {
      tests: tests.map(t => ({ id: t.id, variant: t.variant }))
    });
  };

  const calculateOptimizations = () => {
    const engagement = getEngagementScore();
    const premiumScore = getPremiumReadinessScore();
    
    const optimizations = [];
    let predictedLift = 0;
    
    // Dynamic optimizations based on user behavior
    if (engagement < 40) {
      optimizations.push('Simplified messaging', 'Reduced cognitive load');
      predictedLift += 15;
    }
    
    if (premiumScore > 70) {
      optimizations.push('Premium positioning', 'Executive-focused CTAs');
      predictedLift += 25;
    }
    
    if (executiveProfile.urgency === 'critical') {
      optimizations.push('Urgency indicators', 'Fast-track options');
      predictedLift += 35;
    }
    
    if (executiveProfile.segment === 'fortune500') {
      optimizations.push('Enterprise social proof', 'White-glove service');
      predictedLift += 40;
    }
    
    const confidenceScore = Math.min(95, 60 + (engagement * 0.3) + (premiumScore * 0.2));
    
    setConversionData({
      currentVariant: getOptimalVariant(),
      optimizations,
      predictedLift: Math.min(predictedLift, 75),
      confidenceScore
    });
  };

  const getOptimalVariant = (): string => {
    const { segment, urgency, budgetRange } = executiveProfile;
    
    if (segment === 'fortune500' && budgetRange === 'over1m') {
      return 'enterprise-vip';
    }
    
    if (urgency === 'critical') {
      return 'urgent-fast-track';
    }
    
    if (getPremiumReadinessScore() > 80) {
      return 'premium-executive';
    }
    
    return 'standard-optimized';
  };

  const handleOptimizationApply = (optimization: string) => {
    trackExecutiveEvent('optimization_applied', {
      optimization,
      variant: conversionData.currentVariant,
      predicted_lift: conversionData.predictedLift
    });
    
    // Simulate applying optimization
    setConversionData(prev => ({
      ...prev,
      optimizations: prev.optimizations.filter(opt => opt !== optimization),
      predictedLift: prev.predictedLift + 5
    }));
  };

  return (
    <div className="space-y-8">
      {/* Optimization Overview */}
      <PremiumCard className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <Brain className="w-8 h-8 text-premium-gold" />
          <div>
            <h3 className="text-white font-semibold text-xl">Otimização Inteligente Ativa</h3>
            <p className="text-white/70">Sistema adaptativo baseado no seu perfil executivo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-premium-gold mb-2">
              {conversionData.predictedLift}%
            </div>
            <div className="text-white/80 text-sm">Lift Previsto</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-premium-blue-light mb-2">
              {conversionData.confidenceScore}%
            </div>
            <div className="text-white/80 text-sm">Confiança</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-premium-green mb-2">
              {activeTests.filter(t => t.status === 'winner').length}
            </div>
            <div className="text-white/80 text-sm">Testes Vencedores</div>
          </div>
        </div>
      </PremiumCard>

      {/* Active Optimizations */}
      {conversionData.optimizations.length > 0 && (
        <PremiumCard className="p-8">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-premium-gold" />
            Otimizações Recomendadas
          </h4>
          
          <div className="space-y-3">
            {conversionData.optimizations.map((optimization, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white">{optimization}</span>
                <PremiumButton 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleOptimizationApply(optimization)}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Aplicar
                </PremiumButton>
              </div>
            ))}
          </div>
        </PremiumCard>
      )}

      {/* A/B Test Results */}
      <PremiumCard className="p-8">
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-premium-blue-light" />
          Testes A/B Ativos
        </h4>
        
        <div className="space-y-4">
          {activeTests.map((test) => (
            <div key={test.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-medium">{test.name}</div>
                <div className="text-white/60 text-sm">
                  Variante {test.variant} • {test.conversionRate}% conversão
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm px-3 py-1 rounded-full ${
                  test.status === 'winner' ? 'bg-green-500/20 text-green-400' :
                  test.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {test.status}
                </div>
                <div className="text-white/60 text-xs mt-1">
                  {test.confidence}% confiança
                </div>
              </div>
            </div>
          ))}
        </div>
      </PremiumCard>

      {/* Current Variant Info */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-premium-gold text-sm">
          <div className="w-2 h-2 bg-premium-gold rounded-full animate-pulse"></div>
          <span>Variante Atual: {conversionData.currentVariant}</span>
        </div>
      </div>
    </div>
  );
};

export default ConversionOptimizationEngine;
