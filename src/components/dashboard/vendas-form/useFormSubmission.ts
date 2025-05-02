
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { FormData } from "./types";

interface UseFormSubmissionProps {
  onClose: () => void;
  getSellerTag: () => string;
  form: UseFormReturn<FormData>;
  isDirectSale: boolean;
}

export function useFormSubmission({ onClose, getSellerTag, form, isDirectSale }: UseFormSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Get seller tag from the authenticated user's email
      const sellerTag = getSellerTag();
      
      // Prepare data for webhook - use same webhook for both forms
      // Only difference is the venda_direta flag which determines if it's a direct sale or lead
      const webhookData = {
        ...data,
        seller_tag: sellerTag,
        venda_direta: isDirectSale
      };
      
      console.log('Submitting form with data:', webhookData);
      
      // Send data to webhook (same endpoint for both forms) - UPDATED URL HERE
      const response = await fetch("https://vrautomatize-n8n.snrhk1.easypanel.host/webhook/envia-relatorio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Show success message based on form type
      toast({
        title: isDirectSale 
          ? "Venda registrada com sucesso!" 
          : "Time comercial notificado com sucesso!",
        description: isDirectSale
          ? "Os dados foram enviados para processamento."
          : "O lead foi encaminhado para o time comercial.",
      });
      
      // Close the form
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      setFormError("Falha ao enviar o formulário. Por favor, tente novamente.");
      
      toast({
        title: isDirectSale 
          ? "Erro ao registrar venda" 
          : "Erro ao notificar time comercial",
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
