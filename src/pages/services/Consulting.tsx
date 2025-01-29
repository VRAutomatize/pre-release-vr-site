import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Consulting = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        
        <div className="glass p-8 rounded-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Assessoria Especializada
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Receba orientação profissional gratuita para identificar as melhores soluções de automação para seu negócio.
          </p>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Serviços</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Análise de processos</li>
                <li>• Diagnóstico de eficiência</li>
                <li>• Planejamento estratégico</li>
                <li>• Consultoria personalizada</li>
                <li>• Implementação guiada</li>
              </ul>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Diferenciais</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Atendimento personalizado</li>
                <li>• Experiência em diversos segmentos</li>
                <li>• Soluções sob medida</li>
                <li>• Acompanhamento contínuo</li>
                <li>• Resultados mensuráveis</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button className="bg-gold hover:bg-gold-light text-background text-lg px-8 py-6">
            Solicitar Consultoria Gratuita
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Consulting;