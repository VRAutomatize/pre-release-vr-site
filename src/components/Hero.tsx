import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import HeroTag from "./shared/HeroTag";
import HeroTitle from "./shared/HeroTitle";
import HeroDescription from "./shared/HeroDescription";
import HeroActions from "./shared/HeroActions";

const Hero = () => {
  const { toast } = useToast();
  
  const scrollToServices = () => {
    const servicesSection = document.querySelector('#services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
    
    toast({
      title: "Navegando para Serviços",
      description: "Você está sendo redirecionado para a seção de serviços",
      duration: 2000,
    });
  };

  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden mt-8">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="max-w-xl"> {/* Left content */}
            <HeroTag>Automação Inteligente para Empresas</HeroTag>
            <HeroTitle>
              <span>Automatize seus processos.</span>{" "}
              <span className="text-gold">Aumente o faturamento!</span>
            </HeroTitle>
            <HeroDescription>
              Simplifique processos, aumente faturamento e reduza custos com CRMs personalizados, 
              IA e automações estratégicas
            </HeroDescription>
            <div className="max-w-lg">
              <p className="text-foreground/90 mb-8 animate-fade-up hover:text-foreground transition-colors duration-300" style={{ animationDelay: "0.5s" }}>
                Agende uma{" "}
                <span className="font-bold text-gold hover:text-gold-light transition-colors duration-300">
                  assessoria gratuita
                </span>{" "}
                e descubra como impulsionar sua empresa!
              </p>
            </div>
            <HeroActions>
              <Button 
                className="bg-gold hover:bg-gold-light text-background px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  toast({
                    title: "Agendamento",
                    description: "Em breve você será redirecionado para o formulário de agendamento",
                    duration: 3000,
                  });
                }}
              >
                Assessoria Gratuita
                <ArrowRight className="ml-2 animate-pulse" size={20} />
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-6 text-lg hover:bg-gold/10 transition-all duration-300"
                onClick={scrollToServices}
              >
                Saiba Mais
              </Button>
            </HeroActions>
          </div>

          {/* Right side image */}
          <div className="hidden lg:block w-1/2 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <img 
              src="/lovable-uploads/85ee719e-f32d-4a3c-a45e-f36c1aa2d9a3.png"
              alt="Profissional com laptop"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;