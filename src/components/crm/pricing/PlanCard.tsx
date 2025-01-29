import { Plan } from "@/types/pricing";
import PlanFeatureList from "./PlanFeatureList";
import PlanCosts from "./PlanCosts";

interface PlanCardProps {
  plan: Plan;
  isAnnual: boolean;
  index: number;
}

const PlanCard = ({ plan, isAnnual, index }: PlanCardProps) => {
  return (
    <div 
      className={`floating-card rounded-2xl overflow-hidden animate-fade-up h-fit ${plan.highlighted ? 'bg-gold/5' : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className={`p-8 text-center ${plan.highlighted ? 'bg-gold/5' : 'bg-secondary/50'}`}>
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gold">{plan.name}</h3>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full opacity-50" />
      </div>
      
      <PlanCosts
        implementation={plan.costs.implementation}
        monthly={plan.costs.monthly}
        installments={isAnnual ? plan.costs.installments : plan.costs.monthly}
        canInstallImplementation={plan.costs.canInstallImplementation}
        maxInstallments={plan.costs.maxInstallments}
        isAnnual={isAnnual}
        highlighted={plan.highlighted}
      />
      
      <PlanFeatureList 
        features={plan.features} 
        highlighted={plan.highlighted}
      />
    </div>
  );
};

export default PlanCard;