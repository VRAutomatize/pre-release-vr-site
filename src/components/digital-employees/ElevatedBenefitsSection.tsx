
import React from "react";
import { TrendingUp, DollarSign, Clock, Shield, Zap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useOptimizedMotion } from "@/hooks/useOptimizedMotion";

const ElevatedBenefitsSection = React.memo(() => {
  const isMobile = useIsMobile();
  const { shouldReduceMotion } = useOptimizedMotion();

  const benefits = [
    {
      icon: DollarSign,
      title: "Redução de Custos Imediata",
      description: "Corte 60-80% dos custos operacionais em 90 dias",
      metric: "R$ 200k+",
      color: "text-green-400"
    },
    {
      icon: Clock,
      title: "Disponibilidade 24/7",
      description: "Sistemas que nunca param, nunca faltam, nunca oscilam",
      metric: "100%",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      title: "Escalabilidade Infinita",
      description: "Processe 10x mais volume sem contratar mais pessoas",
      metric: "10x",
      color: "text-gold"
    },
    {
      icon: Shield,
      title: "Zero Erro Humano",
      description: "Precisão absoluta em cada processo automatizado",
      metric: "99.9%",
      color: "text-purple-400"
    },
    {
      icon: Zap,
      title: "Implementação Rápida",
      description: "Sistema funcionando em 30-60 dias máximo",
      metric: "30 dias",
      color: "text-orange-400"
    },
    {
      icon: Users,
      title: "Equipe Focada em Estratégia",
      description: "Libere seu time para tarefas de alto valor agregado",
      metric: "ROI 380%",
      color: "text-red-400"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        
        {/* Header otimizado */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/15 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="h-5 w-5 text-gold" />
            <span className="text-gold font-semibold">Transformação Comprovada</span>
          </div>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-4`}>
            <span className="text-white">Por que</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-green-400">
              Funcionários Digitais
            </span>{" "}
            <span className="text-white">são a solução?</span>
          </h2>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-foreground/80 max-w-3xl mx-auto`}>
            Enquanto seus concorrentes lutam com custos crescentes e processos ineficientes, 
            você terá uma máquina de performance constante
          </p>
        </div>

        {/* Benefits Grid - Otimizado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className={`p-6 md:p-8 bg-card/80 backdrop-blur-sm border-gold/20 rounded-xl hover:border-gold/40 transition-all duration-300 ${shouldReduceMotion ? '' : 'hover:-translate-y-2'} group`}
              style={{ willChange: shouldReduceMotion ? 'auto' : 'transform' }}
            >
              {/* Icon e Métrica */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-${benefit.color.split('-')[1]}-400/20 to-${benefit.color.split('-')[1]}-500/20 flex items-center justify-center`}>
                  <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <div className={`text-right`}>
                  <div className={`text-2xl font-bold ${benefit.color}`}>
                    {benefit.metric}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA - Simplificado */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-gold/10 to-green-400/10 border border-gold/20 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Pronto para Transformar Sua Operação?
            </h3>
            <p className="text-foreground/80 mb-6">
              Mais de 200 empresas já reduziram custos em 6 dígitos. Sua empresa será a próxima?
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-green-400 font-semibold">
                <Shield className="h-5 w-5" />
                <span>Garantia de resultado ou dinheiro de volta</span>
              </div>
              <div className="flex items-center gap-2 text-gold font-semibold">
                <Clock className="h-5 w-5" />
                <span>Implementação em até 60 dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ElevatedBenefitsSection.displayName = "ElevatedBenefitsSection";

export default ElevatedBenefitsSection;
