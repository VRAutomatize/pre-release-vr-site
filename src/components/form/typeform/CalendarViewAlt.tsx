
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Loader2, Calendar as CalendarIcon, RefreshCw, AlertTriangle } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { toast } from "@/hooks/use-toast";

interface CalendarViewAltProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarViewAlt: React.FC<CalendarViewAltProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<'timeout' | 'api' | 'network' | 'unknown'>('unknown');
  const [retryCount, setRetryCount] = useState(0);
  const [calApiInitialized, setCalApiInitialized] = useState(false);
  
  // Diagnostic helper to check if script loads properly
  const checkScriptLoaded = () => {
    const calScripts = document.querySelectorAll('script[src*="cal.com"]');
    console.log(`Cal.com scripts found: ${calScripts.length}`);
    return calScripts.length > 0;
  };

  // Initialize Cal.com API with comprehensive error handling
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      
      console.log("Calendar view opened, attempt:", retryCount + 1);
      
      // Setup timeout for loading - increased to 15 seconds
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          console.error("Calendar loading timeout triggered after 15 seconds");
          setErrorType('timeout');
          setHasError(true);
          setIsLoading(false);
          
          // Additional diagnostics on timeout
          const scriptLoaded = checkScriptLoaded();
          console.log(`On timeout - Script loaded: ${scriptLoaded}, Cal API initialized: ${calApiInitialized}`);
        }
      }, 15000);
      
      // Initialize Cal API with error handling
      (async function initCal() {
        try {
          console.log("Attempting to initialize Cal.com API");
          
          // Check network connectivity first
          try {
            const testResponse = await fetch('https://app.cal.com/status', { 
              method: 'HEAD',
              mode: 'no-cors' // This allows us to at least try to connect
            });
            console.log("Cal.com network check completed");
          } catch (networkError) {
            console.error("Network connectivity issue with Cal.com:", networkError);
            setErrorType('network');
            setHasError(true);
            setIsLoading(false);
            return;
          }
          
          // Initialize Cal API
          const cal = await getCalApi({"namespace":"call"});
          console.log("Cal API successfully obtained:", !!cal);
          setCalApiInitialized(true);
          
          // Configure UI
          cal("ui", {
            "theme": "dark",
            "styles": {
              "branding": {
                "brandColor": "#FFD700"
              }
            },
            "hideEventTypeDetails": false,
            "layout": "month_view"
          });
          
          // Log event listeners for debugging
          cal("on", {
            action: "*",
            callback: (data: any) => {
              console.log(`Cal.com event received: ${data?.action || 'unknown'}`, data);
              
              // Auto-detect successful load
              if (data?.action === 'calendar_loaded' || data?.action === 'loaded') {
                setIsLoading(false);
                console.log("Calendar loaded event detected");
              }
            }
          });
          
          // Set loading state with a delay to allow UI to render
          setTimeout(() => {
            if (isLoading) {
              console.log("Default loading timeout - marking as loaded");
              setIsLoading(false);
            }
          }, 5000);
          
        } catch (error) {
          console.error("Error initializing Cal.com:", error);
          setErrorType('api');
          setHasError(true);
          setIsLoading(false);
        }
      })();
      
      // Cleanup function
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen, retryCount, calApiInitialized]);
  
  // Handle manual reload attempt
  const handleRetry = () => {
    console.log("Manual retry requested");
    setRetryCount(prev => prev + 1);
    setHasError(false);
    setIsLoading(true);
    setCalApiInitialized(false);
    
    // Show toast to indicate retry
    toast({
      title: "Recarregando calendário",
      description: "Tentando novamente...",
    });
  };
  
  // Handle manually marking as loaded when embedded Cal is ready
  const handleEmbedLoaded = () => {
    console.log("Cal embed reported as loaded");
    setIsLoading(false);
  };
  
  // Function to get appropriate error message
  const getErrorMessage = () => {
    switch(errorType) {
      case 'timeout':
        return "O calendário não carregou a tempo. Pode ser um problema de conexão.";
      case 'network':
        return "Não foi possível conectar ao serviço de calendário. Verifique sua conexão.";
      case 'api':
        return "O serviço de calendário respondeu com um erro.";
      default:
        return "Ocorreu um erro ao carregar o calendário.";
    }
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
            <p className="text-white/70 text-sm mt-2">Isso pode levar alguns segundos</p>
          </div>
        )}
        
        {/* Error state with retry option */}
        {hasError && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-40">
            <AlertTriangle className="h-16 w-16 text-gold/50 mb-4" />
            <h3 className="text-xl font-semibold text-gold mb-2">Não foi possível carregar o calendário</h3>
            <p className="text-white/70 mb-6 text-center max-w-md">
              {getErrorMessage()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleRetry}
                className="flex items-center justify-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold font-medium px-6 py-3 rounded-md transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Tentar novamente
              </button>
              <a 
                href="https://wa.me/554788558257?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-gold/80 text-black font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center"
              >
                Agendar via WhatsApp
              </a>
            </div>
            {/* Additional diagnostic info */}
            <p className="text-white/50 text-xs mt-8">
              Erro: {errorType} • Tentativas: {retryCount + 1} • API inicializada: {calApiInitialized ? 'Sim' : 'Não'}
            </p>
          </div>
        )}
        
        {/* Cal.com React Component - use small iframe UI for better compatibility */}
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
              setErrorType('api');
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
