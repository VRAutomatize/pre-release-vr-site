
import React from "react";
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
import AdvancedROICalculator from "@/components/digital-employees/interactive/AdvancedROICalculator";

// Lazy loaded components - apenas os essenciais
import LazySection from "@/components/shared/LazySection";
import OptimizedRealTimeMetrics from "@/components/digital-employees/OptimizedRealTimeMetrics";
import StorytellingScroll from "@/components/digital-employees/StorytellingScroll";

// Componente de seção edge-to-edge com background unificado e espaçamento simétrico
const EdgeSection = React.memo(({ 
  children, 
  id, 
  className = "",
  padding = "py-16 md:py-20 lg:py-24"
}: { 
  children: React.ReactNode;
  id: string;
  className?: string;
  padding?: string;
}) => (
  <section 
    className={`section-edge unified-bg ${padding} ${className}`}
    id={id}
  >
    <div className="content-container">
      {children}
    </div>
  </section>
));

const DigitalEmployeesContent = React.memo(() => {
  return (
    <div className="app-container unified-bg">
      {/* Hero Section - Edge-to-edge */}
      <HeroSection />

      {/* Storytelling Scroll - Edge-to-edge */}
      <EdgeSection id="storytelling-scroll" padding="py-12 md:py-16 lg:py-20">
        <StorytellingScroll />
      </EdgeSection>

      {/* Quick Social Proof - Edge-to-edge */}
      <EdgeSection id="quick-social-proof" padding="py-12 md:py-16 lg:py-20">
        <QuickSocialProof />
      </EdgeSection>

      {/* Real-Time Metrics - Edge-to-edge */}
      <EdgeSection id="real-time-metrics" padding="py-16 md:py-20 lg:py-24">
        <LazySection id="real-time-metrics">
          <OptimizedRealTimeMetrics />
        </LazySection>
      </EdgeSection>

      {/* ROI Calculator Section - Edge-to-edge */}
      <EdgeSection id="roi-calculator-section" padding="py-16 md:py-20 lg:py-24">
        <AdvancedROICalculator />
      </EdgeSection>

      {/* Client Logos Section - Edge-to-edge */}
      <EdgeSection id="client-logos" padding="py-12 md:py-16 lg:py-20">
        <ClientLogosSection />
      </EdgeSection>

      {/* ROI Chart Section - Edge-to-edge */}
      <EdgeSection id="roi-chart-section" padding="py-16 md:py-20 lg:py-24">
        <ROIChart />
      </EdgeSection>
      
      {/* Use Cases Section - Edge-to-edge */}
      <EdgeSection id="use-cases-section" padding="py-16 md:py-20 lg:py-24">
        <UseCasesSection />
      </EdgeSection>
      
      {/* Premium Social Proof Section - Edge-to-edge */}
      <EdgeSection id="premium-social-proof" padding="py-16 md:py-20 lg:py-24">
        <PremiumSocialProof />
      </EdgeSection>
      
      {/* Process Section - Edge-to-edge */}
      <EdgeSection id="process-section" padding="py-16 md:py-20 lg:py-24">
        <ProcessSection />
      </EdgeSection>
      
      {/* Comparison Section - Edge-to-edge */}
      <EdgeSection id="comparison-section-main" padding="py-16 md:py-20 lg:py-24">
        <ComparisonSection />
      </EdgeSection>
      
      {/* FAQ Section - Edge-to-edge */}
      <EdgeSection id="faq-section" padding="py-16 md:py-20 lg:py-24">
        <FAQSection />
      </EdgeSection>

      {/* Ideal For Section - Edge-to-edge */}
      <EdgeSection id="ideal-for-section" padding="py-16 md:py-20 lg:py-24">
        <IdealForSection />
      </EdgeSection>
      
      {/* Final CTA Section - Edge-to-edge */}
      <EdgeSection id="final-cta" padding="py-16 md:py-20 lg:py-24">
        <CTASection />
      </EdgeSection>
    </div>
  );
});

export default DigitalEmployeesContent;
