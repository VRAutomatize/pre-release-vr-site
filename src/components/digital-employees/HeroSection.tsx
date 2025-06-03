
import React, { useEffect } from "react";
import { Calculator, TrendingUp, Users } from "lucide-react";
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
    <div className="section-edge unified-bg">
      <div id="hero-section" className="w-full">
        <section className={`${isMobile ? 'min-h-screen pt-24 flex items-start justify-center' : 'min-h-[80vh] pt-32 flex items-center'} relative overflow-hidden w-full unified-bg`}>
          <div className="w-full relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* Content Column - Centralizado e simétrico */}
              <div className="w-full text-center max-w-5xl mx-auto px-4">
                <div className="animate-fade-up" style={{ animationDuration: "0.5s" }}>
                  <span className={`inline-block ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'} rounded-full bg-gold/10 text-gold mb-6 md:mb-8 lg:mb-10`}>
                    A Automação Definitiva
                  </span>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
                  <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl'} font-bold mb-6 md:mb-8 lg:mb-10 leading-tight`}>
                    {isMobile ? (
                      <>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light block mb-2">
                          Reduza 60% dos Custos Fixos
                        </span>
                        <span className="text-lg text-foreground/90 block">
                          com Funcionários Digitais
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-foreground block">Funcionários Digitais que</span>{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light block">
                          Reduzem Custos em 6 Dígitos
                        </span>
                      </>
                    )}
                  </h1>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.9s" }}>
                  <p className={`${isMobile ? 'text-base leading-relaxed max-w-md mx-auto' : 'text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto'} text-foreground/80 mb-8 md:mb-10 lg:mb-12 leading-relaxed`}>
                    {isMobile 
                      ? "Sistemas que trabalham 24/7 substituindo processos operacionais. Sem pausas, sem oscilações."
                      : "Reduza em até 6 dígitos seus custos fixos. Sistemas que trabalham 24/7 — sem pausas ou oscilações, substituindo processos operacionais."
                    }
                  </p>
                </div>

                {/* Social Proof Stats - Mobile Optimized e simétrico */}
                <div className="animate-fade-up mb-8 md:mb-10 lg:mb-12" style={{ animationDelay: "1.0s" }}>
                  <div className={`${isMobile ? 'flex flex-col items-center space-y-3 max-w-sm mx-auto' : 'grid grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto'}`}>
                    <div className={`text-center bg-background/30 backdrop-blur-sm rounded-lg ${isMobile ? 'flex items-center justify-between p-4 w-full' : 'p-6 md:p-8'} border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:scale-105`}>
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-gold" />
                            <span className="text-sm text-foreground/70">Empresas</span>
                          </div>
                          <span className="text-xl font-bold text-gold">200+</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Users className="h-8 w-8 md:h-10 md:w-10 text-gold mb-3" />
                          <span className="text-3xl md:text-4xl font-bold text-gold">200+</span>
                          <span className="text-base md:text-lg text-foreground/70 mt-2">Empresas</span>
                        </div>
                      )}
                    </div>
                    <div className={`text-center bg-background/30 backdrop-blur-sm rounded-lg ${isMobile ? 'flex items-center justify-between p-4 w-full' : 'p-6 md:p-8'} border border-green-400/10 hover:border-green-400/30 transition-all duration-300 hover:scale-105`}>
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-3">
                            <TrendingUp className="h-5 w-5 text-green-400" />
                            <span className="text-sm text-foreground/70">Economia/ano</span>
                          </div>
                          <span className="text-xl font-bold text-green-400">R$ 283k</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-green-400 mb-3" />
                          <span className="text-3xl md:text-4xl font-bold text-green-400">R$ 283k</span>
                          <span className="text-base md:text-lg text-foreground/70 mt-2">Economia/ano</span>
                        </div>
                      )}
                    </div>
                    <div className={`text-center bg-background/30 backdrop-blur-sm rounded-lg ${isMobile ? 'flex items-center justify-between p-4 w-full' : 'p-6 md:p-8'} border border-blue-400/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105`}>
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-3">
                            <Calculator className="h-5 w-5 text-blue-400" />
                            <span className="text-sm text-foreground/70">ROI médio</span>
                          </div>
                          <span className="text-xl font-bold text-blue-400">380%</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Calculator className="h-8 w-8 md:h-10 md:w-10 text-blue-400 mb-3" />
                          <span className="text-3xl md:text-4xl font-bold text-blue-400">380%</span>
                          <span className="text-base md:text-lg text-foreground/70 mt-2">ROI médio</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="animate-fade-up mb-8 md:mb-10 lg:mb-12" style={{ animationDelay: "1.1s" }}>
                  <p className={`${isMobile ? 'text-lg font-semibold' : 'text-xl md:text-2xl lg:text-3xl font-semibold'} text-gold`}>
                    {isMobile 
                      ? "Performance constante. Custo reduzido."
                      : "Mais produtividade. Menos custo fixo. Performance constante."
                    }
                  </p>
                </div>

                {/* Premium Segmentation CTA - Centralizado */}
                <div className="animate-fade-up mb-6 md:mb-8 lg:mb-10" style={{ animationDelay: "1.3s" }}>
                  <div className="flex justify-center">
                    <PremiumSegmentCTA />
                  </div>
                </div>

                {/* Urgency Element - Centralizado */}
                <div className="animate-fade-up flex justify-center" style={{ animationDelay: "1.5s" }}>
                  <div className={`inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 ${isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-4 text-base'} rounded-lg`}>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    {isMobile ? "Apenas 5 vagas este mês" : "Vagas limitadas para consultoria executiva"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(HeroSection);
