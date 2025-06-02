
import React from 'react';
import { Step } from '@/types/payment';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ProgressStepsProps {
  currentStep: Step;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`max-w-2xl mx-auto ${isMobile ? 'mb-4' : 'mb-6'}`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex items-center justify-center transition-colors duration-300 ${
            currentStep === Step.CheckCNPJ ? "bg-gold text-black" : "bg-gold/20 text-gold"
          }`}>
            <span className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>1</span>
          </div>
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} mt-1 text-gray-200 font-medium`}>CNPJ</span>
        </div>
        
        <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${currentStep > Step.CheckCNPJ ? "bg-gold" : "bg-gold/20"}`}></div>
        
        <div className="flex flex-col items-center">
          <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex items-center justify-center transition-colors duration-300 ${
            currentStep === Step.RegisterClient ? "bg-gold text-black" : "bg-gold/20 text-gold"
          }`}>
            <span className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>2</span>
          </div>
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} mt-1 text-gray-200 font-medium`}>Cliente</span>
        </div>
        
        <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${currentStep > Step.RegisterClient ? "bg-gold" : "bg-gold/20"}`}></div>
        
        <div className="flex flex-col items-center">
          <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex items-center justify-center transition-colors duration-300 ${
            currentStep === Step.CreatePayment ? "bg-gold text-black" : "bg-gold/20 text-gold"
          }`}>
            <span className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>3</span>
          </div>
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} mt-1 text-gray-200 font-medium`}>Pagamento</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
