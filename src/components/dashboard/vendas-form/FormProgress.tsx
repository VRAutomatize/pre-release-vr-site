import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const isMobile = useIsMobile();
  const progressPercentage = (currentStep / totalSteps) * 100;

  const stepLabels = [
    "Empresa",
    "Cliente", 
    isMobile ? "Finalizar" : "Informações"
  ];

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gold h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="absolute -top-1 bg-gold w-4 h-4 rounded-full border-2 border-gray-900 transition-all duration-300"
             style={{ left: `calc(${progressPercentage}% - 8px)` }} />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center space-y-2">
              <div className={`
                ${isMobile ? 'w-8 h-8' : 'w-10 h-10'} 
                rounded-full flex items-center justify-center font-semibold transition-all duration-300
                ${isActive ? 'bg-gold text-black scale-110' : 
                  isCompleted ? 'bg-gold/80 text-black' : 'bg-gray-700 text-gray-400'}
              `}>
                <span className={isMobile ? 'text-sm' : 'text-base'}>
                  {stepNumber}
                </span>
              </div>
              <span className={`
                ${isMobile ? 'text-xs' : 'text-sm'} 
                font-medium transition-colors duration-300
                ${isActive ? 'text-gold' : 
                  isCompleted ? 'text-gray-200' : 'text-gray-400'}
              `}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
