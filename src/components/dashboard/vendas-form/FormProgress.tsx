
import React from "react";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="mb-4">
      <div className="w-full bg-[rgba(255,215,0,0.1)] h-1 rounded-full mb-2">
        <div 
          className="bg-gold h-1 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gold/50">
        <span className={currentStep >= 1 ? "text-gold" : ""}>Empresa</span>
        <span className={currentStep >= 2 ? "text-gold" : ""}>Cliente</span>
        <span className={currentStep >= 3 ? "text-gold" : ""}>Serviços</span>
      </div>
    </div>
  );
}
