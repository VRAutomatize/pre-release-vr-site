
import React from "react";
import HeroSection from "@/components/digital-employees/HeroSection";
import CTASection from "@/components/digital-employees/CTASection";
import PremiumSocialProof from "@/components/digital-employees/PremiumSocialProof";
import ProcessSection from "@/components/digital-employees/ProcessSection";

// Componente de seção edge-to-edge com background unificado e espaçamento simétrico
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

      {/* Social Proof - Mais compacto */}
      <EdgeSection id="social-proof-testimonials" padding="py-12 md:py-16">
        <PremiumSocialProof />
      </EdgeSection>

      {/* How It Works - Simplificado */}
      <EdgeSection id="how-it-works" padding="py-12 md:py-16">
        <ProcessSection />
      </EdgeSection>
      
      {/* Final CTA Section */}
      <EdgeSection id="final-cta" padding="py-12 md:py-16">
        <CTASection />
      </EdgeSection>
    </div>
  );
});

export default DigitalEmployeesContent;
