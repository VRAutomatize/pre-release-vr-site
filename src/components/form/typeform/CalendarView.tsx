
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2, Calendar } from "lucide-react";

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
  // Cal.com custom styling effect
  useEffect(() => {
    if (isOpen && window.Cal?.ns?.call) {
      window.Cal.ns.call("ui", {
        "theme": "dark",
        "cssVarsPerTheme": {
          "dark": {
            "cal-brand": "#FFD700",
            "cal-bg": "rgba(26, 31, 44, 0.8)",  // Glass-like background
            "cal-border-default": "rgba(255, 215, 0, 0.3)",
            "cal-border-emphasis": "rgba(255, 215, 0, 0.5)",
            "cal-border-subtle": "rgba(255, 215, 0, 0.2)",
            "cal-text-emphasis": "#FFFFFF",
            "cal-text": "#F5F5F5"
          }
        },
        "hideEventTypeDetails": true,
        "layout": "month_view"
      });
    }
  }, [isOpen, calendarLoaded]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl h-[95vh] w-[95vw] sm:w-[95vw] bg-background/80 border-gold/20 p-0 overflow-hidden backdrop-blur-lg"
      >
        {/* Header with title */}
        <div className="p-4 border-b border-gold/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gold" />
            <h2 className="text-lg font-semibold text-gold">Agende sua consulta</h2>
          </div>
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-black/40 text-gold hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Loading indicator with motion animation */}
        {!calendarLoaded && (
          <motion.div 
            initial={{ opacity: 1 }} 
            animate={{ opacity: 0.8 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-40"
          >
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-black/20 border border-gold/10 backdrop-blur-lg">
              <div className="relative">
                <Loader2 className="h-12 w-12 text-gold animate-spin" />
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  initial={{ boxShadow: "0 0 0 rgba(255,215,0, 0.3)" }}
                  animate={{ boxShadow: "0 0 20px rgba(255,215,0, 0.6)" }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                />
              </div>
              <p className="text-xl font-medium text-gold">Preparando calendário...</p>
              <p className="text-sm text-gold/60 text-center">
                Estamos carregando seu calendário de agendamentos. Aguarde um momento.
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Cal.com embed container */}
        <div 
          id="cal-embed-container" 
          className="w-full h-full overflow-auto" 
          style={{ height: 'calc(95vh - 60px)' }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarView;
