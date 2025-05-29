
import React from "react";
import { useOptimizedTypeformLogic } from "./typeform/OptimizedTypeformLogic";
import OptimizedFormView from "./typeform/OptimizedFormView";
import DynamicCalendarEmbed from "./typeform/DynamicCalendarEmbed";
import { useTypeformModal } from "@/hooks/useTypeformModal";
import SimpleCalendarEmbed from "./typeform/SimpleCalendarEmbed";
import CalendarIframeView from "./typeform/CalendarIframeView";

interface OptimizedTypeformModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl?: string;
  showCalendar?: boolean;
  onShowCalendar?: () => void;
  calendarLink?: string;
}

export function OptimizedTypeformModal({ 
  isOpen, 
  onClose, 
  webhookUrl = "",
  showCalendar = false,
  onShowCalendar,
  calendarLink = "vrautomatize/call"
}: OptimizedTypeformModalProps) {
  // Access the useTypeformModal hook for calendar view methods
  const { 
    calendarViewMethod, 
    switchCalendarMethod
  } = useTypeformModal();
  
  // Optimized form handling logic
  const {
    control,
    errors,
    currentStep,
    totalSteps,
    isSubmitting,
    isProcessing,
    progress,
    paidTraffic,
    handleNextStep,
    handlePrevStep,
    calendarLoaded,
    setCalendarLoaded,
    calendarError,
    setValue
  } = useOptimizedTypeformLogic({
    isOpen,
    onClose,
    onShowCalendar,
    showCalendar
  });

  // Calendar view selection with dynamic calendar as default
  if (showCalendar) {
    switch (calendarViewMethod) {
      case 'simple':
        return (
          <DynamicCalendarEmbed 
            isOpen={isOpen} 
            onClose={onClose}
            calLink={calendarLink}
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
          <DynamicCalendarEmbed 
            isOpen={isOpen} 
            onClose={onClose}
            calLink={calendarLink}
            onFallback={() => switchCalendarMethod('simple')}
          />
        );
    }
  }

  // Optimized form view
  return (
    <OptimizedFormView 
      isOpen={isOpen}
      onClose={onClose}
      isSubmitting={isSubmitting}
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNextStep={handleNextStep}
      onPrevStep={handlePrevStep}
      paidTraffic={paidTraffic}
      control={control}
      errors={errors}
      setValue={setValue}
      isProcessing={isProcessing}
    />
  );
}
