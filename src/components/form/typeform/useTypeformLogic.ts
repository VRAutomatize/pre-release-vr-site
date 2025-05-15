
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData, defaultValues } from "./types";
import { useEffect, useState } from "react";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { useProgressTracking } from "./hooks/useProgressTracking";
import { useCalendarState } from "./hooks/useCalendarState";
import { useFormNavigation } from "./hooks/useFormNavigation";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useCalendarErrorHandling } from "./hooks/useCalendarErrorHandling";

interface UseTypeformLogicProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl?: string;
  onShowCalendar?: () => void;
  showCalendar?: boolean;
}

export const useTypeformLogic = ({
  isOpen,
  onClose,
  onShowCalendar,
  showCalendar = false,
}: UseTypeformLogicProps) => {
  // Set up form with validation
  const { 
    control, 
    handleSubmit, 
    watch, 
    trigger, 
    getValues, 
    setValue, 
    formState: { errors, isValid }, 
    reset 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  
  // Initialize current step state
  const [currentStep, setCurrentStep] = useState(0);
  
  // Get the paid traffic value to determine total steps
  const paidTraffic = watch("paidTraffic");
  
  // Total number of steps
  const totalSteps = paidTraffic ? 8 : 7;
  
  // Progress tracking logic
  const { progressData, sendPartialData } = useProgressTracking({
    getValues,
    currentStep
  });
  
  // Form submission logic
  const { isSubmitting, submitForm } = useFormSubmission({ 
    onShowCalendar,
    getValues
  });
  
  // Calculate progress percentage
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);
  
  // Calendar state logic
  const { calendarLoaded, setCalendarLoaded, calendarError, setCalendarError } = useCalendarState();
  
  // Form navigation logic - we need to create a wrapper for handleNextStep
  const handleNextStep = async () => {
    // Validate current field before proceeding
    const fieldsToValidate: string[] = [
      "fullName", 
      "phone", 
      "email", 
      "instagram", 
      "monthlyRevenue", 
      "paidTraffic",
      paidTraffic ? "trafficInvestment" : undefined, 
      "industry"
    ].filter(Boolean) as string[];
    
    const currentField = fieldsToValidate[currentStep];
    const isValid = await trigger(currentField);
    
    if (isValid) {
      // Send partial data to webhook
      await sendPartialData();
      
      // Move to next step or submit
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        await submitForm(getValues());
      }
    }
  };
  
  // Keyboard navigation logic
  useKeyboardNavigation({
    isOpen,
    isSubmitting,
    showCalendar,
    onClose,
    handleNextStep
  });
  
  // Calendar error handling
  useCalendarErrorHandling({
    showCalendar,
    calendarLoaded,
    setCalendarLoaded,
    setCalendarError
  });
  
  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      reset(defaultValues);
      setCalendarLoaded(false);
      setCalendarError(false);
    }
  }, [isOpen, reset]);

  return {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    errors,
    isValid,
    reset,
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
    setCalendarError,
  };
};
