
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { FormData, FormStep } from "./vendas-form/types";
import { CompanyInfoStep, ClientInfoStep, ServiceOptionsStep } from "./vendas-form/FormSteps";
import { FormProgress } from "./vendas-form/FormProgress";
import { SellerInfo } from "./vendas-form/SellerInfo";
import { FormNavigation } from "./vendas-form/FormNavigation";
import { useFormSubmission } from "./vendas-form/useFormSubmission";
import { useFormNavigation } from "./vendas-form/useFormNavigation";

interface DirectFormRendererProps {
  formUrl: string;
  onClose: () => void;
}

export function DirectFormRenderer({ formUrl, onClose }: DirectFormRendererProps) {
  // Determine form type based on URL
  const isGerarVendaForm = formUrl.includes("gerar_venda") || formUrl.includes("venda");
  
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
  
  // Form submission
  const { isSubmitting, formError, handleSubmit, setFormError } = useFormSubmission({ 
    onClose, 
    getSellerTag,
    form
  });

  if (!isGerarVendaForm) {
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
  
  return (
    <div className="h-full w-full overflow-auto bg-[#1A1F2C] p-4 md:p-6">
      <div className="max-w-xl mx-auto">
        <div className="glass-blur rounded-lg p-6 border border-gold/20">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gold mb-2">Gerar Venda</h2>
            <p className="text-gold/70 mb-4">Preencha o formulário para registrar uma nova venda no sistema</p>
            
            {/* Progress bar */}
            <FormProgress currentStep={currentStep} totalSteps={3} />
          </div>
          
          {/* Seller tag indicator */}
          <SellerInfo user={user} getSellerTag={getSellerTag} />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Company Information */}
            {currentStep === 1 && <CompanyInfoStep form={form} />}
            
            {/* Step 2: Client Information */}
            {currentStep === 2 && <ClientInfoStep form={form} />}
            
            {/* Step 3: Service Options */}
            {currentStep === 3 && (
              <>
                <ServiceOptionsStep form={form} />
                
                {formError && (
                  <div className="p-3 bg-red-900/20 border border-red-900/30 rounded-md text-sm text-red-400">
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
  );
}
