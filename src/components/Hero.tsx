
import React, { lazy, Suspense, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HeroTag from "./shared/HeroTag";
import HeroTitle from "./shared/HeroTitle";
import HeroDescription from "./shared/HeroDescription";
import HeroActions from "./shared/HeroActions";
import { TypeformButton } from "@/components/form/TypeformButton";

// Componente Hero otimizado com memoização para evitar renderizações desnecessárias
const Hero = React.memo(() => {
  const { toast } = useToast();
  
  // useCallback para evitar recriação de funções
  const scrollToServices = useCallback(() => {
    const servicesSection = document.querySelector('#services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
    
    toast({
      title: "Navegando para Serviços",
      description: "Você está sendo redirecionado para a seção de serviços",
      duration: 2000,
    });
  }, [toast]);

  const handleWhatsAppClick = useCallback(() => {
    window.open('https://wa.me/554788558257?text=Olá!%20Tenho%20interesse%20na%20Assessoria%20Gratuita%20de%20vocês!', '_blank');
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Você será redirecionado para iniciar uma conversa no WhatsApp",
      duration: 3000,
    });
  }, [toast]);

  // Componente de imagem com lazy loading
  const HeroImage = lazy(() => import('./shared/HeroImage'));

  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden pt-24">
      {/* Background Effects - Otimizados com div únicas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl text-center md:text-left"> 
            <HeroTag>
              <span className="animate-fade-up" style={{ animationDuration: "0.5s" }}>
                Automação Inteligente para Empresas
              </span>
            </HeroTag>
            <HeroTitle>
              <span className="animate-fade-up inline-block" style={{ animationDuration: "0.7s" }}>
                Automatize seus processos.
              </span>{" "}
              <span className="text-gold animate-fade-up inline-block" style={{ animationDuration: "0.9s" }}>
                Aumente o faturamento!
              </span>
            </HeroTitle>
            <HeroDescription>
              <span className="animate-fade-up inline-block" style={{ animationDuration: "1.1s" }}>
                Simplifique processos, aumente faturamento e reduza custos com CRMs personalizados, 
                IA e automações estratégicas
              </span>
            </HeroDescription>
            <div className="max-w-lg mx-auto md:mx-0">
              <p className="text-foreground/90 mb-8 animate-fade-up hover:text-foreground transition-colors duration-300" style={{ animationDelay: "1.3s" }}>
                Agende uma{" "}
                <span className="font-bold text-gold hover:text-gold-light transition-colors duration-300">
                  assessoria gratuita
                </span>{" "}
                e descubra como impulsionar sua empresa!
              </p>
            </div>
            <HeroActions>
              <TypeformButton
                className="bg-gold hover:bg-gold-light text-background px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: "1.5s" }}
              >
                Assessoria Gratuita
                <ArrowRight className="ml-2 animate-pulse" size={20} />
              </TypeformButton>
              <Button 
                variant="outline" 
                className="px-8 py-6 text-lg hover:bg-gold/10 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: "1.7s" }}
                onClick={scrollToServices}
              >
                Saiba Mais
              </Button>
            </HeroActions>
          </div>

          {/* Right side image with optimized lazy loading */}
          <div className="hidden lg:block w-1/2 animate-fade-up" style={{ animationDelay: "1.9s" }}>
            <Suspense fallback={<div className="w-[60%] h-[400px] bg-gray-800/20 animate-pulse rounded-lg mx-auto" />}>
              <img 
                src="/lovable-uploads/feb0a32a-fd43-4f11-a6eb-b9c493b7e77e.png"
                alt="Profissional com laptop"
                className="w-[60%] h-auto object-contain mx-auto"
                loading="lazy"
                decoding="async"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
