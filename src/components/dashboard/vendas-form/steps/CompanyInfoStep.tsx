
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "../types";

interface FormStepProps {
  form: UseFormReturn<FormData>;
  isDirectSale?: boolean;
}

export function CompanyInfoStep({ form }: FormStepProps) {
  const { register, formState: { errors } } = form;
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="nome_empresa" className="text-[#d4d4d8]">
          Nome da Empresa <span className="text-gold">*</span>
        </Label>
        <Input
          id="nome_empresa"
          placeholder="Digite o nome da empresa"
          {...register("nome_empresa", { required: "Nome da empresa é obrigatório" })}
          className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
        />
        {errors.nome_empresa && (
          <p className="text-red-400 text-sm mt-1">{errors.nome_empresa.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="area_atuacao" className="text-[#d4d4d8]">
          Área de Atuação
        </Label>
        <Input
          id="area_atuacao"
          placeholder="Ex: E-commerce, Consultoria, Saúde..."
          {...register("area_atuacao")}
          className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="interesse" className="text-[#d4d4d8]">
          Interesse <span className="text-gold">*</span>
        </Label>
        <Textarea
          id="interesse"
          placeholder="Descreva o interesse do cliente"
          {...register("interesse", { required: "Descrição do interesse é obrigatória" })}
          className="min-h-[120px] bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
        />
        {errors.interesse && (
          <p className="text-red-400 text-sm mt-1">{errors.interesse.message}</p>
        )}
      </div>
    </div>
  );
}
