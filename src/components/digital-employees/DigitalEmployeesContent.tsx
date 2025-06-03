
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

// Lazy loaded components - apenas os essenciais
import LazySection from "@/components/shared/LazySection";
import OptimizedRealTimeMetrics from "@/components/digital-employees/OptimizedRealTimeMetrics";
import StorytellingScroll from "@/components/digital-employees/StorytellingScroll";

// Componente de seção edge-to-edge com background unificado
const EdgeSection = React.memo(({ 
  children, 
  id, 
  className = ""
}: { 
  children: React.ReactNode;
  id: string;
  className?: string;
}) => (
  <section 
    className={`w-screen unified-bg ${className}`}
    id={id}
    style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
  >
    {children}
  </section>
));

const DigitalEmployeesContent = React.memo(() => {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden unified-bg">
      {/* Hero Section - Edge-to-edge */}
      <HeroSection />

      {/* Storytelling Scroll - Edge-to-edge */}
      <div className="w-screen unified-bg" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <StorytellingScroll />
      </div>

      {/* Quick Social Proof - Edge-to-edge */}
      <EdgeSection id="quick-social-proof">
        <QuickSocialProof />
      </EdgeSection>

      {/* Real-Time Metrics - Edge-to-edge */}
      <div className="w-screen unified-bg" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <LazySection id="real-time-metrics">
          <OptimizedRealTimeMetrics />
        </LazySection>
      </div>

      {/* Client Logos Section - Edge-to-edge */}
      <EdgeSection id="client-logos">
        <ClientLogosSection />
      </EdgeSection>

      {/* ROI Chart Section - Edge-to-edge */}
      <EdgeSection id="roi-chart-section">
        <ROIChart />
      </EdgeSection>
      
      {/* Use Cases Section - Edge-to-edge */}
      <EdgeSection id="use-cases-section">
        <UseCasesSection />
      </EdgeSection>
      
      {/* Premium Social Proof Section - Edge-to-edge */}
      <EdgeSection id="premium-social-proof">
        <PremiumSocialProof />
      </EdgeSection>
      
      {/* Process Section - Edge-to-edge */}
      <EdgeSection id="process-section">
        <ProcessSection />
      </EdgeSection>
      
      {/* Comparison Section - Edge-to-edge */}
      <EdgeSection id="comparison-section-main">
        <ComparisonSection />
      </EdgeSection>
      
      {/* FAQ Section - Edge-to-edge */}
      <EdgeSection id="faq-section">
        <FAQSection />
      </EdgeSection>

      {/* Ideal For Section - Edge-to-edge */}
      <EdgeSection id="ideal-for-section">
        <IdealForSection />
      </EdgeSection>
      
      {/* Final CTA Section - Edge-to-edge */}
      <EdgeSection id="final-cta">
        <CTASection />
      </EdgeSection>
    </div>
  );
});

export default DigitalEmployeesContent;
