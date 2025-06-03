
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

const DigitalEmployeesContent = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden mobile-full-width pt-20 md:pt-12 pb-24 md:pb-12">
      {/* Progress Tracker - Both Mobile and Desktop */}
      <ProgressTracker variant="mobile" />
      <ProgressTracker variant="desktop" />

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="section-spacing-large"
      >
        <HeroSection />
      </motion.div>

      {/* Quick Social Proof - Right after hero */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing mobile-container-full"
      >
        <QuickSocialProof />
      </motion.div>

      {/* Client Logos Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing mobile-container-full"
      >
        <ClientLogosSection />
      </motion.div>

      {/* NEW: Advanced ROI Calculator - Interactive */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="advanced-roi-calculator"
      >
        <AdvancedROICalculator />
      </motion.div>

      {/* Micro CTA - Urgency */}
      <div className="mobile-container-tight">
        <div className="micro-cta-spacing">
          <MicroCTA variant="urgency" />
        </div>
      </div>

      {/* NEW: Executive Assessment - Interactive */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="executive-assessment"
      >
        <ExecutiveAssessment />
      </motion.div>

      {/* NEW: Before After Comparison - Interactive */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="before-after-comparison"
      >
        <BeforeAfterComparison />
      </motion.div>

      {/* Original ROI Chart Section - Kept for additional context */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="roi-chart-section"
      >
        <ROIChart />
      </motion.div>
      
      {/* Micro CTA - Calculator */}
      <div className="mobile-container-tight">
        <div className="micro-cta-spacing">
          <MicroCTA variant="calculator" />
        </div>
      </div>

      {/* Use Cases Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="use-cases-section"
      >
        <UseCasesSection />
      </motion.div>

      {/* Micro CTA - Executive */}
      <div className="mobile-container-tight">
        <div className="micro-cta-spacing">
          <MicroCTA variant="executive" />
        </div>
      </div>
      
      {/* Premium Social Proof Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="premium-social-proof"
      >
        <PremiumSocialProof />
      </motion.div>
      
      {/* Process Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="process-section"
      >
        <ProcessSection />
      </motion.div>
      
      {/* Comparison Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="comparison-section"
      >
        <ComparisonSection />
      </motion.div>

      {/* Micro CTA - Default */}
      <div className="mobile-container-tight">
        <div className="micro-cta-spacing">
          <MicroCTA variant="default" />
        </div>
      </div>
      
      {/* FAQ Section - Moved higher up */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="faq-section"
      >
        <FAQSection />
      </motion.div>
      
      {/* Ideal For Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing-large mobile-container-tight"
        id="ideal-for-section"
      >
        <IdealForSection />
      </motion.div>
      
      {/* Final CTA Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-spacing mobile-container-tight"
      >
        <CTASection />
      </motion.div>
    </div>
  );
};

export default DigitalEmployeesContent;
