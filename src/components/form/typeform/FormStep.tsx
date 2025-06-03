
import React from "react";
import {
  NameStep,
  PhoneStep,
  EmailStep,
  InstagramStep,
  MonthlyRevenueStep,
  PaidTrafficStep,
  TrafficInvestmentStep,
  IndustryStep
} from "./steps";

interface FormStepProps {
  currentStep: number;
  control: any;
  errors: any;
  paidTraffic: boolean;
  setValue: (name: any, value: any) => void;
  formData: any;
  updateFormData: (field: string, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
}

const FormStep: React.FC<FormStepProps> = ({ 
  currentStep, 
  control, 
  errors,
  paidTraffic,
  setValue,
  formData,
  updateFormData,
  onNext,
  onPrev,
  isLastStep
}) => {
  // Render the appropriate step content based on the current step
  switch (currentStep) {
    case 0: // Name
      return (
        <NameStep
          value={formData.fullName || ''}
          onChange={(value) => updateFormData('fullName', value)}
          onNext={onNext}
        />
      );
    
    case 1: // Phone
      return (
        <PhoneStep
          value={formData.phone || ''}
          onChange={(value) => updateFormData('phone', value)}
          onNext={onNext}
          onPrev={onPrev}
        />
      );
    
    case 2: // Email
      return (
        <EmailStep
          value={formData.email || ''}
          onChange={(value) => updateFormData('email', value)}
          onNext={onNext}
          onPrev={onPrev}
        />
      );
    
    case 3: // Instagram
      return (
        <InstagramStep
          value={formData.instagram || ''}
          onChange={(value) => updateFormData('instagram', value)}
          onNext={onNext}
          onPrev={onPrev}
          isLastStep={false}
        />
      );
    
    case 4: // Monthly Revenue
      return <MonthlyRevenueStep control={control} />;
    
    case 5: // Paid Traffic
      return <PaidTrafficStep control={control} />;
    
    case 6: // Traffic Investment (conditional) or Industry
      if (paidTraffic) {
        return <TrafficInvestmentStep control={control} />;
      } 
      // If not using paid traffic, this is the industry step
      return <IndustryStep control={control} errors={errors} />;
    
    case 7: // Industry (only if paid traffic is true)
      return <IndustryStep control={control} errors={errors} />;
    
    default:
      return null;
  }
};

export default FormStep;
