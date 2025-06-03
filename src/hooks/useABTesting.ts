
import { useState, useEffect, useCallback } from 'react';
import { useConversionAnalytics } from './useConversionAnalytics';

interface ABVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, any>;
}

interface ABTest {
  testId: string;
  testName: string;
  variants: ABVariant[];
  isActive: boolean;
}

export const useABTesting = () => {
  const { trackEvent } = useConversionAnalytics();
  const [activeVariants, setActiveVariants] = useState<Record<string, string>>({});

  // Define available A/B tests
  const tests: ABTest[] = [
    {
      testId: 'hero_headline',
      testName: 'Hero Headline Test',
      isActive: true,
      variants: [
        {
          id: 'control',
          name: 'Original',
          weight: 50,
          config: {
            headline: 'Funcionários Digitais que Automatizam seu Negócio',
            subheadline: 'Reduza custos em até 80% e aumente a eficiência com IA'
          }
        },
        {
          id: 'variant_a',
          name: 'Results Focused',
          weight: 50,
          config: {
            headline: 'Economize R$ 2M+ por Ano com Funcionários Digitais',
            subheadline: 'Cases reais de empresas que transformaram operações com IA'
          }
        }
      ]
    },
    {
      testId: 'cta_primary',
      testName: 'Primary CTA Test',
      isActive: true,
      variants: [
        {
          id: 'control',
          name: 'Original',
          weight: 50,
          config: {
            text: 'Falar com Especialista',
            style: 'button-premium'
          }
        },
        {
          id: 'variant_a',
          name: 'Urgency',
          weight: 50,
          config: {
            text: 'Garantir Consultoria Gratuita',
            style: 'button-premium bg-red-500 hover:bg-red-600'
          }
        }
      ]
    }
  ];

  // Get user's assigned variant for a test
  const getVariant = useCallback((testId: string) => {
    if (activeVariants[testId]) {
      return activeVariants[testId];
    }

    const test = tests.find(t => t.testId === testId && t.isActive);
    if (!test) return 'control';

    // Use localStorage to persist variant assignment
    const storageKey = `ab_test_${testId}`;
    let assignedVariant = localStorage.getItem(storageKey);

    if (!assignedVariant) {
      // Assign variant based on weights
      const random = Math.random() * 100;
      let cumulative = 0;
      
      for (const variant of test.variants) {
        cumulative += variant.weight;
        if (random <= cumulative) {
          assignedVariant = variant.id;
          break;
        }
      }

      if (!assignedVariant) assignedVariant = 'control';
      localStorage.setItem(storageKey, assignedVariant);

      // Track variant assignment
      trackEvent('ab_test_assigned', 'assign', testId, 'testing', {
        testId,
        variantId: assignedVariant,
        testName: test.testName
      });
    }

    setActiveVariants(prev => ({
      ...prev,
      [testId]: assignedVariant!
    }));

    return assignedVariant;
  }, [activeVariants, trackEvent]);

  // Get variant configuration
  const getVariantConfig = useCallback((testId: string) => {
    const variantId = getVariant(testId);
    const test = tests.find(t => t.testId === testId);
    const variant = test?.variants.find(v => v.id === variantId);
    return variant?.config || {};
  }, [getVariant]);

  // Track conversion for A/B test
  const trackConversion = useCallback((testId: string, conversionType: string = 'default') => {
    const variantId = getVariant(testId);
    trackEvent('ab_test_conversion', 'convert', testId, 'testing', {
      testId,
      variantId,
      conversionType,
      timestamp: new Date().toISOString()
    });
  }, [getVariant, trackEvent]);

  return {
    getVariant,
    getVariantConfig,
    trackConversion,
    activeTests: tests.filter(t => t.isActive)
  };
};
