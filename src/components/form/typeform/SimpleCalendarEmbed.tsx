
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2, Link } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CalProvider, getCalApi } from "@calcom/embed-react";

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
  const [loadError, setLoadError] = useState(false);
  
  // Reset loading state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setLoadError(false);
    }
  }, [isOpen]);
  
  // Use Cal.com's official embed API
  useEffect(() => {
    if (!isOpen) return;
    
    let timeoutId: number;
    
    const initializeCalendar = async () => {
      try {
        console.log("Initializing Cal.com API");
        const cal = await getCalApi();
        
        // Clear any previous instance
        cal.destroy();
        
        // Configure Cal.com with options
        cal("init", {
          debug: true, // Enable debug mode for development
          calLink: "vrautomatize/call",
          elementOrSelector: "#cal-embed-area",
          config: {
            layout: "month_view",
            theme: "dark",
          }
        });
        
        // Add event listeners for monitoring
        cal("on", {
          action: "loaded",
          callback: () => {
            console.log("Cal.com calendar loaded successfully");
            setIsLoading(false);
          }
        });
        
        cal("on", {
          action: "error",
          callback: (error: any) => {
            console.error("Cal.com calendar error:", error);
            setLoadError(true);
            if (onFallback) onFallback();
          }
        });
        
        // Set a timeout to detect loading issues
        timeoutId = window.setTimeout(() => {
          if (isLoading) {
            console.error("Calendar loading timed out after 15 seconds");
            setLoadError(true);
            toast({
              title: "Problema ao carregar calendário",
              description: "Estamos alternando para um método alternativo",
              variant: "destructive",
            });
            if (onFallback) onFallback();
          }
        }, 15000); // 15 second timeout
        
      } catch (error) {
        console.error("Cal.com initialization error:", error);
        setLoadError(true);
        if (onFallback) onFallback();
      }
    };
    
    // Initialize calendar with a small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      initializeCalendar();
    }, 300);
    
    // Cleanup function
    return () => {
      clearTimeout(initTimeout);
      if (timeoutId) clearTimeout(timeoutId);
      
      // Clean up Cal.com instance when component unmounts
      try {
        getCalApi().then(cal => cal?.destroy());
      } catch (e) {
        console.log("Cal.com cleanup error:", e);
      }
    };
  }, [isOpen, isLoading, onFallback]);
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
                <Link className="mr-2 h-4 w-4" />
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
