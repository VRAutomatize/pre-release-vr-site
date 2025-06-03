
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Loader2, Check, ArrowRight, ArrowLeft } from "lucide-react";
import FormStep from "./FormStep";

interface OptimizedFormViewProps {
  isOpen: boolean;
  onClose: () => void;
  isSubmitting: boolean;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  paidTraffic: boolean;
  control: any;
  errors: any;
  setValue: (name: any, value: any) => void;
  isProcessing: boolean;
}

const OptimizedFormView: React.FC<OptimizedFormViewProps> = ({ 
  isOpen, 
  onClose, 
  isSubmitting, 
  currentStep, 
  totalSteps, 
  progress,
  onNextStep,
  onPrevStep,
  paidTraffic,
  control,
  errors,
  setValue,
  isProcessing
}) => {
  // Form data state for the FormStep component
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    instagram: ''
  });

  // Update form data handler
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValue(field, value);
  };

  // Memoize button states to prevent unnecessary re-renders
  const buttonState = useMemo(() => {
    const isLoading = isSubmitting || isProcessing;
    const isLastStep = currentStep === totalSteps - 1;
    const showPrevButton = currentStep > 0;
    
    return {
      isLoading,
      isLastStep,
      showPrevButton,
      nextButtonText: isLastStep ? "Finalizar" : "Continuar",
      nextButtonIcon: isLastStep ? Check : ArrowRight
    };
  }, [isSubmitting, isProcessing, currentStep, totalSteps]);

  // Memoize form step content to prevent unnecessary re-renders
  const stepContent = useMemo(() => (
    <FormStep 
      currentStep={currentStep} 
      control={control} 
      errors={errors} 
      paidTraffic={paidTraffic}
      setValue={setValue}
      formData={formData}
      updateFormData={updateFormData}
      onNext={onNextStep}
      onPrev={onPrevStep}
      isLastStep={buttonState.isLastStep}
    />
  ), [currentStep, control, errors, paidTraffic, setValue, formData, updateFormData, onNextStep, onPrevStep, buttonState.isLastStep]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-2xl w-[95vw] h-[90vh] bg-background/95 border-gold/20 p-0 overflow-hidden backdrop-blur-lg flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Calculadora de Economia</DialogTitle>
        <DialogDescription className="sr-only">
          Formulário para cálculo de economia com funcionários digitais
        </DialogDescription>
        
        {/* Optimized Progress Bar */}
        <div className="w-full h-2 bg-gray-800/50">
          <div 
            className="h-2 bg-gradient-to-r from-gold to-gold-light transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-800/60 transition-colors z-50 text-gold hover:text-white"
          aria-label="Fechar"
          disabled={buttonState.isLoading}
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Main Content Container */}
        <div className="flex-1 flex flex-col justify-between p-6">
          {/* Step Content with Optimized Animation */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full max-w-lg mx-auto"
              >
                {stepContent}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Optimized Navigation */}
          <div className="mt-8 flex justify-between items-center">
            {buttonState.showPrevButton ? (
              <Button
                variant="outline"
                onClick={onPrevStep}
                disabled={buttonState.isLoading}
                className="text-gold border-gold/30 hover:bg-gold/10 hover:border-gold"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            ) : (
              <div /> // Spacer
            )}
            
            <Button
              onClick={onNextStep}
              disabled={buttonState.isLoading}
              className="bg-gold hover:bg-gold/90 text-black font-medium px-8 py-3 text-base min-w-[140px]"
            >
              {buttonState.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Processando...
                </>
              ) : (
                <>
                  {buttonState.nextButtonText}
                  <buttonState.nextButtonIcon className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OptimizedFormView;
