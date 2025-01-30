import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, calculateInstallments } from "@/utils/pricing";

interface PricingCardProps {
  plan: {
    name: string;
    monthlyPrice: number;
    annualTotal: number;
    description: string;
    highlighted?: boolean;
  };
  features: string[];
  isAnnual: boolean;
  index: number;
  showBasicPrefix?: boolean;
  showProPrefix?: boolean;
}

export const PricingCard = ({ 
  plan, 
  features, 
  isAnnual, 
  index,
  showBasicPrefix,
  showProPrefix
}: PricingCardProps) => {
  const monthlyTotal = plan.monthlyPrice * 12;
  const savedAmount = monthlyTotal - plan.annualTotal;
  const installmentAmount = calculateInstallments(plan.annualTotal);

  return (
    <div
      className={`floating-card rounded-2xl overflow-hidden animate-fade-up ${
        plan.highlighted
          ? 'bg-gold/5 backdrop-blur-lg border border-gold/20 relative'
          : 'bg-secondary/20'
      }`}
      style={{ 
        animationDelay: `${index * 0.2}s`,
        marginTop: plan.highlighted ? '2rem' : '4rem',
        marginBottom: plan.highlighted ? '2rem' : '0',
        height: 'fit-content'
      }}
    >
      {plan.highlighted && (
        <div className="absolute -inset-1 bg-gold/10 blur-2xl -z-10" />
      )}
      <div className={`p-8 text-center ${plan.highlighted ? 'bg-gold/5 backdrop-blur-lg' : ''}`}>
        <h3 className="text-2xl font-bold mb-2 text-gold">{plan.name}</h3>
        <p className="text-sm text-foreground/60 mb-4">{plan.description}</p>
        {isAnnual ? (
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gold mb-2">
              {plan.annualTotal >= 10000 
                ? `R$ ${plan.annualTotal/1000}k/ano`
                : `R$ ${formatCurrency(plan.annualTotal)}/ano`}
            </div>
            <p className="text-sm text-foreground/60">
              ou 12x de R$ {formatCurrency(installmentAmount)}
            </p>
            <p className="text-sm text-gold">
              Economia de R$ {formatCurrency(savedAmount)}
            </p>
          </div>
        ) : (
          <div className="text-3xl font-bold text-gold mb-2">
            R$ {formatCurrency(plan.monthlyPrice)}/mês
          </div>
        )}
        <Button
          className={`w-full mt-4 ${
            plan.highlighted
              ? 'bg-gold hover:bg-gold/90 text-background'
              : 'bg-secondary hover:bg-secondary/80'
          }`}
        >
          Contratar Agora
        </Button>
      </div>
      <div className={`p-8 ${plan.highlighted ? 'bg-gold/5 backdrop-blur-lg' : ''}`}>
        <p className="text-sm font-medium text-foreground/80 mb-6">O que está incluído:</p>
        <ul className="space-y-4">
          {showBasicPrefix && (
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-gold flex-shrink-0" />
              <span className="text-sm font-medium">Tudo do Básico +</span>
            </li>
          )}
          {showProPrefix && (
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-gold flex-shrink-0" />
              <span className="text-sm font-medium">Tudo do Pro +</span>
            </li>
          )}
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check className="h-5 w-5 text-gold flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};