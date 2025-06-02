
import React from "react";
import { motion } from "framer-motion";
import { Rocket, Factory, Briefcase, Globe, CheckCircle, ArrowRight, Building, TrendingUp } from "lucide-react";
import { PremiumCard, PremiumButton, PremiumSection, PremiumBadge } from "./PremiumComponents";

const BusinessTransformationSection = () => {
  const transformationCases = [
    {
      sector: "Manufatura",
      icon: Factory,
      company: "Grupo Industrial Nacional",
      revenue: "R$ 85M",
      challenge: "Gestão manual de 12 fábricas com inconsistências na produção",
      transformation: "Implementação de sistema unificado de controle de qualidade e produção",
      timeline: "120 dias",
      results: {
        efficiency: "+78%",
        cost_reduction: "R$ 3.2M/ano",
        quality: "+92%",
        roi: "520%"
      },
      quote: "Transformamos nossa operação de uma gestão reativa para preditiva. Agora antecipamos problemas antes que aconteçam.",
      executive: "Roberto Mendes, CEO"
    },
    {
      sector: "Varejo",
      icon: Briefcase,
      company: "Rede de Franquias Premium",
      revenue: "R$ 65M",
      challenge: "Controle descentralizado de 45 lojas com perdas significativas",
      transformation: "Automação completa do controle de estoque e vendas em tempo real",
      timeline: "90 dias",
      results: {
        efficiency: "+65%",
        cost_reduction: "R$ 2.8M/ano",
        quality: "+85%",
        roi: "430%"
      },
      quote: "Conseguimos visibilidade total do negócio. Cada decisão agora é baseada em dados precisos e em tempo real.",
      executive: "Marina Silva, Diretora Executiva"
    },
    {
      sector: "Serviços",
      icon: Globe,
      company: "Consultoria Empresarial",
      revenue: "R$ 45M",
      challenge: "Processos manuais impediam escalabilidade e crescimento",
      transformation: "Digitalização completa do atendimento ao cliente e gestão de projetos",
      timeline: "75 dias",
      results: {
        efficiency: "+95%",
        cost_reduction: "R$ 1.9M/ano",
        quality: "+88%",
        roi: "380%"
      },
      quote: "Multiplicamos nossa capacidade de atendimento sem aumentar o quadro. Nossos consultores agora focam em estratégia, não em operação.",
      executive: "Carlos Eduardo, Sócio-Fundador"
    }
  ];

  const transformationPhases = [
    {
      phase: "Diagnóstico Estratégico",
      duration: "15 dias",
      description: "Mapeamento completo dos processos atuais e identificação de oportunidades de automação",
      deliverables: ["Audit completo", "Gap analysis", "ROI projetado"]
    },
    {
      phase: "Design da Solução",
      duration: "20 dias", 
      description: "Desenvolvimento da arquitetura personalizada e integração com sistemas existentes",
      deliverables: ["Blueprint técnico", "Cronograma detalhado", "Plano de migração"]
    },
    {
      phase: "Implementação Ágil",
      duration: "45-90 dias",
      description: "Deploy progressivo com testes contínuos e ajustes em tempo real",
      deliverables: ["Sistema funcionando", "Treinamento equipe", "Documentação"]
    },
    {
      phase: "Otimização Contínua",
      duration: "Ongoing",
      description: "Monitoramento ativo, melhorias incrementais e expansão de funcionalidades",
      deliverables: ["Relatórios mensais", "Updates automáticos", "Suporte premium"]
    }
  ];

  return (
    <PremiumSection>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 premium-card-glass px-6 py-3 mb-6">
            <Rocket className="h-5 w-5 text-premium-gold" />
            <span className="executive-body-small font-semibold">Transformação Empresarial</span>
          </div>
          <h2 className="executive-display-large mb-6">
            <span className="text-white">Cases de</span>
            <br />
            <span className="executive-accent">Transformação Real</span>
          </h2>
          <p className="executive-body-large max-w-4xl mx-auto">
            Empresas que revolucionaram suas operações e multiplicaram resultados
          </p>
        </div>

        {/* Transformation Cases */}
        <div className="mb-20">
          <div className="space-y-12">
            {transformationCases.map((case_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <PremiumCard className="p-8">
                  <div className="premium-grid-2 gap-8">
                    
                    {/* Case Info */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-premium-gold/20 rounded-2xl">
                          <case_.icon className="w-8 h-8 text-premium-gold" />
                        </div>
                        <div>
                          <PremiumBadge variant="gold" size="sm">
                            {case_.sector}
                          </PremiumBadge>
                          <h4 className="executive-body-medium font-bold text-white mt-2">
                            {case_.company}
                          </h4>
                          <p className="text-premium-gold text-sm">{case_.revenue} de faturamento</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Desafio Inicial
                          </h5>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {case_.challenge}
                          </p>
                        </div>
                        
                        <div>
                          <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Rocket className="w-4 h-4" />
                            Transformação Implementada
                          </h5>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {case_.transformation}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-premium-green" />
                            <span className="text-white/70">Implementado em {case_.timeline}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <h5 className="text-white font-semibold mb-6">Resultados Alcançados</h5>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="premium-card-glass p-4 text-center">
                          <TrendingUp className="w-6 h-6 text-premium-green mx-auto mb-2" />
                          <div className="text-premium-green font-bold text-xl mb-1">
                            {case_.results.efficiency}
                          </div>
                          <div className="text-white/60 text-xs">Eficiência</div>
                        </div>
                        
                        <div className="premium-card-glass p-4 text-center">
                          <div className="text-green-400 font-bold text-xl mb-1">
                            {case_.results.cost_reduction}
                          </div>
                          <div className="text-white/60 text-xs">Economia</div>
                        </div>
                        
                        <div className="premium-card-glass p-4 text-center">
                          <div className="text-premium-blue-light font-bold text-xl mb-1">
                            {case_.results.quality}
                          </div>
                          <div className="text-white/60 text-xs">Qualidade</div>
                        </div>
                        
                        <div className="premium-card-glass p-4 text-center">
                          <div className="text-premium-gold font-bold text-xl mb-1">
                            {case_.results.roi}
                          </div>
                          <div className="text-white/60 text-xs">ROI Anual</div>
                        </div>
                      </div>

                      <blockquote className="border-l-4 border-premium-gold pl-6 italic text-white/90 mb-6">
                        "{case_.quote}"
                      </blockquote>

                      <div className="text-right">
                        <p className="text-premium-gold font-semibold">
                          — {case_.executive}
                        </p>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transformation Process */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Processo de Transformação</h3>
          
          <div className="space-y-6">
            {transformationPhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <PremiumCard className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center">
                        <span className="text-background font-bold text-lg">{index + 1}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h4 className="executive-body-medium font-bold text-white">
                          {phase.phase}
                        </h4>
                        <PremiumBadge variant="blue" size="sm">
                          {phase.duration}
                        </PremiumBadge>
                      </div>
                      
                      <p className="text-white/80 mb-4 leading-relaxed">
                        {phase.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((deliverable, i) => (
                          <span key={i} className="inline-flex items-center gap-2 text-sm text-premium-green">
                            <CheckCircle className="w-3 h-3" />
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {index < transformationPhases.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-premium-gold/60 flex-shrink-0 mt-4" />
                    )}
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transformation CTA */}
        <div className="text-center">
          <PremiumCard className="p-12 bg-gradient-to-r from-premium-gold/10 to-premium-green/10">
            <Rocket className="w-16 h-16 text-premium-gold mx-auto mb-6" />
            <h3 className="executive-display-medium mb-6">
              Pronto para Transformar Sua Empresa?
            </h3>
            <p className="executive-body-large mb-8 max-w-3xl mx-auto">
              Junte-se aos CEOs que já revolucionaram suas operações e multiplicaram seus resultados
            </p>
            <PremiumButton variant="primary" className="text-xl px-12 py-6">
              <Rocket className="mr-4 h-6 w-6" />
              Iniciar Minha Transformação
            </PremiumButton>
          </PremiumCard>
        </div>
      </div>
    </PremiumSection>
  );
};

export default BusinessTransformationSection;
