
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClientFormData } from "../ClientRegistrationForm";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ClientInfoFormProps {
  form: UseFormReturn<ClientFormData>;
}

const ClientInfoForm: React.FC<ClientInfoFormProps> = ({ form }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'space-y-4' : 'space-y-4'}`}>
      <h3 className="text-lg font-semibold text-gray-100 mb-3">Informações da Empresa</h3>
      
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-100 font-medium">Nome da Empresa *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Ex: Tech Solutions LTDA"
                className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 ${isMobile ? 'text-base py-3' : ''}`}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="clientName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-100 font-medium">Nome do Responsável *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Ex: João Silva"
                className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 ${isMobile ? 'text-base py-3' : ''}`}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-100 font-medium">Email *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="email"
                placeholder="contato@empresa.com"
                className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 ${isMobile ? 'text-base py-3' : ''}`}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-100 font-medium">Telefone *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="(11) 99999-9999"
                className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 ${isMobile ? 'text-base py-3' : ''}`}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ClientInfoForm;
