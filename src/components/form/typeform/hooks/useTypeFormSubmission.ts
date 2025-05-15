
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FormData } from "../types";

interface UseFormSubmissionProps {
  onShowCalendar?: () => void;
  getValues: () => FormData;
}

export const useFormSubmission = ({ onShowCalendar, getValues }: UseFormSubmissionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form submission
  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Final webhook submission with complete data
      const webhookEndpoint = "https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/form-webhook";
      
      console.log("Sending complete form data to webhook:", data);
      
      // Using fetch with no-cors mode to avoid CORS issues
      await fetch(webhookEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          data: data, // Send data with 'data' key as specified
          isComplete: true,
          timestamp: new Date().toISOString()
        }),
      });
      
      // Show success toast
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Preparando calendário...",
        duration: 3000,
      });
      
      // Show calendar after a short delay
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

  return {
    isSubmitting,
    submitForm
  };
};
