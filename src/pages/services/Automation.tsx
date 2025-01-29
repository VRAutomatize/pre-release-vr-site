import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Automation = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        
        <div className="glass p-8 rounded-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Automações
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Automatize processos repetitivos e aumente a eficiência operacional do seu negócio.
          </p>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Soluções</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Automação de processos (RPA)</li>
                <li>• Integração entre sistemas</li>
                <li>• Workflows personalizados</li>
                <li>• Automação de documentos</li>
                <li>• Automação de marketing</li>
              </ul>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Impactos</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Redução de erros operacionais</li>
                <li>• Aumento da produtividade</li>
                <li>• Economia de tempo e recursos</li>
                <li>• Processos mais eficientes</li>
                <li>• Escalabilidade do negócio</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button className="bg-gold hover:bg-gold-light text-background text-lg px-8 py-6">
            Solicitar Demonstração
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Automation;