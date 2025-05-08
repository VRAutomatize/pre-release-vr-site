
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6 animate-fade-up">
            Atendentes com IA
          </span>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {isMobile ? "Atendimento inteligente 24/7" : "Transforme seu atendimento com Inteligência Artificial"}
          </h1>
          
          <p className="text-lg md:text-2xl text-foreground/80 mb-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {isMobile 
              ? "Reduza custos e melhore a experiência do cliente"
              : "Automatize o atendimento ao cliente, reduza custos operacionais e melhore drasticamente a experiência do usuário com nossa solução de IA."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Button 
              className="bg-gold hover:bg-gold-light text-background text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-6"
              onClick={() => scrollToSection('pricing-table')}
            >
              {isMobile ? "Ver preços" : "Conheça nossos planos"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-6"
              onClick={() => scrollToSection('video-demo')}
            >
              {isMobile ? "Ver demo" : "Assistir demonstração"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
