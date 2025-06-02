
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface FormActionsProps {
  onBack?: () => void;
  loading?: boolean;
  backLabel?: string;
  submitLabel?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onBack, 
  loading = false, 
  backLabel = "Voltar",
  submitLabel = "Continuar"
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-3 pt-4' : 'flex-row justify-between items-center pt-6'}`}>
      {onBack && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className={`border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-gray-100 hover:border-gray-500 transition-colors ${isMobile ? 'w-full py-3 text-base order-2' : ''}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {backLabel}
        </Button>
      )}
      
      <Button
        type="submit"
        disabled={loading}
        className={`bg-gold hover:bg-gold/90 text-black font-semibold transition-colors ${isMobile ? 'w-full py-3 text-base order-1' : ''}`}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
};

export default FormActions;
