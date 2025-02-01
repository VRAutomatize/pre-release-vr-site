import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Users, Database, Check, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Benefits from "@/components/Benefits";
import PricingPlans from "@/components/crm/PricingPlans";
import FinalCTA from "@/components/crm/FinalCTA";
import PageHero from "@/components/shared/PageHero";
import HeroActions from "@/components/shared/HeroActions";

const features = [
  {
    icon: Database,
    title: "Automação de Processos",
    description: "Automatize tarefas repetitivas e fluxos de trabalho complexos.",
    cta: "Ver Demonstração"
  },
  {
    icon: MessageSquare,
    title: "Integração entre Sistemas",
    description: "Conecte diferentes sistemas e aplicativos para criar fluxos de trabalho eficientes.",
    cta: "Conhecer Integrações"
  },
  {
    icon: Users,
    title: "Workflows Personalizados",
    description: "Crie fluxos de trabalho adaptados às necessidades específicas do seu negócio.",
    cta: "Ver Exemplos"
  },
  {
    icon: Check,
    title: "Monitoramento em Tempo Real",
    description: "Acompanhe o desempenho das automações e receba alertas instantâneos.",
    cta: "Explorar Dashboard"
  }
];

const benefits = [
  {
    icon: CreditCard,
    title: "Redução de Custos",
    description: "Economia significativa com automação de processos manuais.",
  },
  {
    icon: Users,
    title: "Mais Produtividade",
    description: "Aumento da eficiência operacional da equipe.",
  },
  {
    icon: Database,
    title: "Menos Erros",
    description: "Eliminação de erros humanos em processos críticos.",
  },
  {
    icon: MessageSquare,
    title: "Escalabilidade",
    description: "Crescimento sustentável com processos automatizados.",
  }
];

const Automation = () => {
  const whatsappLink = "https://wa.me/554788558257?text=Ol%C3%A1!%20Tenho%20interesse%20em%20Automa%C3%A7%C3%B5es%20Empresariais!";

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

      <div className="container mx-auto px-4 pt-24 space-y-32">
        <PageHero
          title="Automatize e escale seu negócio."
          subtitle="Transforme processos manuais em fluxos automatizados, reduzindo custos e aumentando a eficiência operacional."
          tag="Automação de Processos"
          backgroundImage="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=2000"
        >
          <HeroActions>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background h-12 px-8"
            >
              Instalar Automação!
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
        </PageHero>

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
        <section className="relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center animate-fade-up">Benefícios da Automação</h2>
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
        <PricingPlans />
        <FinalCTA whatsappLink={whatsappLink} />
      </div>
    </div>
  );
};

export default Automation;
