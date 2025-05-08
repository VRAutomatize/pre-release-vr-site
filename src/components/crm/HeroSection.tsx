
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeroSectionProps {
  whatsappLink: string;
}

const HeroSection = ({ whatsappLink }: HeroSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 md:pr-8 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6 animate-fade-up">
              Sistema de CRM
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
                {isMobile ? "CRM Personalizado" : "CRM Personalizado para seu Negócio"}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              {isMobile
                ? "Aumente suas vendas e fidelização"
                : "Centralize seus contatos, automatize processos de vendas e melhore o relacionamento com clientes com nossa solução personalizada."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gold hover:bg-gold-light text-background text-lg px-4 sm:px-8 py-3 sm:py-6"
              >
                {isMobile ? "Fale Conosco" : "Solicite uma Demonstração"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Button
                variant="outline"
                className="text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-6"
              >
                {isMobile ? "Saiba Mais" : "Conheça Nossos Planos"}
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block w-1/2 animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <img 
              src="/lovable-uploads/feb0a32a-fd43-4f11-a6eb-b9c493b7e77e.png" 
              alt="CRM Dashboard" 
              className="w-full h-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
