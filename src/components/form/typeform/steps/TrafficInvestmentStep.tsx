
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";

interface TrafficInvestmentStepProps {
  control: any;
}

const TrafficInvestmentStep: React.FC<TrafficInvestmentStepProps> = ({ control }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Quanto investe mensalmente em tráfego pago?</h2>
      <Controller
        name="trafficInvestment"
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="space-y-3 max-w-md mx-auto w-full"
          >
            {[
              { value: "0-1000", label: "Até R$ 1.000" },
              { value: "1001-3000", label: "R$ 1.001 - R$ 3.000" },
              { value: "3001-5000", label: "R$ 3.001 - R$ 5.000" },
              { value: "5001-10000", label: "R$ 5.001 - R$ 10.000" },
              { value: "10000+", label: "Acima de R$ 10.000" }
            ].map((option, index) => (
              <label 
                key={option.value}
                className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700/70 hover:border-gold/50 cursor-pointer transition-colors backdrop-blur-sm"
                htmlFor={`t${index+1}`}
              >
                <div className="flex items-center h-5">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`t${index+1}`}
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

export default TrafficInvestmentStep;
