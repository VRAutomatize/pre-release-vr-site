
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2 } from "lucide-react";

interface CalendarViewProps {
  isOpen: boolean;
  onClose: () => void;
  calendarLoaded: boolean;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  isOpen, 
  onClose, 
  calendarLoaded 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl h-[95vh] w-[95vw] sm:w-[95vw] bg-background border-gold/20 p-0 overflow-hidden"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full p-2 bg-black/50 text-gold hover:bg-black/70 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Loading indicator for calendar */}
        {!calendarLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-40">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 text-gold animate-spin" />
              <p className="text-lg">Carregando calendário de agendamento...</p>
            </div>
          </div>
        )}
        
        {/* Cal.com embed container */}
        <div id="cal-embed-container" className="w-full h-full"></div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarView;
