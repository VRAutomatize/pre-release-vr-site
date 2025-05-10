
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2, Calendar as CalendarIcon } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalendarViewAltProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarViewAlt: React.FC<CalendarViewAltProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Initialize Cal.com API
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      
      // Setup timeout for loading
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          console.log("Calendar loading timeout triggered");
          setHasError(true);
          setIsLoading(false);
        }
      }, 10000);
      
      // Initialize Cal API
      (async function initCal() {
        try {
          console.log("Initializing Cal.com API");
          const cal = await getCalApi({"namespace":"call"});
          
          // Configure UI
          cal("ui", {
            "theme": "dark",
            "cssVarsPerTheme": {
              "dark": {
                "cal-brand": "#FFD700",
                "cal-bg": "#1A1F2C",
                "cal-text": "#FFFFFF"
              }
            },
            "hideEventTypeDetails": true,
            "layout": "month_view"
          });
          
          // Set loading state with a small delay
          setTimeout(() => {
            setIsLoading(false);
            console.log("Calendar loaded successfully");
          }, 1500);
          
        } catch (error) {
          console.error("Error initializing Cal.com:", error);
          setHasError(true);
          setIsLoading(false);
        }
      })();
      
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen]);
  
  // Handle manually marking as loaded when embedded Cal is ready
  const handleEmbedLoaded = () => {
    console.log("Cal embed reported as loaded");
    setIsLoading(false);
  };
  
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
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <Loader2 className="h-12 w-12 text-gold animate-spin" />
            <p className="mt-4 text-gold font-medium">Carregando calendário...</p>
          </div>
        )}
        
        {/* Error state */}
        {hasError && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <CalendarIcon className="h-16 w-16 text-gold/50 mb-4" />
            <h3 className="text-xl font-semibold text-gold mb-2">Não foi possível carregar o calendário</h3>
            <p className="text-white/70 mb-6 text-center max-w-md">
              Por favor, tente novamente ou entre em contato pelo WhatsApp para agendar sua consulta.
            </p>
            <a 
              href="https://wa.me/554788558257?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold/80 text-black font-medium px-6 py-3 rounded-md transition-colors"
            >
              Abrir WhatsApp
            </a>
          </div>
        )}
        
        {/* Cal.com React Component */}
        <div className="w-full h-full" style={{ height: 'calc(95vh - 60px)' }}>
          <Cal 
            namespace="call"
            calLink="vrautomatize/call"
            style={{width:"100%", height:"100%", overflow:"auto"}}
            config={{
              "layout":"month_view",
              "theme":"dark"
            }}
            onReady={handleEmbedLoaded}
            onError={() => {
              console.error("Cal.com embed error");
              setHasError(true);
              setIsLoading(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarViewAlt;
