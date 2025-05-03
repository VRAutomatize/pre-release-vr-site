
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  onBack: () => void;
  loading: boolean;
  backLabel?: string;
  submitLabel?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onBack, 
  loading, 
  backLabel = "Voltar", 
  submitLabel = "Revisar e Cadastrar" 
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-end mt-6">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onBack}
        className="border-gold/20 text-gold hover:bg-gold/10 w-full sm:w-auto"
      >
        {backLabel}
      </Button>
      <Button 
        type="submit" 
        className="bg-gold hover:bg-gold/80 text-black w-full sm:w-auto"
        disabled={loading}
      >
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...</>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
};

export default FormActions;
