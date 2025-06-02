
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { NativeInput } from "@/components/ui/native-input";
import { NativeCard } from "@/components/ui/native-card";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Mic, Server, CheckCircle } from "lucide-react";

interface ServiceOptionsStepProps {
  form: UseFormReturn<FormData>;
}

export function ServiceOptionsStep({ form }: ServiceOptionsStepProps) {
  return (
    <div className="space-y-6">
      <NativeCard variant="glass" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-400/10 rounded-xl">
            <DollarSign className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-100">Detalhes da Venda</h3>
            <p className="text-sm text-gray-300">Informações do produto/serviço vendido</p>
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="valor_implementacao"
            rules={{ required: "Valor da implementação é obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 text-base font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Valor da Implementação *
                </FormLabel>
                <FormControl>
                  <NativeInput
                    {...field}
                    placeholder="R$ 0,00"
                    className="h-12 text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Service Options */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-yellow-400" />
              Serviços Inclusos
            </h4>

            <FormField
              control={form.control}
              name="envia_audio"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                      />
                    </FormControl>
                    <div className="flex items-center gap-3 flex-1">
                      <Mic className="h-5 w-5 text-yellow-400" />
                      <div>
                        <FormLabel className="text-base font-medium text-gray-200">
                          Envio de Áudio
                        </FormLabel>
                        <p className="text-sm text-gray-400 mt-1">
                          Funcionalidade de envio de mensagens de áudio
                        </p>
                      </div>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="servidor_dedicado"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                      />
                    </FormControl>
                    <div className="flex items-center gap-3 flex-1">
                      <Server className="h-5 w-5 text-yellow-400" />
                      <div>
                        <FormLabel className="text-base font-medium text-gray-200">
                          Servidor Dedicado
                        </FormLabel>
                        <p className="text-sm text-gray-400 mt-1">
                          Infraestrutura dedicada para melhor performance
                        </p>
                      </div>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      </NativeCard>
    </div>
  );
}
