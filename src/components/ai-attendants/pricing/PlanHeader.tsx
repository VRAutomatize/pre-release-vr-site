
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, calculateInstallments } from "@/utils/pricing";

interface PlanHeaderProps {
  plan: {
    name: string;
    monthlyPrice: number;
    annualTotal: number;
    description: string;
    implementation: number;
    buttonText: string;
    highlighted?: boolean;
  };
  isAnnual: boolean;
}

export const PlanHeader = ({ plan, isAnnual }: PlanHeaderProps) => {
  const monthlyTotal = plan.monthlyPrice * 12;
  const savedAmount = monthlyTotal - plan.annualTotal;
  const installmentAmount = calculateInstallments(plan.annualTotal);
  const hasImplementation = plan.implementation > 0;

  return (
    <div className={`p-6 md:p-8 text-center ${plan.highlighted ? 'bg-gold/[0.03]' : ''}`}>
      <h3 className="text-xl md:text-2xl font-bold mb-2 text-gold">{plan.name}</h3>
      <p className="text-sm text-foreground/60 mb-6 h-12">{plan.description}</p>
      
      {isAnnual ? (
        <div className="space-y-2">
          <div className="text-2xl md:text-3xl font-bold text-gold mb-2">
            {plan.annualTotal >= 10000 
              ? `R$ ${plan.annualTotal/1000}k/ano`
              : `R$ ${formatCurrency(plan.annualTotal)}/ano`}
          </div>
          <p className="text-sm text-foreground/60">
            12x de R$ {formatCurrency(installmentAmount)}
          </p>
          <p className="text-sm text-gold">
            Economia de R$ {formatCurrency(savedAmount)}
          </p>
        </div>
      ) : (
        <div className="text-2xl md:text-3xl font-bold text-gold mb-2">
          R$ {formatCurrency(plan.monthlyPrice)}/mês
        </div>
      )}

      {hasImplementation && (
        <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
          <p className="text-sm font-medium">Implementação</p>
          <p className="text-lg font-semibold text-gold">
            A partir de R$ {formatCurrency(plan.implementation)}
          </p>
          <p className="text-xs text-foreground/60">Parcelável</p>
        </div>
      )}
      
      <Button
        className={`w-full mt-6 ${
          plan.highlighted 
            ? 'bg-gold hover:bg-gold/80 text-background transition-colors duration-300' 
            : plan.name === "Premium" 
              ? 'bg-secondary/80 hover:bg-secondary/60'
              : 'bg-secondary/60 hover:bg-secondary/40'
        }`}
      >
        {plan.buttonText}
      </Button>
    </div>
  );
};
