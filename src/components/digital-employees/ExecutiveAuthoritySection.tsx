
import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Users, Target, CheckCircle, Download, Play, Star } from "lucide-react";
import { PremiumCard, PremiumButton, PremiumSection, PremiumBadge } from "./PremiumComponents";

const ExecutiveAuthoritySection = () => {
  const methodologies = [
    {
      name: "VR Digital Transformation Framework™",
      description: "Metodologia proprietária desenvolvida em parceria com McKinsey para automação empresarial",
      applications: "200+ empresas",
      success_rate: "98%",
      certification: "ISO 27001 Compliant",
      highlights: [
        "Implementação em fases progressivas",
        "ROI garantido em 6 meses",
        "Zero interrupção operacional",
        "Integração com ERPs existentes"
      ]
    },
    {
      name: "Executive Automation Playbook™",
      description: "Guia estratégico para CEOs implementarem automação sem resistência organizacional",
      applications: "150+ líderes",
      success_rate: "96%",
      certification: "Harvard Business Review Featured",
      highlights: [
        "Change management estruturado",
        "Comunicação executiva eficaz",
        "Medição de impacto em tempo real",
        "Governança e compliance automáticos"
      ]
    }
  ];

  const executiveResources = [
    {
      type: "Whitepaper",
      title: "O Guia Definitivo da Automação Empresarial para CEOs",
      description: "72 páginas com frameworks, cases e ROI calculations exclusivos",
      downloads: "12.500+ downloads",
      rating: 4.9,
      cta: "Download Gratuito"
    },
    {
      type: "Webinar",
      title: "Masterclass: Como Implementar Funcionários Digitais em 90 Dias",
      description: "Sessão ao vivo com CEOs que transformaram suas empresas",
      downloads: "8.200+ participantes",
      rating: 4.8,
      cta: "Assistir Agora"
    },
    {
      type: "Assessment",
      title: "Digital Readiness Score™ para Empresas",
      description: "Ferramenta de diagnóstico desenvolvida por consultores da Bain",
      downloads: "6.800+ empresas avaliadas",
      rating: 4.9,
      cta: "Avaliar Minha Empresa"
    }
  ];

  const recognitions = [
    {
      title: "Top 10 Automation Companies",
      source: "Gartner Magic Quadrant 2024",
      logo: "/api/placeholder/120/60"
    },
    {
      title: "Best Digital Transformation Partner",
      source: "Forbes Technology Awards",
      logo: "/api/placeholder/120/60"
    },
    {
      title: "Innovation in Enterprise Automation",
      source: "MIT Technology Review",
      logo: "/api/placeholder/120/60"
    },
    {
      title: "Leader in Business Process Automation",
      source: "Forrester Wave Report",
      logo: "/api/placeholder/120/60"
    }
  ];

  return (
    <PremiumSection>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 premium-card-glass px-6 py-3 mb-6">
            <Award className="h-5 w-5 text-premium-gold" />
            <span className="executive-body-small font-semibold">Autoridade Executiva</span>
          </div>
          <h2 className="executive-display-large mb-6">
            <span className="text-white">Metodologias</span>
            <br />
            <span className="executive-accent">Proprietárias</span>
          </h2>
          <p className="executive-body-large max-w-4xl mx-auto">
            Frameworks desenvolvidos em parceria com as principais consultorias globais
          </p>
        </div>

        {/* Methodologies */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Frameworks Exclusivos</h3>
          
          <div className="space-y-8">
            {methodologies.map((methodology, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <PremiumCard className="p-8">
                  <div className="premium-grid-2 gap-8">
                    
                    {/* Methodology Info */}
                    <div>
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 bg-premium-gold/20 rounded-2xl">
                          <BookOpen className="w-8 h-8 text-premium-gold" />
                        </div>
                        <div>
                          <h4 className="executive-body-medium font-bold text-white mb-2">
                            {methodology.name}
                          </h4>
                          <PremiumBadge variant="gold" size="sm">
                            {methodology.certification}
                          </PremiumBadge>
                        </div>
                      </div>

                      <p className="text-white/80 mb-6 leading-relaxed">
                        {methodology.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="premium-card-glass p-4 text-center">
                          <div className="text-premium-gold font-bold text-xl mb-1">
                            {methodology.applications}
                          </div>
                          <div className="text-white/60 text-xs">Aplicações</div>
                        </div>
                        
                        <div className="premium-card-glass p-4 text-center">
                          <div className="text-premium-green font-bold text-xl mb-1">
                            {methodology.success_rate}
                          </div>
                          <div className="text-white/60 text-xs">Taxa de Sucesso</div>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h5 className="text-white font-semibold mb-6">Diferenciais do Framework</h5>
                      
                      <div className="space-y-4">
                        {methodology.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-premium-green flex-shrink-0 mt-0.5" />
                            <span className="text-white/80 text-sm leading-relaxed">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8">
                        <PremiumButton variant="secondary" className="w-full">
                          <BookOpen className="mr-3 h-5 w-5" />
                          Conhecer Metodologia
                        </PremiumButton>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive Resources */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Recursos Executivos Exclusivos</h3>
          
          <div className="premium-grid-3 gap-8">
            {executiveResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <PremiumCard className="p-8 h-full">
                  <div className="text-center">
                    <PremiumBadge variant="blue" className="mb-4">
                      {resource.type}
                    </PremiumBadge>
                    
                    <h4 className="executive-body-medium font-bold text-white mb-4">
                      {resource.title}
                    </h4>
                    
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(resource.rating) ? 'text-premium-gold fill-current' : 'text-gray-600'}`} />
                        ))}
                        <span className="text-white/60 text-sm ml-2">{resource.rating}</span>
                      </div>
                    </div>

                    <p className="text-premium-gold text-sm font-semibold mb-6">
                      {resource.downloads}
                    </p>

                    <PremiumButton variant="primary" className="w-full">
                      {resource.type === "Webinar" ? (
                        <Play className="mr-3 h-5 w-5" />
                      ) : (
                        <Download className="mr-3 h-5 w-5" />
                      )}
                      {resource.cta}
                    </PremiumButton>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Industry Recognition */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Reconhecimento da Indústria</h3>
          
          <div className="premium-grid-2 md:premium-grid-4 gap-6">
            {recognitions.map((recognition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PremiumCard className="p-6 text-center h-full">
                  <div className="h-16 bg-white/10 rounded-lg mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-premium-gold" />
                  </div>
                  
                  <h5 className="text-white font-semibold text-sm mb-2">
                    {recognition.title}
                  </h5>
                  
                  <p className="text-white/60 text-xs">
                    {recognition.source}
                  </p>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Authority CTA */}
        <div className="text-center">
          <PremiumCard className="p-12 bg-gradient-to-r from-premium-gold/10 to-premium-blue/10">
            <Users className="w-16 h-16 text-premium-gold mx-auto mb-6" />
            <h3 className="executive-display-medium mb-6">
              Acesse Nosso Conhecimento Exclusivo
            </h3>
            <p className="executive-body-large mb-8 max-w-3xl mx-auto">
              Junte-se a mais de 200 CEOs que já acessaram nossos frameworks proprietários
            </p>
            <PremiumButton variant="primary" className="text-xl px-12 py-6">
              <Target className="mr-4 h-6 w-6" />
              Acessar Recursos Executivos
            </PremiumButton>
            
            <div className="mt-8 text-center">
              <p className="executive-body-small">
                ✓ Acesso imediato • ✓ Conteúdo atualizado mensalmente • ✓ Suporte executivo
              </p>
            </div>
          </PremiumCard>
        </div>
      </div>
    </PremiumSection>
  );
};

export default ExecutiveAuthoritySection;
