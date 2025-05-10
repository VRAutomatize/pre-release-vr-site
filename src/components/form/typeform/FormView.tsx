
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Loader2, Check, ArrowRight } from "lucide-react";
import FormStep from "./FormStep";

interface FormViewProps {
  isOpen: boolean;
  onClose: () => void;
  isSubmitting: boolean;
  currentStep: number;
  totalSteps: number;
  progress: number;
  handleNextStep: () => void;
  paidTraffic: boolean;
  setCurrentStep: (step: number) => void;
  control: any;
  errors: any;
  setValue: (name: any, value: any) => void;
}

const FormView: React.FC<FormViewProps> = ({ 
  isOpen, 
  onClose, 
  isSubmitting, 
  currentStep, 
  totalSteps, 
  progress,
  handleNextStep,
  paidTraffic,
  setCurrentStep,
  control,
  errors,
  setValue
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl w-[95vw] h-[95vh] bg-background border-gold/20 p-0 overflow-hidden"
        // Remove the default close button by providing an empty onClose
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Visually hidden title for accessibility */}
        <DialogTitle className="sr-only">Calculadora de Economia</DialogTitle>
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200">
          <div 
            className="h-1.5 bg-gold transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="p-6 h-full flex flex-col">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-800 transition-colors z-50 text-gold"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Step content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Current step content with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-8"
              >
                <FormStep 
                  currentStep={currentStep} 
                  control={control} 
                  errors={errors} 
                  paidTraffic={paidTraffic}
                  setValue={setValue}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation buttons */}
          <div className="mt-auto flex justify-between">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isSubmitting}
                className="text-base"
              >
                Voltar
              </Button>
            )}
            <div className={`${currentStep === 0 ? 'w-full flex justify-center' : 'ml-auto'}`}>
              <Button
                onClick={handleNextStep}
                disabled={isSubmitting}
                className={`${currentStep === 0 ? 'w-full max-w-md' : ''} bg-[#ffdd00] hover:bg-[#e6c700] text-black font-medium text-base py-6`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                    Enviando
                  </>
                ) : currentStep === totalSteps - 1 ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Finalizar
                  </>
                ) : (
                  <>
                    Continuar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormView;
