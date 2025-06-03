
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { FormData, FormStep } from "./vendas-form/types";
import { CompanyInfoStep, ClientInfoStep, ServiceOptionsStep } from "./vendas-form/FormSteps";
import { LeadInfoStep } from "./vendas-form/LeadFormSteps";
import { FormProgress } from "./vendas-form/FormProgress";
import { SellerInfo } from "./vendas-form/SellerInfo";
import { FormNavigation } from "./vendas-form/FormNavigation";
import { useFormSubmission } from "./vendas-form/useFormSubmission";
import { useFormNavigation } from "./vendas-form/useFormNavigation";
import { ConfirmationDialog } from "./vendas-form/ConfirmationDialog";
import { useIsMobile } from "@/hooks/useIsMobile";

interface DirectFormRendererProps {
  formUrl: string;
  onClose: () => void;
}

export function DirectFormRenderer({ formUrl, onClose }: DirectFormRendererProps) {
  const isMobile = useIsMobile();
  
  // Determine form type based on URL
  const isGerarVendaForm = formUrl.includes("gerar_venda");
  const isNotificaComercialForm = formUrl.includes("notifica_time_comercial");
  
  // Get authenticated user
  const { user } = useAuth();
  
  // React Hook Form setup
  const form = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      nome_empresa: "",
      area_atuacao: "",
      interesse: "",
      nome_cliente: "",
      telefone_cliente: "",
      email_cliente: "",
      valor_implementacao: "",
      envia_audio: false,
      servidor_dedicado: false,
      cnpj: "",
      endereco_comercial: ""
    },
  });
  
  // Extract seller tag from authenticated user's email
  const getSellerTag = () => {
    if (!user || !user.username) return "";
    
    // Extract username part from email (before @)
    const emailParts = user.username.split('@');
    return emailParts[0] || "";
  };
  
  // Form navigation (steps)
  const { currentStep, handleNextStep, handlePrevStep } = useFormNavigation(form);
  
  // Determine if this is a direct sale or lead notification
  const isDirectSale = isGerarVendaForm;
  
  // Form submission
  const { 
    isSubmitting, 
    formError, 
    handleSubmit, 
    submitForm, 
    showConfirmation, 
    closeConfirmation 
  } = useFormSubmission({ 
    onClose, 
    getSellerTag,
    form,
    isDirectSale
  });

  if (!isGerarVendaForm && !isNotificaComercialForm) {
    return (
      <div className="h-full w-full overflow-auto bg-[#1A1F2C] p-4 md:p-6">
        <div className="max-w-xl mx-auto">
          <div className="glass-blur rounded-lg p-6 border border-gold/20">
            <h2 className="text-xl md:text-2xl font-semibold text-gold mb-2">Formulário não suportado</h2>
            <p className="text-gold/70 mb-6">Este tipo de formulário ainda não está disponível para visualização direta.</p>
            
            <button onClick={onClose} className="border-gold/20 text-gold hover:bg-gold/10">
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Set form title and description based on form type
  const formTitle = isGerarVendaForm 
    ? "Gerar Venda" 
    : "Notificar Time Comercial";
    
  const formDescription = isGerarVendaForm
    ? "Preencha o formulário para registrar uma nova venda no sistema"
    : "Envie um lead qualificado para o time comercial";
  
  return (
    <div className="h-full w-full overflow-auto bg-[#1A1F2C]">
      <div className={`${isMobile ? 'p-4' : 'p-6'} max-w-2xl mx-auto`}>
        <div className="glass-blur rounded-lg border border-gold/20 overflow-hidden">
          {/* Header */}
          <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-gold/10`}>
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-gold mb-2`}>
              {formTitle}
            </h2>
            <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} mb-6`}>
              {formDescription}
            </p>
            
            {/* Progress bar */}
            <FormProgress currentStep={currentStep} totalSteps={3} />
          </div>
          
          {/* Form Content */}
          <div className={isMobile ? 'p-4' : 'p-6'}>
            {/* Seller tag indicator */}
            <SellerInfo user={user} getSellerTag={getSellerTag} />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Company Information */}
              {currentStep === 1 && <CompanyInfoStep form={form} />}
              
              {/* Step 2: Client Information */}
              {currentStep === 2 && <ClientInfoStep form={form} isDirectSale={isDirectSale} />}
              
              {/* Step 3: Service Options or Lead Info */}
              {currentStep === 3 && (
                <>
                  {isGerarVendaForm ? (
                    <ServiceOptionsStep form={form} />
                  ) : (
                    <LeadInfoStep form={form} />
                  )}
                  
                  {formError && (
                    <div className="p-4 bg-red-900/20 border border-red-900/30 rounded-lg text-sm text-red-400">
                      {formError}
                    </div>
                  )}
                </>
              )}
              
              {/* Navigation buttons */}
              <FormNavigation 
                currentStep={currentStep}
                totalSteps={3}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
                onCancel={onClose}
                isSubmitting={isSubmitting}
              />
            </form>
          </div>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <ConfirmationDialog 
        isOpen={showConfirmation}
        onClose={closeConfirmation}
        onConfirm={submitForm}
        formData={form.getValues()}
        isDirectSale={isDirectSale}
      />
    </div>
  );
}
