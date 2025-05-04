
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Building, MapPin } from "lucide-react";
import { FormData } from "../types";
import { formatCNPJ, formatPhone } from "@/utils/paymentUtils";

interface FormStepProps {
  form: UseFormReturn<FormData>;
  isDirectSale?: boolean;
}

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
