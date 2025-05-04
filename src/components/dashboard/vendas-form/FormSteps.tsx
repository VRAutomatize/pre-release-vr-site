
import React, { useState, useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, Building, MapPin, DollarSign, Percent } from "lucide-react";
import { FormData } from "./types";
import { formatCNPJ, formatPhone } from "@/utils/paymentUtils";

interface FormStepProps {
  form: UseFormReturn<FormData>;
  isDirectSale?: boolean;
}

// Helper function to calculate commission percentage based on value
const getCommissionPercentage = (value: number): number => {
  if (value < 950) return 20;
  if (value < 1300) return 30;
  return 35;
};

// Helper function to calculate commission amount
const calculateCommission = (value: number): number => {
  const percentage = getCommissionPercentage(value);
  return (value * percentage) / 100;
};

// Step 1: Company Information
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

// Step 2: Client Information
export function ClientInfoStep({ form, isDirectSale = false }: FormStepProps) {
  const { register, formState: { errors } } = form;
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="nome_cliente" className="text-[#d4d4d8] flex items-center gap-2">
          <User className="h-4 w-4 text-gold" />
          Nome do Cliente <span className="text-gold">*</span>
        </Label>
        <Input
          id="nome_cliente"
          placeholder="Nome completo do cliente"
          {...register("nome_cliente", { required: "Nome do cliente é obrigatório" })}
          className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
        />
        {errors.nome_cliente && (
          <p className="text-red-400 text-sm mt-1">{errors.nome_cliente.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="telefone_cliente" className="text-[#d4d4d8] flex items-center gap-2">
          <Phone className="h-4 w-4 text-gold" />
          Telefone <span className="text-gold">*</span>
        </Label>
        <Input
          id="telefone_cliente"
          placeholder="(00) 00000-0000"
          {...register("telefone_cliente", { required: "Telefone do cliente é obrigatório" })}
          className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            e.target.value = formatPhone(value);
            form.setValue("telefone_cliente", value);
          }}
        />
        {errors.telefone_cliente && (
          <p className="text-red-400 text-sm mt-1">{errors.telefone_cliente.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email_cliente" className="text-[#d4d4d8] flex items-center gap-2">
          <Mail className="h-4 w-4 text-gold" />
          Email
        </Label>
        <Input
          id="email_cliente"
          placeholder="cliente@empresa.com"
          {...register("email_cliente", { 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Endereço de email inválido"
            }
          })}
          className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
        />
        {errors.email_cliente && (
          <p className="text-red-400 text-sm mt-1">{errors.email_cliente.message}</p>
        )}
      </div>
      
      {isDirectSale && (
        <>
          <div className="space-y-2">
            <Label htmlFor="cnpj" className="text-[#d4d4d8] flex items-center gap-2">
              <Building className="h-4 w-4 text-gold" />
              CNPJ <span className="text-gold">*</span>
            </Label>
            <Input
              id="cnpj"
              placeholder="00.000.000/0000-00"
              {...register("cnpj", { required: "CNPJ é obrigatório" })}
              className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                e.target.value = formatCNPJ(value);
                form.setValue("cnpj", value);
              }}
            />
            {errors.cnpj && (
              <p className="text-red-400 text-sm mt-1">{errors.cnpj.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endereco_comercial" className="text-[#d4d4d8] flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              Endereço Comercial <span className="text-gold">*</span>
            </Label>
            <Textarea
              id="endereco_comercial"
              placeholder="Endereço completo da empresa"
              {...register("endereco_comercial", { required: "Endereço comercial é obrigatório" })}
              className="bg-[rgba(255,255,255,0.05)] border-[rgba(255,215,0,0.2)] text-white focus:border-gold"
            />
            {errors.endereco_comercial && (
              <p className="text-red-400 text-sm mt-1">{errors.endereco_comercial.message}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Step 3: Service Options
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

