
import React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";

interface CondensedStepProps {
  control: any;
  errors: any;
}

export const CondensedNameStep: React.FC<CondensedStepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Como podemos te chamar?</h2>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            placeholder="Seu nome completo"
            className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
          />
        )}
      />
      {errors.fullName && (
        <p className="text-red-500 text-sm flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.fullName.message}
        </p>
      )}
    </div>
  );
};

interface CondensedPhoneStepProps extends CondensedStepProps {
  showExpressFlow?: boolean;
  onExpressFlow?: () => void;
}

export const CondensedPhoneStep: React.FC<CondensedPhoneStepProps> = ({ 
  control, 
  errors, 
  showExpressFlow,
  onExpressFlow 
}) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual seu telefone?</h2>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            type="tel"
            placeholder="(11) 99999-9999"
            className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
          />
        )}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.phone.message}
        </p>
      )}
      {showExpressFlow && onExpressFlow && (
        <div className="mt-4 pt-4 border-t border-gold/20">
          <Button 
            onClick={onExpressFlow}
            variant="outline"
            className="w-full text-green-400 border-green-400/30 hover:bg-green-400/10"
          >
            🚀 Falar direto no WhatsApp
          </Button>
        </div>
      )}
    </div>
  );
};

export const CondensedRevenueStep: React.FC<CondensedStepProps> = ({ control, errors }) => {
  const revenueOptions = [
    { value: "0-50000", label: "Até R$ 50.000" },
    { value: "50001-100000", label: "R$ 50.001 - R$ 100.000" },
    { value: "100001-300000", label: "R$ 100.001 - R$ 300.000" },
    { value: "300001-500000", label: "R$ 300.001 - R$ 500.000" },
    { value: "500001-1000000", label: "R$ 500.001 - R$ 1.000.000" },
    { value: "1000001-5000000", label: "Acima de R$ 1.000.000" },
  ];

  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual o faturamento mensal da empresa?</h2>
      <Controller
        name="monthlyRevenue"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            {revenueOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => field.onChange(option.value)}
                className={`w-full p-3 text-left rounded-lg border transition-colors ${
                  field.value === option.value
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gray-700 hover:border-gold/50 hover:bg-gray-800/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      />
      {errors.monthlyRevenue && (
        <p className="text-red-500 text-sm flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.monthlyRevenue.message}
        </p>
      )}
    </div>
  );
};

export const CondensedIndustryStep: React.FC<CondensedStepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual o ramo da sua empresa?</h2>
      <Controller
        name="industry"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            placeholder="Ex: E-commerce, Consultoria, Serviços..."
            className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
          />
        )}
      />
      {errors.industry && (
        <p className="text-red-500 text-sm flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors.industry.message}
        </p>
      )}
    </div>
  );
};
