
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
import TabTransition from "@/components/animations/TabTransition";
import InteractionFeedback from "@/components/animations/InteractionFeedback";
import { StaggeredFade } from "@/components/animations/LoadingStates";
import { motion } from "framer-motion";

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

  const PaymentContent = () => {
    const contentComponents = [
      // Header Section
      <div key="header" className="px-4 py-3">
        <motion.h2 
          className="text-2xl font-bold text-yellow-400 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Links de Pagamento
        </motion.h2>
        <motion.p 
          className="text-sm text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Crie e gerencie links de pagamento para seus clientes
        </motion.p>
      </div>,

      // Progress Steps
      <div key="progress" className="px-4">
        <InteractionFeedback type="gentle">
          <NativeCard variant="elevated" padding="md">
            <ProgressSteps currentStep={step} />
          </NativeCard>
        </InteractionFeedback>
      </div>,

      // Step Content with animations
      <div key="content" className="px-4">
        <TabTransition tabKey={step.toString()} direction="vertical">
          {step === Step.CheckCNPJ && (
            <InteractionFeedback type="gentle">
              <NativeCard variant="elevated" padding="lg">
                <CheckCNPJStep 
                  onCheckCNPJ={handleCheckCNPJ}
                  loading={loading}
                />
              </NativeCard>
            </InteractionFeedback>
          )}
          
          {step === Step.RegisterClient && (
            <InteractionFeedback type="gentle">
              <NativeCard variant="elevated" padding="lg">
                <RegisterClientStep 
                  currentCNPJ={currentCNPJ}
                  onRegister={handleRegisterClient}
                  onBack={handleBackToStart}
                  loading={loading}
                />
              </NativeCard>
            </InteractionFeedback>
          )}
          
          {step === Step.CreatePayment && client && (
            <InteractionFeedback type="gentle">
              <NativeCard variant="elevated" padding="lg">
                <CreatePaymentStep 
                  client={client}
                  products={products}
                  onCreatePayment={handleCreatePayment}
                  onBack={handleBackToStart}
                  loading={loading}
                />
              </NativeCard>
            </InteractionFeedback>
          )}

          {step === Step.PaymentResult && paymentResult && (
            <InteractionFeedback type="gentle">
              <NativeCard variant="elevated" padding="lg">
                <PaymentResultStep 
                  result={paymentResult}
                  onBack={() => resetForms()}
                />
              </NativeCard>
            </InteractionFeedback>
          )}
        </TabTransition>
      </div>
    ];

    if (isMobile) {
      contentComponents.push(
        // Helper Info for Mobile
        <div key="helper" className="px-4 pb-6">
          <InteractionFeedback type="gentle">
            <NativeCard variant="glass" padding="md">
              <div className="text-center">
                <h4 className="text-sm font-semibold text-gray-100 mb-2">
                  💡 Dica
                </h4>
                <p className="text-xs text-gray-200">
                  Use links de pagamento para facilitar o processo de compra dos seus clientes e aumentar a taxa de conversão
                </p>
              </div>
            </NativeCard>
          </InteractionFeedback>
        </div>
      );
    }

    return (
      <div className="w-full space-y-6">
        <StaggeredFade delay={0.1}>
          {contentComponents}
        </StaggeredFade>
      </div>
    );
  };

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
      <motion.main 
        className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/80 relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
      >
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
          <StaggeredFade delay={0.1}>
            {[
              <div key="header" className="mb-6">
                <h1 className="font-bold text-gold text-xl md:text-2xl">
                  Gerenciador de Links de Pagamento
                </h1>
                <p className="text-gray-200 text-sm md:text-base">
                  Crie e gerencie links de pagamento para seus clientes.
                </p>
              </div>,
              
              // Progress steps indicator
              <InteractionFeedback key="progress" type="gentle">
                <ProgressSteps currentStep={step} />
              </InteractionFeedback>,
              
              <div key="content" className="max-w-2xl mx-auto">
                <TabTransition tabKey={step.toString()} direction="vertical">
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
                </TabTransition>
              </div>
            ]}
          </StaggeredFade>
        </div>
      </motion.main>
    </div>
  );
};

export default PaymentLinks;
