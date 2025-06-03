
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
    <OptimizedBackground variant="hero">
      <div id="hero-section" className="hero-edge">
        <section className={`${isMobile ? 'min-h-screen pt-16 flex items-start justify-center' : 'min-h-[80vh] pt-24 flex items-center'} relative overflow-hidden w-full`}>
          <div className="w-full relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* Content Column */}
              <div className="w-full text-center">
                <div className="content-container">
                  <div className="animate-fade-up" style={{ animationDuration: "0.5s" }}>
                    <span className={`inline-block ${isMobile ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base'} rounded-full bg-gold/10 text-gold mb-4 md:mb-6 lg:mb-8`}>
                      A Automação Definitiva
                    </span>
                  </div>
                  
                  <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
                    <h1 className={`${isMobile ? 'text-3xl' : 'text-3xl md:text-5xl lg:text-6xl xl:text-7xl'} font-bold mb-4 md:mb-6 lg:mb-8 leading-tight`}>
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
                    <p className={`${isMobile ? 'text-base leading-relaxed' : 'text-base md:text-lg lg:text-xl xl:text-2xl'} text-foreground/80 mb-6 md:mb-8 lg:mb-10 leading-relaxed ${isMobile ? '' : 'max-w-4xl mx-auto'}`}>
                      {isMobile 
                        ? "Sistemas que trabalham 24/7 substituindo processos operacionais. Sem pausas, sem oscilações."
                        : "Reduza em até 6 dígitos seus custos fixos. Sistemas que trabalham 24/7 — sem pausas ou oscilações, substituindo processos operacionais."
                      }
                    </p>
                  </div>

                  {/* Social Proof Stats - Mobile Optimized */}
                  <div className="animate-fade-up mb-6 md:mb-8 lg:mb-10" style={{ animationDelay: "1.0s" }}>
                    <div className={`${isMobile ? 'w-full space-y-2' : 'grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-10 max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto'}`}>
                      <div className={`text-center bg-background/30 backdrop-blur-sm rounded-lg ${isMobile ? 'flex items-center justify-between p-3 w-full' : 'p-6 md:p-8 lg:p-10'} border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:scale-105`}>
                        {isMobile ? (
                          <>
                            <div className="flex items-center gap-3">
                              <Users className="h-5 w-5 text-gold" />
                              <span className="text-sm text-foreground/70">Empresas</span>
                            </div>
                            <span className="text-xl font-bold text-gold">200+</span>
                          </>
                        ) : (
                          <div className="flex flex-col items-center mb-3 md:mb-4">
                            <Users className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-gold mb-2" />
                            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gold">200+</span>
                            <span className="text-sm md:text-base lg:text-lg text-foreground/70 mt-1">Empresas</span>
                          </div>
                        )}
                      </div>
                      <div className={`text-center bg-background/30 backdrop-blur-sm rounded-lg ${isMobile ? 'flex items-center justify-between p-3 w-full' : 'p-6 md:p-8 lg:p-10'} border border-green-400/10 hover:border-green-400/30 transition-all duration-300 hover:scale-105`}>
                        {isMobile ? (
                          <>
                            <div className="flex items-center gap-3">
                              <TrendingUp className="h-5 w-5 text-green-400" />
                              <span className="text-sm text-foreground/70">Economia/ano</span>
                            </div>
                            <span className="text-xl font-bold text-green-400">R$ 283k</span>
                          </>
                        ) : (
                          <div className="flex flex-col items-center mb-3 md:mb-4">
                            <TrendingUp className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-green-400 mb-2" />
                            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-400">R$ 283k</span>
                            <span className="text-sm md:text-base lg:text-lg text-foreground/70 mt-1">Economia/ano</span>
                          </div>
                        )}
                      </div>
                      <div className={`text-center bg-background/30 backdrop-blur-sm rounded-lg ${isMobile ? 'flex items-center justify-between p-3 w-full' : 'p-6 md:p-8 lg:p-10'} border border-blue-400/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105`}>
                        {isMobile ? (
                          <>
                            <div className="flex items-center gap-3">
                              <Calculator className="h-5 w-5 text-blue-400" />
                              <span className="text-sm text-foreground/70">ROI médio</span>
                            </div>
                            <span className="text-xl font-bold text-blue-400">380%</span>
                          </>
                        ) : (
                          <div className="flex flex-col items-center mb-3 md:mb-4">
                            <Calculator className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-blue-400 mb-2" />
                            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400">380%</span>
                            <span className="text-sm md:text-base lg:text-lg text-foreground/70 mt-1">ROI médio</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="animate-fade-up mb-6 md:mb-8 lg:mb-10" style={{ animationDelay: "1.1s" }}>
                    <p className={`${isMobile ? 'text-lg font-semibold' : 'text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold'} text-gold`}>
                      {isMobile 
                        ? "Performance constante. Custo reduzido."
                        : "Mais produtividade. Menos custo fixo. Performance constante."
                      }
                    </p>
                  </div>

                  {/* Premium Segmentation CTA */}
                  <div className="animate-fade-up mb-4 md:mb-6 lg:mb-8" style={{ animationDelay: "1.3s" }}>
                    <PremiumSegmentCTA />
                  </div>

                  {/* Urgency Element */}
                  <div className="animate-fade-up" style={{ animationDelay: "1.5s" }}>
                    <div className={`inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 ${isMobile ? 'px-4 py-3 text-sm' : 'px-4 py-3 md:px-6 md:py-4 text-sm md:text-base'} rounded-lg`}>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      {isMobile ? "Apenas 5 vagas este mês" : "Vagas limitadas para consultoria executiva"}
                    </div>
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
