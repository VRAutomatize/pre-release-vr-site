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
      className={`rounded-2xl overflow-hidden animate-fade-up transform transition-all duration-300 hover:scale-105 ${
        plan.highlighted
          ? 'bg-gold/[0.02] border border-gold/10 relative'
          : 'bg-secondary/20'
      }`}
      style={{ 
        animationDelay: `${index * 0.2}s`,
        marginTop: plan.highlighted ? '0' : '2rem',
        marginBottom: plan.highlighted ? '0' : '0',
        height: 'fit-content'
      }}
    >
      {plan.highlighted && (
        <div className="absolute -inset-12 bg-gold/10 blur-[60px] -z-10" />
      )}
      <div className={`p-6 md:p-8 text-center ${plan.highlighted ? 'bg-gold/[0.02]' : ''}`}>
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-gold/90">{plan.name}</h3>
        <p className="text-sm text-foreground/60 mb-4">{plan.description}</p>
        {isAnnual ? (
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-gold/90 mb-2">
              {plan.annualTotal >= 10000 
                ? `R$ ${plan.annualTotal/1000}k/ano`
                : `R$ ${formatCurrency(plan.annualTotal)}/ano`}
            </div>
            <p className="text-sm text-foreground/60">
              12x de R$ {formatCurrency(installmentAmount)}
            </p>
            <p className="text-sm text-gold/90">
              Economia de R$ {formatCurrency(savedAmount)}
            </p>
          </div>
        ) : (
          <div className="text-2xl md:text-3xl font-bold text-gold/90 mb-2">
            R$ {formatCurrency(plan.monthlyPrice)}/mês
          </div>
        )}
        <Button
          className={`w-full mt-4 ${
            plan.highlighted 
              ? 'bg-gold/90 hover:bg-gold/80 text-background transition-colors duration-300' 
              : 'bg-secondary hover:bg-secondary/80'
          }`}
        >
          Contratar Agora
        </Button>
      </div>
      <div className={`p-6 md:p-8 ${plan.highlighted ? 'bg-gold/[0.02]' : ''}`}>
        <p className="text-sm font-medium text-foreground/80 mb-6">O que está incluído:</p>
        <ul className="space-y-4">
          {showBasicPrefix && (
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-gold/90 flex-shrink-0" />
              <span className="text-sm font-medium">Tudo do Básico +</span>
            </li>
          )}
          {showProPrefix && (
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-gold/90 flex-shrink-0" />
              <span className="text-sm font-medium">Tudo do Pro +</span>
            </li>
          )}
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check className="h-5 w-5 text-gold/90 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};