import React from "react";
import EmployeeSidebar from "@/components/EmployeeSidebar";
import ProgressSteps from "@/components/payment/ProgressSteps";
import { Step } from "@/types/payment";
import CheckCNPJStep from "@/components/payment/steps/CheckCNPJStep";
import RegisterClientStep from "@/components/payment/steps/RegisterClientStep";
import CreatePaymentStep from "@/components/payment/steps/CreatePaymentStep";
import PaymentResultStep from "@/components/payment/steps/PaymentResultStep";
import { usePaymentWorkflow } from "@/hooks/usePaymentWorkflow";
import { useIsMobile } from "@/hooks/useIsMobile";
import NativeMobileLayout from "@/components/mobile/NativeMobileLayout";
import { NativeCard } from "@/components/ui/native-card";

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
    handleBackToStart,
    resetForms
  } = usePaymentWorkflow();
  const isMobile = useIsMobile();

  // Debug logging
  React.useEffect(() => {
    console.log("Current step:", step);
    console.log("Payment result:", paymentResult);
  }, [step, paymentResult]);

  const PaymentContent = () => (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="px-4 py-3">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          Links de Pagamento
        </h2>
        <p className="text-sm text-gray-400">
          Crie e gerencie links de pagamento para seus clientes
        </p>
      </div>

      {/* Progress Steps - Enhanced for Mobile */}
      <div className="px-4">
        <NativeCard variant="elevated" padding="md">
          <ProgressSteps currentStep={step} />
        </NativeCard>
      </div>

      {/* Step Content */}
      <div className="px-4">
        {step === Step.CheckCNPJ && (
          <NativeCard variant="elevated" padding="lg">
            <CheckCNPJStep 
              onCheckCNPJ={handleCheckCNPJ}
              loading={loading}
            />
          </NativeCard>
        )}
        
        {step === Step.RegisterClient && (
          <NativeCard variant="elevated" padding="lg">
            <RegisterClientStep 
              currentCNPJ={currentCNPJ}
              onRegister={handleRegisterClient}
              onBack={handleBackToStart}
              loading={loading}
            />
          </NativeCard>
        )}
        
        {step === Step.CreatePayment && client && (
          <NativeCard variant="elevated" padding="lg">
            <CreatePaymentStep 
              client={client}
              products={products}
              onCreatePayment={handleCreatePayment}
              onBack={handleBackToStart}
              loading={loading}
            />
          </NativeCard>
        )}

        {step === Step.PaymentResult && paymentResult && (
          <NativeCard variant="elevated" padding="lg">
            <PaymentResultStep 
              result={paymentResult}
              onBack={() => resetForms()}
            />
          </NativeCard>
        )}
      </div>

      {/* Helper Info for Mobile */}
      {isMobile && (
        <div className="px-4 pb-6">
          <NativeCard variant="glass" padding="md">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-100 mb-2">
                💡 Dica
              </h4>
              <p className="text-xs text-gray-400">
                Use links de pagamento para facilitar o processo de compra dos seus clientes e aumentar a taxa de conversão
              </p>
            </div>
          </NativeCard>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <NativeMobileLayout title="Pagamentos" subtitle="Gerencie links de pagamento">
        <PaymentContent />
      </NativeMobileLayout>
    );
  }

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
      <EmployeeSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative">
        {/* Gold blurred background image - only for desktop */}
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
          <div className="mb-6">
            <h1 className="font-bold text-gold text-xl md:text-2xl">
              Gerenciador de Links de Pagamento
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
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
                onBack={() => resetForms()}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentLinks;
