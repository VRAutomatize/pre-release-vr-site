
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface UseCalendarEmbedProps {
  showCalendar: boolean;
  isOpen: boolean;
  setCalendarLoaded: (loaded: boolean) => void;
}

export const useCalendarEmbed = ({ 
  showCalendar, 
  isOpen,
  setCalendarLoaded
}: UseCalendarEmbedProps) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [calendarLoadFailed, setCalendarLoadFailed] = useState(false);
  
  // Check if network is available for Cal.com
  useEffect(() => {
    if (showCalendar && isOpen) {
      // Simple ping to check connectivity
      fetch('https://app.cal.com/status', { method: 'HEAD', mode: 'no-cors' })
        .then(() => {
          console.log("Cal.com network connection successful");
        })
        .catch(error => {
          console.error("Cal.com network connection failed:", error);
          setCalendarLoadFailed(true);
          toast({
            title: "Problema de conexão",
            description: "Não foi possível conectar ao serviço de calendário",
            variant: "destructive",
          });
        });
    }
  }, [showCalendar, isOpen]);
  
  // Load Cal.com script when needed
  useEffect(() => {
    if (!showCalendar || !isOpen || calendarLoadFailed) return;
    
    let scriptLoadTimeout: number | undefined;
    let script: HTMLScriptElement | null = null;

    const loadCalScript = () => {
      setCalendarLoaded(false);
      
      // Remove existing Cal scripts
      document.querySelectorAll('script[src*="cal.com"]').forEach(s => s.remove());
      
      // Create script element
      script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        setScriptLoaded(true);
        setTimeout(() => setCalendarLoaded(true), 1000);
      };
      
      script.onerror = () => {
        console.error("Failed to load Cal.com script");
        setCalendarLoadFailed(true);
        setCalendarLoaded(true); // Mark as loaded to remove spinner
        toast({
          title: "Problema ao carregar calendário",
          description: "Estamos alternando para um método alternativo",
          variant: "destructive",
        });
      };
      
      document.head.appendChild(script);
      
      // Set timeout for script loading
      scriptLoadTimeout = window.setTimeout(() => {
        if (!window.Cal) {
          setCalendarLoadFailed(true);
          setCalendarLoaded(true);
        }
      }, 10000);
    };
    
    loadCalScript();
    
    // Cleanup function
    return () => {
      if (scriptLoadTimeout) clearTimeout(scriptLoadTimeout);
      if (!isOpen) {
        // Remove Cal scripts when dialog closes
        if (script) script.remove();
        document.querySelectorAll('script[src*="cal.com/embed/embed.js"]').forEach(s => s.remove());
      }
    };
  }, [showCalendar, isOpen, calendarLoadFailed, setCalendarLoaded]);
  
  return {
    scriptLoaded,
    calendarLoadFailed,
    setCalendarLoadFailed
  };
};
