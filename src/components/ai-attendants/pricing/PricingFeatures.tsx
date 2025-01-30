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
import { calculatePrice } from "@/utils/pricing";
import { Button } from "@/components/ui/button";

interface PricingFeaturesProps {
  isAnnual: boolean;
}

export const PricingFeatures = ({ isAnnual }: PricingFeaturesProps) => {
  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold text-center mb-12">Compare:</h3>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">Recursos</TableHead>
              {plans.map((plan) => (
                <TableHead 
                  key={plan.name}
                  className={`text-center min-w-[200px] ${plan.highlighted ? "bg-gold/5" : ""}`}
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gold">{plan.name}</h3>
                    <p className="text-sm text-foreground/60">{plan.description}</p>
                    <div className="text-2xl font-bold">
                      R$ {calculatePrice(plan.monthlyPrice, isAnnual)}
                      <span className="text-sm font-normal text-foreground/60">/mês</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-foreground/60">
                        12x de R$ {calculatePrice(plan.monthlyPrice, isAnnual)}
                      </p>
                    )}
                    <Button 
                      className={`w-full ${
                        plan.highlighted 
                          ? "bg-gold hover:bg-gold/90 text-background" 
                          : "bg-secondary/80 hover:bg-secondary text-foreground hover:text-foreground/90"
                      }`}
                    >
                      Contratar Agora
                    </Button>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.name} className="hover:bg-secondary/20">
                <TableCell className="font-medium">{feature.name}</TableCell>
                {["basic", "pro", "premium"].map((plan) => (
                  <TableCell key={plan} className="text-center">
                    {typeof feature[plan as keyof Omit<typeof feature, "name">] === "boolean" ? (
                      feature[plan as keyof Omit<typeof feature, "name">] ? (
                        <Check className="h-5 w-5 text-gold mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-foreground/40 mx-auto" />
                      )
                    ) : (
                      <span className="text-gold">
                        {feature[plan as keyof Omit<typeof feature, "name">]}
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};