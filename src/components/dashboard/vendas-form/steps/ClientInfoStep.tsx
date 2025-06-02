
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { NativeInput } from "@/components/ui/native-input";
import { NativeCard } from "@/components/ui/native-card";
import { User, Phone, Mail, Building } from "lucide-react";

interface ClientInfoStepProps {
  form: UseFormReturn<FormData>;
  isDirectSale: boolean;
}

export function ClientInfoStep({ form, isDirectSale }: ClientInfoStepProps) {
  return (
    <div className="space-y-6">
      <NativeCard variant="glass" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-400/10 rounded-xl">
            <User className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-100">Dados do Cliente</h3>
            <p className="text-sm text-gray-300">
              {isDirectSale ? "Informações para contrato" : "Contato do lead qualificado"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="nome_cliente"
            rules={{ required: "Nome do cliente é obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 text-base font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nome Completo *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    placeholder="Nome do responsável"
                    className="h-12 text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefone_cliente"
            rules={{ required: "Telefone é obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 text-base font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className="h-12 text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email_cliente"
            rules={{ 
              required: "Email é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 text-base font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    type="email"
                    placeholder="email@empresa.com"
                    className="h-12 text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {isDirectSale && (
            <>
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 text-base font-medium flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      CNPJ (opcional)
                    </FormLabel>
                    <FormControl>
                      <NativeInput
                        {...field}
                        placeholder="00.000.000/0001-00"
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endereco_comercial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 text-base font-medium">
                      Endereço Comercial (opcional)
                    </FormLabel>
                    <FormControl>
                      <NativeInput
                        {...field}
                        placeholder="Rua, número, bairro, cidade"
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
      </NativeCard>
    </div>
  );
}
