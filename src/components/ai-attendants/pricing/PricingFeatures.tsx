
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { features, plans } from "./pricingData";
import { formatCurrency, calculateInstallments } from "@/utils/pricing";
import { Button } from "@/components/ui/button";

interface PricingFeaturesProps {
  isAnnual: boolean;
}

export const PricingFeatures = ({ isAnnual }: PricingFeaturesProps) => {
  return (
    <div className="mt-8 overflow-x-auto">
      <div className="min-w-[900px] overflow-hidden rounded-2xl border border-border">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="w-[280px] rounded-tl-2xl bg-background">Recursos</TableHead>
              {plans.map((plan, index) => {
                const installmentAmount = calculateInstallments(plan.annualTotal);
                const isLast = index === plans.length - 1;
                
                return (
                  <TableHead 
                    key={plan.name}
                    className={`text-center bg-background ${plan.highlighted ? "bg-gold/5" : ""} ${
                      isLast ? "rounded-tr-2xl" : ""
                    }`}
                  >
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gold">{plan.name}</h3>
                      <p className="text-xs text-foreground/60 px-2">{plan.description}</p>
                      <div className="text-xl font-bold">
                        {isAnnual ? (
                          <>
                            {plan.annualTotal >= 10000 
                              ? `R$ ${plan.annualTotal/1000}k/ano`
                              : `R$ ${formatCurrency(plan.annualTotal)}/ano`}
                          </>
                        ) : (
                          <>
                            R$ {formatCurrency(plan.monthlyPrice)}/mês
                          </>
                        )}
                      </div>
                      {isAnnual && (
                        <p className="text-xs text-foreground/60">
                          12x de R$ {formatCurrency(installmentAmount)}
                        </p>
                      )}
                      {plan.implementation > 0 && (
                        <p className="text-xs text-foreground/60">
                          Implementação: R$ {formatCurrency(plan.implementation)}
                        </p>
                      )}
                      <Button 
                        size="sm"
                        className={`w-full ${
                          plan.highlighted 
                            ? "bg-gold hover:bg-gold/90 text-background" 
                            : "bg-secondary/80 hover:bg-secondary text-foreground hover:text-foreground/90"
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-secondary/10">
              <TableCell className="font-medium">Acesso ao dashboard</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.name} className={`text-center ${plan.highlighted ? "bg-gold/5" : ""}`}>
                  <Check className="h-5 w-5 text-gold mx-auto" />
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow className="hover:bg-secondary/10">
              <TableCell className="font-medium">Mensagens ilimitadas</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.name} className={`text-center ${plan.highlighted ? "bg-gold/5" : ""}`}>
                  <Check className="h-5 w-5 text-gold mx-auto" />
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow className="hover:bg-secondary/10">
              <TableCell className="font-medium">Sem fidelidade</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.name} className={`text-center ${plan.highlighted ? "bg-gold/5" : ""}`}>
                  <Check className="h-5 w-5 text-gold mx-auto" />
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow className="hover:bg-secondary/10">
              <TableCell className="font-medium">7 dias de teste grátis</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.name} className={`text-center ${plan.highlighted ? "bg-gold/5" : ""}`}>
                  {plan.name !== "Premium" ? (
                    <Check className="h-5 w-5 text-gold mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-foreground/40 mx-auto" />
                  )}
                </TableCell>
              ))}
            </TableRow>
            
            {features.map((feature, featureIndex) => (
              <TableRow 
                key={feature.name} 
                className={`hover:bg-secondary/10 ${
                  featureIndex === features.length - 1 ? "border-0" : ""
                }`}
              >
                <TableCell 
                  className={`font-medium ${
                    featureIndex === features.length - 1 ? "rounded-bl-2xl" : ""
                  }`}
                >
                  {feature.name}
                </TableCell>
                {["basic", "pro", "advanced", "premium"].map((planType, planIndex) => {
                  const isLastCell = featureIndex === features.length - 1 && planIndex === 3;
                  return (
                    <TableCell 
                      key={planType} 
                      className={`text-center ${
                        planType === "pro" ? "bg-gold/5" : ""
                      } ${isLastCell ? "rounded-br-2xl" : ""}`}
                    >
                      {typeof feature[planType as keyof Omit<typeof feature, "name">] === "boolean" ? (
                        feature[planType as keyof Omit<typeof feature, "name">] ? (
                          <Check className="h-5 w-5 text-gold mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-foreground/40 mx-auto" />
                        )
                      ) : (
                        <span className="text-gold">
                          {feature[planType as keyof Omit<typeof feature, "name">]}
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
