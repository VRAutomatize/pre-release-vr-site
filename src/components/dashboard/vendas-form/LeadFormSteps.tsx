
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Percent, AlertTriangle } from "lucide-react";
import { FormData } from "./types";
import { CompanyInfoStep, ClientInfoStep } from "./FormSteps";
import { getCommissionPercentage, calculateCommission } from "./utils/commissionUtils";

interface FormStepProps {
  form: UseFormReturn<FormData>;
  isDirectSale?: boolean;
}

// Step 3: Lead Information - Similar to ServiceOptionsStep but for lead notification
export function LeadInfoStep({ form }: FormStepProps) {
  const { register, control, formState: { errors }, watch, setValue } = form;
  const valorImplementacao = watch("valor_implementacao");
  
  // Convert the string value to number for calculation
  const valorNumerico = parseFloat(valorImplementacao) || 0;
  const comissaoPercentual = getCommissionPercentage(valorNumerico);
  const valorComissao = calculateCommission(valorNumerico);
  
  // Check if value is below minimum
  const isBelowMinimum = valorNumerico > 0 && valorNumerico < 500;
  
  // Handle value change with validation
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("valor_implementacao", value);
  };
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="valor_implementacao" className="text-[#d4d4d8] flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gold" />
          Valor Informado ao Cliente <span className="text-gold">*</span>
          <span className="text-xs text-gold/80">(Mínimo: R$ 500,00)</span>
        </Label>
        <Input
          id="valor_implementacao"
          placeholder="R$ 0,00"
          {...register("valor_implementacao", { 
            required: "Valor informado é obrigatório",
            validate: {
              minValue: (value) => {
                const numValue = parseFloat(value);
                return (numValue >= 500) || "Valor mínimo para implementação é R$ 500,00";
              }
            }
          })}
          className={`bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold ${
            isBelowMinimum ? 'border-red-500 text-red-400' : ''
          }`}
          onChange={handleValueChange}
        />
        {errors.valor_implementacao && (
          <p className="text-red-400 text-sm mt-1">{errors.valor_implementacao.message}</p>
        )}
        
        {isBelowMinimum && !errors.valor_implementacao && (
          <div className="flex items-center gap-2 text-red-400 text-sm mt-1">
            <AlertTriangle className="h-4 w-4" />
            <span>Valor mínimo para implementação é R$ 500,00</span>
          </div>
        )}
        
        {valorNumerico >= 500 && (
          <div className="mt-2 flex items-center gap-2 text-emerald-400 text-sm">
            <Percent className="h-4 w-4" />
            <span>
              Comissão: {comissaoPercentual}% (R$ {valorComissao.toFixed(2)})
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-4 rounded-lg bg-[rgba(255,255,255,0.02)] p-4 border border-[rgba(255,215,0,0.1)]">
        <h3 className="text-gold font-medium">Opções adicionais</h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="envia_audio" className="text-[#d4d4d8]">
              Envio de áudio
            </Label>
            <p className="text-xs text-[#9ca3af]">Cliente tem interesse em envio de mensagens de áudio</p>
          </div>
          <Controller
            name="envia_audio"
            control={control}
            render={({ field }) => (
              <Switch
                id="envia_audio"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="servidor_dedicado" className="text-[#d4d4d8]">
              Servidor dedicado
            </Label>
            <p className="text-xs text-[#9ca3af]">Cliente demonstrou interesse em infraestrutura exclusiva</p>
          </div>
          <Controller
            name="servidor_dedicado"
            control={control}
            render={({ field }) => (
              <Switch
                id="servidor_dedicado"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

// Re-export the other steps from FormSteps.tsx
export { CompanyInfoStep, ClientInfoStep };
