
import React, { useEffect } from 'react';
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
  // Log the result to help with debugging
  useEffect(() => {
    console.log("Payment result received:", result);
  }, [result]);

  return (
    <PaymentResultDisplay 
      result={result} 
      onBack={onBack} 
    />
  );
};

export default PaymentResultStep;
