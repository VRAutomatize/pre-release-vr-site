import { Card } from "@/components/ui/card";

const InfoCards = () => {
  return (
    <div className="mt-12 space-y-4 max-w-3xl mx-auto px-4">
      <Card className="p-6 animate-fade-up bg-secondary/5" style={{ animationDelay: "0.7s" }}>
        <div className="flex items-start gap-2">
          <span className="text-gold mt-1">📌</span>
          <p className="text-sm text-foreground/80">
            O valor de implementação cobre toda a configuração e personalização do sistema, incluindo funis, automações e integração com sistemas complementares.
          </p>
        </div>
      </Card>
      
      <Card className="p-6 animate-fade-up bg-secondary/5" style={{ animationDelay: "0.8s" }}>
        <div className="flex items-start gap-2">
          <span className="text-gold mt-1">📌</span>
          <p className="text-sm text-foreground/80">
            A mensalidade refere-se ao plano de assinatura do sistema de CRM (Kommo CRM), necessário para permanecer online. Também inclui suporte técnico via VR Automatize e reuniões de acompanhamento.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default InfoCards;