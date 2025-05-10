
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CalProvider, getCalApi } from "@calcom/embed-react";
import { useCalendarInitializer } from "./hooks/useCalendarInitializer";

interface SimpleCalendarEmbedProps {
  isOpen: boolean;
  onClose: () => void;
  onFallback?: () => void;
}

const SimpleCalendarEmbed: React.FC<SimpleCalendarEmbedProps> = ({ 
  isOpen, 
  onClose, 
  onFallback 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const { initializeCalendar, loadError } = useCalendarInitializer({
    elementId: "cal-embed-area",
    calLink: "vrautomatize/call",
    onLoaded: () => setIsLoading(false),
    onError: () => {
      if (onFallback) onFallback();
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
          <h2 className="text-lg font-semibold text-gold">Agende sua consulta</h2>
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
            <p className="mt-4 text-gold font-medium">Carregando calendário...</p>
          </div>
        )}
        
        {/* Cal.com embed area */}
        <div 
          id="cal-embed-area" 
          className="relative h-[calc(95vh-60px)] w-full overflow-auto"
          style={{ minHeight: "600px" }}
        />
        
        {/* Error state backup link */}
        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50">
            <p className="text-destructive text-lg mb-4">Não foi possível carregar o calendário</p>
            <div className="space-y-4">
              <button
                onClick={onFallback}
                className="bg-gold hover:bg-gold-light text-background px-4 py-2 rounded-md flex items-center"
              >
                Tentar método alternativo
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SimpleCalendarEmbed;
