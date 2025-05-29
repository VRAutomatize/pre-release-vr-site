
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CalProvider, getCalApi } from "@calcom/embed-react";
import { useCalendarInitializer } from "./typeform/hooks/useCalendarInitializer";

interface ExecutiveCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFallback?: () => void;
}

const ExecutiveCalendarModal: React.FC<ExecutiveCalendarModalProps> = ({ 
  isOpen, 
  onClose, 
  onFallback 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const { initializeCalendar, loadError } = useCalendarInitializer({
    elementId: "executive-cal-embed",
    calLink: "vrautomatize/reuniao-executiva",
    onLoaded: () => setIsLoading(false),
    onError: () => {
      if (onFallback) {
        onFallback();
      } else {
        // Fallback to WhatsApp
        const whatsappUrl = "https://wa.me/554792666367?text=Olá!%20Sou%20empresário%20e%20gostaria%20de%20uma%20reunião%20executiva%20sobre%20Funcionários%20Digitais.%20Meu%20faturamento%20é%20superior%20a%20R$%20500k/mês.";
        window.open(whatsappUrl, '_blank');
        onClose();
      }
    },
    isOpen
  });
  
  // Initialize calendar when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      initializeCalendar();
    }
  }, [isOpen, initializeCalendar]);
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-5xl h-[95vh] w-[95vw] sm:w-[95vw] bg-background/80 border-gold/20 p-0 overflow-hidden backdrop-blur-lg"
      >
        {/* Header */}
        <div className="p-4 border-b border-gold/20 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gold">Reunião Executiva - Funcionários Digitais</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-black/40 text-gold hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <Loader2 className="h-12 w-12 text-gold animate-spin" />
            <p className="mt-4 text-gold font-medium">Carregando calendário executivo...</p>
          </div>
        )}
        
        {/* Cal.com embed area */}
        <div 
          id="executive-cal-embed" 
          className="relative h-[calc(95vh-60px)] w-full overflow-auto"
          style={{ minHeight: "600px" }}
        />
        
        {/* Error state backup link */}
        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50">
            <p className="text-destructive text-lg mb-4">Não foi possível carregar o calendário</p>
            <div className="space-y-4">
              <a
                href="https://wa.me/554792666367?text=Olá!%20Sou%20empresário%20e%20gostaria%20de%20uma%20reunião%20executiva%20sobre%20Funcionários%20Digitais.%20Meu%20faturamento%20é%20superior%20a%20R$%20500k/mês."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-gold-light text-background px-4 py-2 rounded-md flex items-center"
                onClick={onClose}
              >
                Continuar via WhatsApp
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExecutiveCalendarModal;
