import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const HeroSection = () => {
  const scrollToPlans = () => {
    const plansSection = document.querySelector('#plans');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6 animate-fade-up">
            CRM Inteligente para Empresas
          </span>
          <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Impulsione suas vendas com um CRM eficiente
          </h1>
          <p className="text-lg md:text-2xl text-foreground/80 mb-12 max-w-3xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Aumente seu faturamento, converta mais leads e feche mais negócios com nossa plataforma 
            inteligente que automatiza seu processo comercial do início ao fim.
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
              onClick={scrollToPlans}
            >
              Ver Planos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;