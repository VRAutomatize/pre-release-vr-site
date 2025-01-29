import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart, Users, Clock, Target, MessageSquare, Database, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Users,
    title: "Gestão de Leads Centralizada",
    description: "Organize todos os seus leads em um único lugar. Acompanhe o histórico completo de interações, dados de contato e status de cada oportunidade.",
    cta: "Comece a Organizar seus Leads"
  },
  {
    icon: BarChart,
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
      <div className="container mx-auto px-4 pt-24 space-y-32">
        {/* Header with Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>
          
          <div className="glass p-12 rounded-2xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
              CRM Inteligente para Empresas Modernas
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              Transforme a gestão do relacionamento com seus clientes através de uma plataforma 
              intuitiva e poderosa que automatiza processos e maximiza resultados.
            </p>
            <Button className="bg-gold hover:bg-gold-light text-background text-lg px-8 py-6">
              Agende uma Demonstração
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center">Funcionalidades Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="floating-card p-8 rounded-xl"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <feature.icon className="w-12 h-12 text-gold mb-4" />
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-foreground/80 mb-6">{feature.description}</p>
                <Button variant="outline" className="hover:bg-gold hover:text-background">
                  {feature.cta}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative z-10">
          <div className="glass p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Por que Escolher Nosso CRM?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="text-center p-6"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <benefit.icon className="w-12 h-12 text-gold mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-foreground/80">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative z-10 text-center">
          <div className="glass p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Pronto para Transformar seu Negócio?</h2>
            <p className="text-xl text-foreground/80 mb-8">
              Agende uma demonstração gratuita e descubra como nosso CRM pode 
              impulsionar seus resultados.
            </p>
            <Button className="bg-gold hover:bg-gold-light text-background text-lg px-8 py-6">
              Começar Agora
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CRM;