
import React from "react";
import { Controller } from "react-hook-form";
import { AlertCircle, TrendingUp, Users, Clock, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPhone } from "@/utils/paymentUtils";

interface StepProps {
  control: any;
  errors: any;
}

// Step 1: Nome with motivation
export const CondensedNameStep: React.FC<StepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0 text-center">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-3 py-1 rounded-full text-sm mb-3">
          <TrendingUp className="h-4 w-4" />
          Análise Personalizada
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gold">Como podemos te chamar?</h2>
        <p className="text-sm text-foreground/70 mt-2">
          Vamos personalizar sua proposta de economia
        </p>
      </div>
      
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            placeholder="Seu nome completo"
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

// Step 2: WhatsApp with express option
export const CondensedPhoneStep: React.FC<StepProps & { showExpressFlow?: boolean; onExpressFlow?: () => void }> = ({ 
  control, 
  errors, 
  showExpressFlow, 
  onExpressFlow 
}) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0 text-center">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm mb-3">
          <Phone className="h-4 w-4" />
          Contato Direto
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gold">Qual seu WhatsApp?</h2>
        <p className="text-sm text-foreground/70 mt-2">
          Para enviarmos sua análise personalizada
        </p>
      </div>
      
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus
            placeholder="(00) 00000-0000"
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
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-400 mb-3">
            Quer falar agora mesmo? Pule o formulário!
          </p>
          <button
            onClick={onExpressFlow}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
          >
            🚀 Falar no WhatsApp Agora
          </button>
        </div>
      )}
    </div>
  );
};

// Step 3: Revenue with economy preview
export const CondensedRevenueStep: React.FC<StepProps> = ({ control }) => {
  const revenueOptions = [
    { value: "0-50000", label: "Até R$ 50k", economy: "R$ 15k-30k" },
    { value: "50001-100000", label: "R$ 50k-100k", economy: "R$ 30k-60k" },
    { value: "100001-300000", label: "R$ 100k-300k", economy: "R$ 60k-180k" },
    { value: "300001-500000", label: "R$ 300k-500k", economy: "R$ 180k-300k" },
    { value: "500001-1000000", label: "R$ 500k-1M", economy: "R$ 300k-600k" },
    { value: "1000001-5000000", label: "R$ 1M-5M", economy: "R$ 600k-3M" },
    { value: "5000000+", label: "Acima de R$ 5M", economy: "R$ 3M+" }
  ];

  return (
    <div className="space-y-4 w-full px-4 sm:px-0 text-center">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm mb-3">
          <TrendingUp className="h-4 w-4" />
          Cálculo de Economia
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gold">
          Faturamento mensal médio?
        </h2>
        <p className="text-sm text-foreground/70 mt-2">
          Para calcular sua economia potencial
        </p>
      </div>
      
      <Controller
        name="monthlyRevenue"
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="space-y-2 max-w-md mx-auto w-full"
          >
            {revenueOptions.map((option, index) => (
              <label 
                key={option.value}
                className="flex items-center justify-between p-3 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700/70 hover:border-gold/50 cursor-pointer transition-colors"
                htmlFor={`r${index+1}`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`r${index+1}`}
                    className="border-gold"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
                <span className="text-xs text-green-400 font-medium">
                  Economia: {option.economy}
                </span>
              </label>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
};

// Step 4: Industry with social proof
export const CondensedIndustryStep: React.FC<StepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-4 w-full px-4 sm:px-0 text-center">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm mb-3">
          <Users className="h-4 w-4" />
          Cases do Seu Setor
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gold">Qual seu ramo?</h2>
        <p className="text-sm text-foreground/70 mt-2">
          Vamos mostrar cases específicos do seu setor
        </p>
      </div>
      
      <Controller
        name="industry"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            autoFocus
            placeholder="Ex: E-commerce, Indústria, Serviços, Consultoria..."
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

      <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
          <Clock className="h-4 w-4" />
          <span>Análise pronta em 24h</span>
        </div>
      </div>
    </div>
  );
};
