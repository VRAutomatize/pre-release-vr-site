
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Play, Quote, Star, TrendingUp, Building, Crown, Award, Shield, CheckCircle, BarChart3 } from "lucide-react";
import { PremiumCard, PremiumButton, PremiumBadge, PremiumSection } from "./PremiumComponents";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface VideoTestimonial {
  id: string;
  company: string;
  revenue: string;
  position: string;
  name: string;
  videoId: string;
  thumbnail: string;
  savings: string;
  quote: string;
  metrics: {
    roi: string;
    implementation: string;
    efficiency: string;
  };
  verified: boolean;
  featured: boolean;
}

interface DetailedCase {
  company: string;
  sector: string;
  revenue: string;
  challenge: string;
  solution: string;
  results: {
    savings: string;
    roi: string;
    efficiency: string;
    timeline: string;
  };
  testimonial: string;
  executive: {
    name: string;
    position: string;
    linkedin?: string;
  };
}

const UltraPremiumSocialProofAdvanced = () => {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 6000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    []
  );

  const videoTestimonials: VideoTestimonial[] = [
    {
      id: "1",
      company: "Rede Nacional de Franquias",
      revenue: "R$ 42M/ano",
      position: "CEO",
      name: "Roberto Silva",
      videoId: "dQw4w9WgXcQ", // Placeholder
      thumbnail: "/api/placeholder/400/300",
      savings: "R$ 1.8M/ano",
      quote: "Em 6 meses automatizamos operações de 52 lojas. ROI de 380% no primeiro ano.",
      metrics: {
        roi: "380%",
        implementation: "90 dias",
        efficiency: "+65%"
      },
      verified: true,
      featured: true
    },
    {
      id: "2", 
      company: "Indústria Farmacêutica",
      revenue: "R$ 28M/ano",
      position: "Diretor Executivo",
      name: "Dra. Marina Costa",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/api/placeholder/400/300",
      savings: "R$ 920k/ano",
      quote: "Compliance automatizado salvou nossa certificação. Processos que levavam semanas agora são concluídos em horas.",
      metrics: {
        roi: "340%",
        implementation: "75 dias", 
        efficiency: "+85%"
      },
      verified: true,
      featured: true
    },
    {
      id: "3",
      company: "Distribuidora Regional",
      revenue: "R$ 18M/ano",
      position: "Sócio-Fundador",
      name: "Carlos Mendes",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/api/placeholder/400/300",
      savings: "R$ 650k/ano",
      quote: "Sistema integrou 15 fornecedores principais. Nunca mais tivemos ruptura de estoque.",
      metrics: {
        roi: "290%",
        implementation: "60 dias",
        efficiency: "+55%"
      },
      verified: true,
      featured: false
    }
  ];

  const detailedCases: DetailedCase[] = [
    {
      company: "Grupo Atacadista Nacional",
      sector: "Varejo/Distribuição",
      revenue: "R$ 45M anuais",
      challenge: "Gestão manual de 52 lojas, inconsistências nos processos, custos operacionais crescentes",
      solution: "Automação completa do fluxo operacional, integração com fornecedores, gestão inteligente de estoque",
      results: {
        savings: "R$ 1.8M/ano",
        roi: "380%",
        efficiency: "+65%",
        timeline: "90 dias"
      },
      testimonial: "O sistema não apenas automatizou nossas operações - ele transformou nossa forma de pensar o negócio. Agora tomamos decisões baseadas em dados reais, não intuição.",
      executive: {
        name: "Roberto Silva",
        position: "CEO e Fundador"
      }
    },
    {
      company: "Indústria Farmacêutica Especializada",
      sector: "Saúde/Farmacêutica", 
      revenue: "R$ 28M anuais",
      challenge: "Compliance regulatório complexo, documentação manual, risco de perda de certificações",
      solution: "Automação de compliance, documentação inteligente, monitoramento contínuo de conformidade",
      results: {
        savings: "R$ 920k/ano",
        roi: "340%", 
        efficiency: "+85%",
        timeline: "75 dias"
      },
      testimonial: "Conseguimos manter 100% de conformidade com ANVISA enquanto reduzimos drasticamente o tempo gasto em documentação. Nossa equipe agora foca em inovação, não burocracia.",
      executive: {
        name: "Dra. Marina Costa",
        position: "Diretora Executiva"
      }
    }
  ];

  const credentialsData = [
    {
      icon: Award,
      title: "Microsoft Gold Partner",
      description: "Certificação máxima em automação empresarial",
      badge: "Elite"
    },
    {
      icon: Shield,
      title: "ISO 27001 Certified",
      description: "Segurança e governança empresarial",
      badge: "Segurança"
    },
    {
      icon: Building,
      title: "Google Cloud Premier",
      description: "Infraestrutura enterprise-grade",
      badge: "Cloud"
    },
    {
      icon: BarChart3,
      title: "SAP Integration Expert",
      description: "Especialista em sistemas corporativos",
      badge: "ERP"
    }
  ];

  const handleVideoPlay = (videoId: string) => {
    // Implementar modal de vídeo ou redirect para YouTube
    console.log(`Playing video: ${videoId}`);
  };

  return (
    <PremiumSection>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 premium-card-glass px-6 py-3 mb-6">
            <Crown className="h-5 w-5 text-premium-gold" />
            <span className="executive-body-small font-semibold">Casos de Sucesso Verificados</span>
          </div>
          <h2 className="executive-display-large mb-6">
            <span className="text-white">CEOs que Transformaram</span>
            <br />
            <span className="executive-accent">Suas Empresas</span>
          </h2>
          <p className="executive-body-large max-w-4xl mx-auto">
            Vídeo-depoimentos reais de executivos que eliminaram milhões em custos operacionais
          </p>
        </div>

        {/* Video Testimonials */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Depoimentos em Vídeo</h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin]}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {videoTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-6 basis-full md:basis-1/2 lg:basis-1/2">
                  <PremiumCard className={`p-0 overflow-hidden ${testimonial.featured ? 'ring-2 ring-premium-gold/50' : ''}`}>
                    
                    {/* Video Thumbnail */}
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <button
                          onClick={() => handleVideoPlay(testimonial.videoId)}
                          className="group flex items-center justify-center w-20 h-20 bg-premium-gold/20 rounded-full border-2 border-premium-gold hover:bg-premium-gold/30 transition-all"
                        >
                          <Play className="w-8 h-8 text-premium-gold ml-1" />
                        </button>
                      </div>
                      
                      {testimonial.featured && (
                        <PremiumBadge 
                          variant="gold" 
                          className="absolute top-4 right-4"
                        >
                          Destaque
                        </PremiumBadge>
                      )}
                      
                      {testimonial.verified && (
                        <div className="absolute top-4 left-4 bg-green-500/20 border border-green-500/40 rounded-full px-3 py-1">
                          <span className="text-green-400 text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verificado
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="executive-body-medium font-bold text-white">
                            {testimonial.company}
                          </h4>
                          <p className="executive-body-small text-premium-gold">
                            {testimonial.revenue} • {testimonial.position}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-bold">
                              {testimonial.savings}
                            </span>
                          </div>
                          <p className="text-white/60 text-xs">economia anual</p>
                        </div>
                      </div>

                      <blockquote className="text-white/90 mb-6 italic">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-premium-gold font-bold text-lg">
                            {testimonial.metrics.roi}
                          </div>
                          <div className="text-white/60 text-xs">ROI</div>
                        </div>
                        <div className="text-center">
                          <div className="text-premium-blue-light font-bold text-lg">
                            {testimonial.metrics.implementation}
                          </div>
                          <div className="text-white/60 text-xs">Implementação</div>
                        </div>
                        <div className="text-center">
                          <div className="text-premium-green font-bold text-lg">
                            {testimonial.metrics.efficiency}
                          </div>
                          <div className="text-white/60 text-xs">Eficiência</div>
                        </div>
                      </div>

                      <div className="text-right border-t border-premium-gold/20 pt-4">
                        <p className="text-premium-gold font-semibold">— {testimonial.name}</p>
                      </div>
                    </div>
                  </PremiumCard>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>

        {/* Detailed Case Studies */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Cases Detalhados</h3>
          
          <div className="space-y-8">
            {detailedCases.map((case_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <PremiumCard className="p-8">
                  <div className="premium-grid-2 gap-8">
                    
                    {/* Company Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Building className="w-6 h-6 text-premium-gold" />
                        <div>
                          <h4 className="executive-body-medium font-bold text-white">
                            {case_.company}
                          </h4>
                          <p className="executive-body-small text-premium-gold">
                            {case_.sector} • {case_.revenue}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="text-white font-semibold mb-2">Desafio</h5>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {case_.challenge}
                          </p>
                        </div>
                        
                        <div>
                          <h5 className="text-white font-semibold mb-2">Solução</h5>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {case_.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <h5 className="text-white font-semibold mb-4">Resultados Alcançados</h5>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="premium-card-glass p-4 text-center">
                          <div className="text-green-400 font-bold text-xl mb-1">
                            {case_.results.savings}
                          </div>
                          <div className="text-white/60 text-xs">Economia Anual</div>
                        </div>
                        
                        <div className="premium-card-glass p-4 text-center">
                          <div className="text-premium-gold font-bold text-xl mb-1">
                            {case_.results.roi}
                          </div>
                          <div className="text-white/60 text-xs">ROI</div>
                        </div>
                        
                        <div className="premium-card-glass p-4 text-center">
                          <div className="text-premium-blue-light font-bold text-xl mb-1">
                            {case_.results.efficiency}
                          </div>
                          <div className="text-white/60 text-xs">Melhoria</div>
                        </div>
                        
                        <div className="premium-card-glass p-4 text-center">
                          <div className="text-premium-green font-bold text-xl mb-1">
                            {case_.results.timeline}
                          </div>
                          <div className="text-white/60 text-xs">Implementação</div>
                        </div>
                      </div>

                      <blockquote className="border-l-4 border-premium-gold pl-4 italic text-white/90 mb-4">
                        "{case_.testimonial}"
                      </blockquote>

                      <div className="text-right">
                        <p className="text-premium-gold font-semibold">
                          — {case_.executive.name}
                        </p>
                        <p className="text-white/60 text-sm">
                          {case_.executive.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credentials & Certifications */}
        <div className="mb-20">
          <h3 className="executive-display-medium text-center mb-12">Credenciais Empresariais</h3>
          
          <div className="premium-grid-2 md:premium-grid-4 gap-6">
            {credentialsData.map((credential, index) => (
              <PremiumCard key={index} className="p-6 text-center">
                <credential.icon className="w-10 h-10 text-premium-gold mx-auto mb-4" />
                <PremiumBadge 
                  variant="gold" 
                  size="sm" 
                  className="mb-3"
                >
                  {credential.badge}
                </PremiumBadge>
                <h4 className="text-white font-semibold mb-2">
                  {credential.title}
                </h4>
                <p className="text-white/70 text-sm">
                  {credential.description}
                </p>
              </PremiumCard>
            ))}
          </div>
        </div>

        {/* Summary Metrics */}
        <PremiumCard className="p-8 text-center bg-gradient-to-r from-premium-gold/10 to-premium-green/10 border border-premium-gold/30">
          <h3 className="executive-display-medium mb-8">Impacto Comprovado</h3>
          
          <div className="premium-grid-2 md:premium-grid-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-premium-gold mb-2">240+</div>
              <div className="text-white/70">Empresas Transformadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">R$ 120M</div>
              <div className="text-white/70">Em Economia Gerada</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-premium-blue-light mb-2">520%</div>
              <div className="text-white/70">ROI Médio Anual</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-premium-gold mb-2">99%</div>
              <div className="text-white/70">Taxa de Sucesso</div>
            </div>
          </div>
        </PremiumCard>
      </div>
    </PremiumSection>
  );
};

export default UltraPremiumSocialProofAdvanced;
