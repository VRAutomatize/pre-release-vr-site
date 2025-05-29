
import React from "react";
import { useCondensedFormLogic } from "./typeform/hooks/useCondensedFormLogic";
import CondensedFormView from "./typeform/CondensedFormView";
import CalendarIframeView from "./typeform/CalendarIframeView";
import { useTypeformModal } from "@/hooks/useTypeformModal";

interface CondensedTypeformModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCalendar?: boolean;
  onShowCalendar?: () => void;
}

export function CondensedTypeformModal({ 
  isOpen, 
  onClose, 
  showCalendar = false,
  onShowCalendar
}: CondensedTypeformModalProps) {
  const { 
    calendarViewMethod 
  } = useTypeformModal();
  
  const {
    control,
    errors,
    currentStep,
    totalSteps,
    progress,
    isSubmitting,
    showExpressFlow,
    handleNextStep,
    handlePrevStep,
    handleExpressFlow,
    setValue,
    watch,
    getValues,
  } = useCondensedFormLogic({
    isOpen,
    onClose,
    onShowCalendar,
    showCalendar
  });

  // Show calendar if requested
  if (showCalendar) {
    return (
      <CalendarIframeView 
        isOpen={isOpen} 
        onClose={onClose}
      />
    );
  }

  // Show condensed form
  return (
    <CondensedFormView 
      isOpen={isOpen}
      onClose={onClose}
      isSubmitting={isSubmitting}
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      showExpressFlow={showExpressFlow}
      onNextStep={handleNextStep}
      onPrevStep={handlePrevStep}
      onExpressFlow={handleExpressFlow}
      control={control}
      errors={errors}
    />
  );
}
