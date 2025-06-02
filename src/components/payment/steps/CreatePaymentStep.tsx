
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentForm, { PaymentFormData } from '../PaymentForm';
import { Client, Product } from '@/types/payment';
import { useIsMobile } from '@/hooks/useIsMobile';

interface CreatePaymentStepProps {
  client: Client;
  products: Product[];
  onCreatePayment: (data: PaymentFormData) => void;
  onBack: () => void;
  loading: boolean;
}

const CreatePaymentStep: React.FC<CreatePaymentStepProps> = ({ 
  client, 
  products, 
  onCreatePayment, 
  onBack, 
  loading 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="glass-blur border-gold/20">
      <CardHeader className={isMobile ? "p-4 pb-2" : ""}>
        <CardTitle className="text-gold text-lg md:text-xl">Gerar Link de Pagamento</CardTitle>
        <CardDescription className="text-gray-200 text-sm md:text-base">
          Selecione as informações para criar o link de pagamento
        </CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? "p-4 pt-2" : ""}>
        <PaymentForm
          clientId={client.id}
          products={products}
          onCreatePayment={onCreatePayment}
          onBack={onBack}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default CreatePaymentStep;
