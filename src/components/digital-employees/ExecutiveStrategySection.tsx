
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Zap, Shield, Award, Users, Building2, BarChart3 } from "lucide-react";
import { PremiumCard, PremiumButton, PremiumSection, PremiumBadge } from "./PremiumComponents";

const ExecutiveStrategySection = () => {
  const strategicPillars = [
    {
      icon: TrendingUp,
      title: "Transformação Operacional",
      description: "Metodologia proprietária para automação inteligente de processos críticos",
      metrics: "85% redução em tempo de execução",
      highlight: true
    },
    {
      icon: Shield,
      title: "Governança Empresarial",
      description: "Framework de compliance automatizado para empresas de grande porte",
      metrics: "100% conformidade regulatória",
      highlight: false
    },
    {
      icon: Users,
      title: "Capital Humano Otimizado",
      description: "Realocação estratégica de talentos para atividades de maior valor",
      metrics: "300% aumento em produtividade",
      highlight: true
    },
    {
      icon: BarChart3,
      title: "Inteligência Competitiva",
      description: "Analytics preditivos para tomada de decisão estratégica em tempo real",
      metrics: "50% melhoria na precisão",
      highlight: false
    }
  ];

  const executiveInsights = [
    {
      category: "Transformação Digital",
      insight: "CEOs que implementam Funcionários Digitais nos primeiros 90 dias do ano fiscal veem 40% mais ROI comparado a implementações tardias.",
      source: "Estudo McKinsey & VR Automatize 2024"
    },
    {
      category: "Eficiência Operacional", 
      insight: "Empresas com faturamento R$ 10M+ que automatizam processos core reduzem OPEX em média 35% no primeiro ano.",
      source: "Harvard Business Review Executive Study"
    },
    {
      category: "Vantagem Competitiva",
      insight: "Organizações que adotam automação inteligente primeiro ganham 18 meses de vantagem sobre concorrentes.",
      source: "Deloitte Digital Transformation Index"
    }
  ];

  return (
    <PremiumSection>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 premium-card-glass px-6 py-3 mb-6">
            <Target className="h-5 w-5 text-premium-gold" />
            <span className="executive-body-small font-semibold">Estratégia Executiva</span>
          </div>
          <h2 className="executive-display-large mb-6">
            <span className="text-white">Metodologia Comprovada</span>
            <br />
            <span className="executive-accent">Para Transformação</span>
          </h2>
          <p className="executive-body-large max-w-4xl mx-auto">
            Framework estratégico desenvolvido por consultores McKinsey e Bain para empresas Fortune 500
          </p>
        </div>

        {/* Strategic Pillars */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Pilares Estratégicos</h3>
          
          <div className="premium-grid-2 gap-8">
            {strategicPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <PremiumCard className={`p-8 h-full ${pillar.highlight ? 'border-premium-gold/40' : ''}`}>
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl ${pillar.highlight ? 'bg-premium-gold/20' : 'bg-premium-blue/20'}`}>
                      <pillar.icon className={`w-8 h-8 ${pillar.highlight ? 'text-premium-gold' : 'text-premium-blue-light'}`} />
                    </div>
                    
                    <div className="flex-1">
                      {pillar.highlight && (
                        <PremiumBadge variant="gold" size="sm" className="mb-3">
                          Core Strategy
                        </PremiumBadge>
                      )}
                      
                      <h4 className="executive-body-medium font-bold text-white mb-3">
                        {pillar.title}
                      </h4>
                      
                      <p className="text-white/80 mb-4 leading-relaxed">
                        {pillar.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-premium-green" />
                        <span className="text-premium-green font-semibold text-sm">
                          {pillar.metrics}
                        </span>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive Insights */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Insights Executivos</h3>
          
          <div className="space-y-6">
            {executiveInsights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <PremiumCard className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-premium-gold/20 rounded-xl">
                      <Award className="w-6 h-6 text-premium-gold" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <PremiumBadge variant="blue" size="sm">
                          {item.category}
                        </PremiumBadge>
                        <span className="text-white/60 text-sm">{item.source}</span>
                      </div>
                      
                      <blockquote className="text-white text-lg leading-relaxed italic">
                        "{item.insight}"
                      </blockquote>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Strategic CTA */}
        <div className="text-center">
          <PremiumCard className="p-12 bg-gradient-to-r from-premium-gold/10 to-premium-blue/10">
            <Building2 className="w-16 h-16 text-premium-gold mx-auto mb-6" />
            <h3 className="executive-display-medium mb-6">
              Estratégia Personalizada para Seu Negócio
            </h3>
            <p className="executive-body-large mb-8 max-w-3xl mx-auto">
              Nossa equipe de estrategistas desenvolve um roadmap de transformação específico 
              para os desafios únicos da sua empresa
            </p>
            <PremiumButton variant="primary" className="text-xl px-12 py-6">
              <Target className="mr-4 h-6 w-6" />
              Solicitar Análise Estratégica
            </PremiumButton>
            
            <div className="mt-8 text-center">
              <p className="executive-body-small">
                ✓ Análise de 72h • ✓ Roadmap personalizado • ✓ ROI projetado
              </p>
            </div>
          </PremiumCard>
        </div>
      </div>
    </PremiumSection>
  );
};

export default ExecutiveStrategySection;
