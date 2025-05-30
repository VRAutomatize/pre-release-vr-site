
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
        <section className="min-h-[90vh] flex items-center relative overflow-hidden mt-8 md:mt-4">
          <div className="w-full max-w-7xl mx-auto mobile-container-minimal relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* Content Column - Melhorado para desktop */}
              <div className="w-full max-w-5xl text-center">
                <div className="animate-fade-up" style={{ animationDuration: "0.5s" }}>
                  <span className="inline-block px-4 py-2 rounded-full text-sm md:text-base bg-gold/10 text-gold mb-6 md:mb-8">
                    A Automação Definitiva
                  </span>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
                  <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight px-2 md:px-0">
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
                        <br className="hidden lg:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
                          Reduzem Custos em 6 Dígitos
                        </span>
                      </>
                    )}
                  </h1>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.9s" }}>
                  <p className="text-base md:text-xl lg:text-2xl text-foreground/80 mb-8 md:mb-12 px-2 md:px-0 leading-relaxed max-w-4xl mx-auto">
                    {isMobile 
                      ? "Sistemas que trabalham 24/7 substituindo processos operacionais. Sem pausas, sem oscilações."
                      : "Reduza em até 6 dígitos seus custos fixos. Sistemas que trabalham 24/7 — sem pausas ou oscilações, substituindo processos operacionais."
                    }
                  </p>
                </div>

                {/* Social Proof Stats - Melhor espaçamento para desktop */}
                <div className="animate-fade-up mb-8 md:mb-12 px-2 md:px-0" style={{ animationDelay: "1.0s" }}>
                  <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12 mb-8 md:mb-12 max-w-md md:max-w-3xl mx-auto">
                    <div className="text-center bg-background/30 backdrop-blur-sm rounded-lg p-3 md:p-6 lg:p-8 border border-gold/10 hover:border-gold/30 transition-colors">
                      <div className="flex flex-col items-center gap-2 mb-2">
                        <Users className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 text-gold" />
                        <span className="text-lg md:text-2xl lg:text-3xl font-bold text-gold">200+</span>
                      </div>
                      <span className="text-xs md:text-sm lg:text-base text-foreground/70 leading-tight">Empresas</span>
                    </div>
                    <div className="text-center bg-background/30 backdrop-blur-sm rounded-lg p-3 md:p-6 lg:p-8 border border-green-400/10 hover:border-green-400/30 transition-colors">
                      <div className="flex flex-col items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 text-green-400" />
                        <span className="text-lg md:text-2xl lg:text-3xl font-bold text-green-400">R$ 283k</span>
                      </div>
                      <span className="text-xs md:text-sm lg:text-base text-foreground/70 leading-tight">Economia/ano</span>
                    </div>
                    <div className="text-center bg-background/30 backdrop-blur-sm rounded-lg p-3 md:p-6 lg:p-8 border border-blue-400/10 hover:border-blue-400/30 transition-colors">
                      <div className="flex flex-col items-center gap-2 mb-2">
                        <Calculator className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 text-blue-400" />
                        <span className="text-lg md:text-2xl lg:text-3xl font-bold text-blue-400">380%</span>
                      </div>
                      <span className="text-xs md:text-sm lg:text-base text-foreground/70 leading-tight">ROI médio</span>
                    </div>
                  </div>
                </div>

                <div className="animate-fade-up px-2 md:px-0 mb-8 md:mb-12" style={{ animationDelay: "1.1s" }}>
                  <p className="text-lg md:text-2xl lg:text-3xl font-semibold text-gold">
                    {isMobile 
                      ? "Performance constante. Custo reduzido."
                      : "Mais produtividade. Menos custo fixo. Performance constante."
                    }
                  </p>
                </div>

                {/* Premium Segmentation CTA */}
                <div className="animate-fade-up px-1 md:px-0 mb-6 md:mb-8" style={{ animationDelay: "1.3s" }}>
                  <PremiumSegmentCTA />
                </div>

                {/* Urgency Element */}
                <div className="animate-fade-up px-2 md:px-0" style={{ animationDelay: "1.5s" }}>
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 md:px-6 md:py-4 rounded-lg text-sm md:text-base">
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
