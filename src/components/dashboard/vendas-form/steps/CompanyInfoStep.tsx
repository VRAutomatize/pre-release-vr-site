
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { NativeInput } from "@/components/ui/native-input";
import { NativeCard } from "@/components/ui/native-card";
import { Building2, Target, Lightbulb } from "lucide-react";

interface CompanyInfoStepProps {
  form: UseFormReturn<FormData>;
}

export function CompanyInfoStep({ form }: CompanyInfoStepProps) {
  return (
    <div className="space-y-6">
      <NativeCard variant="glass" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-400/10 rounded-xl">
            <Building2 className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-100">Informações da Empresa</h3>
            <p className="text-sm text-gray-300">Conte-nos sobre a empresa do cliente</p>
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="nome_empresa"
            rules={{ required: "Nome da empresa é obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 text-base font-medium">
                  Nome da Empresa *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    placeholder="Ex: Empresa LTDA"
                    className="h-12 text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area_atuacao"
            rules={{ required: "Área de atuação é obrigatória" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 text-base font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Área de Atuação *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    placeholder="Ex: E-commerce, Serviços, Consultoria"
                    className="h-12 text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interesse"
            rules={{ required: "Interesse é obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 text-base font-medium flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Principal Interesse *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    placeholder="Ex: Automação de vendas, CRM, Atendimento"
                    className="h-12 text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </NativeCard>
    </div>
  );
}
