import { Switch } from "@/components/ui/switch";

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
      <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
        Soluções flexíveis que crescem junto com sua empresa
      </p>
      
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-base font-medium ${!isAnnual ? 'text-gold' : 'text-foreground/60'}`}>
          Mensal
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
          className="data-[state=checked]:bg-gold h-7 w-14 [&>span]:h-6 [&>span]:w-6"
        />
        <span className={`text-base font-medium ${isAnnual ? 'text-gold' : 'text-foreground/60'}`}>
          Anual
        </span>
      </div>
    </div>
  );
};

export default PricingHeader;