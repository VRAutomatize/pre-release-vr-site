
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { formatCurrency, parseCurrencyToNumber, isValueInvalid } from "@/utils/paymentUtils";
import { Product } from "@/types/payment";

// Payment Schema
const paymentSchema = z.object({
  clientId: z.string(),
  productId: z.string().min(1, "Selecione um produto"),
  paymentMethod: z.enum(["pix", "credit_card"], {
    required_error: "Selecione um método de pagamento",
  }),
  value: z.coerce.number().min(100, "Valor mínimo deve ser R$ 100,00").max(50000, "Valor máximo deve ser R$ 50.000,00"),
  installments: z.coerce
    .number()
    .min(1, "Número de parcelas inválido")
    .optional()
    .nullable()
});

interface PaymentFormProps {
  clientId: string;
  products: Product[];
  onCreatePayment: (data: z.infer<typeof paymentSchema>) => void;
  onBack: () => void;
  loading: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientId, products, onCreatePayment, onBack, loading }) => {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      clientId: clientId,
      productId: "",
      paymentMethod: "pix",
      value: 0,
      installments: null,
    },
  });

  // Handle payment method change
  const onPaymentMethodChange = (value: string) => {
    if (value === "pix") {
      form.setValue("installments", null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreatePayment)} className="space-y-6">
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
                  onChange={(e) => {
                    // Parse input value back to number
                    const numericValue = parseCurrencyToNumber(e.target.value);
                    field.onChange(numericValue);
                  }}
                  className="text-right"
                />
              </FormControl>
              <FormMessage />
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
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
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando Link...</>
            ) : (
              "Gerar Link de Pagamento"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentForm;
