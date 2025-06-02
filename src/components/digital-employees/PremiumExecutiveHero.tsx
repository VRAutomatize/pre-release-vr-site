
import React, { useState, useCallback } from "react";
import { Crown, TrendingUp, Users, Shield, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExecutiveButton } from "@/components/form/ExecutiveButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const PremiumExecutiveHero = React.memo(() => {
  const isMobile = useIsMobile();
  const [exclusivityCount] = useState(8); // Vagas restantes este mês

  const handleExecutiveConsultation = useCallback(() => {
    window.open('https://wa.me/554788558257?text=Ol%C3%A1!%20Sou%20CEO/Empresário%20interessado%20na%20consultoria%20executiva%20sobre%20Funcionários%20Digitais.%20Meu%20faturamento%20anual%20é%20superior%20a%20R$%202M.', '_blank');
  }, []);

  return (
    <section className="min-h-screen pt-20 flex items-center relative overflow-hidden bg-gradient-to-b from-background via-background/98 to-background/95">
      {/* Elegant Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl opacity-60" />
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-gold/3 rounded-full filter blur-2xl opacity-40" />
      </div>

      <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Premium Badge with Exclusivity */}
          <div className="inline-flex items-center gap-3 bg-gold/10 border-2 border-gold/30 text-gold px-6 py-3 rounded-full font-semibold shadow-lg mb-8">
            <Crown className="w-5 h-5" />
            <span className="text-sm md:text-base">
              Consultoria Executiva • Apenas {exclusivityCount} vagas este mês
            </span>
          </div>

          {/* Executive Headline */}
          <div className="mb-8">
            <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl md:text-7xl'} font-bold leading-tight mb-6`}>
              <span className="text-white block mb-3">Corte</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold block mb-3">
                {isMobile ? "R$ 500k a R$ 2M" : "R$ 500k a R$ 2M por Ano"}
              </span>
              <span className="text-white block">
                {isMobile ? "em Custos Operacionais" : "em Custos Operacionais Desnecessários"}
              </span>
            </h1>
          </div>

          {/* Premium Subheadline */}
          <div className="mb-8">
            <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-foreground/90 leading-relaxed mb-6 max-w-4xl`}>
              {isMobile 
                ? "Sistemas inteligentes que substituem processos operacionais complexos. Para empresas com faturamento R$ 2M+/ano."
                : "Funcionários Digitais que executam processos operacionais 24/7 com precisão absoluta. Exclusivo para empresas com faturamento anual superior a R$ 2 milhões."
              }
            </p>
            
            {/* Executive Metrics */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gold font-semibold">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>ROI médio: 450% no primeiro ano</span>
              </div>
              <div className="hidden md:block w-1 h-1 bg-gold rounded-full"></div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Payback garantido em 6 meses</span>
              </div>
            </div>
          </div>

          {/* Executive Social Proof */}
          <div className="mb-10">
            <p className="text-sm text-foreground/70 mb-4 font-medium">CEOs que já implementaram:</p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 opacity-80">
              <div className="text-xs bg-card/40 border border-gold/20 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">E-commerce</span>
                <span className="text-foreground/60 block">R$ 8M/ano • -R$ 600k custos</span>
              </div>
              <div className="text-xs bg-card/40 border border-gold/20 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">Indústria</span>
                <span className="text-foreground/60 block">R$ 15M/ano • -R$ 1.2M custos</span>
              </div>
              <div className="text-xs bg-card/40 border border-gold/20 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">SaaS</span>
                <span className="text-foreground/60 block">R$ 5M/ano • -R$ 400k custos</span>
              </div>
            </div>
          </div>

          {/* Premium CTAs */}
          <div className="space-y-6 w-full max-w-lg mx-auto">
            {/* Primary Executive CTA */}
            <ExecutiveButton
              variant="calendar"
              className={`w-full bg-gold hover:bg-gold-light text-background font-bold ${isMobile ? 'text-lg px-8 py-6' : 'text-xl px-12 py-8'} rounded-xl shadow-2xl border-2 border-gold/30`}
              trackingId="premium_hero_executive"
              trackingSection="hero_premium"
            >
              <Calendar className="mr-3 h-6 w-6" />
              {isMobile ? "Consultoria Executiva Gratuita" : "Agendar Consultoria Executiva Gratuita"}
              <ArrowRight className="ml-3 h-6 w-6" />
            </ExecutiveButton>

            {/* Secondary CTA for Analysis */}
            <Button
              onClick={handleExecutiveConsultation}
              variant="outline"
              className={`w-full border-2 border-gold/40 text-gold hover:bg-gold/10 font-semibold ${isMobile ? 'px-6 py-4' : 'px-8 py-6'} rounded-xl transition-all duration-300`}
            >
              <Users className="mr-2 h-5 w-5" />
              Análise Estratégica Personalizada
            </Button>
          </div>

          {/* Executive Guarantees */}
          <div className="mt-10 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Análise gratuita sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>ROI garantido ou dinheiro de volta</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Implementação em até 90 dias</span>
              </div>
            </div>
            
            <p className="text-xs text-center text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              ✓ Equipe dedicada exclusiva para sua implementação
              <br />
              ✓ Gerente de sucesso C-level durante todo o processo
              <br />
              ✓ Suporte white-glove 24/7 incluso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

PremiumExecutiveHero.displayName = "PremiumExecutiveHero";

export default PremiumExecutiveHero;
