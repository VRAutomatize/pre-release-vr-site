
import React from "react";
import { motion } from "framer-motion";
import PremiumExecutiveHeroRedesign from "./PremiumExecutiveHeroRedesign";
import ElevatedBenefitsSection from "./ElevatedBenefitsSection";
import ExecutiveROICalculator from "./ExecutiveROICalculator";
import UltraPremiumSocialProof from "./UltraPremiumSocialProof";
import ObjectionEliminationSection from "./ObjectionEliminationSection";
import ComparisonSection from "./ComparisonSection";
import ProcessSection from "./ProcessSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import PremiumMobileStickyCTA from "./PremiumMobileStickyCTA";
import { useOptimizedMotion } from "@/hooks/useOptimizedMotion";

const PremiumConversionContent = React.memo(() => {
  const { shouldReduceMotion, animationConfig } = useOptimizedMotion();

  // Variantes premium otimizadas
  const premiumSectionVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ...animationConfig, duration: 0.8 }
    }
  };

  const MotionWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    if (shouldReduceMotion) {
      return <div className={`premium-animate-on-scroll ${className}`}>{children}</div>;
    }
    
    return (
      <motion.div 
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={premiumSectionVariants}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      
      {/* Premium Executive Hero - Nova versão reformulada */}
      <PremiumExecutiveHeroRedesign />

      {/* Executive Benefits */}
      <MotionWrapper>
        <ElevatedBenefitsSection />
      </MotionWrapper>

      {/* Executive ROI Calculator */}
      <MotionWrapper>
        <ExecutiveROICalculator />
      </MotionWrapper>

      {/* Ultra Premium Social Proof */}
      <MotionWrapper>
        <UltraPremiumSocialProof />
      </MotionWrapper>

      {/* Objection Elimination */}
      <MotionWrapper>
        <ObjectionEliminationSection />
      </MotionWrapper>

      {/* Comparison Section */}
      <MotionWrapper>
        <ComparisonSection />
      </MotionWrapper>

      {/* Process Section */}
      <MotionWrapper>
        <ProcessSection />
      </MotionWrapper>

      {/* FAQ Section */}
      <MotionWrapper>
        <FAQSection />
      </MotionWrapper>

      {/* Final CTA */}
      <MotionWrapper>
        <CTASection />
      </MotionWrapper>

      {/* Premium Mobile Sticky CTA */}
      <PremiumMobileStickyCTA />
    </div>
  );
});

PremiumConversionContent.displayName = "PremiumConversionContent";

export default PremiumConversionContent;
