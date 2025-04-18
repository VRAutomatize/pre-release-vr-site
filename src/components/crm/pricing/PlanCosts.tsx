import { Button } from "@/components/ui/button";

interface PlanCostsProps {
  implementation: number;
  monthly: number;
  installments: number;
  canInstallImplementation: boolean;
  maxInstallments: number;
  isAnnual: boolean;
  highlighted?: boolean;
}

const PlanCosts = ({ 
  implementation, 
  monthly, 
  installments, 
  canInstallImplementation,
  maxInstallments,
  isAnnual,
  highlighted
}: PlanCostsProps) => {
  const formatPrice = (price: number, showDecimals: boolean = true) => {
    return price.toLocaleString('pt-BR', { 
      minimumFractionDigits: showDecimals ? 2 : 0, 
      maximumFractionDigits: showDecimals ? 2 : 0 
    });
  };

  return (
    <>
      <div className={`p-6 text-center ${highlighted ? 'bg-gold/5' : 'bg-secondary/50'}`}>
        <div className="space-y-2">
          <p className="text-sm text-foreground/60">Implementação</p>
          <div className="flex items-center justify-center">
            <span className="text-4xl font-bold text-gold">
              R$ {formatPrice(implementation, false)}
            </span>
          </div>
          {canInstallImplementation && (
            <p className="text-sm text-foreground/60">
              ou {maxInstallments}x de R$ {formatPrice(implementation / maxInstallments)}
            </p>
          )}
        </div>
        <Button 
          className="w-full mt-6 bg-gold hover:bg-gold-light text-background"
        >
          Agendar Demonstração
        </Button>
      </div>

      <div className={`p-4 border-b border-border ${highlighted ? 'bg-gold/5' : 'bg-secondary/20'}`}>
        <div className="text-center">
          <p className="text-sm text-foreground/60">Mensalidade</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-semibold">
              R$ {formatPrice(isAnnual ? installments : monthly)}
            </span>
            <span className="text-sm text-foreground/60">/mês</span>
          </div>
          {isAnnual && (
            <p className="text-xs text-foreground/60">
              12x de R$ {formatPrice(installments)}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PlanCosts;