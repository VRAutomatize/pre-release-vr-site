
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext, useWatch } from 'react-hook-form';
import { Product } from '@/types/payment';
import { isValueInvalid } from '@/utils/paymentUtils';
import { CreditCard } from 'lucide-react';

interface PaymentMethodFormProps {
  products: Product[];
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  products
}) => {
  const form = useFormContext();
  const paymentMethod = useWatch({
    control: form.control,
    name: "paymentMethod",
  });
  
  return (
    <>
      <FormField 
        control={form.control} 
        name="productName" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Produto</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-gold/20">
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {products.map(product => (
                  <SelectItem key={product.id} value={product.name}>
                    {product.name}
                    {product.price ? ` - R$ ${product.price.toFixed(2)}` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} 
      />
      
      <FormField 
        control={form.control} 
        name="paymentMethod" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Método de Pagamento</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-gold/20">
                  <SelectValue placeholder="Selecione o método de pagamento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pix">Pix</SelectItem>
                <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
            {paymentMethod === "credit_card" && (
              <FormDescription className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CreditCard className="h-4 w-4" />
                Pagamento em até 10x sem juros no cartão
              </FormDescription>
            )}
          </FormItem>
        )} 
      />
      
      <FormField 
        control={form.control} 
        name="value" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valor</FormLabel>
            <FormControl>
              <Input 
                placeholder="Valor" 
                type="number" 
                variant={isValueInvalid(field.value) ? "error" : "default"} 
                value={field.value || ""} 
                onChange={e => field.onChange(Number(e.target.value))} 
                inputMode="numeric" 
                className="text-left" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />
    </>
  );
};

export default PaymentMethodForm;
