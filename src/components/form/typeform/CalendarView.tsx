
import React from "react";
import { motion } from "framer-motion";
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
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <Loader2 className="h-12 w-12 text-gold animate-spin" />
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
