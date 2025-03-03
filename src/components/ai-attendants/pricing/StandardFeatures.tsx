
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
  // Some standard features might need explanation if complex
  const standardFeatureBenefits: Record<string, string> = {
    "Acesso ao dashboard completo": "Visualize métricas e resultados detalhados para otimizar sua estratégia."
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-foreground/80 mb-1">Sem limite de mensagens</p>
      
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-foreground/80 mb-1">Acesso ao dashboard completo</p>
        {standardFeatureBenefits["Acesso ao dashboard completo"] && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <Info className="h-4 w-4 text-gold/70 hover:text-gold transition-colors" />
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="right"
                align="start"
                className="max-w-[250px] bg-black/90 border-gold/20 text-white z-50"
                sideOffset={16}
              >
                <p>{standardFeatureBenefits["Acesso ao dashboard completo"]}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {planName !== "Premium" && (
        <p className="text-sm font-medium text-foreground/80 mb-1">7 dias grátis</p>
      )}
      
      <p className="text-sm font-medium text-foreground/80 mb-4">Sem fidelidade</p>
    </div>
  );
};
