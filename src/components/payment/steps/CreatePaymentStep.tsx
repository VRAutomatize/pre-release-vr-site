
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentForm from '../PaymentForm';
import { Client, Product } from '@/types/payment';

interface CreatePaymentStepProps {
  client: Client;
  products: Product[];
  onCreatePayment: (data: any) => void;
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
  return (
    <Card className="glass-blur border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Gerar Link de Pagamento</CardTitle>
        <CardDescription>
          Selecione as informações para criar o link de pagamento
        </CardDescription>
      </CardHeader>
      <CardContent>
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
