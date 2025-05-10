
import React, { useEffect } from "react";
import { useTypeformLogic } from "./typeform/useTypeformLogic";
import { useCalendarEmbed } from "./typeform/useCalendarEmbed";
import FormView from "./typeform/FormView";
import { useTypeformModal } from "@/hooks/useTypeformModal";
import SimpleCalendarEmbed from "./typeform/SimpleCalendarEmbed";
import CalendarIframeView from "./typeform/CalendarIframeView";

interface TypeformModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendarLink?: string;
  webhookUrl?: string;
  showCalendar?: boolean;
  onShowCalendar?: () => void;
}

export function TypeformModal({ 
  isOpen, 
  onClose, 
  webhookUrl = "",
  showCalendar = false,
  onShowCalendar 
}: TypeformModalProps) {
  // Access the useTypeformModal hook
  const { 
    calendarViewMethod, 
    switchCalendarMethod
  } = useTypeformModal();
  
  const {
    control,
    errors,
    currentStep,
    setCurrentStep,
    totalSteps,
    isSubmitting,
    progress,
    paidTraffic,
    handleNextStep,
    setValue
  } = useTypeformLogic({
    isOpen,
    onClose,
    webhookUrl,
    onShowCalendar,
    showCalendar
  });

  // If showing calendar view, use the simplified approach with fallbacks
  if (showCalendar) {
    // Start with the simple view that uses direct JavaScript embedding
    return (
      <SimpleCalendarEmbed 
        isOpen={isOpen} 
        onClose={onClose}
        onFallback={() => switchCalendarMethod('iframe')}
      />
    );
  }

  // Form view
  return (
    <FormView 
      isOpen={isOpen}
      onClose={onClose}
      isSubmitting={isSubmitting}
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      handleNextStep={handleNextStep}
      paidTraffic={paidTraffic}
      setCurrentStep={setCurrentStep}
      control={control}
      errors={errors}
      setValue={setValue}
    />
  );
}
