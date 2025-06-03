
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CNPJCheckForm from '../CNPJCheckForm';

interface CheckCNPJStepProps {
  onCheckCNPJ: (cnpj: string) => void;
  loading: boolean;
}

const CheckCNPJStep: React.FC<CheckCNPJStepProps> = ({ onCheckCNPJ, loading }) => {
  return (
    <Card className="glass-blur border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Verificar CNPJ</CardTitle>
        <CardDescription>
          Digite o CNPJ do cliente para iniciar o processo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CNPJCheckForm 
          onCheckCNPJ={onCheckCNPJ} 
          loading={loading} 
        />
      </CardContent>
    </Card>
  );
};

export default CheckCNPJStep;
