
import React from 'react';
import PaymentResultDisplay from '../PaymentResultDisplay';
import { PaymentResult } from '@/types/payment';

interface PaymentResultStepProps {
  result: PaymentResult;
  onBack: () => void;
}

const PaymentResultStep: React.FC<PaymentResultStepProps> = ({ 
  result, 
  onBack
}) => {
  return (
    <PaymentResultDisplay 
      result={result} 
      onBack={onBack} 
    />
  );
};

export default PaymentResultStep;
