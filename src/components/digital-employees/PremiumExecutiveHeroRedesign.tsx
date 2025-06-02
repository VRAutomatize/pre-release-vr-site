
import React, { useState, useCallback } from "react";
import { Crown, TrendingUp, Shield, ArrowRight, Calendar, Users, Award, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExecutiveButton } from "@/components/form/ExecutiveButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const PremiumExecutiveHeroRedesign = React.memo(() => {
  const isMobile = useIsMobile();
  const [exclusivityCount] = useState(5); // Vagas ultra exclusivas

  const executiveLogos = [
    { name: "Magazine Luiza", sector: "Varejo" },
    { name: "Natura", sector: "Cosméticos" },
    { name: "Via Varejo", sector: "E-commerce" },
    { name: "Localiza", sector: "Mobilidade" },
    { name: "StoneCo", sector: "Fintech" }
  ];

  const executiveMetrics = [
    { icon: TrendingUp, value: "R$ 85M+", label: "Economia Gerada", highlight: true },
    { icon: Shield, value: "98%", label: "Taxa de Sucesso", highlight: false },
    { icon: Award, value: "200+", label: "Empresas Atendidas", highlight: false },
    { icon: Star, value: "450%", label: "ROI Médio Anual", highlight: true }
  ];

  const handleExecutiveConsultation = useCallback(() => {
    window.open('https://wa.me/554788558257?text=Ol%C3%A1!%20Sou%20CEO/Empresário%20interessado%20na%20consultoria%20executiva%20sobre%20Funcionários%20Digitais.%20Meu%20faturamento%20anual%20é%20superior%20a%20R$%205M.', '_blank');
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-background to-gray-800">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-premium-gold/10 to-premium-blue/10 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-premium-green/10 to-premium-gold/10 rounded-full filter blur-2xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />
      </div>

      {/* Premium Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="premium-container relative z-10 pt-20">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Premium Exclusivity Badge */}
          <div className="inline-flex items-center gap-3 premium-card-glass px-6 py-4 mb-8 premium-glow-pulse">
            <Crown className="w-6 h-6 text-premium-gold" />
            <span className="executive-body-small font-semibold">
              Consultoria Ultra-Executiva • Apenas {exclusivityCount} vagas este trimestre
            </span>
          </div>

          {/* Executive Hero Headline */}
          <div className="mb-10 space-y-6">
            <h1 className="executive-display-hero">
              <span className="block mb-4">Elimine</span>
              <span className="executive-accent block mb-4">
                {isMobile ? "R$ 2M+ Anuais" : "R$ 2M+ em Desperdícios"}
              </span>
              <span className="block">
                {isMobile ? "em Custos Operacionais" : "Operacionais Desnecessários"}
              </span>
            </h1>
            
            <p className="executive-body-large max-w-4xl mx-auto leading-relaxed">
              {isMobile 
                ? "Sistema inteligente que substitui processos manuais complexos. Exclusivo para empresas com faturamento R$ 5M+/ano."
                : "Funcionários Digitais que executam processos operacionais complexos 24/7 com precisão absoluta. Consultoria ultra-exclusiva para empresas com faturamento anual superior a R$ 5 milhões."
              }
            </p>
          </div>

          {/* Executive Social Proof Logos */}
          <div className="mb-12">
            <p className="executive-body-small mb-6 uppercase tracking-wider">
              CEOs que já economizaram milhões:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 opacity-70">
              {executiveLogos.map((company, index) => (
                <div key={index} className="premium-card-glass px-6 py-3 text-center">
                  <div className="executive-body-small text-premium-gold font-semibold">
                    {company.name}
                  </div>
                  <div className="text-xs text-white/60 mt-1">
                    {company.sector}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {executiveMetrics.map((metric, index) => (
              <div key={index} className={`premium-card-glass p-6 text-center ${metric.highlight ? 'border-premium-gold/40' : ''}`}>
                <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.highlight ? 'text-premium-gold' : 'text-premium-blue-light'}`} />
                <div className={`text-2xl md:text-3xl font-bold mb-2 ${metric.highlight ? 'text-premium-gold' : 'text-white'}`}>
                  {metric.value}
                </div>
                <div className="executive-body-small text-white/70">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTAs */}
          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Primary Executive CTA */}
            <ExecutiveButton
              variant="calendar"
              className="premium-button-primary w-full text-xl px-12 py-6 premium-scale-in"
              trackingId="premium_hero_executive_redesign"
              trackingSection="hero_premium_redesign"
            >
              <Calendar className="mr-4 h-7 w-7" />
              {isMobile ? "Análise Executiva Gratuita" : "Agendar Análise Executiva Privada"}
              <ArrowRight className="ml-4 h-7 w-7" />
            </ExecutiveButton>

            {/* Secondary Analysis CTA */}
            <Button
              onClick={handleExecutiveConsultation}
              className="premium-button-secondary w-full text-lg px-8 py-5"
            >
              <Users className="mr-3 h-6 w-6" />
              Conversar com Especialista C-Level
            </Button>
          </div>

          {/* Executive Guarantees */}
          <div className="mt-12 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 executive-body-medium">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-premium-green" />
                <span>Análise gratuita sem compromisso</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-premium-green" />
                <span>ROI garantido ou dinheiro de volta</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-premium-green" />
                <span>Implementação em até 60 dias</span>
              </div>
            </div>
            
            <div className="premium-card-glass p-6 max-w-4xl mx-auto">
              <p className="executive-body-small text-center leading-relaxed">
                ✓ Equipe dedicada exclusiva para empresas R$ 5M+
                <br className="premium-mobile-hidden" />
                ✓ Gerente de sucesso C-level durante todo o processo
                <br className="premium-mobile-hidden" />
                ✓ Suporte white-glove 24/7 incluso
                <br className="premium-mobile-hidden" />
                ✓ Garantia de payback em 6 meses ou menos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

PremiumExecutiveHeroRedesign.displayName = "PremiumExecutiveHeroRedesign";

export default PremiumExecutiveHeroRedesign;
