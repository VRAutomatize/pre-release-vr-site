
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

  // Cleanup function
  const cleanup = useCallback(() => {
    if (initTimeoutRef.current) {
      clearTimeout(initTimeoutRef.current);
    }
    
    // Clean up Cal instance if it exists
    try {
      if (window.Cal && window.Cal.ns && window.Cal.ns.call) {
        window.Cal.ns.call("destroy");
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
    if (!isOpen || isInitialized) return;

    setIsLoading(true);
    setHasError(false);

    try {
      // Cal.com initialization script (adapted from your provided code)
      (function (C: any, A: string, L: string) {
        let p = function (a: any, ar: any) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
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

      // Initialize Cal
      window.Cal("init", "call", { origin: "https://cal.com" });

      // Setup inline calendar
      window.Cal.ns.call("inline", {
        elementOrSelector: `#${elementId}`,
        config: { 
          layout: "month_view",
          theme: "dark"
        },
        calLink: calLink,
      });

      // Apply custom styling
      window.Cal.ns.call("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#292929" },
          dark: { "cal-brand": "#FFD700" }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      // Set timeout to detect successful loading
      initTimeoutRef.current = window.setTimeout(() => {
        setIsLoading(false);
        setIsInitialized(true);
        if (onLoaded) onLoaded();
        console.log("Dynamic Cal.com calendar initialized successfully");
      }, 2000);

    } catch (error) {
      console.error("Error initializing dynamic calendar:", error);
      setHasError(true);
      setIsLoading(false);
      if (onError) onError();
      toast({
        title: "Erro no calendário",
        description: "Não foi possível carregar o calendário",
        variant: "destructive",
      });
    }
  }, [isOpen, elementId, calLink, onLoaded, onError, isInitialized]);

  // Initialize when component mounts and is open
  useEffect(() => {
    if (isOpen && !scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      initializeCalendar();
    }
  }, [isOpen, initializeCalendar]);

  // Cleanup on unmount or when closed
  useEffect(() => {
    return () => {
      if (!isOpen) {
        cleanup();
        scriptLoadedRef.current = false;
      }
    };
  }, [isOpen, cleanup]);

  return {
    isLoading,
    hasError,
    isInitialized,
    cleanup,
    retry: initializeCalendar
  };
};
