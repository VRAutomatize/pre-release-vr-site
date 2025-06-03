
import React from 'react';
import { FormData } from '../types';
import { NameStep } from './NameStep';
import { EmailStep } from './EmailStep';
import { PhoneStep } from './PhoneStep';
import { InstagramStep } from './InstagramStep';

interface CondensedFormStepsProps {
  currentStep: number;
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
}

export const CondensedFormSteps: React.FC<CondensedFormStepsProps> = ({
  currentStep,
  formData,
  updateFormData,
  onNext,
  onPrev,
  isLastStep,
}) => {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <NameStep
            value={formData.name}
            onChange={(value) => updateFormData('name', value)}
            onNext={onNext}
          />
        );
      case 1:
        return (
          <EmailStep
            value={formData.email}
            onChange={(value) => updateFormData('email', value)}
            onNext={onNext}
            onPrev={onPrev}
          />
        );
      case 2:
        return (
          <PhoneStep
            value={formData.phone}
            onChange={(value) => updateFormData('phone', value)}
            onNext={onNext}
            onPrev={onPrev}
          />
        );
      case 3:
        return (
          <InstagramStep
            value={formData.instagram}
            onChange={(value) => updateFormData('instagram', value)}
            onNext={onNext}
            onPrev={onPrev}
            isLastStep={isLastStep}
          />
        );
      default:
        return null;
    }
  };

  return <div className="w-full">{renderStep()}</div>;
};
