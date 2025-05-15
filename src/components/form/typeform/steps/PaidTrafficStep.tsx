
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";

interface PaidTrafficStepProps {
  control: any;
}

const PaidTrafficStep: React.FC<PaidTrafficStepProps> = ({ control }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Você já investe em tráfego pago?</h2>
      <Controller
        name="paidTraffic"
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={(value) => field.onChange(value === "true")}
            defaultValue={field.value ? "true" : "false"}
            className="space-y-3 max-w-md mx-auto w-full"
          >
            {[
              { value: "true", label: "Sim" },
              { value: "false", label: "Não" }
            ].map((option, index) => (
              <label 
                key={option.value}
                className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700/70 hover:border-gold/50 cursor-pointer transition-colors backdrop-blur-sm"
                htmlFor={`pt${index+1}`}
              >
                <div className="flex items-center h-5">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`pt${index+1}`}
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

export default PaidTrafficStep;
