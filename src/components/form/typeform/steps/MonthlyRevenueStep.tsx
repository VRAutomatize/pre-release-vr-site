
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";
import { Crown } from "lucide-react";

interface MonthlyRevenueStepProps {
  control: any;
}

const MonthlyRevenueStep: React.FC<MonthlyRevenueStepProps> = ({ control }) => {
  const revenueOptions = [
    { value: "0-50000", label: "Até R$ 50.000", tier: "standard" },
    { value: "50001-100000", label: "R$ 50.001 - R$ 100.000", tier: "standard" },
    { value: "100001-300000", label: "R$ 100.001 - R$ 300.000", tier: "growth" },
    { value: "300001-500000", label: "R$ 300.001 - R$ 500.000", tier: "premium" },
    { value: "500001-1000000", label: "R$ 500.001 - R$ 1.000.000", tier: "executive" },
    { value: "1000001-5000000", label: "R$ 1.000.001 - R$ 5.000.000", tier: "executive" }
  ];

  const getTierStyles = (tier: string) => {
    switch (tier) {
      case "executive":
        return "border-yellow-400 bg-gradient-to-r from-yellow-900/20 to-amber-900/20 hover:border-yellow-300";
      case "premium":
        return "border-orange-400 bg-gradient-to-r from-orange-900/20 to-red-900/20 hover:border-orange-300";
      case "growth":
        return "border-blue-400 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 hover:border-blue-300";
      default:
        return "border-gold/20 bg-gray-800/30 hover:border-gold/50";
    }
  };

  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">
        Qual sua média de faturamento mensal?
      </h2>
      <p className="text-center text-foreground/70 text-sm">
        Isso nos ajuda a personalizar nossa proposta para seu perfil empresarial
      </p>
      
      <Controller
        name="monthlyRevenue"
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={(value) => {
              console.log('Monthly revenue selected:', value);
              field.onChange(value);
            }}
            value={field.value}
            className="space-y-3 max-w-md mx-auto w-full"
          >
            {revenueOptions.map((option, index) => (
              <label 
                key={option.value}
                className={`flex items-center space-x-3 p-3 sm:p-4 rounded-lg cursor-pointer transition-all backdrop-blur-sm touch-manipulation min-h-[3.5rem] ${getTierStyles(option.tier)}`}
                htmlFor={`r${index+1}`}
              >
                <div className="flex items-center h-5">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`r${index+1}`}
                    className={option.tier === "executive" ? "border-yellow-400" : "border-gold"}
                  />
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  {option.tier === "executive" && (
                    <Crown className="h-4 w-4 text-yellow-400" />
                  )}
                  <span>{option.label}</span>
                  {option.tier === "executive" && (
                    <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full ml-auto">
                      Executivo
                    </span>
                  )}
                </div>
              </label>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
};

export default MonthlyRevenueStep;
