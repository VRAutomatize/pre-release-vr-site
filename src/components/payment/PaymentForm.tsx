
import React from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { parseCurrencyToNumber } from "@/utils/paymentUtils";
import { Product } from "@/types/payment";
import FormActions from "./forms/FormActions";
import PaymentMethodForm from "./forms/PaymentMethodForm";

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
  const methods = useForm<z.infer<typeof paymentSchema>>({
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
      methods.setValue("installments", null);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onCreatePayment)} className="space-y-6">
          <PaymentMethodForm 
            products={products}
            onPaymentMethodChange={onPaymentMethodChange}
          />
          
          <FormActions 
            onBack={onBack} 
            loading={loading}
            backLabel="Voltar"
            submitLabel="Gerar Link de Pagamento"
          />
        </form>
      </Form>
    </FormProvider>
  );
};

export default PaymentForm;
