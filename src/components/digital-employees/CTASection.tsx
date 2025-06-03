
import React, { useEffect } from "react";
import { CheckCircle, Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { TypeformButton } from "@/components/form/TypeformButton";
import OptimizedBackground from "@/components/shared/OptimizedBackground";

const CTASection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { trackSectionView } = useScrollTracking();

  useEffect(() => {
    // Track CTA section view
    const cleanup = trackSectionView('cta-section', 'cta');
    return cleanup;
  }, [trackSectionView]);

  return (
    <OptimizedBackground variant="section">
      <section className="relative py-20" id="cta-section">
        <div className="content-container">
          <Card className="border-gold/30 relative overflow-hidden bg-black/30 backdrop-blur-lg rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
            <div className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
                    Vamos analisar sua operação gratuitamente.
                  </h2>
                  <p className="text-lg md:text-xl text-foreground/80 mb-8">
                    Receba um diagnóstico completo com:
                  </p>
                  <ul className="space-y-4 mb-8">
                    {["Cálculo estimado da sua economia anual com automação", "Sugestão de processos para automatizar", "Roadmap de implementação"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 hidden md:block">
                    <TypeformButton
                      icon={Calculator} 
                      className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-lg px-4 sm:px-8 py-3 sm:py-6"
                      trackingId="cta_section_desktop"
                      trackingSection="cta"
                      trackingMetadata={{
                        position: "section_middle",
                        type: "secondary_cta",
                        device: "desktop_only"
                      }}
                    >
                      <span className="text-sm sm:text-lg">
                        {isMobile ? "Calcule sua economia" : "Cálculo estimado da sua economia anual com automação"}
                      </span>
                    </TypeformButton>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <img src="/lovable-uploads/69d6e3a4-5346-41f7-988f-8151c83e758c.png" alt="VR Automatize Logo" className="w-48 h-48 object-contain animate-pulse-slow" />
                </div>
              </div>
              <div className="mt-8 md:hidden">
                <TypeformButton
                  icon={Calculator}
                  className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-lg px-4 py-3 w-full"
                  trackingId="cta_section_mobile"
                  trackingSection="cta"
                  trackingMetadata={{
                    position: "section_middle",
                    type: "secondary_cta",
                    device: "mobile_only"
                  }}
                >
                  <span className="text-sm">Calcule sua economia</span>
                </TypeformButton>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </OptimizedBackground>
  );
};

export default CTASection;
