import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const HeroSection = () => {
  const scrollToPlans = () => {
    const plansSection = document.querySelector('#plans');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div 
          className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-gold/10 rounded-full filter blur-3xl animate-float" 
          style={{ animationDelay: "2s" }} 
        />
      </div>
      
      <div className="glass p-8 md:p-16 rounded-2xl relative z-10 max-w-5xl mx-auto animate-fade-up">
        <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight">
          Impulsione suas vendas com um CRM eficiente 🚀
        </h1>
        <p className="text-lg md:text-2xl text-foreground/80 mb-12 max-w-3xl">
          Aumente seu faturamento, converta mais leads e feche mais negócios com nossa plataforma 
          inteligente que automatiza seu processo comercial do início ao fim.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="bg-gold hover:bg-gold-light text-background text-lg px-8 py-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Agende uma Demonstração
          </Button>
          <Button 
            variant="outline" 
            className="text-lg px-8 py-6 animate-fade-up"
            onClick={scrollToPlans}
            style={{ animationDelay: "0.4s" }}
          >
            Ver Planos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;