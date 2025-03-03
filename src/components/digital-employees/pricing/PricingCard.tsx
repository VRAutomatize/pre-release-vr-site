
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { formatCurrency } from "@/utils/pricing";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Feature = {
  name: string;
  icon: React.ComponentType;
};

type Plan = {
  name: string;
  monthlyPrice: number;
  annualTotal: number;
  description: string;
  implementation: number;
  highlighted?: boolean;
  buttonText: string;
};

interface PricingCardProps {
  plan: Plan;
  features: Feature[];
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
  showBasicPrefix = false,
  showProPrefix = false,
  showAdvancedPrefix = false
}: PricingCardProps) => {
  const calculateClassNames = () => {
    let baseClasses = "relative flex flex-col p-6 border border-border rounded-xl overflow-hidden h-full";
    
    if (plan.highlighted) {
      baseClasses += " border-gold/50 shadow-lg shadow-gold/10";
    }
    
    return baseClasses;
  };

  const renderFeatures = () => {
    return features.map((feature, idx) => {
      const Icon = feature.icon;
      return (
        <li key={idx} className="flex items-start mb-3">
          <Icon className="h-5 w-5 text-gold shrink-0 mr-2 mt-0.5" />
          <span className="text-sm">
            {showBasicPrefix && index === 1 && idx >= features.length - getIncludePrefixCount("basic") && (
              <span className="text-gold font-semibold mr-1">+</span>
            )}
            {showProPrefix && index === 2 && idx >= features.length - getIncludePrefixCount("pro") && (
              <span className="text-gold font-semibold mr-1">+</span>
            )}
            {showAdvancedPrefix && index === 3 && idx >= features.length - getIncludePrefixCount("advanced") && (
              <span className="text-gold font-semibold mr-1">+</span>
            )}
            {feature.name}
          </span>
        </li>
      );
    });
  };

  const getIncludePrefixCount = (planName: string) => {
    if (planName === "basic") return 5;
    if (planName === "pro") return 8;
    if (planName === "advanced") return 12;
    return 0;
  };

  return (
    <div className={calculateClassNames()}>
      {plan.highlighted && (
        <div className="absolute -top-1 right-0 left-0 text-center bg-gold text-background text-xs px-2 py-1">
          Mais popular
        </div>
      )}
      
      <div className="py-4">
        <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
        <p className="text-sm text-foreground/60 mb-6 h-12">{plan.description}</p>
        
        <div className="mb-6">
          <p className="text-foreground/60 text-sm mb-1">A partir de</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">
              R$ {formatCurrency(isAnnual ? plan.annualTotal / 12 : plan.monthlyPrice)}
            </span>
            <span className="text-foreground/60 ml-1">/mês</span>
          </div>
          
          {isAnnual && (
            <div className="mt-1">
              <p className="text-sm text-gold font-medium">
                R$ {formatCurrency(plan.annualTotal)}/ano
              </p>
              <p className="text-xs text-foreground/60">
                (economia de {Math.round((1 - (plan.annualTotal / (plan.monthlyPrice * 12))) * 100)}%)
              </p>
            </div>
          )}
          
          {plan.implementation > 0 && (
            <p className="text-xs text-foreground/60 mt-3">
              + Implementação: R$ {formatCurrency(plan.implementation)}
            </p>
          )}
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              className={`w-full mb-6 ${
                plan.highlighted 
                  ? "bg-gold hover:bg-gold/90 text-background" 
                  : ""
              }`}
              variant={plan.highlighted ? "default" : "outline"}
            >
              {plan.buttonText}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-background border-border">
            <p>Inicie uma demonstração agora</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="border-t border-border pt-4 mt-auto">
        <p className="font-medium mb-4">O que está incluído:</p>
        <ul className="space-y-2">
          {renderFeatures()}
        </ul>
      </div>
    </div>
  );
};
