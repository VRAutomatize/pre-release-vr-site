
import React from "react";
import { useTypeformLogic } from "./typeform/useTypeformLogic";
import FormView from "./typeform/FormView";
import CalendarView from "./typeform/CalendarView";
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
  // Access the useTypeformModal hook for calendar view methods
  const { 
    calendarViewMethod, 
    switchCalendarMethod
  } = useTypeformModal();
  
  // Form handling logic
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
    calendarLoaded,
    setCalendarLoaded,
    calendarError,
    setValue
  } = useTypeformLogic({
    isOpen,
    onClose,
    webhookUrl,
    onShowCalendar,
    showCalendar
  });

  // If showing calendar view, select the appropriate method
  if (showCalendar) {
    switch (calendarViewMethod) {
      case 'simple':
        return (
          <SimpleCalendarEmbed 
            isOpen={isOpen} 
            onClose={onClose}
            onFallback={() => switchCalendarMethod('iframe')}
          />
        );
      
      case 'iframe':
        return (
          <CalendarIframeView 
            isOpen={isOpen} 
            onClose={onClose}
          />
        );
      
      case 'default':
      default:
        return (
          <CalendarView 
            isOpen={isOpen} 
            onClose={onClose} 
            calendarLoaded={calendarLoaded}
            calendarError={calendarError}
            onSwitchToFallback={() => switchCalendarMethod('simple')}
          />
        );
    }
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
