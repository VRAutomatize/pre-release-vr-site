
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2 } from "lucide-react";

interface CalendarIframeViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarIframeView: React.FC<CalendarIframeViewProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Reset loading state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);
  
  // Direct iframe URL to Cal.com
  const calendarUrl = "https://cal.com/vrautomatize/call?embed=true&theme=dark&layout=month_view";
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl h-[95vh] w-[95vw] sm:w-[95vw] bg-background/80 border-gold/20 p-0 overflow-hidden backdrop-blur-lg"
      >
        {/* Header */}
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
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <Loader2 className="h-12 w-12 text-gold animate-spin" />
            <p className="mt-4 text-gold font-medium">Carregando calendário...</p>
          </div>
        )}
        
        {/* Direct iframe - simpler approach with fewer potential issues */}
        <iframe
          src={calendarUrl}
          style={{ 
            width: "100%", 
            height: "calc(95vh - 60px)",
            border: "none" 
          }}
          onLoad={() => setIsLoading(false)}
          title="Calendário de Agendamento"
          allow="camera; microphone; fullscreen; display-capture; autoplay"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarIframeView;
