
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useFormSubmission } from "./useTypeFormSubmission";
import { useFormTracking } from "@/hooks/useFormTracking";

// Condensed form schema - only essential fields
const condensedFormSchema = z.object({
  fullName: z.string().min(2, "Nome é obrigatório"),
  phone: z.string().min(10, "WhatsApp é obrigatório"),
  monthlyRevenue: z.enum([
    "0-50000", 
    "50001-100000", 
    "100001-300000", 
    "300001-500000", 
    "500001-1000000", 
    "1000001-5000000", 
    "5000000+"
  ]),
  industry: z.string().min(3, "Ramo de atuação é obrigatório"),
  email: z.string().email("Email inválido").optional(),
  paidTraffic: z.boolean().optional(),
  trafficInvestment: z.enum(["0-1000", "1001-3000", "3001-5000", "5001-10000", "10000+"]).optional(),
});

type CondensedFormData = z.infer<typeof condensedFormSchema>;

const defaultValues: CondensedFormData = {
  fullName: "",
  phone: "",
  monthlyRevenue: "0-50000",
  industry: "",
  email: "",
  paidTraffic: false,
  trafficInvestment: undefined,
};

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
  const { trackFormStart, trackFormStep, trackFormComplete } = useFormTracking();

  const form = useForm<CondensedFormData>({
    resolver: zodResolver(condensedFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { control, handleSubmit, watch, trigger, getValues, setValue, formState: { errors }, reset } = form;

  const [currentStep, setCurrentStep] = useState(0);
  const [showExpressFlow, setShowExpressFlow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only 4 essential steps
  const totalSteps = 4;
  const stepNames = ["fullName", "phone", "monthlyRevenue", "industry"];

  const { submitForm } = useFormSubmission({ 
    onShowCalendar,
    getValues: () => {
      const data = getValues();
      // Convert to original format for compatibility
      return {
        ...data,
        paidTraffic: data.paidTraffic || false,
        instagram: "",
        trafficInvestment: data.trafficInvestment,
      };
    }
  });

  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

  const handleNextStep = async () => {
    const currentField = stepNames[currentStep];
    
    // Skip validation for optional fields or proceed directly
    if (currentStep === 1) {
      // After phone step, show express flow option
      setShowExpressFlow(true);
    }
    
    const isValid = await trigger(currentField as any);
    
    if (isValid) {
      trackFormStep(currentStep + 1, totalSteps, currentField);
      
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsSubmitting(true);
        await submitForm(getValues());
        trackFormComplete(totalSteps, Date.now());
      }
    }
  };

  const handleExpressFlow = async () => {
    const { fullName, phone } = getValues();
    if (fullName && phone) {
      // Send minimal data and redirect to WhatsApp
      const whatsappMessage = `Olá! Sou ${fullName}. Quero uma análise gratuita de economia com Funcionários Digitais. Meu WhatsApp: ${phone}`;
      const whatsappUrl = `https://wa.me/554792666367?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setShowExpressFlow(false);
    }
  };

  // Track form start
  useEffect(() => {
    if (isOpen) {
      trackFormStart();
    }
  }, [isOpen, trackFormStart]);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setShowExpressFlow(false);
      setIsSubmitting(false);
      reset(defaultValues);
    }
  }, [isOpen, reset]);

  return {
    control,
    errors,
    currentStep,
    totalSteps,
    progress,
    isSubmitting,
    showExpressFlow,
    handleNextStep,
    handlePrevStep,
    handleExpressFlow,
    setValue,
    watch,
    getValues,
  };
};
