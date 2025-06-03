
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientFormData } from "../ClientRegistrationForm";

interface AddressFieldsProps {
  form: UseFormReturn<ClientFormData>;
  autoFilledFields: Record<keyof ClientFormData, boolean>;
  handleCEPLookup: (cep: string) => void;
  addressLoading: boolean;
}

const AddressForm: React.FC<AddressFieldsProps> = ({
  form,
  autoFilledFields,
  handleCEPLookup,
  addressLoading
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <Input 
                placeholder="00000-000"
                value={field.value ? field.value.replace(/(\d{5})(\d{3})/, "$1-$2") : ""}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  field.onChange(rawValue);
                  
                  // Trigger CEP lookup when 8 digits are entered
                  if (rawValue.length === 8) {
                    handleCEPLookup(rawValue);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
            {addressLoading && <p className="text-xs text-muted-foreground">Buscando endereço...</p>}
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Endereço</FormLabel>
            <FormControl>
              <div className={`relative ${autoFilledFields['address'] ? 'after:absolute after:inset-0 after:rounded-md after:ring-2 after:ring-green-500/50 after:shadow-[0_0_10px_rgba(34,197,94,0.5)] after:animate-pulse after:pointer-events-none' : ''}`}>
                <Input placeholder="Av. Paulista" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número</FormLabel>
            <FormControl>
              <Input placeholder="123" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="complement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Complemento (opcional)</FormLabel>
            <FormControl>
              <div className={`relative ${autoFilledFields['complement'] ? 'after:absolute after:inset-0 after:rounded-md after:ring-2 after:ring-green-500/50 after:shadow-[0_0_10px_rgba(34,197,94,0.5)] after:animate-pulse after:pointer-events-none' : ''}`}>
                <Input placeholder="Sala 123" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bairro</FormLabel>
            <FormControl>
              <div className={`relative ${autoFilledFields['district'] ? 'after:absolute after:inset-0 after:rounded-md after:ring-2 after:ring-green-500/50 after:shadow-[0_0_10px_rgba(34,197,94,0.5)] after:animate-pulse after:pointer-events-none' : ''}`}>
                <Input placeholder="Centro" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <div className={`relative ${autoFilledFields['city'] ? 'after:absolute after:inset-0 after:rounded-md after:ring-2 after:ring-green-500/50 after:shadow-[0_0_10px_rgba(34,197,94,0.5)] after:animate-pulse after:pointer-events-none' : ''}`}>
                <Input placeholder="São Paulo" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <div className={`relative ${autoFilledFields['state'] ? 'after:absolute after:inset-0 after:rounded-md after:ring-2 after:ring-green-500/50 after:shadow-[0_0_10px_rgba(34,197,94,0.5)] after:animate-pulse after:pointer-events-none' : ''}`}>
                <Input placeholder="SP" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AddressForm;
