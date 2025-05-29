
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Loader2, RefreshCw, MessageSquare } from "lucide-react";
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
  
  const { 
    initializeCalendar, 
    loadError, 
    retryInitialization, 
    isInitializing, 
    retryCount 
  } = useCalendarInitializer({
    elementId: "executive-cal-embed",
    calLink: "vrautomatize/meet",
    onLoaded: () => setIsLoading(false),
    onError: () => {
      setIsLoading(false);
      toast({
        title: "Problema ao carregar calendário",
        description: "Não foi possível conectar ao calendário. Tente novamente ou use WhatsApp.",
        variant: "destructive",
      });
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
  
  // Handle manual retry
  const handleRetry = () => {
    setIsLoading(true);
    retryInitialization();
  };

  // Handle WhatsApp fallback (manual only)
  const handleWhatsAppFallback = () => {
    const whatsappUrl = "https://wa.me/554792666367?text=Olá!%20Sou%20empresário%20e%20gostaria%20de%20uma%20reunião%20executiva%20sobre%20Funcionários%20Digitais.%20Meu%20faturamento%20é%20superior%20a%20R$%20500k/mês.";
    window.open(whatsappUrl, '_blank');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-5xl h-[95vh] w-[95vw] sm:w-[95vw] bg-background/80 border-gold/20 p-0 overflow-hidden backdrop-blur-lg"
      >
        <DialogTitle className="sr-only">
          Calendário de Reunião Executiva - Funcionários Digitais
        </DialogTitle>

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
        {(isLoading || isInitializing) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <Loader2 className="h-12 w-12 text-gold animate-spin" />
            <p className="mt-4 text-gold font-medium">
              Carregando calendário executivo...
              {retryCount > 0 && ` (Tentativa ${retryCount + 1})`}
            </p>
          </div>
        )}
        
        {/* Cal.com embed area */}
        <div 
          id="executive-cal-embed" 
          className="relative h-[calc(95vh-60px)] w-full overflow-auto"
          style={{ minHeight: "600px" }}
        />
        
        {/* Error state with manual options */}
        {loadError && !isLoading && !isInitializing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50 p-8">
            <div className="text-center space-y-4 max-w-md">
              <p className="text-destructive text-lg font-semibold">
                Problema ao carregar o calendário
              </p>
              <p className="text-foreground/70 text-sm">
                Não foi possível conectar ao sistema de agendamento.
                {retryCount > 0 && ` Tentativas realizadas: ${retryCount}`}
              </p>
              
              <div className="flex flex-col gap-3 mt-6">
                {retryCount < 3 && (
                  <button
                    onClick={handleRetry}
                    disabled={isInitializing}
                    className="bg-gold hover:bg-gold-light text-background px-4 py-2 rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Tentar novamente
                  </button>
                )}
                
                <button
                  onClick={handleWhatsAppFallback}
                  className="bg-gold hover:bg-gold-light text-background px-4 py-2 rounded-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Continuar via WhatsApp
                </button>
                
                <button
                  onClick={onClose}
                  className="text-foreground/70 hover:text-foreground px-4 py-2 text-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExecutiveCalendarModal;
