import { Card } from "@/components/ui/card";

const InfoCards = () => {
  return (
    <div className="mt-12 space-y-4 max-w-3xl mx-auto px-4">
      <Card className="p-6 animate-fade-up bg-secondary/5" style={{ animationDelay: "0.7s" }}>
        <div className="flex items-start gap-2">
          <span className="text-gold mt-1">📌</span>
          <p className="text-sm text-foreground/80">
            O <span className="text-gold font-medium">valor de implementação</span> cobre toda a{" "}
            <span className="text-gold font-medium">configuração</span> e{" "}
            <span className="text-gold font-medium">personalização</span> do sistema, incluindo{" "}
            <span className="text-gold font-medium">funis</span>,{" "}
            <span className="text-gold font-medium">automações</span> e{" "}
            <span className="text-gold font-medium">integração</span> com sistemas complementares.
          </p>
        </div>
      </Card>
      
      <Card className="p-6 animate-fade-up bg-secondary/5" style={{ animationDelay: "0.8s" }}>
        <div className="flex items-start gap-2">
          <span className="text-gold mt-1">📌</span>
          <p className="text-sm text-foreground/80">
            A <span className="text-gold font-medium">mensalidade</span> refere-se ao plano de{" "}
            <span className="text-gold font-medium">assinatura</span> do sistema de CRM (Kommo CRM), necessário para permanecer{" "}
            <span className="text-gold font-medium">online</span>. Também inclui{" "}
            <span className="text-gold font-medium">suporte técnico</span> via VR Automatize e{" "}
            <span className="text-gold font-medium">reuniões de acompanhamento</span>.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default InfoCards;