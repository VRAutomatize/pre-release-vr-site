import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/digital-employees/HeroSection";
import ClientLogosSection from "@/components/digital-employees/ClientLogosSection";
import CTASection from "@/components/digital-employees/CTASection";
import UseCasesSection from "@/components/digital-employees/UseCasesSection";
import ProcessSection from "@/components/digital-employees/ProcessSection";
import ComparisonSection from "@/components/digital-employees/ComparisonSection";
import IdealForSection from "@/components/digital-employees/IdealForSection";
import PremiumSocialProof from "@/components/digital-employees/PremiumSocialProof";
import ROIChart from "@/components/digital-employees/ROIChart";
import FAQSection from "@/components/digital-employees/FAQSection";
import QuickSocialProof from "@/components/digital-employees/QuickSocialProof";
import MicroCTA from "@/components/digital-employees/MicroCTA";

// New Interactive Components - Phase 1
import AdvancedROICalculator from "@/components/digital-employees/interactive/AdvancedROICalculator";
import ExecutiveAssessment from "@/components/digital-employees/interactive/ExecutiveAssessment";
import BeforeAfterComparison from "@/components/digital-employees/interactive/BeforeAfterComparison";
import ProgressTracker from "@/components/digital-employees/interactive/ProgressTracker";

import { sectionVariants } from "./DigitalEmployeesAnimations";

import StorytellingScroll from "@/components/digital-employees/StorytellingScroll";
import { PremiumReveal, PremiumCard } from "@/components/digital-employees/PremiumAnimations";

const DigitalEmployeesContent = () => {
  return (
    <div className="min-h-screen overflow-x-hidden pt-20 md:pt-12 pb-24 md:pb-12">
      {/* Progress Tracker - Both Mobile and Desktop */}
      <ProgressTracker variant="mobile" />
      <ProgressTracker variant="desktop" />

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="section-premium"
        id="hero"
      >
        <PremiumReveal>
          <HeroSection />
        </PremiumReveal>
      </motion.div>

      {/* Storytelling Scroll - Mobile Only */}
      <StorytellingScroll />

      {/* Quick Social Proof - Right after hero */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
      >
        <PremiumReveal delay={0.1}>
          <QuickSocialProof />
        </PremiumReveal>
      </motion.div>

      {/* Client Logos Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
      >
        <PremiumReveal delay={0.2}>
          <ClientLogosSection />
        </PremiumReveal>
      </motion.div>

      {/* NEW: Advanced ROI Calculator - Interactive */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="advanced-roi-calculator"
      >
        <PremiumCard delay={0.1}>
          <AdvancedROICalculator />
        </PremiumCard>
      </motion.div>

      {/* Micro CTA - Urgency */}
      <div className="container-premium">
        <div className="micro-cta-spacing">
          <PremiumReveal delay={0.1}>
            <MicroCTA variant="urgency" />
          </PremiumReveal>
        </div>
      </div>

      {/* NEW: Executive Assessment - Interactive */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="executive-assessment"
      >
        <PremiumCard delay={0.2}>
          <ExecutiveAssessment />
        </PremiumCard>
      </motion.div>

      {/* NEW: Before After Comparison - Interactive */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="before-after-comparison"
      >
        <PremiumCard delay={0.3}>
          <BeforeAfterComparison />
        </PremiumCard>
      </motion.div>

      {/* Original ROI Chart Section - Kept for additional context */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="roi-chart-section"
      >
        <PremiumReveal delay={0.1}>
          <ROIChart />
        </PremiumReveal>
      </motion.div>
      
      {/* Micro CTA - Calculator */}
      <div className="container-premium">
        <div className="micro-cta-spacing">
          <PremiumReveal delay={0.1}>
            <MicroCTA variant="calculator" />
          </PremiumReveal>
        </div>
      </div>

      {/* Use Cases Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="use-cases-section"
      >
        <PremiumReveal delay={0.2}>
          <UseCasesSection />
        </PremiumReveal>
      </motion.div>

      {/* Micro CTA - Executive */}
      <div className="container-premium">
        <div className="micro-cta-spacing">
          <PremiumReveal delay={0.1}>
            <MicroCTA variant="executive" />
          </PremiumReveal>
        </div>
      </div>
      
      {/* Premium Social Proof Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="premium-social-proof"
      >
        <PremiumCard delay={0.1}>
          <PremiumSocialProof />
        </PremiumCard>
      </motion.div>
      
      {/* Process Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="process-section"
      >
        <PremiumReveal delay={0.2}>
          <ProcessSection />
        </PremiumReveal>
      </motion.div>
      
      {/* Comparison Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="comparison-section"
      >
        <PremiumCard delay={0.1}>
          <ComparisonSection />
        </PremiumCard>
      </motion.div>

      {/* Micro CTA - Default */}
      <div className="container-premium">
        <div className="micro-cta-spacing">
          <PremiumReveal delay={0.1}>
            <MicroCTA variant="default" />
          </PremiumReveal>
        </div>
      </div>
      
      {/* FAQ Section - Moved higher up */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="faq-section"
      >
        <PremiumReveal delay={0.2}>
          <FAQSection />
        </PremiumReveal>
      </motion.div>
      
      {/* Ideal For Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="ideal-for-section"
      >
        <PremiumCard delay={0.1}>
          <IdealForSection />
        </PremiumCard>
      </motion.div>
      
      {/* Final CTA Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
      >
        <PremiumReveal delay={0.1}>
          <CTASection />
        </PremiumReveal>
      </motion.div>
    </div>
  );
};

export default DigitalEmployeesContent;
