
import React from "react";
import { motion } from "framer-motion";
import PremiumExecutiveHeroRedesign from "./PremiumExecutiveHeroRedesign";
import ElevatedBenefitsSection from "./ElevatedBenefitsSection";
import ExecutiveROICalculatorAdvanced from "./ExecutiveROICalculatorAdvanced";
import UltraPremiumSocialProofAdvanced from "./UltraPremiumSocialProofAdvanced";
import ExecutiveStrategySection from "./ExecutiveStrategySection";
import BusinessTransformationSection from "./BusinessTransformationSection";
import ExecutiveAuthoritySection from "./ExecutiveAuthoritySection";
import ObjectionEliminationSection from "./ObjectionEliminationSection";
import ComparisonSection from "./ComparisonSection";
import ProcessSection from "./ProcessSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import PremiumMobileStickyCTA from "./PremiumMobileStickyCTA";
import { useOptimizedMotion } from "@/hooks/useOptimizedMotion";

const PremiumConversionContent = React.memo(() => {
  const { shouldReduceMotion, animationConfig } = useOptimizedMotion();

  // Premium animation variants
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
      
      {/* Premium Executive Hero - Redesigned version */}
      <PremiumExecutiveHeroRedesign />

      {/* Executive Benefits */}
      <MotionWrapper>
        <ElevatedBenefitsSection />
      </MotionWrapper>

      {/* Advanced Executive ROI Calculator */}
      <MotionWrapper>
        <ExecutiveROICalculatorAdvanced />
      </MotionWrapper>

      {/* Ultra Premium Social Proof - Advanced version */}
      <MotionWrapper>
        <UltraPremiumSocialProofAdvanced />
      </MotionWrapper>

      {/* Executive Strategy Section - Phase 6 */}
      <MotionWrapper>
        <ExecutiveStrategySection />
      </MotionWrapper>

      {/* Business Transformation Section - Phase 6 */}
      <MotionWrapper>
        <BusinessTransformationSection />
      </MotionWrapper>

      {/* Executive Authority Section - Phase 6 */}
      <MotionWrapper>
        <ExecutiveAuthoritySection />
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
