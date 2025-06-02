
import React from "react";

interface CalculatedSavings {
  monthly: number;
  yearly: number;
  roi: number;
}

interface CalculatorBreakdownProps {
  debouncedEmployees: number;
  debouncedSalary: number;
  calculatedSavings: CalculatedSavings;
}

const CalculatorBreakdown = React.memo(({ debouncedEmployees, debouncedSalary, calculatedSavings }: CalculatorBreakdownProps) => {
  return (
    <div className="bg-card/40 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Detalhamento da Economia:</h3>
      <div className="space-y-3 text-foreground/80">
        <div className="flex justify-between items-center">
          <span>• Custo atual com {debouncedEmployees} funcionários/mês:</span>
          <span className="font-semibold text-red-400">
            R$ {(debouncedEmployees * (debouncedSalary + debouncedSalary * 0.8)).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>• Custo do sistema automatizado/mês:</span>
          <span className="font-semibold text-gold">R$ 2.500</span>
        </div>
        <div className="flex justify-between items-center border-t border-gold/20 pt-3">
          <span className="font-semibold">• Economia líquida mensal:</span>
          <span className="font-bold text-green-400 text-lg">
            R$ {calculatedSavings.monthly.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
});

CalculatorBreakdown.displayName = "CalculatorBreakdown";

export default CalculatorBreakdown;
