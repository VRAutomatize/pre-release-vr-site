import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Plan, PricingFeature } from "@/types/pricing-types";

interface PricingCardsProps {
  plans: Plan[];
  features: PricingFeature[];
  calculatePrice: (monthlyPrice: number) => string;
  isAnnual: boolean;
}

const PricingCards = ({ plans, features, calculatePrice, isAnnual }: PricingCardsProps) => {
  const getIncludedFeatures = (planName: string) => {
    const planKey = planName.toLowerCase() as keyof Omit<PricingFeature, 'name'>;
    return features.filter(feature => {
      const value = feature[planKey];
      return value === true || (typeof value === 'string' && value.length > 0);
    });
  };

  // Reordenar os planos para garantir que o Pro fique após o switch
  const orderedPlans = [...plans].sort((a, b) => {
    if (a.name === "Pro") return 1;
    if (b.name === "Pro") return -1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative mb-32">
      {orderedPlans.map((plan) => {
        const includedFeatures = getIncludedFeatures(plan.name);
        const isProPlan = plan.name === "Pro";
        
        return (
          <div
            key={plan.name}
            className={`
              floating-card rounded-2xl overflow-hidden transition-all duration-300
              ${isProPlan 
                ? 'bg-gold/10 md:-mt-8 md:mb-8 md:scale-110 z-10' 
                : 'bg-secondary/5'
              }
            `}
          >
            <div className={`p-8 ${isProPlan ? 'bg-gold/10' : 'bg-secondary/20'}`}>
              <h3 className={`text-2xl font-bold mb-2 ${isProPlan ? 'text-gold' : 'text-foreground'}`}>
                {plan.name}
              </h3>
              <p className="text-sm text-foreground/60 mb-6">{plan.description}</p>
              <div className="space-y-2">
                <p className={`text-3xl font-bold ${isProPlan ? 'text-gold' : 'text-foreground'}`}>
                  R$ {calculatePrice(plan.monthlyPrice)}
                  <span className="text-sm font-normal text-foreground/60">/mês</span>
                </p>
                {isAnnual && (
                  <p className="text-sm text-foreground/60">
                    12x de R$ {calculatePrice(plan.monthlyPrice)}
                  </p>
                )}
              </div>
            </div>

            <div className={`p-8 ${isProPlan ? 'bg-gold/10' : ''}`}>
              <p className={`text-sm font-medium ${isProPlan ? 'text-gold' : 'text-foreground/80'}`}>
                O que está incluído:
              </p>
              <ul className="space-y-4 mt-6">
                {includedFeatures.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 ${isProPlan ? 'text-gold' : 'text-foreground/60'} shrink-0 mt-0.5`} />
                    <span className={`text-sm ${isProPlan ? 'text-gold' : 'text-foreground/80'}`}>
                      {feature.name}
                      {typeof feature[plan.name.toLowerCase() as keyof Omit<PricingFeature, 'name'>] === 'string' && (
                        <span className="ml-1 text-gold">
                          ({feature[plan.name.toLowerCase() as keyof Omit<PricingFeature, 'name'>]})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full mt-8 ${
                  isProPlan 
                    ? 'bg-gold hover:bg-gold/90 text-background' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Contratar Agora
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCards;