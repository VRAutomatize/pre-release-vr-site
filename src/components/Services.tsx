
import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Database, Bot, ArrowDownToLine, Cog, Briefcase } from "lucide-react";

// Dados estáticos memorizados para evitar recriação
const services = [
  {
    title: "Funcionários Digitais",
    description: "Funcionários Digitais que nunca tiram férias, trabalham 24/7 e não pedem aumento! Economize até 73% com folha de pagamento.",
    icon: MessageSquare,
    route: "/lp-funcionarios-digitais-pro"
  },
  {
    title: "Implementação CRM",
    description: "Organize, gerencie e potencialize seus relacionamentos com clientes através de sistemas CRM personalizados para seu negócio.",
    icon: Database,
    route: "/services/crm"
  },
  {
    title: "Chatbots",
    description: "Melhore o engajamento com seus clientes através de chatbots inteligentes que respondem em tempo real.",
    icon: Bot,
    route: "/services/chatbots"
  },
  {
    title: "Fluxos de Captação",
    description: "Otimize sua geração de leads com fluxos automatizados e inteligentes de captação de clientes.",
    icon: ArrowDownToLine,
    route: "/services/lead-capture"
  },
  {
    title: "Automações",
    description: "Automatize processos repetitivos e aumente a eficiência operacional do seu negócio.",
    icon: Cog,
    route: "/services/automation"
  },
  {
    title: "Assessoria Especializada",
    description: "Receba orientação profissional gratuita para identificar as melhores soluções de automação para seu negócio.",
    icon: Briefcase,
    route: "/services/consulting"
  }
];

// Componente de serviço individual memoizado
const ServiceCard = React.memo(({ 
  service, 
  onClick 
}: { 
  service: typeof services[0]; 
  onClick: () => void;
}) => {
  // Ícone memoizado
  const Icon = service.icon;
  
  return (
    <div 
      onClick={onClick}
      className="transition-transform hover:-translate-y-2 duration-300 cursor-pointer"
    >
      <Card className="h-full floating-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Icon className="h-8 w-8 text-gold" />
            <CardTitle className="text-xl">{service.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">{service.description}</p>
        </CardContent>
      </Card>
    </div>
  );
});

// Componente principal memoizado
const Services = React.memo(() => {
  const navigate = useNavigate();
  
  // Handler de clique memoizado para evitar recriações
  const createHandleServiceClick = useCallback((route: string) => {
    return () => {
      // Navegar para a página do serviço
      navigate(route);
      
      // Scroll para o topo com debounce para evitar manipulações desnecessárias do DOM
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    };
  }, [navigate]);
  
  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Nossos Serviços
        </h2>
        <p className="text-foreground/80 text-center mb-12 max-w-2xl mx-auto">
          Transforme seu negócio com nossas soluções de automação e atendimento inteligente
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard 
              key={service.title}
              service={service}
              onClick={createHandleServiceClick(service.route)}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Services;
