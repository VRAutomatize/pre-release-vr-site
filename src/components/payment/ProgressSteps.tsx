
import React from 'react';
import { Step } from '@/types/payment';

interface ProgressStepsProps {
  currentStep: Step;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentStep === Step.CheckCNPJ ? "bg-gold text-black" : "bg-gold/20 text-gold"
          }`}>
            1
          </div>
          <span className="text-xs mt-1">CNPJ</span>
        </div>
        
        <div className={`flex-1 h-1 mx-2 ${currentStep > Step.CheckCNPJ ? "bg-gold" : "bg-gold/20"}`}></div>
        
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentStep === Step.RegisterClient ? "bg-gold text-black" : "bg-gold/20 text-gold"
          }`}>
            2
          </div>
          <span className="text-xs mt-1">Cliente</span>
        </div>
        
        <div className={`flex-1 h-1 mx-2 ${currentStep > Step.RegisterClient ? "bg-gold" : "bg-gold/20"}`}></div>
        
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentStep === Step.CreatePayment ? "bg-gold text-black" : "bg-gold/20 text-gold"
          }`}>
            3
          </div>
          <span className="text-xs mt-1">Pagamento</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
