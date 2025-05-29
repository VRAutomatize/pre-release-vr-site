
import React from "react";
import { Controller } from "react-hook-form";
import { AlertCircle, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPhone } from "@/utils/paymentUtils";

interface StepProps {
  control: any;
  errors: any;
}

// Step 1: Nome - Ultra minimal
export const CondensedNameStep: React.FC<StepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-6 w-full px-4 sm:px-0 text-center">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-2">
          Qual seu nome?
        </h2>
      </div>
      
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            placeholder="Seu nome"
            className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold"
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

// Step 2: WhatsApp - Minimal with express option
export const CondensedPhoneStep: React.FC<StepProps & { showExpressFlow?: boolean; onExpressFlow?: () => void }> = ({ 
  control, 
  errors, 
  showExpressFlow, 
  onExpressFlow 
}) => {
  return (
    <div className="space-y-6 w-full px-4 sm:px-0 text-center">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-2">
          Seu WhatsApp?
        </h2>
      </div>
      
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            placeholder="(11) 99999-9999"
            className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold"
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "");
              field.onChange(cleaned);
            }}
            value={formatPhone(field.value || '')}
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
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <button
            onClick={onExpressFlow}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium"
          >
            Falar no WhatsApp Agora
          </button>
        </div>
      )}
    </div>
  );
};

// Step 3: Revenue - Simplified options
export const CondensedRevenueStep: React.FC<StepProps> = ({ control }) => {
  const revenueOptions = [
    { value: "0-50000", label: "Até R$ 50k" },
    { value: "50001-100000", label: "R$ 50k - 100k" },
    { value: "100001-300000", label: "R$ 100k - 300k" },
    { value: "300001-500000", label: "R$ 300k - 500k" },
    { value: "500001-1000000", label: "R$ 500k - 1M" },
    { value: "1000001-5000000", label: "R$ 1M - 5M" },
    { value: "5000000+", label: "Acima de R$ 5M" }
  ];

  return (
    <div className="space-y-6 w-full px-4 sm:px-0 text-center">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-2">
          Faturamento mensal?
        </h2>
      </div>
      
      <Controller
        name="monthlyRevenue"
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="space-y-3 max-w-sm mx-auto w-full"
          >
            {revenueOptions.map((option, index) => (
              <label 
                key={option.value}
                className="flex items-center p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700/70 hover:border-gold/50 cursor-pointer transition-colors"
                htmlFor={`r${index+1}`}
              >
                <RadioGroupItem 
                  value={option.value} 
                  id={`r${index+1}`}
                  className="border-gold mr-3"
                />
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
};

// Step 4: Industry - Ultra simplified
export const CondensedIndustryStep: React.FC<StepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-6 w-full px-4 sm:px-0 text-center">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-2">
          Qual seu ramo?
        </h2>
      </div>
      
      <Controller
        name="industry"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            autoFocus
            placeholder="Ex: E-commerce, Consultoria, Indústria..."
            className="text-lg py-4 min-h-[100px] text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold resize-none"
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
