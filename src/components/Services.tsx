import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Database, Bot, ArrowDownToLine, Cog, Briefcase } from "lucide-react";

const services = [
  {
    title: "Atendentes IA",
    description: "Automatize seu atendimento com assistentes virtuais inteligentes via WhatsApp e telefone. Disponível 24/7 para seus clientes.",
    icon: MessageSquare,
    route: "/services/ai-attendants"
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

const Services = () => {
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
            <Link 
              key={service.title} 
              to={service.route}
              className="transition-transform hover:-translate-y-2 duration-300"
            >
              <Card className="h-full floating-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <service.icon className="h-8 w-8 text-gold" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;