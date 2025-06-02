
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ClientFormData } from "../ClientRegistrationForm";
import { useIsMobile } from "@/hooks/useIsMobile";

type FormFieldName = keyof ClientFormData;

interface AddressFormProps {
  form: UseFormReturn<ClientFormData>;
  autoFilledFields: Record<FormFieldName, boolean>;
  handleCEPLookup: (cep: string) => void;
  addressLoading: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ 
  form, 
  autoFilledFields, 
  handleCEPLookup, 
  addressLoading 
}) => {
  const isMobile = useIsMobile();
  
  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    
    // Limit to 8 digits
    if (value.length > 8) {
      value = value.slice(0, 8);
    }
    
    // Apply CEP formatting (00000-000)
    let maskedValue = value;
    if (value.length > 5) {
      maskedValue = value.slice(0, 5) + '-' + value.slice(5);
    }
    
    // Update form with raw value (without mask)
    form.setValue('zipCode', value);
    
    // Display formatted value in input
    e.target.value = maskedValue;
    
    // Look up address when CEP is complete
    if (value.length === 8) {
      handleCEPLookup(value);
    }
  };

  return (
    <div className={`${isMobile ? 'space-y-4' : 'space-y-4'}`}>
      <h3 className="text-lg font-semibold text-gray-100 mb-3">Endereço</h3>
      
      <FormField
        control={form.control}
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-100 font-medium">CEP *</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  placeholder="00000-000"
                  onChange={handleCEPChange}
                  className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 ${isMobile ? 'text-base py-3' : ''}`}
                />
                {addressLoading && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gold" />
                )}
              </div>
            </FormControl>
            <FormDescription className="text-gray-300 text-sm">
              Digite o CEP para preenchimento automático
            </FormDescription>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-100 font-medium">Endereço *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Rua das Flores"
                className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 transition-colors ${
                  autoFilledFields.address ? 'ring-2 ring-emerald-500/50 border-emerald-500' : ''
                } ${isMobile ? 'text-base py-3' : ''}`}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'sm:grid-cols-2 gap-4'}`}>
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-100 font-medium">Número *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="123"
                  className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 ${isMobile ? 'text-base py-3' : ''}`}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-100 font-medium">Complemento</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Sala 456"
                  className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 transition-colors ${
                    autoFilledFields.complement ? 'ring-2 ring-emerald-500/50 border-emerald-500' : ''
                  } ${isMobile ? 'text-base py-3' : ''}`}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-100 font-medium">Bairro *</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Centro"
                className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 transition-colors ${
                  autoFilledFields.district ? 'ring-2 ring-emerald-500/50 border-emerald-500' : ''
                } ${isMobile ? 'text-base py-3' : ''}`}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'sm:grid-cols-2 gap-4'}`}>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-100 font-medium">Cidade *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="São Paulo"
                  className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 transition-colors ${
                    autoFilledFields.city ? 'ring-2 ring-emerald-500/50 border-emerald-500' : ''
                  } ${isMobile ? 'text-base py-3' : ''}`}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-100 font-medium">Estado *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="SP"
                  className={`bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-gold focus:ring-gold/20 transition-colors ${
                    autoFilledFields.state ? 'ring-2 ring-emerald-500/50 border-emerald-500' : ''
                  } ${isMobile ? 'text-base py-3' : ''}`}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressForm;
