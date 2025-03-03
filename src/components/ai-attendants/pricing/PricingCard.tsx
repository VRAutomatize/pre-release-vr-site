
import { TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { FeatureItem } from "./FeatureItem";
import { PlanHeader } from "./PlanHeader";
import { StandardFeatures } from "./StandardFeatures";
import { PlanFeatures } from "./PlanFeatures";

interface FeatureWithIcon {
  name: string;
  icon: React.ComponentType;
}

interface PricingCardProps {
  plan: {
    name: string;
    monthlyPrice: number;
    annualTotal: number;
    description: string;
    implementation: number;
    buttonText: string;
    highlighted?: boolean;
  };
  features: FeatureWithIcon[];
  isAnnual: boolean;
  index: number;
  showBasicPrefix?: boolean;
  showProPrefix?: boolean;
  showAdvancedPrefix?: boolean;
}

export const PricingCard = ({ 
  plan, 
  features, 
  isAnnual, 
  index,
  showBasicPrefix,
  showProPrefix,
  showAdvancedPrefix
}: PricingCardProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={`rounded-2xl overflow-hidden animate-fade-up transform transition-all duration-300 hover:shadow-lg ${
          plan.highlighted
            ? 'bg-gold/[0.03] border border-gold/20 relative'
            : 'bg-secondary/5 border border-border'
        }`}
        style={{ 
          animationDelay: `${index * 0.1}s`,
          marginTop: plan.highlighted ? '-1rem' : '0',
          marginBottom: plan.highlighted ? '1rem' : '0',
          height: 'fit-content',
          zIndex: plan.highlighted ? 10 : 1
        }}
      >
        {plan.highlighted && (
          <div className="absolute -inset-12 bg-gold/5 blur-[60px] -z-10" />
        )}
        
        {plan.highlighted && (
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-background">
            Mais Popular
          </Badge>
        )}
        
        {/* Plan Header with Pricing */}
        <PlanHeader plan={plan} isAnnual={isAnnual} />
        
        <div className={`p-6 md:p-8 ${plan.highlighted ? 'bg-gold/[0.02]' : ''}`}>
          {/* Standard Features */}
          <StandardFeatures planName={plan.name} />
          
          <div className="h-px w-full bg-border my-4"></div>
          
          <p className="text-sm font-medium text-foreground/80 mb-4">Recursos incluídos:</p>
          <ul className="space-y-3">
            {/* Plan Specific Features */}
            <PlanFeatures 
              planName={plan.name} 
              features={features}
              showBasicPrefix={showBasicPrefix}
              showProPrefix={showProPrefix}
              showAdvancedPrefix={showAdvancedPrefix}
            />
          </ul>
        </div>
      </div>
    </TooltipProvider>
  );
};
