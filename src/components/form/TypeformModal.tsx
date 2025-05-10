
import React, { useEffect } from "react";
import { useTypeformLogic } from "./typeform/useTypeformLogic";
import { useCalendarEmbed } from "./typeform/useCalendarEmbed";
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

  // Setup calendar embedding with error handling
  const { calendarLoadFailed } = useCalendarEmbed({
    showCalendar,
    isOpen,
    setCalendarLoaded
  });

  // Handle calendar load failure by switching to fallback
  useEffect(() => {
    if (calendarLoadFailed && showCalendar && calendarViewMethod === 'default') {
      console.log("Calendar loading failed in default view, switching to simple view");
      setTimeout(() => {
        switchCalendarMethod('simple');
      }, 500);
    }
  }, [calendarLoadFailed, showCalendar, calendarViewMethod, switchCalendarMethod]);

  // If showing calendar view
  if (showCalendar) {
    // Use the appropriate calendar component based on the selected method
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
