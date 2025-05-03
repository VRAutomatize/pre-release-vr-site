
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from 'react-hook-form';
import { Product } from '@/types/payment';
import { formatCurrency, isValueInvalid } from '@/utils/paymentUtils';

interface PaymentMethodFormProps {
  products: Product[];
  onPaymentMethodChange: (value: string) => void;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ 
  products, 
  onPaymentMethodChange,
  handleValueChange
}) => {
  const form = useFormContext();

  // Função para garantir que apenas números sejam digitados no campo de valor
  const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permite apenas dígitos numéricos
    const value = e.target.value.replace(/\D/g, '');
    
    // Se estiver vazio, mantém vazio ou zero conforme a lógica existente
    if (!value) {
      // Cria um novo evento sintético para passar para o handleValueChange
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: ''
        }
      };
      handleValueChange(syntheticEvent);
      return;
    }
    
    // Cria um novo evento sintético com o valor filtrado
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value
      }
    };
    
    // Passa o evento com o valor filtrado para a função original
    handleValueChange(syntheticEvent);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="productId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Produto</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gold/20">
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
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
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onPaymentMethodChange(value);
              }}
              defaultValue={field.value}
            >
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
                placeholder="R$ 0,00"
                variant={isValueInvalid(field.value) ? "error" : "default"}
                value={field.value === 0 ? '' : formatCurrency(field.value)}
                onChange={handleValueInput}
                inputMode="numeric"
                className="text-right"
              />
            </FormControl>
            <FormMessage />
            <p className="text-xs text-muted-foreground">Digite apenas números (a formatação será automática)</p>
          </FormItem>
        )}
      />
      
      {form.watch("paymentMethod") === "credit_card" && (
        <FormField
          control={form.control}
          name="installments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Parcelas</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  min="1"
                  max="12"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value) || null);
                  }}
                  inputMode="numeric"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default PaymentMethodForm;
