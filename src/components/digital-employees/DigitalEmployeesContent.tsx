
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

// Lazy loaded components
import LazySection from "@/components/shared/LazySection";
import OptimizedRealTimeMetrics from "@/components/digital-employees/OptimizedRealTimeMetrics";

// Interactive Components with lazy loading
const AdvancedROICalculator = React.lazy(() => import("@/components/digital-employees/interactive/AdvancedROICalculator"));
const ExecutiveAssessment = React.lazy(() => import("@/components/digital-employees/interactive/ExecutiveAssessment"));
const BeforeAfterComparison = React.lazy(() => import("@/components/digital-employees/interactive/BeforeAfterComparison"));
const ProgressTracker = React.lazy(() => import("@/components/digital-employees/interactive/ProgressTracker"));
const InteractiveCasesCarousel = React.lazy(() => import("@/components/digital-employees/InteractiveCasesCarousel"));
const ContextualCTA = React.lazy(() => import("@/components/digital-employees/ContextualCTA"));

import { sectionVariants } from "./DigitalEmployeesAnimations";
import StorytellingScroll from "@/components/digital-employees/StorytellingScroll";
import { PremiumReveal, PremiumCard } from "@/components/digital-employees/PremiumAnimations";
import { useBehavioralSegmentation } from "@/hooks/useBehavioralSegmentation";

// Optimized section wrapper with reduced spacing
const OptimizedSection = React.memo(({ 
  children, 
  id, 
  className = "",
  spacing = "py-6" // Reduced from py-12
}: { 
  children: React.ReactNode;
  id: string;
  className?: string;
  spacing?: string;
}) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={sectionVariants}
    className={`reveal-section section-premium container-premium ${spacing} ${className}`}
    id={id}
  >
    {children}
  </motion.div>
));

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
    <div className="min-h-screen overflow-x-hidden pt-20 md:pt-12 pb-12 md:pb-8">
      {/* Progress Tracker - Lazy loaded */}
      <LazySection>
        <React.Suspense fallback={<div className="h-1" />}>
          <ProgressTracker variant="mobile" />
          <ProgressTracker variant="desktop" />
        </React.Suspense>
      </LazySection>

      {/* Hero Section - Immediate load */}
      <OptimizedSection id="hero" spacing="pb-8">
        <PremiumReveal>
          <HeroSection />
        </PremiumReveal>
      </OptimizedSection>

      {/* Storytelling Scroll - Mobile Only */}
      <StorytellingScroll />

      {/* Quick Social Proof */}
      <OptimizedSection id="quick-social-proof" spacing="py-6">
        <PremiumReveal delay={0.1}>
          <QuickSocialProof />
        </PremiumReveal>
      </OptimizedSection>

      {/* Real-Time Metrics - Optimized */}
      <LazySection id="real-time-metrics">
        <OptimizedRealTimeMetrics />
      </LazySection>

      {/* Client Logos Section */}
      <OptimizedSection id="client-logos" spacing="py-8">
        <PremiumReveal delay={0.2}>
          <ClientLogosSection />
        </PremiumReveal>
      </OptimizedSection>

      {/* Contextual CTA - Lazy loaded */}
      <LazySection className="container-premium py-4" id="cta-after-logos">
        <React.Suspense fallback={<div className="h-12" />}>
          <ContextualCTA sectionId="client-logos" />
        </React.Suspense>
      </LazySection>

      {/* Advanced ROI Calculator - Lazy loaded */}
      <LazySection id="advanced-roi-calculator">
        <OptimizedSection id="roi-calculator-section" spacing="py-8">
          <PremiumCard delay={0.1}>
            <React.Suspense fallback={<div className="h-96 premium-glass rounded-lg animate-pulse" />}>
              <AdvancedROICalculator />
            </React.Suspense>
          </PremiumCard>
        </OptimizedSection>
      </LazySection>

      {/* Executive Assessment - Lazy loaded */}
      <LazySection id="executive-assessment">
        <OptimizedSection id="assessment-section" spacing="py-8">
          <PremiumCard delay={0.2}>
            <React.Suspense fallback={<div className="h-80 premium-glass rounded-lg animate-pulse" />}>
              <ExecutiveAssessment />
            </React.Suspense>
          </PremiumCard>
        </OptimizedSection>
      </LazySection>

      {/* Interactive Cases Carousel - Lazy loaded */}
      <LazySection id="interactive-cases">
        <React.Suspense fallback={<div className="h-96 bg-black/5 animate-pulse" />}>
          <InteractiveCasesCarousel />
        </React.Suspense>
      </LazySection>

      {/* Before After Comparison - Lazy loaded */}
      <LazySection id="before-after-comparison">
        <OptimizedSection id="comparison-section" spacing="py-8">
          <PremiumCard delay={0.3}>
            <React.Suspense fallback={<div className="h-96 premium-glass rounded-lg animate-pulse" />}>
              <BeforeAfterComparison />
            </React.Suspense>
          </PremiumCard>
        </OptimizedSection>
      </LazySection>

      {/* Original ROI Chart Section */}
      <OptimizedSection id="roi-chart-section" spacing="py-8">
        <PremiumReveal delay={0.1}>
          <ROIChart />
        </PremiumReveal>
      </OptimizedSection>
      
      {/* Use Cases Section */}
      <OptimizedSection id="use-cases-section" spacing="py-8">
        <PremiumReveal delay={0.2}>
          <UseCasesSection />
        </PremiumReveal>
      </OptimizedSection>
      
      {/* Premium Social Proof Section */}
      <OptimizedSection id="premium-social-proof" spacing="py-8">
        <PremiumCard delay={0.1}>
          <PremiumSocialProof />
        </PremiumCard>
      </OptimizedSection>
      
      {/* Process Section */}
      <OptimizedSection id="process-section" spacing="py-8">
        <PremiumReveal delay={0.2}>
          <ProcessSection />
        </PremiumReveal>
      </OptimizedSection>
      
      {/* Comparison Section */}
      <OptimizedSection id="comparison-section-main" spacing="py-8">
        <PremiumCard delay={0.1}>
          <ComparisonSection />
        </PremiumCard>
      </OptimizedSection>
      
      {/* FAQ Section */}
      <OptimizedSection id="faq-section" spacing="py-8">
        <PremiumReveal delay={0.2}>
          <FAQSection />
        </PremiumReveal>
      </OptimizedSection>

      {/* Ideal For Section */}
      <OptimizedSection id="ideal-for-section" spacing="py-8">
        <PremiumCard delay={0.1}>
          <IdealForSection />
        </PremiumCard>
      </OptimizedSection>
      
      {/* Final CTA Section */}
      <OptimizedSection id="final-cta" spacing="py-8 pb-12">
        <PremiumReveal delay={0.1}>
          <CTASection />
        </PremiumReveal>
      </OptimizedSection>
    </div>
  );
};

export default DigitalEmployeesContent;
