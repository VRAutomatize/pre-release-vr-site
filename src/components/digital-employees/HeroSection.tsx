
import React, { useEffect } from "react";
import { Calculator, TrendingUp, Users, Shield, Clock, CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrollTracking } from "@/hooks/useScrollTracking";

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
        <section className={`${isMobile ? 'min-h-screen pt-8 flex items-start justify-center' : 'min-h-[85vh] pt-16 flex items-center'} relative overflow-hidden w-full unified-bg`}>
          <div className="w-full relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* Content Column - Centralizado e simétrico */}
              <div className="w-full text-center max-w-6xl mx-auto px-4">
                
                {/* Logo/Brand Area */}
                <div className="animate-fade-up mb-8" style={{ animationDuration: "0.5s" }}>
                  <span className={`inline-block ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'} rounded-full bg-gold/10 text-gold border border-gold/20`}>
                    VR Automatize - Funcionários Digitais
                  </span>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
                  <h1 className={`${isMobile ? 'text-3xl leading-tight' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-6 md:mb-8 leading-tight`}>
                    {isMobile ? (
                      <>
                        <span className="text-foreground block mb-2">
                          Clonamos o seu
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light block mb-2">
                          Melhor Vendedor
                        </span>
                        <span className="text-foreground block">
                          com Inteligência Artificial
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-foreground">Clonamos o seu </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
                          Melhor Vendedor
                        </span>
                        <span className="text-foreground"> com Inteligência Artificial</span>
                      </>
                    )}
                  </h1>
                </div>
                
                <div className="animate-fade-up" style={{ animationDuration: "0.9s" }}>
                  <h2 className={`${isMobile ? 'text-lg leading-relaxed max-w-md mx-auto' : 'text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto'} text-foreground/90 mb-8 md:mb-10 leading-relaxed font-medium`}>
                    Venda 24h por dia, 7 dias por semana com Agentes de IA treinados para qualificar seus leads
                  </h2>
                </div>

                {/* Immediate Social Proof - Estatísticas rápidas */}
                <div className="animate-fade-up mb-8 md:mb-10" style={{ animationDelay: "1.0s" }}>
                  <div className={`${isMobile ? 'flex flex-col items-center space-y-3 max-w-sm mx-auto' : 'grid grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto'}`}>
                    <div className={`text-center bg-background/40 backdrop-blur-sm rounded-xl ${isMobile ? 'flex items-center justify-between p-3 w-full' : 'p-4 md:p-6'} border border-green-400/20 hover:border-green-400/40 transition-all duration-300 shadow-lg`}>
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-green-400" />
                            <span className="text-xs text-foreground/70">Leads Atendidos</span>
                          </div>
                          <span className="text-lg font-bold text-green-400">24/7</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Users className="h-6 w-6 md:h-8 md:w-8 text-green-400 mb-2" />
                          <span className="text-2xl md:text-3xl font-bold text-green-400">24/7</span>
                          <span className="text-sm md:text-base text-foreground/70 mt-1">Atendimento</span>
                        </div>
                      )}
                    </div>
                    <div className={`text-center bg-background/40 backdrop-blur-sm rounded-xl ${isMobile ? 'flex items-center justify-between p-3 w-full' : 'p-4 md:p-6'} border border-gold/20 hover:border-gold/40 transition-all duration-300 shadow-lg`}>
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-gold" />
                            <span className="text-xs text-foreground/70">Conversão</span>
                          </div>
                          <span className="text-lg font-bold text-gold">+300%</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-gold mb-2" />
                          <span className="text-2xl md:text-3xl font-bold text-gold">+300%</span>
                          <span className="text-sm md:text-base text-foreground/70 mt-1">Conversão</span>
                        </div>
                      )}
                    </div>
                    <div className={`text-center bg-background/40 backdrop-blur-sm rounded-xl ${isMobile ? 'flex items-center justify-between p-3 w-full' : 'p-4 md:p-6'} border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 shadow-lg`}>
                      {isMobile ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-400" />
                            <span className="text-xs text-foreground/70">Resposta</span>
                          </div>
                          <span className="text-lg font-bold text-blue-400">Instant.</span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Clock className="h-6 w-6 md:h-8 md:w-8 text-blue-400 mb-2" />
                          <span className="text-2xl md:text-3xl font-bold text-blue-400">Instant.</span>
                          <span className="text-sm md:text-base text-foreground/70 mt-1">Resposta</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Explicação simples */}
                <div className="animate-fade-up max-w-4xl mx-auto" style={{ animationDelay: "1.2s" }}>
                  <p className={`${isMobile ? 'text-base leading-relaxed' : 'text-lg md:text-xl lg:text-2xl'} text-foreground/80 mb-6 leading-relaxed`}>
                    {isMobile 
                      ? "Enquanto sua equipe foca no que realmente importa, a IA atende, qualifica e filtra os leads — com consistência e produtividade 24/7."
                      : "Na VR Automatize, seus Agentes de Inteligência Artificial são treinados para atender, qualificar, tirar dúvidas e conduzir o lead até a próxima etapa do funil. Enquanto sua equipe foca no que realmente importa, a IA atende, qualifica e filtra os leads — com consistência e produtividade 24/7."
                    }
                  </p>
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
