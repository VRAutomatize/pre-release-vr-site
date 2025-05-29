
import { useCallback } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import { FormData } from '../types';

interface UseFormValidationProps {
  trigger: UseFormTrigger<FormData>;
}

export const useFormValidation = ({ trigger }: UseFormValidationProps) => {
  const validateStep = useCallback(async (currentStep: number, paidTraffic: boolean) => {
    const fieldsToValidate: (keyof FormData)[] = [];
    
    switch (currentStep) {
      case 0:
        fieldsToValidate.push("fullName");
        break;
      case 1:
        fieldsToValidate.push("phone");
        break;
      case 2:
        fieldsToValidate.push("email");
        break;
      case 3:
        // Instagram is optional - no validation needed
        return true;
      case 4:
        fieldsToValidate.push("monthlyRevenue");
        break;
      case 5:
        // Paid traffic is boolean - no validation needed
        return true;
      case 6:
        if (paidTraffic) {
          fieldsToValidate.push("trafficInvestment");
        } else {
          fieldsToValidate.push("industry");
        }
        break;
      case 7:
        fieldsToValidate.push("industry");
        break;
      default:
        return true;
    }
    
    if (fieldsToValidate.length === 0) return true;
    
    try {
      const result = await trigger(fieldsToValidate);
      console.log(`Validation for step ${currentStep}, fields:`, fieldsToValidate, 'result:', result);
      return result;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  }, [trigger]);

  return { validateStep };
};
