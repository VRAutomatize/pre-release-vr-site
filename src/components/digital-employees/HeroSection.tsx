
import React, { useEffect } from "react";
import { Calculator, TrendingUp, Users } from "lucide-react";
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
        <section className="min-h-[85vh] flex items-center relative overflow-hidden mt-8 md:mt-4">
          <div className="w-full max-w-7xl mx-auto mobile-container-minimal relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* Content Column - Centralizado */}
              <div className="w-full max-w-4xl text-center">
                <div className="animate-fade-up" style={{ animationDuration: "0.5s" }}>
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-4">
                    A Automação Definitiva
                  </span>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight px-2 md:px-0">
                    {isMobile ? (
                      <>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
                          Reduza 60% dos Custos Fixos
                        </span>
                        <br />
                        <span className="text-2xl text-foreground/90">
                          com Funcionários Digitais
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-foreground">Funcionários Digitais que</span>{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
                          Reduzem Custos em 6 Dígitos
                        </span>
                      </>
                    )}
                  </h1>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.9s" }}>
                  <p className="text-base md:text-lg lg:text-xl text-foreground/80 mb-6 px-2 md:px-0 leading-relaxed">
                    {isMobile 
                      ? "Sistemas que trabalham 24/7 substituindo processos operacionais. Sem pausas, sem oscilações."
                      : "Reduza em até 6 dígitos seus custos fixos. Sistemas que trabalham 24/7 — sem pausas ou oscilações, substituindo processos operacionais."
                    }
                  </p>
                </div>

                {/* Social Proof Stats - Mobile First com melhor organização */}
                <div className="animate-fade-up mb-6 px-2 md:px-0" style={{ animationDelay: "1.0s" }}>
                  <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 max-w-md mx-auto">
                    <div className="text-center bg-background/30 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-gold/10">
                      <div className="flex flex-col items-center gap-1 mb-1">
                        <Users className="h-4 w-4 md:h-5 md:w-5 text-gold" />
                        <span className="text-lg md:text-xl lg:text-2xl font-bold text-gold">200+</span>
                      </div>
                      <span className="text-xs md:text-sm text-foreground/70 leading-tight">Empresas</span>
                    </div>
                    <div className="text-center bg-background/30 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-green-400/10">
                      <div className="flex flex-col items-center gap-1 mb-1">
                        <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                        <span className="text-lg md:text-xl lg:text-2xl font-bold text-green-400">R$ 283k</span>
                      </div>
                      <span className="text-xs md:text-sm text-foreground/70 leading-tight">Economia/ano</span>
                    </div>
                    <div className="text-center bg-background/30 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-blue-400/10">
                      <div className="flex flex-col items-center gap-1 mb-1">
                        <Calculator className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                        <span className="text-lg md:text-xl lg:text-2xl font-bold text-blue-400">380%</span>
                      </div>
                      <span className="text-xs md:text-sm text-foreground/70 leading-tight">ROI médio</span>
                    </div>
                  </div>
                </div>

                <div className="animate-fade-up px-2 md:px-0" style={{ animationDelay: "1.1s" }}>
                  <p className="text-lg md:text-xl font-semibold text-gold mb-6">
                    {isMobile 
                      ? "Performance constante. Custo reduzido."
                      : "Mais produtividade. Menos custo fixo. Performance constante."
                    }
                  </p>
                </div>

                {/* Premium Segmentation CTA */}
                <div className="animate-fade-up px-1 md:px-0" style={{ animationDelay: "1.3s" }}>
                  <PremiumSegmentCTA />
                </div>

                {/* Urgency Element */}
                <div className="animate-fade-up mt-4 px-2 md:px-0" style={{ animationDelay: "1.5s" }}>
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    {isMobile ? "Apenas 5 vagas este mês" : "Vagas limitadas para consultoria executiva"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </OptimizedBackground>
  );
};

export default React.memo(HeroSection);
