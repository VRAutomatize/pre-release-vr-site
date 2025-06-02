
import React from "react";
import { Users, DollarSign } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface CalculatorInputsProps {
  employees: number;
  avgSalary: number;
  onEmployeesChange: (value: number) => void;
  onSalaryChange: (value: number) => void;
}

const CalculatorInputs = React.memo(({ employees, avgSalary, onEmployeesChange, onSalaryChange }: CalculatorInputsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Number of Employees */}
      <div>
        <label className="block text-lg font-semibold text-white mb-4">
          <Users className="inline h-5 w-5 mr-2 text-gold" />
          Funcionários em Processos Operacionais
        </label>
        <div className="space-y-4">
          <input
            type="range"
            min="1"
            max="50"
            value={employees}
            onChange={(e) => onEmployeesChange(Number(e.target.value))}
            className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer slider-optimized"
          />
          <div className="flex justify-between text-sm text-foreground/70">
            <span>1</span>
            <span className="text-gold font-bold text-xl">{employees} funcionários</span>
            <span>50+</span>
          </div>
        </div>
      </div>

      {/* Average Salary */}
      <div>
        <label className="block text-lg font-semibold text-white mb-4">
          <DollarSign className="inline h-5 w-5 mr-2 text-gold" />
          Salário Médio (R$)
        </label>
        <div className="space-y-4">
          <input
            type="range"
            min="1500"
            max="15000"
            step="500"
            value={avgSalary}
            onChange={(e) => onSalaryChange(Number(e.target.value))}
            className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer slider-optimized"
          />
          <div className="flex justify-between text-sm text-foreground/70">
            <span>R$ 1.5k</span>
            <span className="text-gold font-bold text-xl">R$ {avgSalary.toLocaleString()}</span>
            <span>R$ 15k+</span>
          </div>
        </div>
      </div>
    </div>
  );
});

CalculatorInputs.displayName = "CalculatorInputs";

export default CalculatorInputs;
