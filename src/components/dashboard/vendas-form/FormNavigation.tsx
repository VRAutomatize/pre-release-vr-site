
import React from "react";
import { NativeButton } from "@/components/ui/native-button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const isMobile = useIsMobile();
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  if (!isMobile) {
    return (
      <div className="flex justify-between items-center space-x-4">
        <div className="flex gap-3">
          {!isFirstStep && (
            <button
              type="button"
              onClick={onPrev}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-gold border border-gray-600 hover:border-gold/50 rounded-md transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          )}
          
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 border border-gray-600 hover:border-red-400/50 rounded-md transition-colors disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            Cancelar
          </button>
        </div>

        {!isLastStep ? (
          <button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-gold hover:bg-gold/90 text-black font-medium rounded-md transition-colors disabled:opacity-50"
          >
            Próximo
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-gold hover:bg-gold/90 text-black font-medium rounded-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </button>
        )}
      </div>
    );
  }

  // Mobile Layout - Compact and Efficient
  return (
    <div className="space-y-3">
      {/* Primary Action - More Compact */}
      {!isLastStep ? (
        <NativeButton
          onClick={onNext}
          disabled={isSubmitting}
          variant="primary"
          size="lg"
          fullWidth
          className="h-12 text-base font-semibold"
        >
          <span>Próximo</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </NativeButton>
      ) : (
        <NativeButton
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          className="h-12 text-base font-semibold"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </NativeButton>
      )}

      {/* Secondary Actions - More Compact */}
      <div className="grid grid-cols-2 gap-2">
        {!isFirstStep && (
          <NativeButton
            onClick={onPrev}
            disabled={isSubmitting}
            variant="secondary"
            size="md"
            className="h-10 text-sm"
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Voltar
          </NativeButton>
        )}
        
        <NativeButton
          onClick={onCancel}
          disabled={isSubmitting}
          variant="ghost"
          size="md"
          className={`h-10 text-sm text-red-400 hover:bg-red-400/10 ${isFirstStep ? 'col-span-2' : ''}`}
        >
          <X className="h-3 w-3 mr-1" />
          Cancelar
        </NativeButton>
      </div>
    </div>
  );
}
