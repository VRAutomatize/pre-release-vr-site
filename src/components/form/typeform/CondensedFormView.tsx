import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Loader2, Check, ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { useKeyboardDetection } from "@/hooks/useKeyboardDetection";
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
  const { isKeyboardOpen } = useKeyboardDetection();

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

  // Dynamic height calculation based on step content
  const getModalHeight = () => {
    if (isKeyboardOpen) {
      return 'h-[70vh]';
    }
    
    // Revenue step needs more height due to 6 options
    if (currentStep === 2) {
      return 'h-[90vh] max-h-[700px]';
    }
    
    // Other steps can use standard height
    return 'h-[85vh] max-h-[600px]';
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`max-w-lg w-[95vw] bg-background/95 border-gold/20 p-0 overflow-hidden backdrop-blur-lg flex flex-col transition-all duration-300 ${getModalHeight()}`}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Análise Gratuita</DialogTitle>
        <DialogDescription className="sr-only">
          Formulário para análise gratuita
        </DialogDescription>
        
        {/* Enhanced Progress Bar */}
        <div className={`relative w-full bg-gray-800/40 rounded-full overflow-hidden ${isKeyboardOpen ? 'h-2' : 'h-3'}`}>
          <div 
            className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-700 ease-out rounded-full shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Minimalist Badge */}
        <div className={`flex justify-center ${isKeyboardOpen ? 'py-1' : 'py-2'}`}>
          <Badge 
            variant="outline" 
            className={`bg-red-500/10 border-red-500/30 text-red-400 rounded-full ${
              isKeyboardOpen ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1'
            }`}
          >
            <Clock className={`mr-1 ${isKeyboardOpen ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} />
            5 vagas restantes
          </Badge>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-2 right-2 rounded-full p-1.5 hover:bg-gray-800/60 transition-colors z-50 text-gray-400 hover:text-white ${
            isKeyboardOpen ? 'p-1' : 'p-1.5'
          }`}
          aria-label="Fechar"
          disabled={isSubmitting}
        >
          <X className={isKeyboardOpen ? 'h-3 w-3' : 'h-4 w-4'} />
        </button>
        
        {/* Main Content Container - Fixed height distribution */}
        <div className={`flex-1 flex flex-col min-h-0 ${isKeyboardOpen ? 'px-2 pb-2' : 'px-4 pb-4'}`}>
          {/* Content Area - Scrollable if needed */}
          <div className={`flex-1 overflow-y-auto ${isKeyboardOpen ? 'min-h-0' : ''}`}>
            <div className={`min-h-full flex items-center justify-center ${isKeyboardOpen ? 'py-2' : 'py-4'}`}>
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
          </div>
          
          {/* Navigation - Fixed at bottom */}
          <div className={`flex-shrink-0 ${isKeyboardOpen ? 'mt-2 pt-2' : 'mt-4 pt-4'} flex justify-between items-center gap-3 border-t border-gray-800/20`}>
            {showPrevButton ? (
              <Button
                variant="outline"
                onClick={onPrevStep}
                disabled={isSubmitting}
                className={`text-gold border-gold/30 hover:bg-gold/10 hover:border-gold ${
                  isKeyboardOpen ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'
                }`}
              >
                <ArrowLeft className={`mr-1 ${isKeyboardOpen ? 'h-3 w-3' : 'h-4 w-4'}`} />
                Voltar
              </Button>
            ) : (
              <div />
            )}
            
            <Button
              onClick={onNextStep}
              disabled={isSubmitting}
              className={`bg-gold hover:bg-gold/90 text-black font-medium ${
                isKeyboardOpen ? 'px-4 py-1.5 text-sm min-w-[100px]' : 'px-8 py-3 min-w-[140px]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className={`mr-1 animate-spin ${isKeyboardOpen ? 'h-3 w-3' : 'h-4 w-4'}`} /> 
                  {isKeyboardOpen ? 'Enviando...' : 'Enviando...'}
                </>
              ) : isLastStep ? (
                <>
                  <Check className={`mr-1 ${isKeyboardOpen ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  Finalizar
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className={`ml-1 ${isKeyboardOpen ? 'h-3 w-3' : 'h-4 w-4'}`} />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Footer - Hide when keyboard is open to save space */}
        {!isKeyboardOpen && (
          <div className="flex-shrink-0 bg-gray-800/20 px-4 py-2 border-t border-gold/10">
            <div className="flex justify-center text-xs text-foreground/60">
              <span>🔒 Dados protegidos</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CondensedFormView;
