
import React, { useEffect } from "react";
import { useTypeformLogic } from "./typeform/useTypeformLogic";
import { useCalendarEmbed } from "./typeform/useCalendarEmbed";
import FormView from "./typeform/FormView";
import CalendarView from "./typeform/CalendarView";
import { useTypeformModal } from "@/hooks/useTypeformModal";

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
  // Access the fallback mechanism
  const { switchToFallbackView } = useTypeformModal();
  
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
    if (calendarLoadFailed && showCalendar) {
      console.log("Calendar loading failed, switching to fallback iframe");
      setTimeout(() => {
        switchToFallbackView();
      }, 500);
    }
  }, [calendarLoadFailed, showCalendar, switchToFallbackView]);

  // If showing calendar view
  if (showCalendar) {
    return (
      <CalendarView 
        isOpen={isOpen} 
        onClose={onClose} 
        calendarLoaded={calendarLoaded}
        calendarError={calendarError}
        onSwitchToFallback={switchToFallbackView}
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
