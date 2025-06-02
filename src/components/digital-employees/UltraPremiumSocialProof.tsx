
import React from "react";
import { Card } from "@/components/ui/card";
import { Quote, Star, TrendingUp, Building, Crown, Award } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const UltraPremiumSocialProof = () => {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    []
  );

  const executiveTestimonials = [
    {
      company: "Grupo Atacadista Nacional",
      revenue: "R$ 45M/ano",
      position: "CEO e Fundador",
      name: "Roberto M.",
      savings: "R$ 1.8M/ano",
      quote: "Em 8 meses cortamos R$ 1.8M em custos operacionais. O sistema gerencia nossa logística completa, desde pedidos até entrega. Nosso EBITDA aumentou 12% no ano.",
      implementation: "Sistema completo em 90 dias",
      impact: "Equipe operacional reduzida de 85 para 28 pessoas",
      rating: 5,
      verified: true
    },
    {
      company: "Rede de Franquias (Alimentação)",
      revenue: "R$ 28M/ano", 
      position: "Diretor Executivo",
      name: "Claudia S.",
      savings: "R$ 950k/ano",
      quote: "Padronizamos processos em 47 lojas simultaneamente. Zero retrabalho, zero erro humano. Nossos franchisados relatam aumento de 25% na produtividade.",
      implementation: "Rollout em 60 dias",
      impact: "Redução de 65% nos custos administrativos",
      rating: 5,
      verified: true
    },
    {
      company: "Indústria Farmacêutica",
      revenue: "R$ 22M/ano",
      position: "CEO",
      name: "Dr. Carlos R.",
      savings: "R$ 780k/ano",
      quote: "Automação completa da gestão regulatória e compliance. O que levava semanas agora é processado em horas. ROI de 420% no primeiro ano.",
      implementation: "Projeto concluído em 75 dias",
      impact: "Conformidade 99.8% vs 87% anterior",
      rating: 5,
      verified: true
    },
    {
      company: "Marketplace B2B",
      revenue: "R$ 18M/ano",
      position: "Sócio-Fundador",
      name: "Marina L.",
      savings: "R$ 680k/ano",
      quote: "Onboarding de fornecedores que levava 15 dias agora é feito em 2 horas. Conseguimos escalar sem contratar mais operacional. Margem bruta aumentou 8%.",
      implementation: "Sistema ativo em 45 dias",
      impact: "Capacidade de onboarding 15x maior",
      rating: 5,
      verified: true
    },
    {
      company: "Construtora Regional",
      revenue: "R$ 35M/ano",
      position: "Diretor Geral",
      name: "Eng. Paulo H.",
      savings: "R$ 1.2M/ano",
      quote: "Gestão completa de obras, fornecedores e compliance. Cronogramas cumpridos, orçamentos respeitados. Nunca tivemos controle tão preciso.",
      implementation: "Implementação em 120 dias",
      impact: "Redução de 40% em atrasos de obra",
      rating: 5,
      verified: true
    },
    {
      company: "Distribuidora Multimarcas",
      revenue: "R$ 12M/ano",
      position: "CEO",
      name: "André F.",
      savings: "R$ 520k/ano",
      quote: "Sistema integrado com todos fornecedores. Reposição automática, gestão de estoque inteligente. Ruptura de produtos caiu 95%.",
      implementation: "Projeto em 60 dias",
      impact: "Giro de estoque 3x mais eficiente",
      rating: 5,
      verified: true
    }
  ];

  const certifications = [
    {
      icon: Award,
      title: "Top Voice LinkedIn",
      description: "Automação Empresarial 2024"
    },
    {
      icon: Building,
      title: "Parceiro Certificado",
      description: "Microsoft & Google Cloud"
    },
    {
      icon: Crown,
      title: "Prêmio Excelência",
      description: "Revista Pequenas Empresas & Grandes Negócios"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-card/5 to-transparent">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/15 px-4 py-2 rounded-full mb-6">
            <Crown className="h-5 w-5 text-gold" />
            <span className="text-gold font-semibold">Liderança Comprovada</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white block mb-2">CEOs que Cortaram</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-green-400">
              Milhões em Custos
            </span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Depoimentos verificados de empresários que implementaram Funcionários Digitais
          </p>
        </div>

        {/* Executive Testimonials Carousel */}
        <div className="max-w-7xl mx-auto mb-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            plugins={[plugin]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {executiveTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/2">
                  <Card className="p-8 border-gold/20 bg-black/40 backdrop-blur-lg hover:border-gold/40 transition-all h-full">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          {testimonial.verified && (
                            <div className="ml-2 bg-green-400/20 border border-green-400/40 rounded-full px-2 py-1">
                              <span className="text-green-400 text-xs font-semibold">✓ Verificado</span>
                            </div>
                          )}
                        </div>
                        <p className="text-foreground/70 text-sm font-medium">{testimonial.company}</p>
                        <p className="text-gold text-sm">{testimonial.revenue} • {testimonial.position}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-green-400 font-bold text-lg">{testimonial.savings}</span>
                        </div>
                        <p className="text-foreground/60 text-xs">economia anual</p>
                      </div>
                    </div>
                    
                    {/* Quote */}
                    <Quote className="h-6 w-6 text-gold/60 mb-4" />
                    <blockquote className="text-foreground/90 mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Implementation Details */}
                    <div className="space-y-3 border-t border-gold/20 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/70">Implementação:</span>
                        <span className="text-gold font-semibold">{testimonial.implementation}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-foreground/70">Impacto: </span>
                        <span className="text-green-400 font-medium">{testimonial.impact}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-gold font-semibold">— {testimonial.name}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>

        {/* Certifications and Awards */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Reconhecimentos e Certificações</h3>
            <p className="text-foreground/70">Validação externa da nossa excelência em automação empresarial</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 bg-gold/10 border-gold/30 text-center">
                <cert.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">{cert.title}</h4>
                <p className="text-foreground/70 text-sm">{cert.description}</p>
              </Card>
            ))}
          </div>

          {/* Summary Stats */}
          <Card className="p-8 bg-gradient-to-r from-gold/10 to-green-400/10 border border-gold/20 text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-bold text-gold mb-2">200+</p>
                <p className="text-foreground/70 text-sm">Empresas Atendidas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400 mb-2">R$ 85M</p>
                <p className="text-foreground/70 text-sm">Em Economia Gerada</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400 mb-2">450%</p>
                <p className="text-foreground/70 text-sm">ROI Médio Anual</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gold mb-2">98%</p>
                <p className="text-foreground/70 text-sm">Taxa de Sucesso</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UltraPremiumSocialProof;
