
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData, FormStep } from "./types";

export function useFormNavigation(form: UseFormReturn<FormData>) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const { trigger } = form;
  
  // Handle step transitions with validation
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    // Define which fields to validate based on current step
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["nome_empresa", "area_atuacao"];
        break;
      case 2:
        fieldsToValidate = ["nome_cliente", "telefone_cliente", "email_cliente"];
        break;
      default:
        break;
    }
    
    // Validate fields before proceeding
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => (prev < 3 ? (prev + 1) as FormStep : prev));
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => (prev > 1 ? (prev - 1) as FormStep : prev));
  };
  
  return {
    currentStep,
    handleNextStep,
    handlePrevStep
  };
}
