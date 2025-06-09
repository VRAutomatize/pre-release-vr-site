
import React, { useEffect } from "react";
import { Calculator, TrendingUp, Users, Shield, Clock, CheckCircle } from "lucide-react";
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
        <section className={`${isMobile ? 'min-h-screen pt-16 flex items-start justify-center' : 'min-h-[80vh] pt-20 flex items-center'} relative overflow-hidden w-full unified-bg`}>
          <div className="w-full relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* Content Column - Centralizado e simétrico */}
              <div className="w-full text-center max-w-6xl mx-auto px-4">
                <div className="animate-fade-up" style={{ animationDuration: "0.5s" }}>
                  <span className={`inline-block ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'} rounded-full bg-gold/10 text-gold mb-6 md:mb-8 lg:mb-10 border border-gold/20`}>
                    ✅ Comprovado em 200+ Empresas
                  </span>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
                  <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl'} font-bold mb-6 md:mb-8 lg:mb-10 leading-tight`}>
                    {isMobile ? (
                      <>
                        <span className="text-foreground block mb-2">
                          Escale sua operação comercial 
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light block mb-2">
                          sem escalar seus custos
                        </span>
                        <span className="text-lg text-foreground/90 block">
                          Mais vendas, com menos esforço e sem inchar sua equipe
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-foreground block">Escale sua operação comercial</span>{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light block">
                          sem escalar seus custos
                        </span>
                        <span className="text-2xl md:text-3xl lg:text-4xl text-foreground/80 block mt-4">
                          Mais vendas, com menos esforço e sem inchar sua equipe
                        </span>
                      </>
                    )}
                  </h1>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.9s" }}>
                  <p className={`${isMobile ? 'text-base leading-relaxed max-w-md mx-auto' : 'text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto'} text-foreground/80 mb-8 md:mb-10 lg:mb-12 leading-relaxed`}>
                    {isMobile 
                      ? "Seus Agentes de IA atendem, qualificam e conduzem leads até a próxima etapa — 24/7."
                      : "Na VR Automatize, seus Agentes de Inteligência Artificial são treinados para atender, qualificar e conduzir o lead até a próxima etapa do funil — com consistência e produtividade 24/7."
                    }
                  </p>
                </div>

                {/* Immediate Social Proof - Mais compacto */}
                <div className="animate-fade-up mb-8 md:mb-10 lg:mb-12" style={{ animationDelay: "1.0s" }}>
                  <div className={`${isMobile ? 'flex flex-col items-center space-y-3 max-w-sm mx-auto' : 'grid grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto'}`}>
                    <div className={`text-center bg-background/40 backdrop-blur-sm rounded-xl ${isMobile ? 'flex items-center justify-between p-3 w-full' : 'p-4 md:p-6'} border border-green-400/20 hover:border-green-400/40 transition-all duration-300 shadow-lg`}>
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-green-400" />
                            <span className="text-xs text-foreground/70">Empresas</span>
                          </div>
                          <span className="text-lg font-bold text-green-400">200+</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Users className="h-6 w-6 md:h-8 md:w-8 text-green-400 mb-2" />
                          <span className="text-2xl md:text-3xl font-bold text-green-400">200+</span>
                          <span className="text-sm md:text-base text-foreground/70 mt-1">Empresas</span>
                        </div>
                      )}
                    </div>
                    <div className={`text-center bg-background/40 backdrop-blur-sm rounded-xl ${isMobile ? 'flex items-center justify-between p-3 w-full' : 'p-4 md:p-6'} border border-gold/20 hover:border-gold/40 transition-all duration-300 shadow-lg`}>
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-gold" />
                            <span className="text-xs text-foreground/70">Economia</span>
                          </div>
                          <span className="text-lg font-bold text-gold">R$ 283k</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-gold mb-2" />
                          <span className="text-2xl md:text-3xl font-bold text-gold">R$ 283k</span>
                          <span className="text-sm md:text-base text-foreground/70 mt-1">Economia/Ano</span>
                        </div>
                      )}
                    </div>
                    <div className={`text-center bg-background/40 backdrop-blur-sm rounded-xl ${isMobile ? 'flex items-center justify-between p-3 w-full' : 'p-4 md:p-6'} border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 shadow-lg`}>
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Calculator className="h-4 w-4 text-blue-400" />
                            <span className="text-xs text-foreground/70">ROI</span>
                          </div>
                          <span className="text-lg font-bold text-blue-400">380%</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Calculator className="h-6 w-6 md:h-8 md:w-8 text-blue-400 mb-2" />
                          <span className="text-2xl md:text-3xl font-bold text-blue-400">380%</span>
                          <span className="text-sm md:text-base text-foreground/70 mt-1">ROI Médio</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA */}
                <div className="animate-fade-up mb-6 md:mb-8" style={{ animationDelay: "1.2s" }}>
                  <button className={`bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-background font-bold ${isMobile ? 'px-8 py-4 text-lg' : 'px-12 py-6 text-xl'} rounded-xl shadow-2xl hover:shadow-gold/30 transform hover:scale-105 transition-all duration-300 border-2 border-gold/20`}>
                    {isMobile ? "Quero Escalar Agora" : "Quero Escalar Minha Operação Agora"}
                  </button>
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} text-foreground/60 mt-3`}>
                    ⚡ Análise gratuita • Sem compromisso
                  </p>
                </div>

                {/* Urgency Element */}
                <div className="animate-fade-up flex justify-center" style={{ animationDelay: "1.4s" }}>
                  <div className={`inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'} rounded-lg`}>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    {isMobile ? "Apenas 5 vagas este mês" : "⚠️ Apenas 5 consultorias executivas este mês"}
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
