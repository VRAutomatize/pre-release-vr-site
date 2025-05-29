
import React from "react";
import { useOptimizedTypeformLogic } from "./typeform/OptimizedTypeformLogic";
import OptimizedFormView from "./typeform/OptimizedFormView";
import CalendarView from "./typeform/CalendarView";
import { useTypeformModal } from "@/hooks/useTypeformModal";
import SimpleCalendarEmbed from "./typeform/SimpleCalendarEmbed";
import CalendarIframeView from "./typeform/CalendarIframeView";

interface OptimizedTypeformModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl?: string;
  showCalendar?: boolean;
  onShowCalendar?: () => void;
}

export function OptimizedTypeformModal({ 
  isOpen, 
  onClose, 
  webhookUrl = "",
  showCalendar = false,
  onShowCalendar 
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

  // Calendar view selection
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
