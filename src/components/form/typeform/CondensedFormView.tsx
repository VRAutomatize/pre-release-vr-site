
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Loader2, Check, ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { 
  CondensedNameStep, 
  CondensedPhoneStep, 
  CondensedRevenueStep, 
  CondensedIndustryStep 
} from "./steps/CondensedFormSteps";

interface CondensedFormViewProps {
  isOpen: boolean;
  onClose: () => void;
  isSubmitting: boolean;
  currentStep: number;
  totalSteps: number;
  progress: number;
  showExpressFlow: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  onExpressFlow: () => void;
  control: any;
  errors: any;
}

const CondensedFormView: React.FC<CondensedFormViewProps> = ({ 
  isOpen, 
  onClose, 
  isSubmitting, 
  currentStep, 
  totalSteps, 
  progress,
  showExpressFlow,
  onNextStep,
  onPrevStep,
  onExpressFlow,
  control,
  errors
}) => {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CondensedNameStep control={control} errors={errors} />;
      case 1:
        return (
          <CondensedPhoneStep 
            control={control} 
            errors={errors} 
            showExpressFlow={showExpressFlow}
            onExpressFlow={onExpressFlow}
          />
        );
      case 2:
        return <CondensedRevenueStep control={control} errors={errors} />;
      case 3:
        return <CondensedIndustryStep control={control} errors={errors} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === totalSteps - 1;
  const showPrevButton = currentStep > 0;

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-lg w-[95vw] h-[85vh] bg-background/95 border-gold/20 p-0 overflow-hidden backdrop-blur-lg flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Análise Gratuita</DialogTitle>
        <DialogDescription className="sr-only">
          Formulário para análise gratuita
        </DialogDescription>
        
        {/* Simplified Progress Bar */}
        <div className="relative w-full h-1 bg-gray-800/50">
          <div 
            className="h-1 bg-gold transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Minimal header with urgency */}
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <Clock className="h-4 w-4" />
              <span>5 vagas restantes</span>
            </div>
            <span className="text-xs text-gold">{currentStep + 1}/{totalSteps}</span>
          </div>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-2 hover:bg-gray-800/60 transition-colors z-50 text-gray-400 hover:text-white"
          aria-label="Fechar"
          disabled={isSubmitting}
        >
          <X className="h-4 w-4" />
        </button>
        
        {/* Main Content - More space for form */}
        <div className="flex-1 flex flex-col justify-center p-6">
          <div className="flex-1 flex items-center justify-center min-h-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full max-w-md mx-auto"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Simplified Navigation */}
          <div className="mt-6 flex justify-between items-center">
            {showPrevButton ? (
              <Button
                variant="outline"
                onClick={onPrevStep}
                disabled={isSubmitting}
                className="text-gold border-gold/30 hover:bg-gold/10 hover:border-gold"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            ) : (
              <div />
            )}
            
            <Button
              onClick={onNextStep}
              disabled={isSubmitting}
              className="bg-gold hover:bg-gold/90 text-black font-medium px-8 py-3 min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Enviando...
                </>
              ) : isLastStep ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Finalizar
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="bg-gray-800/20 px-4 py-2 border-t border-gold/10">
          <div className="flex justify-center text-xs text-foreground/60">
            <span>🔒 Dados protegidos</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CondensedFormView;
