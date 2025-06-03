
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

// Phase 1 - Interactive Components
import AdvancedROICalculator from "@/components/digital-employees/interactive/AdvancedROICalculator";
import ExecutiveAssessment from "@/components/digital-employees/interactive/ExecutiveAssessment";
import BeforeAfterComparison from "@/components/digital-employees/interactive/BeforeAfterComparison";
import ProgressTracker from "@/components/digital-employees/interactive/ProgressTracker";

// Phase 3 & 4 - Dynamic Social Proof & Behavioral Personalization
import InteractiveCasesCarousel from "@/components/digital-employees/InteractiveCasesCarousel";
import RealTimeMetrics from "@/components/digital-employees/RealTimeMetrics";
import ContextualCTA from "@/components/digital-employees/ContextualCTA";

import { sectionVariants } from "./DigitalEmployeesAnimations";
import StorytellingScroll from "@/components/digital-employees/StorytellingScroll";
import { PremiumReveal, PremiumCard } from "@/components/digital-employees/PremiumAnimations";
import { useBehavioralSegmentation } from "@/hooks/useBehavioralSegmentation";

const DigitalEmployeesContent = () => {
  const { trackSectionView } = useBehavioralSegmentation();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            trackSectionView(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections with IDs
    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [trackSectionView]);

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
        id="quick-social-proof"
      >
        <PremiumReveal delay={0.1}>
          <QuickSocialProof />
        </PremiumReveal>
      </motion.div>

      {/* Real-Time Metrics - NEW */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section"
        id="real-time-metrics"
      >
        <RealTimeMetrics />
      </motion.div>

      {/* Client Logos Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section section-premium container-premium"
        id="client-logos"
      >
        <PremiumReveal delay={0.2}>
          <ClientLogosSection />
        </PremiumReveal>
      </motion.div>

      {/* Contextual CTA */}
      <div className="container-premium" id="cta-after-logos">
        <ContextualCTA sectionId="client-logos" />
      </div>

      {/* Advanced ROI Calculator */}
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

      {/* Contextual CTA after Calculator */}
      <div className="container-premium" id="cta-after-calculator">
        <ContextualCTA sectionId="roi-calculator" />
      </div>

      {/* Executive Assessment */}
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

      {/* Contextual CTA after Assessment */}
      <div className="container-premium" id="cta-after-assessment">
        <ContextualCTA sectionId="executive-assessment" />
      </div>

      {/* Interactive Cases Carousel - NEW */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="reveal-section"
        id="interactive-cases"
      >
        <InteractiveCasesCarousel />
      </motion.div>

      {/* Contextual CTA after Cases */}
      <div className="container-premium" id="cta-after-cases">
        <ContextualCTA sectionId="cases" />
      </div>

      {/* Before After Comparison */}
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

      {/* Original ROI Chart Section */}
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
      
      {/* FAQ Section */}
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

      {/* Contextual CTA after FAQ */}
      <div className="container-premium" id="cta-after-faq">
        <ContextualCTA sectionId="faq" />
      </div>
      
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
        id="final-cta"
      >
        <PremiumReveal delay={0.1}>
          <CTASection />
        </PremiumReveal>
      </motion.div>
    </div>
  );
};

export default DigitalEmployeesContent;
