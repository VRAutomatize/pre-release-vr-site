
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  const calendarContainerId = "vr-automatize-cal-container";
  const calendarInitialized = useRef(false);
  
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setLoadError(false);
      calendarInitialized.current = false;
    }
  }, [isOpen]);
  
  // Initialize calendar with VR Automatize parameters
  useEffect(() => {
    if (!isOpen || calendarInitialized.current) return;
    
    let timeoutId: number;
    
    const initializeCalendar = () => {
      try {
        console.log("Initializing VR Automatize calendar with direct script");
        calendarInitialized.current = true;
        
        // Create and append the script
        const calScript = document.createElement("script");
        calScript.type = "text/javascript";
        calScript.innerHTML = `
          (function (C, A, L) {
            let p = function (a, ar) {
              a.q.push(ar);
            };
            let d = C.document;
            C.Cal =
              C.Cal ||
              function () {
                let cal = C.Cal;
                let ar = arguments;
                if (!cal.loaded) {
                  cal.ns = {};
                  cal.q = cal.q || [];
                  d.head.appendChild(d.createElement("script")).src = A;
                  cal.loaded = true;
                }
                if (ar[0] === L) {
                  const api = function () {
                    p(api, arguments);
                  };
                  const namespace = ar[1];
                  api.q = api.q || [];
                  if (typeof namespace === "string") {
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    p(cal.ns[namespace], ar);
                    p(cal, ["initNamespace", namespace]);
                  } else p(cal, ar);
                  return;
                }
                p(cal, ar);
              };
          })(window, "https://app.cal.com/embed/embed.js", "init");
          
          // Initialize with VR Automatize settings
          Cal("init", { origin: "https://app.cal.com" });

          Cal("inline", {
            elementOrSelector: "#${calendarContainerId}",
            calLink: "vrautomatize/call",
            config: {
              theme: "dark",
              hideEventTypeDetails: false,
              layout: "month_view"
            }
          });
          
          // Add event listeners
          Cal("on", {
            action: "loaded",
            callback: () => {
              console.log("Cal.com calendar loaded successfully via pure JS");
              window.dispatchEvent(new CustomEvent('cal:loaded'));
            }
          });
          
          Cal("on", {
            action: "error",
            callback: (error) => {
              console.error("Cal.com calendar error:", error);
              window.dispatchEvent(new CustomEvent('cal:error'));
            }
          });
        `;
        
        // Clean up any existing scripts first
        const existingScripts = document.querySelectorAll('script[data-cal-embed="true"]');
        existingScripts.forEach(script => script.remove());
        
        // Add data attribute to track our script
        calScript.setAttribute('data-cal-embed', 'true');
        
        document.body.appendChild(calScript);
        
        // Listen for success event
        const handleLoadSuccess = () => {
          console.log("Calendar loaded event received");
          setIsLoading(false);
        };
        
        // Listen for error event
        const handleLoadError = () => {
          console.error("Calendar error event received");
          setLoadError(true);
          setIsLoading(false);
          if (onFallback) onFallback();
        };
        
        // Add event listeners
        window.addEventListener('cal:loaded', handleLoadSuccess);
        window.addEventListener('cal:error', handleLoadError);
        
        // Set a timeout for loading
        timeoutId = window.setTimeout(() => {
          if (isLoading) {
            console.error("Calendar loading timed out after 15 seconds");
            setLoadError(true);
            setIsLoading(false);
            toast({
              title: "Problema ao carregar calendário",
              description: "Estamos alternando para um método alternativo",
              variant: "destructive",
            });
            if (onFallback) onFallback();
          }
        }, 15000); // 15 second timeout
        
        return () => {
          window.removeEventListener('cal:loaded', handleLoadSuccess);
          window.removeEventListener('cal:error', handleLoadError);
          
          // Clean up script when unmounting
          if (calScript.parentNode) {
            calScript.parentNode.removeChild(calScript);
          }
          
          // Clean up Cal object if possible
          if (window.Cal && typeof window.Cal.destroy === 'function') {
            try {
              window.Cal.destroy();
            } catch (e) {
              console.log("Cal.com cleanup error:", e);
            }
          }
        };
      } catch (error) {
        console.error("Failed to initialize calendar:", error);
        setLoadError(true);
        setIsLoading(false);
        if (onFallback) onFallback();
      }
    };
    
    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      initializeCalendar();
    }, 500);
    
    return () => {
      clearTimeout(initTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen, isLoading, onFallback]);
  
  // Helper function for WhatsApp fallback
  const getWhatsAppLink = () => {
    return "https://wa.me/554788558257?text=Olá!%20Tenho%20interesse%20em%20Funcionários%20Digitais!";
  };
  
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
        
        {/* Cal.com embed container */}
        <div 
          id={calendarContainerId}
          className="relative h-[calc(95vh-60px)] w-full overflow-auto"
          style={{ minHeight: "600px" }}
        />
        
        {/* Error state backup link */}
        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50">
            <p className="text-destructive text-lg mb-4">Não foi possível carregar o calendário</p>
            <div className="space-y-4">
              {onFallback && (
                <button
                  onClick={onFallback}
                  className="bg-gold hover:bg-gold-light text-background px-4 py-2 rounded-md flex items-center"
                >
                  Tentar método alternativo
                </button>
              )}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                <MessageSquare className="h-5 w-5" />
                Agendar pelo WhatsApp
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SimpleCalendarEmbed;
