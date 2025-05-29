
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData, defaultValues } from "./types";
import { useEffect, useMemo } from "react";
import { useFormSubmission } from "./hooks/useTypeFormSubmission";
import { useProgressTracking } from "./hooks/useProgressTracking";
import { useCalendarState } from "./hooks/useCalendarState";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useCalendarErrorHandling } from "./hooks/useCalendarErrorHandling";
import { useFormValidation } from "./hooks/useFormValidation";
import { useFormSteps } from "./hooks/useFormSteps";
import { useFormTracking } from "@/hooks/useFormTracking";

interface UseOptimizedTypeformLogicProps {
  isOpen: boolean;
  onClose: () => void;
  onShowCalendar?: () => void;
  showCalendar?: boolean;
}

export const useOptimizedTypeformLogic = ({
  isOpen,
  onClose,
  onShowCalendar,
  showCalendar = false,
}: UseOptimizedTypeformLogicProps) => {
  const { trackFormStart, trackFormAbandon } = useFormTracking();

  // Optimized form setup with better performance
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
    criteriaMode: "firstError", // Stop on first error for better performance
  });
  
  const { 
    control, 
    handleSubmit, 
    watch, 
    trigger, 
    getValues, 
    setValue, 
    formState: { errors }, 
    reset 
  } = form;
  
  // Watch only the necessary field
  const paidTraffic = watch("paidTraffic");
  
  // Memoize total steps calculation
  const totalSteps = useMemo(() => paidTraffic ? 8 : 7, [paidTraffic]);
  
  // Form validation hook
  const { validateStep } = useFormValidation({ trigger });
  
  // Progress tracking with debouncing
  const { sendPartialData } = useProgressTracking({
    getValues,
    currentStep: 0 // Will be updated by useFormSteps
  });
  
  // Form submission logic
  const { isSubmitting, submitForm } = useFormSubmission({ 
    onShowCalendar,
    getValues
  });
  
  // Complete form submission handler
  const handleFormComplete = async () => {
    await sendPartialData();
    await submitForm(getValues());
  };
  
  // Form steps management
  const {
    currentStep,
    isProcessing,
    nextStep,
    prevStep,
    setCurrentStep
  } = useFormSteps({
    totalSteps,
    onComplete: handleFormComplete,
    validateStep,
    paidTraffic
  });
  
  // Progress calculation
  const progress = useMemo(() => 
    Math.round((currentStep / (totalSteps - 1)) * 100), 
    [currentStep, totalSteps]
  );
  
  // Calendar state logic
  const { calendarLoaded, setCalendarLoaded, calendarError, setCalendarError } = useCalendarState();
  
  // Keyboard navigation
  useKeyboardNavigation({
    isOpen,
    isSubmitting: isSubmitting || isProcessing,
    showCalendar,
    onClose,
    handleNextStep: nextStep
  });
  
  // Calendar error handling
  useCalendarErrorHandling({
    showCalendar,
    calendarLoaded,
    setCalendarLoaded,
    setCalendarError
  });
  
  // Track form start when opened
  useEffect(() => {
    if (isOpen) {
      trackFormStart();
    }
  }, [isOpen, trackFormStart]);
  
  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      reset(defaultValues);
      setCalendarLoaded(false);
      setCalendarError(false);
    }
  }, [isOpen, reset, setCurrentStep, setCalendarLoaded, setCalendarError]);

  // Handle form abandonment
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isOpen && currentStep > 0) {
        trackFormAbandon(currentStep, totalSteps, 'page_unload');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isOpen, currentStep, totalSteps, trackFormAbandon]);

  return {
    // Form state
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    errors,
    reset,
    
    // Step management
    currentStep,
    totalSteps,
    progress,
    paidTraffic,
    
    // Actions
    handleNextStep: nextStep,
    handlePrevStep: prevStep,
    
    // Loading states
    isSubmitting,
    isProcessing,
    
    // Calendar state
    calendarLoaded,
    setCalendarLoaded,
    calendarError,
    setCalendarError,
  };
};
