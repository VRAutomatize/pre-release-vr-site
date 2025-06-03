
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

// Lazy loaded components - apenas os essenciais
import LazySection from "@/components/shared/LazySection";
import OptimizedRealTimeMetrics from "@/components/digital-employees/OptimizedRealTimeMetrics";
import StorytellingScroll from "@/components/digital-employees/StorytellingScroll";

// Componente de seção ultra-otimizado
const OptimizedSection = React.memo(({ 
  children, 
  id, 
  className = "",
  spacing = "py-4"
}: { 
  children: React.ReactNode;
  id: string;
  className?: string;
  spacing?: string;
}) => (
  <section 
    className={`container-premium ${spacing} ${className}`}
    id={id}
  >
    {children}
  </section>
));

const DigitalEmployeesContent = React.memo(() => {
  return (
    <div className="min-h-screen overflow-x-hidden pt-20 md:pt-12 pb-8">
      {/* Hero Section - Carregamento imediato */}
      <OptimizedSection id="hero" spacing="pb-6">
        <HeroSection />
      </OptimizedSection>

      {/* Storytelling Scroll - Mobile Only, Simplificado */}
      <StorytellingScroll />

      {/* Quick Social Proof */}
      <OptimizedSection id="quick-social-proof" spacing="py-4">
        <QuickSocialProof />
      </OptimizedSection>

      {/* Real-Time Metrics - Otimizado */}
      <LazySection id="real-time-metrics">
        <OptimizedRealTimeMetrics />
      </LazySection>

      {/* Client Logos Section */}
      <OptimizedSection id="client-logos" spacing="py-6">
        <ClientLogosSection />
      </OptimizedSection>

      {/* ROI Chart Section */}
      <OptimizedSection id="roi-chart-section" spacing="py-6">
        <ROIChart />
      </OptimizedSection>
      
      {/* Use Cases Section */}
      <OptimizedSection id="use-cases-section" spacing="py-6">
        <UseCasesSection />
      </OptimizedSection>
      
      {/* Premium Social Proof Section */}
      <OptimizedSection id="premium-social-proof" spacing="py-6">
        <PremiumSocialProof />
      </OptimizedSection>
      
      {/* Process Section */}
      <OptimizedSection id="process-section" spacing="py-6">
        <ProcessSection />
      </OptimizedSection>
      
      {/* Comparison Section */}
      <OptimizedSection id="comparison-section-main" spacing="py-6">
        <ComparisonSection />
      </OptimizedSection>
      
      {/* FAQ Section */}
      <OptimizedSection id="faq-section" spacing="py-6">
        <FAQSection />
      </OptimizedSection>

      {/* Ideal For Section */}
      <OptimizedSection id="ideal-for-section" spacing="py-6">
        <IdealForSection />
      </OptimizedSection>
      
      {/* Final CTA Section */}
      <OptimizedSection id="final-cta" spacing="py-6">
        <CTASection />
      </OptimizedSection>
    </div>
  );
});

export default DigitalEmployeesContent;
