import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CRM = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        
        <div className="glass p-8 rounded-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Implementação CRM
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Organize, gerencie e potencialize seus relacionamentos com clientes através de sistemas CRM 
            personalizados para seu negócio.
          </p>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Funcionalidades</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Gestão completa de leads e oportunidades</li>
                <li>• Pipeline de vendas personalizado</li>
                <li>• Automação de follow-ups</li>
                <li>• Relatórios e dashboards personalizados</li>
                <li>• Integração com outras ferramentas</li>
              </ul>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Vantagens</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Aumento da produtividade da equipe</li>
                <li>• Melhor gestão do relacionamento com clientes</li>
                <li>• Tomada de decisão baseada em dados</li>
                <li>• Processos de vendas otimizados</li>
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

export default CRM;