import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plan, PricingFeature } from "@/types/pricing-types";

interface PricingTableViewProps {
  plans: Plan[];
  features: PricingFeature[];
  calculatePrice: (monthlyPrice: number) => string;
  isAnnual: boolean;
}

const PricingTableView = ({ plans, features, calculatePrice, isAnnual }: PricingTableViewProps) => {
  return (
    <div className="mt-32">
      <h2 className="text-3xl font-bold text-center mb-12">Compare:</h2>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Recursos</TableHead>
              {plans.map((plan) => (
                <TableHead 
                  key={plan.name}
                  className={`text-center ${plan.highlighted ? 'bg-gold/10' : ''}`}
                >
                  <div className="space-y-2">
                    <h3 className={`text-xl font-bold ${plan.highlighted ? 'text-gold' : ''}`}>
                      {plan.name}
                    </h3>
                    <p className="text-2xl font-bold text-gold">
                      R$ {calculatePrice(plan.monthlyPrice)}
                      <span className="text-sm font-normal text-foreground/60">/mês</span>
                    </p>
                    {isAnnual && (
                      <p className="text-sm text-foreground/60">
                        12x de R$ {calculatePrice(plan.monthlyPrice)}
                      </p>
                    )}
                    <Button 
                      className={`w-full ${
                        plan.highlighted 
                          ? 'bg-gold hover:bg-gold/90 text-background' 
                          : 'bg-secondary hover:bg-secondary/80'
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
              <TableRow key={feature.name}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                {plans.map((plan) => {
                  const included = feature[plan.name.toLowerCase() as keyof Omit<PricingFeature, 'name'>];
                  return (
                    <TableCell 
                      key={plan.name} 
                      className={`text-center ${plan.highlighted ? 'bg-gold/5' : ''}`}
                    >
                      {typeof included === 'boolean' ? (
                        included ? (
                          <Check className="h-5 w-5 text-gold mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-foreground/40 mx-auto" />
                        )
                      ) : (
                        <span className="text-gold font-medium">{included}</span>
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

export default PricingTableView;