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
import { Form } from "@/components/ui/form";

interface DirectFormRendererProps {
  formUrl: string;
  onClose: () => void;
}

export function DirectFormRenderer({ formUrl, onClose }: DirectFormRendererProps) {
  const isMobile = useIsMobile();
  
  // ... keep existing code (form URL determination and user auth) the same ...
  const isGerarVendaForm = formUrl.includes("gerar_venda");
  const isNotificaComercialForm = formUrl.includes("notifica_time_comercial");
  const { user } = useAuth();
  
  // ... keep existing code (React Hook Form setup) the same ...
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
  
  // ... keep existing code (seller tag and form navigation) the same ...
  const getSellerTag = () => {
    if (!user || !user.username) return "";
    
    // Extract username part from email (before @)
    const emailParts = user.username.split('@');
    return emailParts[0] || "";
  };
  
  const { currentStep, handleNextStep, handlePrevStep } = useFormNavigation(form);
  const isDirectSale = isGerarVendaForm;
  
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
      <div className="h-full w-full flex items-center justify-center bg-[#1A1F2C] p-4">
        <div className="max-w-sm mx-auto">
          <div className="glass-blur rounded-lg p-4 border border-gold/20 text-center">
            <h2 className="text-lg font-semibold text-gold mb-2">Formulário não suportado</h2>
            <p className="text-gold/70 text-sm mb-4">Este tipo de formulário ainda não está disponível.</p>
            <button onClick={onClose} className="px-4 py-2 border border-gold/20 text-gold hover:bg-gold/10 rounded">
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const formTitle = isGerarVendaForm ? "Gerar Venda" : "Notificar Time Comercial";
  
  return (
    <div className="h-full w-full flex flex-col bg-[#1A1F2C]">
      {/* Compact Header - Mobile Optimized */}
      <div className={`flex-shrink-0 border-b border-gold/10 ${isMobile ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className={`font-semibold text-gold ${isMobile ? 'text-lg' : 'text-xl'}`}>
            {formTitle}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gold text-sm"
          >
            ✕
          </button>
        </div>
        
        {/* Compact Progress */}
        <FormProgress currentStep={currentStep} totalSteps={3} />
      </div>
      
      {/* Form Content - Flexible Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Seller Info - Compact */}
        <div className={`flex-shrink-0 ${isMobile ? 'px-3 py-2' : 'px-4 py-3'}`}>
          <SellerInfo user={user} getSellerTag={getSellerTag} />
        </div>
        
        {/* Form Content - Scrollable if needed */}
        <div className={`flex-1 overflow-y-auto ${isMobile ? 'px-3' : 'px-4'}`}>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Step Content */}
              {currentStep === 1 && <CompanyInfoStep form={form} />}
              {currentStep === 2 && <ClientInfoStep form={form} isDirectSale={isDirectSale} />}
              {currentStep === 3 && (
                <>
                  {isGerarVendaForm ? (
                    <ServiceOptionsStep form={form} />
                  ) : (
                    <LeadInfoStep form={form} />
                  )}
                  
                  {formError && (
                    <div className="p-3 bg-red-900/20 border border-red-900/30 rounded-lg text-sm text-red-400">
                      {formError}
                    </div>
                  )}
                </>
              )}
            </form>
          </Form>
        </div>
        
        {/* Fixed Navigation - Bottom */}
        <div className={`flex-shrink-0 border-t border-gold/10 ${isMobile ? 'p-3' : 'p-4'}`}>
          <FormNavigation 
            currentStep={currentStep}
            totalSteps={3}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
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
