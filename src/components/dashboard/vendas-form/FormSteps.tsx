
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone } from "lucide-react";
import { FormData } from "./types";

interface FormStepProps {
  form: UseFormReturn<FormData>;
}

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
export function ClientInfoStep({ form }: FormStepProps) {
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
    </div>
  );
}

// Step 3: Service Options
export function ServiceOptionsStep({ form }: FormStepProps) {
  const { register, control, formState: { errors } } = form;
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="valor_implementacao" className="text-[#d4d4d8]">
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
