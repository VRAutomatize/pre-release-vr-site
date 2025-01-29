import { Button } from "@/components/ui/button";
import { Home, MessageSquare, ArrowLeft, BarChart, Users, Clock, Target, Database, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

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
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Button className="bg-gold hover:bg-gold-light text-background">
            <MessageSquare className="h-4 w-4" />
            Entre em contato
          </Button>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-24 space-y-32">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-gold/20 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>
          
          <div className="glass p-16 rounded-2xl relative z-10 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight">
              Impulsione suas vendas com um CRM eficiente 🚀
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl">
              Aumente seu faturamento, converta mais leads e feche mais negócios com nossa plataforma 
              inteligente que automatiza seu processo comercial do início ao fim.
            </p>
            <div className="flex gap-4">
              <Button className="bg-gold hover:bg-gold-light text-background text-lg px-8 py-6">
                Agende uma Demonstração
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6">
                Ver Planos
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative z-10 space-y-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Funcionalidades Principais</h2>
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image Placeholder - Left side for even indexes, right side for odd */}
                <div className={`order-${index % 2 === 0 ? 1 : 2} lg:order-none`}>
                  <div className="w-full aspect-[16/9] glass rounded-xl flex items-center justify-center">
                    <p className="text-foreground/60">Imagem da funcionalidade {index + 1}</p>
                  </div>
                </div>
                
                {/* Feature Content */}
                <div className={`order-${index % 2 === 0 ? 2 : 1} lg:order-none floating-card p-8 rounded-xl`}>
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
          <div className="glass p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Por que Escolher Nosso CRM?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="text-center p-6"
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
