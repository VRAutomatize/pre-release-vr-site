
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCNPJ } from "@/utils/paymentUtils";
import ClientRegistrationForm, { ClientFormData } from "../ClientRegistrationForm";
import { useIsMobile } from '@/hooks/useIsMobile';

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
  const isMobile = useIsMobile();
  
  return (
    <Card className="glass-blur border-gold/20">
      <CardHeader className={isMobile ? "p-4 pb-2" : ""}>
        <CardTitle className="text-gold text-lg md:text-xl">Cadastrar Novo Cliente</CardTitle>
        <CardDescription className="text-gray-200 text-sm md:text-base">
          CNPJ {formatCNPJ(currentCNPJ)} não encontrado. Preencha os dados para cadastrar.
        </CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? "p-4 pt-2" : ""}>
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
