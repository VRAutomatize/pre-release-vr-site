
import React from "react";
import { useTypeformLogic } from "./typeform/useTypeformLogic";
import { useCalendarEmbed } from "./typeform/useCalendarEmbed";
import FormView from "./typeform/FormView";
import CalendarView from "./typeform/CalendarView";

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
    setValue
  } = useTypeformLogic({
    isOpen,
    onClose,
    webhookUrl,
    onShowCalendar,
    showCalendar
  });

  // Setup calendar embedding
  useCalendarEmbed({
    showCalendar,
    isOpen,
    setCalendarLoaded
  });

  // If showing calendar view
  if (showCalendar) {
    return (
      <CalendarView 
        isOpen={isOpen} 
        onClose={onClose} 
        calendarLoaded={calendarLoaded} 
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
