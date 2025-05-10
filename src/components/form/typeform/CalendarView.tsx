
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2, Calendar as CalendarIcon, RefreshCw } from "lucide-react";

interface CalendarViewProps {
  isOpen: boolean;
  onClose: () => void;
  calendarLoaded: boolean;
  calendarError: boolean;
  onSwitchToFallback?: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  isOpen, 
  onClose, 
  calendarLoaded,
  calendarError,
  onSwitchToFallback
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl h-[95vh] w-[95vw] sm:w-[95vw] bg-background/80 border-gold/20 p-0 overflow-hidden backdrop-blur-lg"
      >
        {/* Header with simple title */}
        <div className="p-4 border-b border-gold/20 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gold">Agende sua consulta</h2>
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-black/40 text-gold hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Simplified loading indicator */}
        {!calendarLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <Loader2 className="h-12 w-12 text-gold animate-spin" />
            <p className="mt-4 text-gold font-medium">Carregando calendário...</p>
          </div>
        )}
        
        {/* Error state with fallback option */}
        {calendarError && calendarLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <CalendarIcon className="h-16 w-16 text-gold/50 mb-4" />
            <h3 className="text-xl font-semibold text-gold mb-2">Não foi possível carregar o calendário</h3>
            <p className="text-white/70 mb-6 text-center max-w-md">
              Estamos com dificuldades para carregar o calendário neste momento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {onSwitchToFallback && (
                <button
                  onClick={onSwitchToFallback}
                  className="bg-gold/20 hover:bg-gold/30 text-gold font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Usar método alternativo
                </button>
              )}
              <a 
                href="https://wa.me/554788558257?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-gold/80 text-black font-medium px-6 py-3 rounded-md transition-colors"
              >
                Agendar via WhatsApp
              </a>
            </div>
          </div>
        )}
        
        {/* Direct inline embed container */}
        <div 
          id="my-cal-inline" 
          className="w-full h-full overflow-auto" 
          style={{ height: 'calc(95vh - 60px)' }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarView;
