
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCNPJ } from "@/utils/paymentUtils";
import ClientRegistrationForm, { ClientFormData } from "../ClientRegistrationForm";

interface RegisterClientStepProps {
  currentCNPJ: string;
  onRegister: (data: ClientFormData) => void;
  onBack: () => void;
  loading: boolean;
}

const RegisterClientStep: React.FC<RegisterClientStepProps> = ({ 
  currentCNPJ, 
  onRegister, 
  onBack, 
  loading 
}) => {
  return (
    <Card className="glass-blur border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Cadastrar Novo Cliente</CardTitle>
        <CardDescription>
          CNPJ {formatCNPJ(currentCNPJ)} não encontrado. Preencha os dados para cadastrar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ClientRegistrationForm
          cnpj={currentCNPJ}
          onRegister={onRegister}
          onBack={onBack}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default RegisterClientStep;
