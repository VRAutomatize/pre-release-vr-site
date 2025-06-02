
import React, { useState, useCallback } from "react";
import { Calculator, TrendingUp, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useOptimizedMotion } from "@/hooks/useOptimizedMotion";

const ConversionOptimizedHero = React.memo(() => {
  const isMobile = useIsMobile();
  const { shouldReduceMotion } = useOptimizedMotion();
  const [urgencyCount] = useState(5); // Removido o setInterval que causava re-renders
  
  const handleCalculateROI = useCallback(() => {
    document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleExecutiveConsultation = useCallback(() => {
    window.open('https://wa.me/554788558257?text=Ol%C3%A1!%20Quero%20descobrir%20minha%20economia%20com%20Funcion%C3%A1rios%20Digitais!', '_blank');
  }, []);

  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
      {/* Background Effects Otimizados - Reduzidos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gold/8 rounded-full filter blur-xl opacity-60" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-400/8 rounded-full filter blur-xl opacity-60" style={{ willChange: 'transform' }} />
      </div>

      <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Urgência Visual - Estática para melhor performance */}
          <div className={shouldReduceMotion ? "" : "animate-fade-up"}>
            <div className="inline-flex items-center gap-2 bg-red-500/15 border-2 border-red-400/40 text-red-300 px-6 py-3 rounded-full font-semibold shadow-lg">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm md:text-base">
                {isMobile ? `${urgencyCount} vagas restantes` : `Apenas ${urgencyCount} vagas para consultoria executiva este mês`}
              </span>
            </div>
          </div>

          {/* Headline Principal - Otimizada */}
          <div className={shouldReduceMotion ? "mb-6" : "animate-fade-up mb-6"} style={{ animationDelay: "0.2s" }}>
            <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-6xl lg:text-7xl'} font-bold leading-tight mb-4`}>
              <span className="text-white block mb-2">Economize</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-gold block mb-2">
                {isMobile ? "R$ 200k+ Por Ano" : "R$ 200k a R$ 800k Por Ano"}
              </span>
              <span className="text-white block">
                {isMobile ? "com Funcionários Digitais" : "Substituindo Funcionários por Sistemas Inteligentes"}
              </span>
            </h1>
          </div>

          {/* Subheadline - Otimizada */}
          <div className={shouldReduceMotion ? "mb-8" : "animate-fade-up mb-8"} style={{ animationDelay: "0.4s" }}>
            <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-foreground/90 leading-relaxed mb-4`}>
              {isMobile 
                ? "200+ empresas já cortaram custos fixos em 6 dígitos trabalhando 24/7 sem pausas ou oscilações"
                : "Mais de 200 empresas cortaram custos fixos em 6 dígitos com sistemas que trabalham 24/7 — sem pausas, férias ou oscilações de humor"
              }
            </p>
            <div className="flex items-center justify-center gap-4 text-gold font-semibold">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>ROI médio: 380%</span>
              </div>
              <div className="w-1 h-1 bg-gold rounded-full"></div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Payback: 3-4 meses</span>
              </div>
            </div>
          </div>

          {/* Prova Social - Simplificada */}
          <div className={shouldReduceMotion ? "mb-8" : "animate-fade-up mb-8"} style={{ animationDelay: "0.6s" }}>
            <p className="text-sm text-foreground/70 mb-4">Empresários que já cortaram custos:</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-xs bg-card/50 px-3 py-2 rounded">E-commerce R$ 2M/mês</div>
              <div className="text-xs bg-card/50 px-3 py-2 rounded">Indústria R$ 5M/mês</div>
              <div className="text-xs bg-card/50 px-3 py-2 rounded">SaaS R$ 1.2M/mês</div>
            </div>
          </div>

          {/* CTAs Otimizados */}
          <div className={shouldReduceMotion ? "space-y-4" : "animate-fade-up space-y-4"} style={{ animationDelay: "0.8s" }}>
            <Button
              onClick={handleCalculateROI}
              className={`bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold ${isMobile ? 'text-lg px-8 py-6 w-full' : 'text-xl px-12 py-8'} rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300`}
            >
              <Calculator className="mr-3 h-6 w-6" />
              {isMobile ? "Calcular Minha Economia" : "Descobrir Minha Economia Agora"}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>

            <div className="text-center">
              <p className="text-sm text-foreground/70 mb-3">
                Para empresas com faturamento +R$ 500k/mês:
              </p>
              <Button
                onClick={handleExecutiveConsultation}
                variant="outline"
                className={`border-2 border-gold text-gold hover:bg-gold hover:text-black font-semibold ${isMobile ? 'px-6 py-4' : 'px-8 py-6'} rounded-xl transition-all duration-300`}
              >
                <Users className="mr-2 h-5 w-5" />
                Consultoria Executiva Gratuita
              </Button>
            </div>
          </div>

          {/* Elementos de Confiança - Simplificados */}
          <div className={shouldReduceMotion ? "mt-8 space-y-3" : "animate-fade-up mt-8 space-y-3"} style={{ animationDelay: "1.0s" }}>
            <div className="flex items-center justify-center gap-6 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Sem contratos longos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Análise gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Suporte 24/7</span>
              </div>
            </div>
            
            <p className="text-xs text-center text-foreground/60 max-w-lg mx-auto leading-relaxed">
              ✓ Garantia de implementação ou dinheiro de volta
              <br />
              ✓ Acompanhamento dedicado durante todo processo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

ConversionOptimizedHero.displayName = "ConversionOptimizedHero";

export default ConversionOptimizedHero;
