
import React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";
import { formatPhone } from "@/utils/paymentUtils";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Render the appropriate step content based on the current step
  switch (currentStep) {
    case 0: // Name
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
    
    case 1: // Phone
      return (
        <div className="space-y-4 w-full px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual seu WhatsApp?</h2>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                placeholder="(00) 00000-0000"
                className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
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
        <div className="space-y-4 w-full px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">E seu melhor e-mail?</h2>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                type="email"
                placeholder="seu@email.com"
                className="text-lg py-6 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
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
        <div className="space-y-4 w-full px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual seu Instagram?</h2>
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
                  className="text-lg py-6 pl-8 text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold hover:text-white"
                />
              </div>
            )}
          />
          <p className="text-sm text-muted-foreground text-center">Opcional</p>
        </div>
      );
    
    case 4: // Monthly Revenue
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
    
    case 5: // Paid Traffic - Changed to radio button selection
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
    
    case 6: // Traffic Investment (conditional) or Industry
      if (paidTraffic) {
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
      } 
      // If not using paid traffic, this is the industry step
      return (
        <div className="space-y-4 w-full px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual seu ramo de atuação?</h2>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <div className="max-w-md mx-auto w-full">
                <Textarea
                  {...field}
                  autoFocus
                  placeholder="Descreva o ramo de atuação da sua empresa"
                  className="text-lg py-4 min-h-[120px] text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold resize-none hover:text-white"
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
        <div className="space-y-4 w-full px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gold text-center">Qual seu ramo de atuação?</h2>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <div className="max-w-md mx-auto w-full">
                <Textarea
                  {...field}
                  autoFocus
                  placeholder="Descreva o ramo de atuação da sua empresa"
                  className="text-lg py-4 min-h-[120px] text-center bg-gray-800/50 border-gold/20 hover:border-gold focus:border-gold focus:ring-gold resize-none hover:text-white"
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
