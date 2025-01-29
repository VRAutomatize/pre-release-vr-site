import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Users, BarChart2, Clock, Target, Database, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/crm/HeroSection";
import PricingPlans from "@/components/crm/PricingPlans";
import FinalCTA from "@/components/crm/FinalCTA";

const features = [
  {
    icon: Users,
    title: "Gestão de Leads Centralizada",
    description: "Organize todos os seus leads em um único lugar. Acompanhe o histórico completo de interações, dados de contato e status de cada oportunidade.",
    cta: "Comece a Organizar seus Leads"
  },
  {
    icon: BarChart2,
    title: "Análise de Performance",
    description: "Dashboards personalizados com métricas em tempo real. Tome decisões baseadas em dados concretos sobre seu funil de vendas.",
    cta: "Ver Demonstração de Dashboards"
  },
  {
    icon: Clock,
    title: "Automação de Processos",
    description: "Automatize tarefas repetitivas, follow-ups e atribuição de leads. Aumente a produtividade da sua equipe drasticamente.",
    cta: "Conhecer Automações"
  },
  {
    icon: Target,
    title: "Pipeline de Vendas",
    description: "Visualize e gerencie todo seu funil de vendas. Identifique gargalos e otimize sua taxa de conversão.",
    cta: "Otimize seu Pipeline"
  }
];

const benefits = [
  {
    icon: MessageSquare,
    title: "Comunicação Unificada",
    description: "Centralize todas as comunicações com clientes em um único lugar. E-mails, mensagens e chamadas registradas automaticamente.",
  },
  {
    icon: Database,
    title: "Dados Seguros",
    description: "Seus dados empresariais protegidos com criptografia de ponta e backup automático em nuvem.",
  },
  {
    icon: Settings,
    title: "Personalização Total",
    description: "Adapte o CRM às necessidades específicas do seu negócio com campos e fluxos personalizados.",
  },
  {
    icon: Zap,
    title: "Integração Completa",
    description: "Conecte com suas ferramentas favoritas: E-mail, WhatsApp, Calendário e muito mais.",
  }
];

const CRM = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Button className="bg-gold hover:bg-gold-light text-background">
            <MessageSquare className="h-4 w-4 mr-2" />
            Entre em contato
          </Button>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-24 space-y-32">
        <HeroSection />
        
        {/* Features Section */}
        <section className="relative z-10 space-y-24">
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Funcionalidades Principais</h2>
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
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Benefícios do CRM</h2>
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

        <PricingPlans />
        <FinalCTA />
      </div>
    </div>
  );
};

export default CRM;
