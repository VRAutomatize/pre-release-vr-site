
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Function to handle form validation and show confirmation dialog
  const prepareSubmission = async (data: FormData) => {
    // Show confirmation dialog
    setShowConfirmation(true);
  };
  
  // Function to handle the actual form submission after confirmation
  const submitForm = async () => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Get the form data
      const data = form.getValues();
      
      // Get seller tag from the authenticated user's email
      const sellerTag = getSellerTag();
      
      // Prepare data for webhook - ensure all fields are included for both forms
      // For 'notifica_time_comercial' form, explicitly set cnpj and endereco_comercial to null if not provided
      const webhookData = {
        ...data,
        // Ensure these fields are included even if they're not in the form
        cnpj: data.cnpj || null,
        endereco_comercial: data.endereco_comercial || null,
        seller_tag: sellerTag,
        venda_direta: isDirectSale
      };
      
      console.log('Submitting form with data:', webhookData);
      
      // Send data to webhook (same endpoint for both forms)
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
      setShowConfirmation(false);
    }
  };
  
  // Close the confirmation dialog
  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  return {
    isSubmitting,
    formError,
    handleSubmit: form.handleSubmit(prepareSubmission),
    submitForm,
    showConfirmation,
    closeConfirmation,
    setFormError
  };
}
