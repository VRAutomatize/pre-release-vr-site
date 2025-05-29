
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2, RefreshCw, MessageSquare } from "lucide-react";
import { useDynamicCalendar } from "./hooks/useDynamicCalendar";

interface DynamicCalendarEmbedProps {
  isOpen: boolean;
  onClose: () => void;
  calLink?: string;
  onFallback?: () => void;
}

const DynamicCalendarEmbed: React.FC<DynamicCalendarEmbedProps> = ({
  isOpen,
  onClose,
  calLink = "vrautomatize/call",
  onFallback
}) => {
  const elementId = "dynamic-cal-inline";
  
  const {
    isLoading,
    hasError,
    isInitialized,
    retry
  } = useDynamicCalendar({
    elementId,
    calLink,
    isOpen,
    onLoaded: () => console.log("Dynamic calendar loaded"),
    onError: () => console.error("Dynamic calendar error")
  });

  const handleWhatsAppFallback = () => {
    const whatsappUrl = "https://wa.me/554792666367?text=Olá!%20Gostaria%20de%20agendar%20uma%20reunião%20sobre%20Funcionários%20Digitais.";
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] w-[95vw] bg-background/95 border-gold/20 p-0 overflow-hidden backdrop-blur-lg">
        
        {/* Header */}
        <div className="p-4 border-b border-gold/20 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gold">Agendar Reunião - Funcionários Digitais</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-black/40 text-gold hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <Loader2 className="h-12 w-12 text-gold animate-spin" />
            <p className="mt-4 text-gold font-medium">Carregando calendário...</p>
          </div>
        )}

        {/* Calendar Container */}
        <div className="flex-1 overflow-hidden">
          <div 
            id={elementId}
            className="w-full h-full overflow-auto"
            style={{ minHeight: "600px" }}
          />
        </div>

        {/* Error State */}
        {hasError && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50 p-8">
            <div className="text-center space-y-4 max-w-md">
              <p className="text-destructive text-lg font-semibold">
                Problema ao carregar o calendário
              </p>
              <p className="text-foreground/70 text-sm">
                Não foi possível conectar ao sistema de agendamento.
              </p>
              
              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={retry}
                  className="bg-gold hover:bg-gold-light text-background px-4 py-2 rounded-md flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Tentar novamente
                </button>
                
                {onFallback && (
                  <button
                    onClick={onFallback}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Método alternativo
                  </button>
                )}
                
                <button
                  onClick={handleWhatsAppFallback}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Continuar via WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DynamicCalendarEmbed;
