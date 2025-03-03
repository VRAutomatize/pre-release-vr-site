
import { useState } from "react";
import { Check, Minus, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { features, plans } from "./pricingData";
import { featureBenefits } from "./featureBenefits";
import { formatCurrency } from "@/utils/pricing";

const CompactPricingComparison = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const getPlanPrice = (plan: any) => {
    if (isAnnual) {
      const annualPrice = plan.annualTotal / 12;
      return `R$ ${formatCurrency(annualPrice)}/mês`;
    }
    return `R$ ${formatCurrency(plan.monthlyPrice)}/mês`;
  };
  
  const getImplementationPrice = (plan: any) => {
    if (plan.implementation === 0) return "Grátis";
    return `R$ ${formatCurrency(plan.implementation)}`;
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className={`text-base font-medium ${!isAnnual ? 'text-gold' : 'text-foreground/60'}`}>
          Mensal
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
          className="data-[state=checked]:bg-gold data-[state=unchecked]:bg-input h-[24px] w-[44px]"
        />
        <span className={`text-base font-medium ${isAnnual ? 'text-gold' : 'text-foreground/60'}`}>
          Anual
        </span>
        {isAnnual && (
          <span className="bg-gold/10 text-gold text-xs px-2 py-1 rounded-full">
            Economia de até 30%
          </span>
        )}
      </div>

      {/* Mobile view - Cards */}
      <div className="block md:hidden space-y-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={`overflow-hidden ${plan.highlighted ? 'border-gold bg-gold/5' : ''}`}>
            <div className={`p-4 ${plan.highlighted ? 'bg-gold/10' : 'bg-secondary/10'}`}>
              <h3 className="text-xl font-bold text-gold">{plan.name}</h3>
              <p className="text-sm text-foreground/70 mt-1">{plan.description}</p>
              <div className="mt-2">
                <div className="text-xl font-bold">{getPlanPrice(plan)}</div>
                <div className="text-sm mt-1">Implementação: {getImplementationPrice(plan)}</div>
              </div>
            </div>
            <CardContent className="p-4">
              <Button 
                className={`w-full ${plan.highlighted ? 'bg-gold hover:bg-gold/90 text-background' : ''}`}
              >
                {plan.buttonText}
              </Button>
              
              <div className="mt-4 space-y-2">
                <p className="font-medium text-sm">Principais recursos:</p>
                <ul className="space-y-2">
                  {features.slice(0, 5).map((feature) => (
                    <li key={feature.name} className="flex items-start gap-2">
                      {plan.name === "Básico" ? (
                        feature.basic ? <Check className="h-4 w-4 text-gold mt-0.5" /> : <Minus className="h-4 w-4 text-foreground/30 mt-0.5" />
                      ) : plan.name === "Pro" ? (
                        feature.pro ? <Check className="h-4 w-4 text-gold mt-0.5" /> : <Minus className="h-4 w-4 text-foreground/30 mt-0.5" />
                      ) : plan.name === "Avançado" ? (
                        feature.advanced ? <Check className="h-4 w-4 text-gold mt-0.5" /> : <Minus className="h-4 w-4 text-foreground/30 mt-0.5" />
                      ) : (
                        feature.premium ? <Check className="h-4 w-4 text-gold mt-0.5" /> : <Minus className="h-4 w-4 text-foreground/30 mt-0.5" />
                      )}
                      <span className="text-sm">{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="p-0 h-auto mt-2 text-gold">
                  Ver todos os recursos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop view - Table */}
      <div className="hidden md:block">
        <TooltipProvider>
          <div className="rounded-xl overflow-hidden border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/20">
                  <TableHead className="w-1/3">Recursos</TableHead>
                  {plans.map((plan) => (
                    <TableHead 
                      key={plan.name} 
                      className={`text-center ${plan.highlighted ? 'bg-gold/10' : ''}`}
                    >
                      <div className="flex flex-col items-center">
                        {plan.highlighted && (
                          <Badge className="mb-2 bg-gold text-background">Mais Popular</Badge>
                        )}
                        <h3 className="text-xl font-bold text-gold">{plan.name}</h3>
                        <p className="text-sm mt-1">{getPlanPrice(plan)}</p>
                        <p className="text-xs text-foreground/70 mt-1">
                          Implementação: {getImplementationPrice(plan)}
                        </p>
                        <Button 
                          size="sm" 
                          className={`mt-3 ${plan.highlighted ? 'bg-gold hover:bg-gold/90 text-background' : ''}`}
                        >
                          {plan.buttonText}
                        </Button>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="bg-secondary/10 font-medium">
                    Recursos Básicos
                  </TableCell>
                </TableRow>
                {features.filter(f => f.basic).map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="flex items-center gap-2">
                      {feature.name}
                      {featureBenefits[feature.name] && (
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
                            <p>{featureBenefits[feature.name]}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TableCell>
                    {plans.map((plan) => (
                      <TableCell key={`${plan.name}-${feature.name}`} className="text-center">
                        <Check className="h-5 w-5 text-gold mx-auto" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={5} className="bg-secondary/10 font-medium">
                    Recursos Intermediários
                  </TableCell>
                </TableRow>
                {features.filter(f => f.pro && !f.basic).map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="flex items-center gap-2">
                      {feature.name}
                      {featureBenefits[feature.name] && (
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
                            <p>{featureBenefits[feature.name]}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Minus className="h-5 w-5 text-foreground/30 mx-auto" />
                    </TableCell>
                    {plans.slice(1).map((plan) => (
                      <TableCell key={`${plan.name}-${feature.name}`} className="text-center">
                        <Check className="h-5 w-5 text-gold mx-auto" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={5} className="bg-secondary/10 font-medium">
                    Recursos Avançados
                  </TableCell>
                </TableRow>
                {features.filter(f => f.advanced && !f.pro && !f.basic).map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="flex items-center gap-2">
                      {feature.name}
                      {featureBenefits[feature.name] && (
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
                            <p>{featureBenefits[feature.name]}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Minus className="h-5 w-5 text-foreground/30 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Minus className="h-5 w-5 text-foreground/30 mx-auto" />
                    </TableCell>
                    {plans.slice(2).map((plan) => (
                      <TableCell key={`${plan.name}-${feature.name}`} className="text-center">
                        <Check className="h-5 w-5 text-gold mx-auto" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={5} className="bg-secondary/10 font-medium">
                    Recursos Premium
                  </TableCell>
                </TableRow>
                {features.filter(f => f.premium && !f.advanced && !f.pro && !f.basic).map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="flex items-center gap-2">
                      {feature.name}
                      {featureBenefits[feature.name] && (
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
                            <p>{featureBenefits[feature.name]}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Minus className="h-5 w-5 text-foreground/30 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Minus className="h-5 w-5 text-foreground/30 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Minus className="h-5 w-5 text-foreground/30 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 text-gold mx-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CompactPricingComparison;
