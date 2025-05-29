
import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from "@/hooks/use-toast";

interface UseDynamicCalendarProps {
  elementId: string;
  calLink: string;
  isOpen: boolean;
  onLoaded?: () => void;
  onError?: () => void;
}

export const useDynamicCalendar = ({
  elementId,
  calLink,
  isOpen,
  onLoaded,
  onError
}: UseDynamicCalendarProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const initTimeoutRef = useRef<number>();
  const scriptLoadedRef = useRef(false);
  const retryCountRef = useRef(0);

  // Check if Cal.com script is already loaded
  const isCalScriptLoaded = useCallback(() => {
    return !!(window as any).Cal;
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    console.log("Cleaning up Dynamic Calendar");
    
    if (initTimeoutRef.current) {
      clearTimeout(initTimeoutRef.current);
    }
    
    // Clean up Cal instance if it exists
    try {
      if ((window as any).Cal && (window as any).Cal.ns && (window as any).Cal.ns.call) {
        (window as any).Cal.ns.call("destroy");
        console.log("Cal instance destroyed");
      }
    } catch (error) {
      console.log("Cal cleanup error (non-critical):", error);
    }
    
    setIsInitialized(false);
    setIsLoading(true);
    setHasError(false);
  }, []);

  // Initialize Cal.com calendar
  const initializeCalendar = useCallback(() => {
    if (!isOpen || isInitialized) {
      console.log("Skipping calendar init:", { isOpen, isInitialized });
      return;
    }

    console.log(`Initializing Dynamic Calendar (attempt ${retryCountRef.current + 1})`);
    setIsLoading(true);
    setHasError(false);

    try {
      // Check if Cal is already available
      if (isCalScriptLoaded()) {
        console.log("Cal script already loaded, initializing directly");
        initializeCalWithExistingScript();
        return;
      }

      console.log("Loading Cal script from CDN");
      
      // Cal.com initialization script
      (function (C: any, A: string, L: string) {
        let p = function (a: any, ar: any) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            
            // Create script element with error handling
            const script = d.createElement("script");
            script.src = A;
            script.onload = () => {
              console.log("Cal script loaded successfully");
              scriptLoadedRef.current = true;
              // Wait a bit for the script to initialize, then setup calendar
              setTimeout(initializeCalWithExistingScript, 1000);
            };
            script.onerror = () => {
              console.error("Failed to load Cal script from CDN");
              handleInitError();
            };
            
            d.head.appendChild(script);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
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

    } catch (error) {
      console.error("Error in calendar initialization:", error);
      handleInitError();
    }
  }, [isOpen, elementId, calLink, isInitialized]);

  // Initialize Cal with existing script
  const initializeCalWithExistingScript = useCallback(() => {
    try {
      console.log("Setting up Cal with existing script");
      
      // Initialize Cal
      (window as any).Cal("init", "call", { origin: "https://cal.com" });

      // Setup inline calendar
      (window as any).Cal.ns.call("inline", {
        elementOrSelector: `#${elementId}`,
        config: { 
          layout: "month_view",
          theme: "dark"
        },
        calLink: calLink,
      });

      // Apply custom styling
      (window as any).Cal.ns.call("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#292929" },
          dark: { "cal-brand": "#FFD700" }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      // Set longer timeout for calendar to render
      initTimeoutRef.current = window.setTimeout(() => {
        const calElement = document.getElementById(elementId);
        if (calElement && calElement.children.length > 0) {
          console.log("Dynamic Cal.com calendar initialized successfully");
          setIsLoading(false);
          setIsInitialized(true);
          if (onLoaded) onLoaded();
          retryCountRef.current = 0;
        } else {
          console.warn("Calendar element found but no content loaded");
          handleInitError();
        }
      }, 5000); // Increased timeout to 5 seconds

    } catch (error) {
      console.error("Error setting up Cal with existing script:", error);
      handleInitError();
    }
  }, [elementId, calLink, onLoaded]);

  // Handle initialization errors
  const handleInitError = useCallback(() => {
    console.error("Calendar initialization failed");
    setHasError(true);
    setIsLoading(false);
    retryCountRef.current += 1;
    
    if (onError) onError();
    
    toast({
      title: "Erro no calendário",
      description: "Não foi possível carregar o calendário. Tentando método alternativo...",
      variant: "destructive",
    });
  }, [onError]);

  // Retry function
  const retry = useCallback(() => {
    console.log("Retrying calendar initialization");
    cleanup();
    setTimeout(() => {
      initializeCalendar();
    }, 1000);
  }, [cleanup, initializeCalendar]);

  // Initialize when component mounts and is open
  useEffect(() => {
    if (isOpen && !isInitialized) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeCalendar();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, initializeCalendar, isInitialized]);

  // Cleanup on unmount or when closed
  useEffect(() => {
    if (!isOpen) {
      cleanup();
      scriptLoadedRef.current = false;
      retryCountRef.current = 0;
    }
  }, [isOpen, cleanup]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    isLoading,
    hasError,
    isInitialized,
    cleanup,
    retry
  };
};
