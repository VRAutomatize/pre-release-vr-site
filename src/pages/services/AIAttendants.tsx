import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Users, Database, Check, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Benefits from "@/components/Benefits";
import PricingTable from "@/components/ai-attendants/PricingTable";
import FinalCTA from "@/components/crm/FinalCTA";

const features = [
  {
    icon: MessageSquare,
    title: "Atendimento 24/7",
    description: "Automatize seu atendimento com assistentes virtuais inteligentes que trabalham sem parar, garantindo suporte contínuo aos seus clientes.",
    cta: "Ver Demonstração"
  },
  {
    icon: Users,
    title: "Personalização Avançada",
    description: "Assistentes treinados com a identidade da sua marca, capazes de manter conversas naturais e resolver problemas complexos.",
    cta: "Conhecer Recursos"
  },
  {
    icon: Database,
    title: "Integração com CRM",
    description: "Sincronização automática com seu CRM, mantendo todo o histórico de atendimento organizado e acessível.",
    cta: "Ver Integrações"
  },
  {
    icon: Check,
    title: "Análise de Satisfação",
    description: "Monitore a satisfação dos clientes em tempo real e receba insights valiosos para melhorar o atendimento.",
    cta: "Explorar Análises"
  }
];

const benefits = [
  {
    icon: MessageSquare,
    title: "Atendimento Instantâneo",
    description: "Resposta imediata para seus clientes, 24 horas por dia, 7 dias por semana.",
  },
  {
    icon: Database,
    title: "Gestão Centralizada",
    description: "Todas as conversas e interações organizadas em um único lugar.",
  },
  {
    icon: CreditCard,
    title: "Redução de Custos",
    description: "Economia significativa em comparação com equipe humana de atendimento.",
  },
  {
    icon: Users,
    title: "Escalabilidade",
    description: "Atenda milhares de clientes simultaneamente sem perder qualidade.",
  }
];

const AIAttendants = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <Button className="bg-gold hover:bg-gold-light text-background">
            <MessageSquare className="h-4 w-4 mr-2" />
            Entre em contato
          </Button>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-24 space-y-32">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6 animate-fade-up">
                Atendentes IA para Empresas
              </span>
              <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
                Revolucione seu atendimento com IA
              </h1>
              <p className="text-lg md:text-2xl text-foreground/80 mb-12 max-w-3xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
                Automatize seu atendimento com assistentes virtuais inteligentes que trabalham 24/7, 
                reduzindo custos e aumentando a satisfação dos clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <Button 
                  className="bg-gold hover:bg-gold-light text-background text-lg px-8 py-6"
                >
                  Agende uma Demonstração
                </Button>
                <Button 
                  variant="outline" 
                  className="text-lg px-8 py-6"
                >
                  Ver Planos
                </Button>
              </div>
            </div>
          </div>
        </section>
        
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
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Benefícios dos Atendentes IA</h2>
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

        <Benefits />
        
        <PricingTable />
        <FinalCTA />
      </div>
    </div>
  );
};

export default AIAttendants;