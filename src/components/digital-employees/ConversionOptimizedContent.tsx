
import React from "react";
import { motion } from "framer-motion";
import ConversionOptimizedHero from "./ConversionOptimizedHero";
import ElevatedBenefitsSection from "./ElevatedBenefitsSection";
import InteractiveROICalculator from "./InteractiveROICalculator";
import ObjectionEliminationSection from "./ObjectionEliminationSection";
import PremiumSocialProof from "./PremiumSocialProof";
import ComparisonSection from "./ComparisonSection";
import ProcessSection from "./ProcessSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import MobileStickyCTA from "./MobileStickyCTA";
import { useOptimizedMotion } from "@/hooks/useOptimizedMotion";

const ConversionOptimizedContent = React.memo(() => {
  const { shouldReduceMotion, animationConfig } = useOptimizedMotion();

  // Variantes otimizadas
  const sectionVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: animationConfig
    }
  };

  const MotionWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    if (shouldReduceMotion) {
      return <div className={className}>{children}</div>;
    }
    
    return (
      <motion.div 
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      
      {/* Hero Section - Sem animação para carregamento mais rápido */}
      <ConversionOptimizedHero />

      {/* Seções otimizadas com animações condicionais */}
      <MotionWrapper>
        <ElevatedBenefitsSection />
      </MotionWrapper>

      <MotionWrapper>
        <InteractiveROICalculator />
      </MotionWrapper>

      <MotionWrapper>
        <ObjectionEliminationSection />
      </MotionWrapper>

      <MotionWrapper>
        <PremiumSocialProof />
      </MotionWrapper>

      <MotionWrapper>
        <ComparisonSection />
      </MotionWrapper>

      <MotionWrapper>
        <ProcessSection />
      </MotionWrapper>

      <MotionWrapper>
        <FAQSection />
      </MotionWrapper>

      <MotionWrapper>
        <CTASection />
      </MotionWrapper>

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
});

ConversionOptimizedContent.displayName = "ConversionOptimizedContent";

export default ConversionOptimizedContent;
