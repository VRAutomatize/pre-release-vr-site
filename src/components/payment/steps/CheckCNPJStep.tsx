
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CNPJCheckForm from '../CNPJCheckForm';
import { useIsMobile } from '@/hooks/useIsMobile';

interface CheckCNPJStepProps {
  onCheckCNPJ: (cnpj: string) => void;
  loading: boolean;
}

const CheckCNPJStep: React.FC<CheckCNPJStepProps> = ({ onCheckCNPJ, loading }) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="glass-blur border-gold/20">
      <CardHeader className={isMobile ? "p-4 pb-2" : ""}>
        <CardTitle className="text-gold text-lg md:text-xl">Verificar CNPJ</CardTitle>
        <CardDescription className="text-gray-200 text-sm md:text-base">
          Digite o CNPJ do cliente para iniciar o processo
        </CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? "p-4 pt-2" : ""}>
        <CNPJCheckForm 
          onCheckCNPJ={onCheckCNPJ} 
          loading={loading} 
        />
      </CardContent>
    </Card>
  );
};

export default CheckCNPJStep;
