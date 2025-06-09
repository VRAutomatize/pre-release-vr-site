
import React from "react";
import HeroSection from "@/components/digital-employees/HeroSection";
import CTASection from "@/components/digital-employees/CTASection";
import ProcessSection from "@/components/digital-employees/ProcessSection";
import IdealForSection from "@/components/digital-employees/IdealForSection";
import PremiumSocialProof from "@/components/digital-employees/PremiumSocialProof";
import FAQSection from "@/components/digital-employees/FAQSection";

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

      {/* Social Proof MOVED TO 2ND POSITION - Critical for conversion */}
      <EdgeSection id="social-proof-testimonials" padding="py-16 md:py-20 lg:py-24">
        <PremiumSocialProof />
      </EdgeSection>

      {/* How It Works - Simplified Process */}
      <EdgeSection id="how-it-works" padding="py-16 md:py-20 lg:py-24">
        <ProcessSection />
      </EdgeSection>
      
      {/* Ideal For Section - Already optimized */}
      <EdgeSection id="ideal-for-section" padding="py-16 md:py-20 lg:py-24">
        <IdealForSection />
      </EdgeSection>
      
      {/* Essential FAQ Section */}
      <EdgeSection id="faq-section" padding="py-16 md:py-20 lg:py-24">
        <FAQSection />
      </EdgeSection>
      
      {/* Final CTA Section */}
      <EdgeSection id="final-cta" padding="py-16 md:py-20 lg:py-24">
        <CTASection />
      </EdgeSection>
    </div>
  );
});

export default DigitalEmployeesContent;
