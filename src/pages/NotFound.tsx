import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Cog } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(
      "Under Construction page accessed at route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-2xl mx-auto glass p-8 rounded-2xl">
        <div className="relative mb-8">
          <Cog size={64} className="text-gold animate-spin-slow mx-auto" />
          <Cog 
            size={40} 
            className="text-gold/80 animate-spin-slow absolute -right-4 top-0 [animation-direction:reverse]" 
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
          Em Desenvolvimento
        </h1>
        
        <p className="text-xl text-foreground/80 mb-8 animate-fade-up">
          Estamos trabalhando para trazer ainda mais inovação para sua empresa.
          <br />
          <span className="text-lg text-foreground/60 block mt-2">
            Obrigado pela paciência!
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "200ms" }}>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Voltar
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto bg-gold hover:bg-gold-light text-background"
          >
            Ir para Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;