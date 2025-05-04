
import React from "react";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import ProgressSteps from "@/components/payment/ProgressSteps";
import { Step } from "@/types/payment";
import CheckCNPJStep from "@/components/payment/steps/CheckCNPJStep";
import RegisterClientStep from "@/components/payment/steps/RegisterClientStep";
import CreatePaymentStep from "@/components/payment/steps/CreatePaymentStep";
import PaymentResultStep from "@/components/payment/steps/PaymentResultStep";
import { usePaymentWorkflow } from "@/hooks/usePaymentWorkflow";

const PaymentLinks = () => {
  const {
    step,
    loading,
    client,
    products,
    currentCNPJ,
    paymentResult,
    handleCheckCNPJ,
    handleRegisterClient,
    handleCreatePayment,
    handleBackToStart
  } = usePaymentWorkflow();

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative">
        {/* Gold blurred background image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="w-[100%] h-[100%] backdrop-blur-3xl">
            <img 
              src="/lovable-uploads/1480847a-bcda-486a-8757-c4f23cc30f8b.png" 
              alt="VR Automatize" 
              className="w-full h-full object-cover opacity-40" 
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gold">Gerenciador de Links de Pagamento</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Crie e gerencie links de pagamento para seus clientes.
            </p>
          </div>
          
          {/* Progress steps indicator */}
          <ProgressSteps currentStep={step} />
          
          <div className="max-w-2xl mx-auto">
            {step === Step.CheckCNPJ && (
              <CheckCNPJStep 
                onCheckCNPJ={handleCheckCNPJ}
                loading={loading}
              />
            )}
            
            {step === Step.RegisterClient && (
              <RegisterClientStep 
                currentCNPJ={currentCNPJ}
                onRegister={handleRegisterClient}
                onBack={handleBackToStart}
                loading={loading}
              />
            )}
            
            {step === Step.CreatePayment && client && (
              <CreatePaymentStep 
                client={client}
                products={products}
                onCreatePayment={handleCreatePayment}
                onBack={handleBackToStart}
                loading={loading}
              />
            )}

            {step === Step.PaymentResult && paymentResult && (
              <PaymentResultStep 
                result={paymentResult}
                onBack={handleBackToStart}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentLinks;
