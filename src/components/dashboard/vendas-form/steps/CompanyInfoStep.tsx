
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { NativeInput } from "@/components/ui/native-input";
import { NativeCard } from "@/components/ui/native-card";
import { Building2, Target, Lightbulb } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface CompanyInfoStepProps {
  form: UseFormReturn<FormData>;
}

export function CompanyInfoStep({ form }: CompanyInfoStepProps) {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <NativeCard variant="glass" padding={isMobile ? "md" : "lg"}>
        <div className={`flex items-center gap-3 ${isMobile ? 'mb-4' : 'mb-6'}`}>
          <div className={`p-2 bg-yellow-400/10 rounded-lg ${isMobile ? '' : 'p-3 rounded-xl'}`}>
            <Building2 className={`text-yellow-400 ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
          </div>
          <div>
            <h3 className={`font-semibold text-gray-100 ${isMobile ? 'text-lg' : 'text-xl'}`}>
              Informações da Empresa
            </h3>
            {!isMobile && (
              <p className="text-sm text-gray-300">Conte-nos sobre a empresa do cliente</p>
            )}
          </div>
        </div>

        <div className={isMobile ? 'space-y-4' : 'space-y-6'}>
          <FormField
            control={form.control}
            name="nome_empresa"
            rules={{ required: "Nome da empresa é obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`text-gray-200 font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                  Nome da Empresa *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    placeholder="Ex: Empresa LTDA"
                    className={isMobile ? 'h-10 text-sm' : 'h-12 text-base'}
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
                <FormLabel className={`text-gray-200 font-medium flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  <Target className="h-3 w-3" />
                  Área de Atuação *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    placeholder="Ex: E-commerce, Serviços"
                    className={isMobile ? 'h-10 text-sm' : 'h-12 text-base'}
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
                <FormLabel className={`text-gray-200 font-medium flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  <Lightbulb className="h-3 w-3" />
                  Principal Interesse *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    placeholder="Ex: Automação, CRM"
                    className={isMobile ? 'h-10 text-sm' : 'h-12 text-base'}
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
