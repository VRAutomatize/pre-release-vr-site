
import React from 'react';
import HeroTag from "@/components/shared/HeroTag";
import HeroTitle from "@/components/shared/HeroTitle";
import HeroDescription from "@/components/shared/HeroDescription";
import HeroActions from "@/components/shared/HeroActions";
import MessagesCounter from "@/components/ai-attendants/MessagesCounter";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
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
            <button 
              onClick={() => scrollToSection('dashboard-preview')}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-black h-12 px-8"
            >
              Ver Dashboard
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToSection('video-demo')}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 hover:bg-gold hover:text-black"
            >
              Ver Demonstração
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
          </HeroActions>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
