import { Switch } from "@/components/ui/switch";
import { MessageSquare } from "lucide-react";

interface PricingHeaderProps {
  isAnnual: boolean;
  setIsAnnual: (value: boolean) => void;
}

const PricingHeader = ({ isAnnual, setIsAnnual }: PricingHeaderProps) => {
  return (
    <div className="text-center mb-16 animate-fade-up">
      <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6">
        Nossos Planos
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Escolha o Plano Ideal para Seu Negócio
      </h2>
      <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-4">
        Soluções flexíveis que crescem junto com sua empresa
      </p>
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-gold" />
        <p className="text-lg font-semibold text-gold">
          Mensagens ilimitadas. Não pague por conversa!
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-base font-medium ${!isAnnual ? "text-gold" : "text-foreground/60"}`}>
          Mensal
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
          className="data-[state=checked]:bg-gold data-[state=unchecked]:bg-input h-[24px] w-[44px]"
        />
        <span className={`text-base font-medium ${isAnnual ? "text-gold" : "text-foreground/60"}`}>
          Anual
          <span className="ml-2 text-sm text-gold">(-25%)</span>
        </span>
      </div>
    </div>
  );
};

export default PricingHeader;