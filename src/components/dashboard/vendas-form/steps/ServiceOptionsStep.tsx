
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Percent } from "lucide-react";
import { FormData } from "../types";
import { getCommissionPercentage, calculateCommission } from "../utils/commissionUtils";

interface FormStepProps {
  form: UseFormReturn<FormData>;
  isDirectSale?: boolean;
}

export function ServiceOptionsStep({ form }: FormStepProps) {
  const { register, control, formState: { errors }, watch } = form;
  const valorImplementacao = watch("valor_implementacao");
  
  // Convert the string value to number for calculation
  const valorNumerico = parseFloat(valorImplementacao) || 0;
  const comissaoPercentual = getCommissionPercentage(valorNumerico);
  const valorComissao = calculateCommission(valorNumerico);
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="valor_implementacao" className="text-[#d4d4d8] flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gold" />
          Valor da Implementação <span className="text-gold">*</span>
        </Label>
        <Input
          id="valor_implementacao"
          placeholder="R$ 0,00"
          {...register("valor_implementacao", { required: "Valor da implementação é obrigatório" })}
          className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
        />
        {errors.valor_implementacao && (
          <p className="text-red-400 text-sm mt-1">{errors.valor_implementacao.message}</p>
        )}
        
        {valorNumerico > 0 && (
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
            <p className="text-xs text-[#9ca3af]">Permite envio de mensagens de áudio</p>
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
            <p className="text-xs text-[#9ca3af]">Infraestrutura exclusiva</p>
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
