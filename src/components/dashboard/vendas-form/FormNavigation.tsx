
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Check, Loader2 } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onCancel,
  isSubmitting
}: FormNavigationProps) {
  return (
    <div className="flex justify-between pt-4">
      {currentStep > 1 ? (
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          className="border-gold/20 text-gold hover:bg-gold/10"
          disabled={isSubmitting}
        >
          Voltar
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="border-gold/20 text-gold hover:bg-gold/10"
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
      )}
      
      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={onNext}
          className="bg-gold hover:bg-gold/90 text-[#1A1F2C] font-medium"
          disabled={isSubmitting}
        >
          Próximo <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="bg-gold hover:bg-gold/90 text-[#1A1F2C] font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </span>
          ) : (
            <span className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Finalizar
            </span>
          )}
        </Button>
      )}
    </div>
  );
}
