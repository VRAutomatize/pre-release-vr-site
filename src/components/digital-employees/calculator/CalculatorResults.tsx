
import React from "react";
import { TrendingUp, DollarSign, Calculator } from "lucide-react";

interface CalculatedSavings {
  monthly: number;
  yearly: number;
  roi: number;
}

interface CalculatorResultsProps {
  calculatedSavings: CalculatedSavings;
}

const CalculatorResults = React.memo(({ calculatedSavings }: CalculatorResultsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-green-400/15 border border-green-400/30 rounded-xl p-6 text-center">
        <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
        <p className="text-sm text-foreground/70 mb-1">Economia Mensal</p>
        <p className="text-2xl md:text-3xl font-bold text-green-400">
          R$ {calculatedSavings.monthly.toLocaleString()}
        </p>
      </div>
      
      <div className="bg-gold/15 border border-gold/30 rounded-xl p-6 text-center">
        <DollarSign className="h-8 w-8 text-gold mx-auto mb-3" />
        <p className="text-sm text-foreground/70 mb-1">Economia Anual</p>
        <p className="text-2xl md:text-3xl font-bold text-gold">
          R$ {calculatedSavings.yearly.toLocaleString()}
        </p>
      </div>
      
      <div className="bg-blue-400/15 border border-blue-400/30 rounded-xl p-6 text-center">
        <Calculator className="h-8 w-8 text-blue-400 mx-auto mb-3" />
        <p className="text-sm text-foreground/70 mb-1">ROI Projetado</p>
        <p className="text-2xl md:text-3xl font-bold text-blue-400">
          {calculatedSavings.roi.toFixed(0)}%
        </p>
      </div>
    </div>
  );
});

CalculatorResults.displayName = "CalculatorResults";

export default CalculatorResults;
