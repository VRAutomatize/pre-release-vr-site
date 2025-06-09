
import React from "react";
import HeroSection from "@/components/digital-employees/HeroSection";
import IdealForSection from "@/components/digital-employees/IdealForSection";
import PremiumSocialProof from "@/components/digital-employees/PremiumSocialProof";
import ProcessSection from "@/components/digital-employees/ProcessSection";
import CTASection from "@/components/digital-employees/CTASection";

// Componente de seção edge-to-edge com background unificado
const EdgeSection = React.memo(({ 
  children, 
  id, 
  className = "",
  padding = "py-12 md:py-16 lg:py-20"
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

      {/* Ideal For Section - Nova seção crítica para qualificação */}
      <EdgeSection id="ideal-for" padding="py-16 md:py-20">
        <IdealForSection />
      </EdgeSection>

      {/* Social Proof & Testimonials */}
      <EdgeSection id="social-proof-testimonials" padding="py-12 md:py-16">
        <PremiumSocialProof />
      </EdgeSection>

      {/* How It Works - Simplificado */}
      <EdgeSection id="how-it-works" padding="py-12 md:py-16">
        <ProcessSection />
      </EdgeSection>
      
      {/* Final CTA Section - Único CTA da página */}
      <EdgeSection id="final-cta" padding="py-16 md:py-20">
        <CTASection />
      </EdgeSection>
    </div>
  );
});

export default DigitalEmployeesContent;
