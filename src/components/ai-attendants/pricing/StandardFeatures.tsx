
import { Info } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { featureBenefits } from "./featureBenefits";

interface StandardFeaturesProps {
  planName: string;
}

export const StandardFeatures = ({ planName }: StandardFeaturesProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-foreground/80 mb-1">Sem limite de mensagens</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="right"
            className="max-w-[250px] bg-black/90 border-gold/20 text-white"
          >
            <p>{featureBenefits["Sem limite de mensagens"]}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-foreground/80 mb-1">Acesso ao dashboard completo</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="right"
            className="max-w-[250px] bg-black/90 border-gold/20 text-white"
          >
            <p>{featureBenefits["Acesso ao dashboard completo"]}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      {planName !== "Premium" && (
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground/80 mb-1">7 dias grátis</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
              </div>
            </TooltipTrigger>
            <TooltipContent 
              side="right"
              className="max-w-[250px] bg-black/90 border-gold/20 text-white"
            >
              <p>{featureBenefits["7 dias grátis"]}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-foreground/80 mb-4">Sem fidelidade</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="right"
            className="max-w-[250px] bg-black/90 border-gold/20 text-white"
          >
            <p>{featureBenefits["Sem fidelidade"]}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
