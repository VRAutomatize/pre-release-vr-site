import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LeadCapture = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        
        <div className="glass p-8 rounded-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Fluxos de Captação
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Otimize sua geração de leads com fluxos automatizados e inteligentes de captação de clientes.
          </p>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Estratégias</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Landing pages otimizadas</li>
                <li>• Formulários inteligentes</li>
                <li>• Segmentação automática</li>
                <li>• Nurturing personalizado</li>
                <li>• Integração com CRM</li>
              </ul>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Resultados</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Aumento na taxa de conversão</li>
                <li>• Qualificação automática de leads</li>
                <li>• Redução do custo por aquisição</li>
                <li>• Maior eficiência no processo de vendas</li>
                <li>• ROI mensurável</li>
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

export default LeadCapture;