
import React, { lazy, Suspense, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Users, Database, Check, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/useIsMobile";

// Lazy loaded components
const Benefits = lazy(() => import("@/components/Benefits"));
const PricingPlans = lazy(() => import("@/components/crm/PricingPlans"));
const FinalCTA = lazy(() => import("@/components/crm/FinalCTA"));

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton className="w-full h-64" />}>
    {children}
  </Suspense>
);

const features = [
  {
    icon: Users,
    title: "Diagnóstico Completo",
    description: "Análise detalhada dos processos atuais e identificação de oportunidades de melhoria.",
    cta: "Ver Metodologia"
  },
  {
    icon: Database,
    title: "Planejamento Estratégico",
    description: "Desenvolvimento de plano personalizado de automação e transformação digital.",
    cta: "Conhecer Processo"
  },
  {
    icon: MessageSquare,
    title: "Implementação Guiada",
    description: "Acompanhamento especializado durante todo o processo de implementação.",
    cta: "Ver Etapas"
  },
  {
    icon: Check,
    title: "Monitoramento de Resultados",
    description: "Acompanhamento contínuo e ajustes para garantir o máximo ROI.",
    cta: "Explorar Métricas"
  }
];

const benefits = [
  {
    icon: Users,
    title: "Expertise Especializada",
    description: "Consultores com vasta experiência em automação.",
  },
  {
    icon: Database,
    title: "Soluções Personalizadas",
    description: "Estratégias adaptadas ao seu negócio.",
  },
  {
    icon: CreditCard,
    title: "ROI Garantido",
    description: "Foco em resultados mensuráveis e retorno.",
  },
  {
    icon: MessageSquare,
    title: "Suporte Contínuo",
    description: "Acompanhamento em todas as etapas do projeto.",
  }
];

const Consulting = () => {
  const whatsappLink = "https://wa.me/554788558257?text=Ol%C3%A1!%20Tenho%20interesse%20na%20Assessoria%20Especializada%20de%20voc%C3%AAs!";
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold-light text-background rounded-md px-4 py-2 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Entre em contato
          </a>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-0 space-y-32">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center relative overflow-hidden pt-24">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6 animate-fade-up">
                Consultoria Especializada
              </span>
              <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
                {isMobile ? "Transforme seu negócio" : "Transforme seu negócio com especialistas"}
              </h1>
              <p className="text-lg md:text-2xl text-foreground/80 mb-12 max-w-3xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {isMobile 
                  ? "Consultoria para automação empresarial" 
                  : "Receba orientação especializada para identificar e implementar as melhores soluções de automação para seu negócio."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-6"
                >
                  {isMobile ? "Agendar consulta" : "Agende uma Consultoria Gratuita"}
                </a>
                <a 
                  href="#pricing-plans"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-6"
                >
                  {isMobile ? "Ver planos" : "Conheça nossos planos"}
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="relative z-10 space-y-24">
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Nossa Metodologia</h2>
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div 
                  className={`order-${index % 2 === 0 ? 1 : 2} animate-fade-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-full aspect-[16/9] glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                    <p className="text-foreground/60">Imagem da funcionalidade {index + 1}</p>
                  </div>
                </div>
                
                <div 
                  className={`order-${index % 2 === 0 ? 2 : 1} floating-card p-8 rounded-xl animate-fade-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <feature.icon className="w-12 h-12 text-gold mb-4" />
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-foreground/80 mb-6">{feature.description}</p>
                  <Button variant="outline" className="hover:bg-gold hover:text-background">
                    {feature.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Benefícios da Consultoria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="floating-card p-6 rounded-xl animate-fade-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <benefit.icon className="w-12 h-12 text-gold mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-foreground/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <LazySection>
          <Benefits />
        </LazySection>
        
        <section id="pricing-plans">
          <LazySection>
            <PricingPlans />
          </LazySection>
        </section>
        
        <LazySection>
          <FinalCTA whatsappLink={whatsappLink} />
        </LazySection>
      </div>
    </div>
  );
};

export default React.memo(Consulting);
