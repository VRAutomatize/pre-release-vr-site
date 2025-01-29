import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AIAttendants = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        
        <div className="glass p-8 rounded-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Atendentes IA
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Automatize seu atendimento com assistentes virtuais inteligentes via WhatsApp e telefone. 
            Disponível 24/7 para seus clientes.
          </p>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Benefícios</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Atendimento 24 horas por dia, 7 dias por semana</li>
                <li>• Redução de custos operacionais</li>
                <li>• Aumento da satisfação do cliente</li>
                <li>• Respostas instantâneas e precisas</li>
                <li>• Integração com sistemas existentes</li>
              </ul>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gold">Recursos</h2>
              <ul className="space-y-3 text-foreground/80">
                <li>• Processamento de linguagem natural avançado</li>
                <li>• Personalização de respostas</li>
                <li>• Análise de sentimento</li>
                <li>• Integração com WhatsApp Business API</li>
                <li>• Relatórios detalhados de interações</li>
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

export default AIAttendants;