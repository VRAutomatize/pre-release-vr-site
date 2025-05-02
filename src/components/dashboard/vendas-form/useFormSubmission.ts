
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { FormData } from "./types";

interface UseFormSubmissionProps {
  onClose: () => void;
  getSellerTag: () => string;
  form: UseFormReturn<FormData>;
}

export function useFormSubmission({ onClose, getSellerTag, form }: UseFormSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Get seller tag from the authenticated user's email
      const sellerTag = getSellerTag();
      
      // Prepare data for webhook
      const webhookData = {
        ...data,
        seller_tag: sellerTag,
        venda_direta: true
      };
      
      console.log('Submitting form with data:', webhookData);
      
      // Send data to webhook
      const response = await fetch("https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/gerar-venda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Show success message
      toast({
        title: "Venda registrada com sucesso!",
        description: "Os dados foram enviados para processamento.",
      });
      
      // Close the form
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      setFormError("Falha ao enviar o formulário. Por favor, tente novamente.");
      
      toast({
        title: "Erro ao registrar venda",
        description: "Não foi possível processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    formError,
    handleSubmit: form.handleSubmit(handleSubmit),
    setFormError
  };
}
