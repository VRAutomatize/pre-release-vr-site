
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Users, BarChart2, Clock, Target, Database, Settings, Zap, Check, CreditCard, Calendar, Shield, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import MessagesCounter from "@/components/ai-attendants/MessagesCounter";
import PricingTable from "@/components/ai-attendants/PricingTable";
import FinalCTA from "@/components/crm/FinalCTA";
import Benefits from "@/components/Benefits";
import HeroTag from "@/components/shared/HeroTag";
import HeroTitle from "@/components/shared/HeroTitle";
import HeroDescription from "@/components/shared/HeroDescription";
import HeroActions from "@/components/shared/HeroActions";
import HeroImage from "@/components/shared/HeroImage";

const features = [
  {
    icon: Clock,
    title: "Sem Folha Salarial, Sem Faltas, Sem Turnover",
    description: "Reduza drasticamente custos operacionais enquanto mantém atendimento ininterrupto. Nossos funcionários digitais não tiram férias, não pedem aumento e nunca abandonam o posto.",
    cta: "Calcular Economia",
    imageSrc: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Database,
    title: "Conhecimento Consistente e Inalterável",
    description: "Elimine informações desencontradas e treinamentos constantes. Seu conhecimento corporativo fica perfeitamente preservado e consistente, sem depender da memória de funcionários.",
    cta: "Conhecer Recursos",
    imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Users,
    title: "Escale sem Dor de Cabeça",
    description: "Esqueça processos seletivos demorados, período de adaptação e alta rotatividade. Duplique, triplique ou multiplique por dez sua capacidade de atendimento instantaneamente.",
    cta: "Ver Demonstração",
    imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: Brain,
    title: "Personalidade Consistente Alinhada à sua Marca",
    description: "Nada de humor variável ou atendentes mal-humorados. Nossos funcionários digitais mantêm o mesmo tom de voz e personalidade consistente que reflete perfeitamente seus valores de marca.",
    cta: "Experimentar",
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
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
  const whatsappLink = "https://wa.me/554788558257?text=Ol%C3%A1!%20Tenho%20interesse%20em%20atendentes%20de%20IA!";

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold-light text-background rounded-md px-4 py-2 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Entre em contato
          </a>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-12 space-y-32">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center relative overflow-hidden mt-12">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <MessagesCounter className="mb-6 animate-fade-up" />
              
              <HeroTitle>
                Funcionários Digitais que Nunca Tiram Férias, 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light block mt-2">
                  Trabalham 24/7 e Não Pedem Aumento!
                </span>
              </HeroTitle>
              
              <HeroDescription>
                Economize até 73% com folha de pagamento enquanto multiplica a produtividade. Sem processos seletivos, 
                sem treinamentos demorados, sem burocracias trabalhistas.
              </HeroDescription>
              
              <HeroActions>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background h-12 px-8"
                >
                  Contratar!
                </a>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 hover:bg-gold hover:text-background"
                >
                  Saiba Mais
                </a>
              </HeroActions>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="relative z-10 space-y-24">
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Problemas que Resolvemos Para Você</h2>
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
                  <div className="w-full aspect-[16/9] glass rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500">
                    <img 
                      src={feature.imageSrc}
                      alt={`Ilustração de ${feature.title}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
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
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Benefícios dos Funcionários Digitais</h2>
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
        <FinalCTA whatsappLink={whatsappLink} />
      </div>
    </div>
  );
};

export default AIAttendants;
