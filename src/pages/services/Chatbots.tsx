import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Chatbots = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        
        <div className="glass p-8 rounded-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Chatbots
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Melhore o engajamento com seus clientes através de chatbots inteligentes que respondem em tempo real.
          </p>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Recursos</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Respostas automáticas personalizadas</li>
                <li>• Integração com múltiplas plataformas</li>
                <li>• Aprendizado contínuo</li>
                <li>• Análise de conversas</li>
                <li>• Transferência para atendimento humano</li>
              </ul>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Benefícios</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Atendimento instantâneo 24/7</li>
                <li>• Redução de custos operacionais</li>
                <li>• Escalabilidade do atendimento</li>
                <li>• Melhoria na experiência do cliente</li>
                <li>• Dados valiosos sobre interações</li>
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

export default Chatbots;