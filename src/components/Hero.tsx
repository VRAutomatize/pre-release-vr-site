import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
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
            Transforme seu negócio com CRM
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Automatize seus processos com{" "}
            <span className="text-gold">inteligência</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Implantamos soluções de CRM personalizadas para otimizar seus
            processos e impulsionar seus resultados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Button className="bg-gold hover:bg-gold-light text-background px-8 py-6 text-lg">
              Agende uma Demonstração
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;