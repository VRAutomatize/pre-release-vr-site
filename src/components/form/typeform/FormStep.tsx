
import React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import { formatPhone } from "@/utils/paymentUtils";

interface FormStepProps {
  currentStep: number;
  control: any;
  errors: any;
  paidTraffic: boolean;
  setValue: (name: any, value: any) => void;
}

const FormStep: React.FC<FormStepProps> = ({ 
  currentStep, 
  control, 
  errors,
  paidTraffic,
  setValue
}) => {
  // Render the appropriate step content based on the current step
  switch (currentStep) {
    case 0: // Name
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gold text-center">Como podemos te chamar?</h2>
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
    
    case 1: // Phone
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gold text-center">Qual seu WhatsApp?</h2>
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
                  // Only allow digits
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
          <p className="text-sm text-muted-foreground text-center">Apenas números, incluindo DDD</p>
        </div>
      );
    
    case 2: // Email
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gold text-center">E seu melhor e-mail?</h2>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                type="email"
                placeholder="seu@email.com"
                className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm flex items-center justify-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email.message}
            </p>
          )}
        </div>
      );
    
    case 3: // Instagram
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gold text-center">Qual seu Instagram?</h2>
          <Controller
            name="instagram"
            control={control}
            render={({ field }) => (
              <div className="relative max-w-md mx-auto w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">@</span>
                </div>
                <Input
                  {...field}
                  autoFocus
                  placeholder="seu.perfil"
                  className="text-lg py-6 pl-8 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold"
                />
              </div>
            )}
          />
          <p className="text-sm text-muted-foreground text-center">Opcional</p>
        </div>
      );
    
    case 4: // Monthly Revenue
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gold text-center">Qual sua média de faturamento mensal?</h2>
          <Controller
            name="monthlyRevenue"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-4 max-w-md mx-auto"
              >
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("0-5000")}>
                  <RadioGroupItem value="0-5000" id="r1" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                  <label htmlFor="r1" className="cursor-pointer w-full">Até R$ 5.000</label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("5001-10000")}>
                  <RadioGroupItem value="5001-10000" id="r2" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                  <label htmlFor="r2" className="cursor-pointer w-full">R$ 5.001 - R$ 10.000</label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("10001-20000")}>
                  <RadioGroupItem value="10001-20000" id="r3" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                  <label htmlFor="r3" className="cursor-pointer w-full">R$ 10.001 - R$ 20.000</label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("20001-50000")}>
                  <RadioGroupItem value="20001-50000" id="r4" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                  <label htmlFor="r4" className="cursor-pointer w-full">R$ 20.001 - R$ 50.000</label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("50001-100000")}>
                  <RadioGroupItem value="50001-100000" id="r5" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                  <label htmlFor="r5" className="cursor-pointer w-full">R$ 50.001 - R$ 100.000</label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("100000+")}>
                  <RadioGroupItem value="100000+" id="r6" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                  <label htmlFor="r6" className="cursor-pointer w-full">Acima de R$ 100.000</label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      );
    
    case 5: // Paid Traffic
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gold text-center">Você já investe em tráfego pago?</h2>
          <Controller
            name="paidTraffic"
            control={control}
            render={({ field }) => (
              <div className="space-y-6 max-w-md mx-auto">
                <div className="flex items-center justify-between p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange(true)}>
                  <label className="cursor-pointer w-full">Sim</label>
                  <Switch
                    checked={field.value === true}
                    onCheckedChange={() => field.onChange(true)}
                    className="data-[state=checked]:bg-gold"
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange(false)}>
                  <label className="cursor-pointer w-full">Não</label>
                  <Switch
                    checked={field.value === false}
                    onCheckedChange={() => field.onChange(false)}
                    className="data-[state=checked]:bg-gold"
                  />
                </div>
              </div>
            )}
          />
        </div>
      );
    
    case 6: // Traffic Investment (conditional) or Industry
      if (paidTraffic) {
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gold text-center">Quanto investe mensalmente em tráfego pago?</h2>
            <Controller
              name="trafficInvestment"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-4 max-w-md mx-auto"
                >
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("0-1000")}>
                    <RadioGroupItem value="0-1000" id="t1" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                    <label htmlFor="t1" className="cursor-pointer w-full">Até R$ 1.000</label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("1001-3000")}>
                    <RadioGroupItem value="1001-3000" id="t2" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                    <label htmlFor="t2" className="cursor-pointer w-full">R$ 1.001 - R$ 3.000</label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("3001-5000")}>
                    <RadioGroupItem value="3001-5000" id="t3" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                    <label htmlFor="t3" className="cursor-pointer w-full">R$ 3.001 - R$ 5.000</label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("5001-10000")}>
                    <RadioGroupItem value="5001-10000" id="t4" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                    <label htmlFor="t4" className="cursor-pointer w-full">R$ 5.001 - R$ 10.000</label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gold/20 bg-gray-800/30 hover:bg-gray-700 hover:border-gold/50 cursor-pointer transition-colors" onClick={() => field.onChange("10000+")}>
                    <RadioGroupItem value="10000+" id="t5" className="text-gold border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black" />
                    <label htmlFor="t5" className="cursor-pointer w-full">Acima de R$ 10.000</label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        );
      } 
      // If not using paid traffic, this is the industry step
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gold text-center">Qual seu ramo de atuação?</h2>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <div className="max-w-md mx-auto">
                <Textarea
                  {...field}
                  autoFocus
                  placeholder="Descreva o ramo de atuação da sua empresa"
                  className="text-lg py-4 min-h-[120px] text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold resize-none"
                />
              </div>
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
    
    case 7: // Industry (only if paid traffic is true)
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gold text-center">Qual seu ramo de atuação?</h2>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <div className="max-w-md mx-auto">
                <Textarea
                  {...field}
                  autoFocus
                  placeholder="Descreva o ramo de atuação da sua empresa"
                  className="text-lg py-4 min-h-[120px] text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold resize-none"
                />
              </div>
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
    
    default:
      return null;
  }
};

export default FormStep;
