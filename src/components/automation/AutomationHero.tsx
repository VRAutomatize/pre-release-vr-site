
import React from "react";
import HeroTag from "@/components/shared/HeroTag";
import HeroTitle from "@/components/shared/HeroTitle";
import HeroDescription from "@/components/shared/HeroDescription";
import HeroActions from "@/components/shared/HeroActions";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const AutomationHero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('lead-capture-form');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden mt-20 md:mt-12">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="animate-fade-up" style={{ animationDuration: "0.5s" }}>
            <HeroTag>Automação Inteligente</HeroTag>
          </div>
          
          <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
            <HeroTitle>
              Automatizamos seus processos, aumentamos sua produtividade e eliminamos custos desnecessários
            </HeroTitle>
          </div>
          
          <div className="animate-fade-up" style={{ animationDuration: "0.9s" }}>
            <HeroDescription>
              Somos especialistas em criar sistemas inteligentes que substituem tarefas humanas com performance de máquina.
              Enquanto sua equipe descansa, nossa automação trabalha — 24h por dia, sem oscilação, erro ou desculpa.
            </HeroDescription>
          </div>
          
          <div className="animate-fade-up" style={{ animationDuration: "1.1s" }}>
            <p className="text-xl text-gold mb-8">
              Se você quer escalar e lucrar pelo menos 100 mil a mais todo ano, esse é o próximo passo.
            </p>
          </div>
          
          <HeroActions>
            <Button 
              className="bg-gold hover:bg-gold-light text-background hover:text-background text-lg px-8 py-6 h-auto"
              onClick={scrollToForm}
            >
              Quero automatizar meu negócio
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </HeroActions>
        </div>
      </div>
    </section>
  );
};

export default AutomationHero;
