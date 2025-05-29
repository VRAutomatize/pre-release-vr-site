
import React from "react";
import { Controller } from "react-hook-form";
import { AlertCircle, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPhone } from "@/utils/paymentUtils";
import { useKeyboardDetection } from "@/hooks/useKeyboardDetection";

interface StepProps {
  control: any;
  errors: any;
}

// Step 1: Nome - Ultra minimal with dynamic sizing
export const CondensedNameStep: React.FC<StepProps> = ({
  control,
  errors
}) => {
  const { isKeyboardOpen } = useKeyboardDetection();
  
  return (
    <div className={`space-y-4 w-full text-center ${isKeyboardOpen ? 'px-2' : 'px-4 sm:px-0'}`}>
      <div className={isKeyboardOpen ? 'mb-3' : 'mb-6'}>
        <h2 className={`font-bold text-gold mb-1 ${isKeyboardOpen ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
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
            className={`text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold ${
              isKeyboardOpen ? 'text-base py-3' : 'text-lg py-6'
            }`}
          />
        )}
      />
      {errors.fullName && (
        <p className={`text-red-500 flex items-center justify-center ${isKeyboardOpen ? 'text-xs' : 'text-sm'}`}>
          <AlertCircle className={`mr-1 ${isKeyboardOpen ? 'h-3 w-3' : 'h-4 w-4'}`} />
          {errors.fullName.message}
        </p>
      )}
    </div>
  );
};

// Step 2: WhatsApp - Minimal with express option and dynamic sizing
export const CondensedPhoneStep: React.FC<StepProps & {
  showExpressFlow?: boolean;
  onExpressFlow?: () => void;
}> = ({
  control,
  errors,
  showExpressFlow,
  onExpressFlow
}) => {
  const { isKeyboardOpen } = useKeyboardDetection();
  
  return (
    <div className={`space-y-4 w-full text-center ${isKeyboardOpen ? 'px-2' : 'px-4 sm:px-0'}`}>
      <div className={isKeyboardOpen ? 'mb-3' : 'mb-6'}>
        <h2 className={`font-bold text-gold mb-1 ${isKeyboardOpen ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
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
            className={`text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold ${
              isKeyboardOpen ? 'text-base py-3' : 'text-lg py-6'
            }`}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "");
              field.onChange(cleaned);
            }}
            value={formatPhone(field.value || '')}
          />
        )}
      />
      {errors.phone && (
        <p className={`text-red-500 flex items-center justify-center ${isKeyboardOpen ? 'text-xs' : 'text-sm'}`}>
          <AlertCircle className={`mr-1 ${isKeyboardOpen ? 'h-3 w-3' : 'h-4 w-4'}`} />
          {errors.phone.message}
        </p>
      )}

      {showExpressFlow && onExpressFlow && !isKeyboardOpen}
    </div>
  );
};

// Step 3: Revenue - Optimized for better fit with dynamic sizing
export const CondensedRevenueStep: React.FC<StepProps> = ({
  control
}) => {
  const { isKeyboardOpen } = useKeyboardDetection();
  
  const revenueOptions = [
    { value: "0-50000", label: "Até R$ 50k" },
    { value: "50001-100000", label: "R$ 50k - 100k" },
    { value: "100001-300000", label: "R$ 100k - 300k" },
    { value: "300001-500000", label: "R$ 300k - 500k" },
    { value: "500001-1000000", label: "R$ 500k - 1M" },
    { value: "1000001-5000000", label: "R$ 1M - 5M" }
  ];

  return (
    <div className={`w-full text-center ${isKeyboardOpen ? 'px-2' : 'px-4 sm:px-0'}`}>
      <div className={isKeyboardOpen ? 'mb-2' : 'mb-4'}>
        <h2 className={`font-bold text-gold mb-1 ${isKeyboardOpen ? 'text-base' : 'text-xl sm:text-2xl'}`}>
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
            className={`max-w-sm mx-auto w-full ${isKeyboardOpen ? 'space-y-1' : 'space-y-2'}`}
          >
            {revenueOptions.map((option, index) => (
              <label
                key={option.value}
                className={`flex items-center rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700/70 hover:border-gold/50 cursor-pointer transition-colors touch-manipulation ${
                  isKeyboardOpen 
                    ? 'p-2 min-h-[2.25rem]' 
                    : 'p-3 min-h-[3rem]'
                }`}
                htmlFor={`r${index + 1}`}
              >
                <RadioGroupItem
                  value={option.value}
                  id={`r${index + 1}`}
                  className="border-gold mr-3 flex-shrink-0"
                />
                <span className={`font-medium text-left flex-1 ${
                  isKeyboardOpen ? 'text-xs' : 'text-sm'
                }`}>
                  {option.label}
                </span>
              </label>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
};

// Step 4: Industry - Ultra simplified with dynamic sizing
export const CondensedIndustryStep: React.FC<StepProps> = ({
  control,
  errors
}) => {
  const { isKeyboardOpen } = useKeyboardDetection();
  
  return (
    <div className={`space-y-4 w-full text-center ${isKeyboardOpen ? 'px-2' : 'px-4 sm:px-0'}`}>
      <div className={isKeyboardOpen ? 'mb-3' : 'mb-6'}>
        <h2 className={`font-bold text-gold mb-1 ${isKeyboardOpen ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
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
            className={`text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold resize-none ${
              isKeyboardOpen ? 'text-sm py-2 min-h-[60px]' : 'text-lg py-4 min-h-[100px]'
            }`}
          />
        )}
      />
      {errors.industry && (
        <p className={`text-red-500 flex items-center justify-center ${isKeyboardOpen ? 'text-xs' : 'text-sm'}`}>
          <AlertCircle className={`mr-1 ${isKeyboardOpen ? 'h-3 w-3' : 'h-4 w-4'}`} />
          {errors.industry.message}
        </p>
      )}
    </div>
  );
};
