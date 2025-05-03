
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { formatCNPJ, formatPhone, formatCEP } from "@/utils/paymentUtils";
import { validateCNPJ } from "@/utils/paymentUtils";
import { checkCEP } from "@/services/paymentService";

// Client Registration Schema
const clientRegistrationSchema = z.object({
  cnpj: z.string(),
  companyName: z.string().min(3, "Nome da empresa é obrigatório"),
  clientName: z.string().min(3, "Nome do cliente é obrigatório"),
  phone: z.string().min(10, "Telefone inválido"),
  address: z.string().min(3, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  district: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(3, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido")
});

interface ClientRegistrationFormProps {
  cnpj: string;
  onRegister: (data: z.infer<typeof clientRegistrationSchema>) => void;
  onBack: () => void;
  loading: boolean;
}

const ClientRegistrationForm: React.FC<ClientRegistrationFormProps> = ({ cnpj, onRegister, onBack, loading }) => {
  const [addressLoading, setAddressLoading] = useState(false);
  
  const form = useForm<z.infer<typeof clientRegistrationSchema>>({
    resolver: zodResolver(clientRegistrationSchema),
    defaultValues: {
      cnpj: cnpj,
      companyName: "",
      clientName: "",
      phone: "",
      address: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  // Handle CEP lookup
  const handleCEPLookup = async (cep: string) => {
    if (cep.length !== 8) return;
    
    setAddressLoading(true);
    
    try {
      const addressInfo = await checkCEP(cep);
      
      if (addressInfo) {
        form.setValue('address', addressInfo.street || '');
        form.setValue('district', addressInfo.neighborhood || '');
        form.setValue('city', addressInfo.city || '');
        form.setValue('state', addressInfo.state || '');
      }
    } catch (error) {
      console.error("Error looking up CEP:", error);
      // No notification needed - silently fail per requirements
    } finally {
      setAddressLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Empresa SA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(11) 99999-9999"
                    value={formatPhone(field.value)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      field.onChange(rawValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="00000-000"
                    value={formatCEP(field.value)}
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
                  <Input placeholder="Av. Paulista" {...field} />
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
                  <Input placeholder="Sala 123" {...field} />
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
                  <Input placeholder="Centro" {...field} />
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
                  <Input placeholder="São Paulo" {...field} />
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
                  <Input placeholder="SP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex gap-2 justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="border-gold/20 text-gold hover:bg-gold/10"
          >
            Voltar
          </Button>
          <Button 
            type="submit" 
            className="bg-gold hover:bg-gold/80 text-black"
            disabled={loading}
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cadastrando...</>
            ) : (
              "Cadastrar Cliente"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientRegistrationForm;

