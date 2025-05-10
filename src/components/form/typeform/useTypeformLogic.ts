
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { formSchema, FormData, defaultValues } from "./types";

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
  webhookUrl,
  onShowCalendar,
  showCalendar = false,
}: UseTypeformLogicProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressData, setProgressData] = useState<Partial<FormData>>({});
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  
  const { control, handleSubmit, watch, trigger, getValues, setValue, formState: { errors, isValid }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  
  const paidTraffic = watch("paidTraffic");
  
  // Total number of steps
  const totalSteps = paidTraffic ? 8 : 7;
  
  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      reset(defaultValues);
      setCalendarLoaded(false);
    }
  }, [isOpen, reset]);

  // Handle key press for form navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Enter' && !isSubmitting && !showCalendar) {
        e.preventDefault();
        handleNextStep();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, currentStep, showCalendar]);

  // Function to send partial form data to webhook
  const sendPartialData = useCallback(async () => {
    if (!webhookUrl) return;
    
    const currentValues = getValues();
    const dataToSend = { ...progressData, ...currentValues };
    setProgressData(dataToSend);
    
    try {
      console.log("Sending partial data to webhook:", dataToSend);
      
      // Using fetch with no-cors mode to avoid CORS issues with webhook
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...dataToSend,
          step: currentStep,
          timestamp: new Date().toISOString(),
          isPartial: true
        }),
      });
    } catch (error) {
      console.error("Failed to send partial data:", error);
      // Don't show error to user for partial data sends
    }
  }, [webhookUrl, getValues, progressData, currentStep]);
  
  // Handle next step click
  const handleNextStep = useCallback(async () => {
    // Validate current field before proceeding
    const fieldsToValidate: (keyof FormData)[] = [
      "fullName", 
      "phone", 
      "email", 
      "instagram", 
      "monthlyRevenue", 
      "paidTraffic",
      paidTraffic ? "trafficInvestment" : undefined, 
      "industry"
    ].filter(Boolean) as (keyof FormData)[];
    
    const currentField = fieldsToValidate[currentStep];
    const isValid = await trigger(currentField);
    
    if (isValid) {
      // Send partial data to webhook
      await sendPartialData();
      
      // Move to next step or submit
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        await onSubmitForm(getValues());
      }
    }
  }, [currentStep, totalSteps, sendPartialData, trigger, getValues, paidTraffic]);
  
  // Handle form submission
  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Final webhook submission with complete data
      if (webhookUrl) {
        console.log("Sending complete form data to webhook:", data);
        
        // Using fetch with no-cors mode to avoid CORS issues
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify({
            ...data,
            isComplete: true,
            timestamp: new Date().toISOString()
          }),
        });
      }
      
      // Show success toast with animation hint
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Carregando calendário de agendamento...",
        duration: 3000,
      });
      
      // Show embedded calendar after a short delay for better transition
      setTimeout(() => {
        if (onShowCalendar) {
          onShowCalendar();
        }
      }, 500);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Progress calculation
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

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
  };
};
