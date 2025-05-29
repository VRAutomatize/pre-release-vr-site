
import { useState, useCallback } from 'react';
import { useFormTracking } from '@/hooks/useFormTracking';

interface UseFormStepsProps {
  totalSteps: number;
  onComplete: () => Promise<void>;
  validateStep: (step: number, paidTraffic: boolean) => Promise<boolean>;
  paidTraffic: boolean;
}

export const useFormSteps = ({ 
  totalSteps, 
  onComplete, 
  validateStep, 
  paidTraffic 
}: UseFormStepsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { trackFormStep, trackFormAbandon } = useFormTracking();

  const nextStep = useCallback(async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Validate current step
      const isValid = await validateStep(currentStep, paidTraffic);
      
      if (!isValid) {
        setIsProcessing(false);
        return;
      }

      // Track step completion
      trackFormStep(currentStep + 1, totalSteps, `step_${currentStep}`);

      // Move to next step or complete
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        await onComplete();
      }
    } catch (error) {
      console.error('Error in nextStep:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [currentStep, totalSteps, isProcessing, validateStep, paidTraffic, onComplete, trackFormStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0 && !isProcessing) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep, isProcessing]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps && !isProcessing) {
      setCurrentStep(step);
    }
  }, [totalSteps, isProcessing]);

  return {
    currentStep,
    isProcessing,
    nextStep,
    prevStep,
    goToStep,
    setCurrentStep
  };
};
