
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";

interface MonthlyRevenueStepProps {
  control: any;
}

const MonthlyRevenueStep: React.FC<MonthlyRevenueStepProps> = ({ control }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual sua média de faturamento mensal?</h2>
      <Controller
        name="monthlyRevenue"
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="space-y-3 max-w-md mx-auto w-full"
          >
            {[
              { value: "0-5000", label: "Até R$ 5.000" },
              { value: "5001-10000", label: "R$ 5.001 - R$ 10.000" },
              { value: "10001-20000", label: "R$ 10.001 - R$ 20.000" },
              { value: "20001-50000", label: "R$ 20.001 - R$ 50.000" },
              { value: "50001-100000", label: "R$ 50.001 - R$ 100.000" },
              { value: "100000+", label: "Acima de R$ 100.000" }
            ].map((option, index) => (
              <label 
                key={option.value}
                className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700/70 hover:border-gold/50 cursor-pointer transition-colors backdrop-blur-sm"
                htmlFor={`r${index+1}`}
              >
                <div className="flex items-center h-5">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`r${index+1}`}
                    className="border-gold"
                  />
                </div>
                <div className="text-sm sm:text-base">{option.label}</div>
              </label>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
};

export default MonthlyRevenueStep;
