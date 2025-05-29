
import React, { useEffect } from "react";
import { Calculator } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { TypeformButton } from "@/components/form/TypeformButton";
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
          <div className="space-y-6 mt-6">
            <p className="text-xl font-semibold text-gold animate-fade-up" style={{
              animationDelay: "0.6s"
            }}>
              Mais produtividade. Menos custo fixo. Performance constante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-up" style={{
              animationDelay: "0.8s"
            }}>
              <TypeformButton 
                icon={Calculator}
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background px-4 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                trackingId="hero_primary_cta"
                trackingSection="hero"
                trackingMetadata={{
                  position: "primary",
                  type: "main_cta",
                  responsive: isMobile ? "mobile" : "desktop"
                }}
              >
                <span className={isSmallScreen ? "text-sm" : "text-base"}>
                  {isMobile ? "Calcule sua economia" : "Descubra quanto sua empresa pode economizar"}
                </span>
              </TypeformButton>
            </div>
          </div>
        </PageHero>
      </div>
    </OptimizedBackground>
  );
};

export default React.memo(HeroSection);
