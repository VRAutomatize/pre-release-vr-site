
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { validateCNPJ } from "@/utils/paymentUtils";

// CNPJ Validation Schema
const cnpjSchema = z.object({
  cnpj: z
    .string()
    .min(14, "CNPJ deve ter pelo menos 14 dígitos")
    .refine((val) => validateCNPJ(val), "CNPJ inválido")
});

interface CNPJCheckFormProps {
  onCheckCNPJ: (cnpj: string) => void;
  loading: boolean;
}

const CNPJCheckForm: React.FC<CNPJCheckFormProps> = ({ onCheckCNPJ, loading }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  
  const form = useForm<z.infer<typeof cnpjSchema>>({
    resolver: zodResolver(cnpjSchema),
    defaultValues: {
      cnpj: "",
    },
  });

  // Auto-check CNPJ when it reaches 14 digits
  const handleCNPJChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    
    // Limit to 14 digits
    if (value.length > 14) {
      value = value.slice(0, 14);
    }
    
    // Apply formatting mask
    let maskedValue = value;
    if (value.length > 2) maskedValue = value.slice(0, 2) + '.' + value.slice(2);
    if (value.length > 5) maskedValue = maskedValue.slice(0, 6) + '.' + value.slice(5);
    if (value.length > 8) maskedValue = maskedValue.slice(0, 10) + '/' + value.slice(8);
    if (value.length > 12) maskedValue = maskedValue.slice(0, 15) + '-' + value.slice(12);
    
    // Update form with raw value (without mask)
    form.setValue('cnpj', value);
    
    // Display formatted value in input
    e.target.value = maskedValue;
    
    // Check if CNPJ is complete but invalid
    if (value.length === 14) {
      const isValidCNPJ = validateCNPJ(value);
      setIsInvalid(!isValidCNPJ);
      
      if (isValidCNPJ) {
        onCheckCNPJ(value);
      }
    } else {
      setIsInvalid(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ do Cliente</FormLabel>
              <FormControl>
                <Input 
                  placeholder="00.000.000/0000-00" 
                  onChange={handleCNPJChange}
                  className="text-lg"
                  variant={isInvalid ? "error" : "default"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {loading && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-gold" />
          </div>
        )}
      </form>
    </Form>
  );
};

export default CNPJCheckForm;
