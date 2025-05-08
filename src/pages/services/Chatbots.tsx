
import React, { lazy, Suspense, useCallback } from "react";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/useIsMobile";

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton className="w-full h-64" />}>
    {children}
  </Suspense>
);

// Lazy-loaded components
const Benefits = lazy(() => import("@/components/Benefits"));
const PricingPlans = lazy(() => import("@/components/crm/PricingPlans"));
const FinalCTA = lazy(() => import("@/components/crm/FinalCTA"));

const features = [
  {
    icon: MessageSquare,
    title: "Respostas Inteligentes",
    description: "Chatbots que entendem o contexto e fornecem respostas precisas e relevantes para cada situação.",
    cta: "Ver Demonstração"
  },
  {
    icon: Users,
    title: "Multi-plataforma",
    description: "Integração com WhatsApp, Facebook, Instagram e site próprio, mantendo a consistência em todos os canais.",
    cta: "Conhecer Integrações"
  },
  {
    icon: Database,
    title: "Aprendizado Contínuo",
    description: "Sistema que aprende com cada interação, melhorando constantemente suas respostas e eficiência.",
    cta: "Ver Evolução"
  },
  {
    icon: Check,
    title: "Transferência Inteligente",
    description: "Identificação automática de quando transferir para atendimento humano, garantindo a melhor experiência.",
    cta: "Explorar Recursos"
  }
];

const benefits = [
  {
    icon: MessageSquare,
    title: "Disponibilidade 24/7",
    description: "Atendimento ininterrupto em todos os canais de comunicação.",
  },
  {
    icon: Database,
    title: "Automação Inteligente",
    description: "Resolução automática de dúvidas frequentes e problemas simples.",
  },
  {
    icon: CreditCard,
    title: "Economia",
    description: "Redução significativa nos custos de atendimento ao cliente.",
  },
  {
    icon: Users,
    title: "Experiência Consistente",
    description: "Mesmo padrão de qualidade em todas as interações.",
  }
];

const Chatbots = () => {
  const whatsappLink = "https://wa.me/554788558257?text=Ol%C3%A1!%20Tenho%20interesse%20em%20Chatbots!";
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
        <section className="min-h-[85vh] flex items-center relative overflow-hidden pt-16">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6 animate-fade-up hover:bg-gold/20 transition-colors duration-300">
                Chatbots Inteligentes
              </span>
              
              <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
                {isMobile ? "Automação inteligente" : "Automatize suas conversas com IA"}
              </h1>
              
              <p className="text-lg md:text-2xl text-foreground/80 mb-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {isMobile 
                  ? "Chatbots que entendem seus clientes"
                  : "Chatbots inteligentes que entendem seus clientes e fornecem respostas precisas, melhorando a experiência e reduzindo custos."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-6"
                >
                  {isMobile ? "Ver demonstração" : "Agende uma Demonstração"}
                </a>
                <a
                  href="#benefits"
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
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Funcionalidades Principais</h2>
          <div className="space-y-16 md:space-y-32">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div 
                  className={`order-${index % 2 === 0 ? 1 : 2} md:order-${index % 2 === 0 ? 1 : 2} animate-fade-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-full aspect-[16/9] glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                    <p className="text-foreground/60">Imagem da funcionalidade {index + 1}</p>
                  </div>
                </div>
                
                <div 
                  className={`order-${index % 2 === 0 ? 2 : 1} md:order-${index % 2 === 0 ? 2 : 1} floating-card p-8 rounded-xl animate-fade-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <feature.icon className="w-12 h-12 text-gold mb-4" />
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-foreground/80 mb-6">{feature.description}</p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 hover:bg-gold hover:text-background"
                  >
                    {feature.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Benefícios dos Chatbots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
        
        <LazySection>
          <PricingPlans />
        </LazySection>
        
        <LazySection>
          <FinalCTA whatsappLink={whatsappLink} />
        </LazySection>
      </div>
    </div>
  );
};

export default React.memo(Chatbots);
