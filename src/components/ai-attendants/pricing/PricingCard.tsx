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
  const installmentWithInterest = Math.floor((installmentAmount * 1.15) / 10) * 10 - 0.10;

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden animate-fade-up transition-all duration-500 ${
        plan.highlighted
          ? 'scale-105 z-10'
          : 'hover:scale-105'
      }`}
      style={{ 
        animationDelay: `${index * 0.2}s`,
        marginTop: plan.highlighted ? '0' : '2rem',
        height: 'fit-content'
      }}
    >
      {/* Glow effect for Pro card */}
      {plan.highlighted && (
        <div className="absolute -inset-1 bg-gold/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <div className={`relative h-full ${
        plan.highlighted 
          ? 'bg-gradient-to-b from-secondary/80 to-secondary/95 backdrop-blur-xl border border-gold/20'
          : 'bg-secondary/50 hover:bg-secondary/60 border border-border/10'
      }`}>
        {/* Header */}
        <div className={`p-8 text-center ${plan.highlighted ? 'bg-gold/5' : ''}`}>
          <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-gold' : 'text-foreground/90'}`}>
            {plan.name}
          </h3>
          <p className="text-sm text-foreground/60 mb-6 h-12">{plan.description}</p>
          
          {/* Pricing */}
          {isAnnual ? (
            <div className="space-y-2">
              <div className={`text-3xl font-bold ${plan.highlighted ? 'text-gold' : 'text-foreground/90'}`}>
                {plan.annualTotal >= 10000 
                  ? `R$ ${plan.annualTotal/1000}k/ano`
                  : `R$ ${formatCurrency(plan.annualTotal)}/ano`}
              </div>
              <p className="text-sm text-foreground/60">
                ou 12x de R$ {formatCurrency(installmentWithInterest)}
              </p>
              <p className="text-sm text-gold">
                Economia de R$ {formatCurrency(savedAmount)}
              </p>
            </div>
          ) : (
            <div className={`text-3xl font-bold mb-4 ${plan.highlighted ? 'text-gold' : 'text-foreground/90'}`}>
              R$ {formatCurrency(plan.monthlyPrice)}/mês
            </div>
          )}
          
          {/* CTA Button */}
          <Button
            className={`w-full mt-6 ${
              plan.highlighted
                ? 'bg-gold hover:bg-gold/90 text-background'
                : 'bg-secondary hover:bg-secondary/80 border border-gold/20'
            }`}
          >
            Contratar Agora
          </Button>
        </div>

        {/* Features List */}
        <div className={`p-8 ${plan.highlighted ? 'bg-gold/5' : ''}`}>
          <p className="text-sm font-medium text-foreground/80 mb-6">O que está incluído:</p>
          <ul className="space-y-4">
            {showBasicPrefix && (
              <li className="flex items-center gap-3">
                <Check className={`h-5 w-5 ${plan.highlighted ? 'text-gold' : 'text-foreground/60'}`} />
                <span className="text-sm font-medium">Tudo do Básico +</span>
              </li>
            )}
            {showProPrefix && (
              <li className="flex items-center gap-3">
                <Check className={`h-5 w-5 ${plan.highlighted ? 'text-gold' : 'text-foreground/60'}`} />
                <span className="text-sm font-medium">Tudo do Pro +</span>
              </li>
            )}
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300">
                <Check className={`h-5 w-5 ${plan.highlighted ? 'text-gold' : 'text-foreground/60'}`} />
                <span className="text-sm text-foreground/80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};