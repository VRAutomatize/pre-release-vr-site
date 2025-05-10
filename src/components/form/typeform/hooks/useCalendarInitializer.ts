
import { useState, useCallback, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { getCalApi } from "@calcom/embed-react";

interface UseCalendarInitializerProps {
  elementId: string;
  calLink: string;
  onLoaded?: () => void;
  onError?: () => void;
  isOpen: boolean;
}

export const useCalendarInitializer = ({
  elementId,
  calLink,
  onLoaded,
  onError,
  isOpen
}: UseCalendarInitializerProps) => {
  const [loadError, setLoadError] = useState(false);

  // Network check before attempting to load Cal.com
  const checkCalNetwork = useCallback(async () => {
    try {
      const response = await fetch('https://app.cal.com/status', { 
        method: 'HEAD',
        mode: 'no-cors' 
      });
      return true;
    } catch (error) {
      console.error('Cal.com network check failed:', error);
      return false;
    }
  }, []);

  // Calendar initialization function
  const initializeCalendar = useCallback(async () => {
    if (!isOpen) return;
    
    setLoadError(false);
    
    // Check network connectivity first
    const networkAvailable = await checkCalNetwork();
    if (!networkAvailable) {
      console.error('Cal.com network unavailable');
      setLoadError(true);
      if (onError) onError();
      return;
    }
    
    try {
      console.log("Initializing Cal.com API");
      const cal = await getCalApi();
      
      // Clear any previous instance
      cal.destroy();
      
      // Configure Cal.com with options
      cal("init", {
        debug: true,
        calLink,
        elementOrSelector: `#${elementId}`,
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
          if (onLoaded) onLoaded();
        }
      });
      
      cal("on", {
        action: "error",
        callback: (error: any) => {
          console.error("Cal.com calendar error:", error);
          setLoadError(true);
          if (onError) onError();
        }
      });
      
    } catch (error) {
      console.error("Cal.com initialization error:", error);
      setLoadError(true);
      if (onError) onError();
      toast({
        title: "Problema ao carregar calendário",
        description: "Estamos alternando para um método alternativo",
        variant: "destructive",
      });
    }
  }, [isOpen, elementId, calLink, onLoaded, onError, checkCalNetwork]);

  // Cleanup function
  const cleanupCalendar = useCallback(async () => {
    try {
      const cal = await getCalApi();
      cal.destroy();
    } catch (e) {
      console.log("Cal.com cleanup error:", e);
    }
  }, []);

  // Cleanup when component unmounts or dialog closes
  useEffect(() => {
    return () => {
      if (!isOpen) {
        cleanupCalendar();
      }
    };
  }, [isOpen, cleanupCalendar]);

  return {
    initializeCalendar,
    loadError,
    setLoadError,
    cleanupCalendar
  };
};
