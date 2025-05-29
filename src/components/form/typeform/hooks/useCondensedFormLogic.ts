
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData, defaultValues } from "../types";
import { useEffect, useState } from "react";
import { useFormSubmission } from "./useTypeFormSubmission";
import { useProgressTracking } from "./useProgressTracking";
import { useCalendarState } from "./useCalendarState";
import { useKeyboardNavigation } from "./useKeyboardNavigation";
import { useCalendarErrorHandling } from "./useCalendarErrorHandling";
import { useFormTracking } from "@/hooks/useFormTracking";

interface UseCondensedFormLogicProps {
  isOpen: boolean;
  onClose: () => void;
  onShowCalendar?: () => void;
  showCalendar?: boolean;
}

export const useCondensedFormLogic = ({
  isOpen,
  onClose,
  onShowCalendar,
  showCalendar = false,
}: UseCondensedFormLogicProps) => {
  const { trackFormStart, trackFormStep, trackFormComplete, trackFormAbandon } = useFormTracking();

  // Set up form with validation
  const { 
    control, 
    handleSubmit, 
    watch, 
    trigger, 
    getValues, 
    setValue, 
    formState: { errors }, 
    reset 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  
  // Initialize current step state
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Total number of steps for condensed form (4 steps: name, phone, revenue, industry)
  const totalSteps = 4;
  
  // Progress tracking logic
  const { sendPartialData } = useProgressTracking({
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
  
  // Show express flow after phone step
  const showExpressFlow = currentStep === 1;
  
  // Express flow handler (WhatsApp direct contact)
  const handleExpressFlow = () => {
    const currentData = getValues();
    const message = `Olá! Vim do site da VR Automatize.

Nome: ${currentData.fullName}
WhatsApp: ${currentData.phone}

Gostaria de falar sobre automação empresarial.`;
    
    const whatsappUrl = `https://wa.me/5547992666367?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Track express flow
    trackFormStep(currentStep, totalSteps, 'express_whatsapp');
    onClose();
  };
  
  // Validate current step
  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = ["fullName", "phone", "monthlyRevenue", "industry"];
    const currentField = fieldsToValidate[currentStep];
    
    if (!currentField) return true;
    
    try {
      const isValid = await trigger(currentField as keyof FormData);
      return isValid;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };
  
  // Optimized form navigation logic
  const handleNextStep = async () => {
    if (isSubmitting || isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Validate current step
      const isValid = await validateCurrentStep();
      
      if (!isValid) {
        setIsProcessing(false);
        return;
      }
      
      // Track step completion
      const fieldsToValidate = ["fullName", "phone", "monthlyRevenue", "industry"];
      const currentField = fieldsToValidate[currentStep];
      trackFormStep(currentStep + 1, totalSteps, currentField);
      
      // Send partial data to webhook
      await sendPartialData();
      
      // Move to next step or submit
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Final submission
        const formData = getValues();
        console.log("Final form submission:", formData);
        trackFormComplete(totalSteps, Date.now());
        await submitForm(formData);
      }
    } catch (error) {
      console.error("Error in handleNextStep:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Previous step handler
  const handlePrevStep = () => {
    if (currentStep > 0 && !isSubmitting && !isProcessing) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Keyboard navigation logic
  useKeyboardNavigation({
    isOpen,
    isSubmitting: isSubmitting || isProcessing,
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
  }, [isOpen, reset, setCalendarLoaded, setCalendarError]);

  // Handle form abandonment
  useEffect(() => {
    return () => {
      if (isOpen && currentStep > 0) {
        trackFormAbandon(currentStep, totalSteps, 'component_unmount');
      }
    };
  }, [isOpen, currentStep, totalSteps, trackFormAbandon]);

  return {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    errors,
    reset,
    currentStep,
    setCurrentStep,
    totalSteps,
    isSubmitting,
    isProcessing,
    progress,
    showExpressFlow,
    handleNextStep,
    handlePrevStep,
    handleExpressFlow,
    calendarLoaded,
    setCalendarLoaded,
    calendarError,
    setCalendarError,
  };
};
