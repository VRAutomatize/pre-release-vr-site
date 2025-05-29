
import React, { useEffect } from "react";
import { Calculator } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import PremiumSegmentCTA from "./PremiumSegmentCTA";
import OptimizedBackground from "@/components/shared/OptimizedBackground";

const HeroSection = () => {
  const isMobile = useIsMobile();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const { trackSectionView } = useScrollTracking();
  
  useEffect(() => {
    // Track hero section view
    const cleanup = trackSectionView('hero-section', 'hero');
    return cleanup;
  }, [trackSectionView]);

  return (
    <OptimizedBackground variant="hero">
      <div id="hero-section">
        <PageHero 
          title="Funcionários Digitais" 
          subtitle="Reduza em até 6 dígitos seus custos fixos. Sistemas que trabalham 24/7 — sem pausas ou oscilações, substituindo processos operacionais." 
          tag="A Automação Definitiva"
        >
          <div className="space-y-8 mt-6">
            <p className="text-xl font-semibold text-gold animate-fade-up" style={{
              animationDelay: "0.6s"
            }}>
              Mais produtividade. Menos custo fixo. Performance constante.
            </p>

            {/* Premium Segmentation CTA */}
            <div className="animate-fade-up" style={{
              animationDelay: "0.8s"
            }}>
              <PremiumSegmentCTA />
            </div>
          </div>
        </PageHero>
      </div>
    </OptimizedBackground>
  );
};

export default React.memo(HeroSection);
