
import { Check, Info } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { featureBenefits } from "./featureBenefits";

interface FeatureItemProps {
  feature: string;
}

export const FeatureItem = ({ feature }: FeatureItemProps) => (
  <li className="flex items-start gap-3">
    <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
    <span className="text-sm">{feature}</span>
    {featureBenefits[feature] && (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help mt-0.5">
            <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="right"
          className="max-w-[250px] bg-black/90 border-gold/20 text-white"
        >
          <p>{featureBenefits[feature]}</p>
        </TooltipContent>
      </Tooltip>
    )}
  </li>
);
