
import { useEffect, useState } from "react";
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
  const [networkChecked, setNetworkChecked] = useState(false);
  
  // Check if network is available for Cal.com
  useEffect(() => {
    if (showCalendar && isOpen && !networkChecked) {
      // Simple ping to Cal.com to check connectivity
      fetch('https://app.cal.com/status', { 
        method: 'HEAD',
        mode: 'no-cors' 
      })
      .then(() => {
        console.log("Cal.com network connection successful");
        setNetworkChecked(true);
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
  }, [showCalendar, isOpen, networkChecked]);
  
  // Load Cal.com script dynamically when calendar view is shown
  useEffect(() => {
    if (showCalendar && isOpen && !calendarLoadFailed) {
      // Keep track of script element to remove it when unmounting
      let script: HTMLScriptElement | null = null;
      let scriptLoadTimeout: number | undefined;
      let calInitTimeout: number | undefined;
      
      // Function to initialize Cal once script is loaded
      const initializeCal = () => {
        console.log("Attempting to initialize Cal.com");
        
        if (!window.Cal) {
          console.error("Cal.com script loaded but Cal object not available");
          return false;
        }
        
        try {
          // Initialize Cal
          window.Cal("init", { origin: "https://cal.com" });
          
          // Setup inline calendar with maximum compatibility settings
          window.Cal("inline", {
            elementOrSelector: "#my-cal-inline",
            calLink: "vrautomatize/call",
            config: {
              "layout": "month_view",
              "theme": "dark",
              "hideEventTypeDetails": false,
              "enabledLocales": ["pt", "en"]
            }
          });
          
          // Add custom UI theme
          window.Cal("ui", {
            "theme": "dark",
            "styles": {
              "branding": {
                "brandColor": "#FFD700"
              }
            },
            "hideEventTypeDetails": false
          });
          
          // Add event listener for debugging
          window.Cal("on", {
            action: "*",
            callback: (data: any) => {
              console.log(`Cal.com event: ${data?.action || 'unknown'}`);
              
              // Detect successful load
              if (data?.action === 'calendar_loaded' || data?.action === 'loaded') {
                setCalendarLoaded(true);
              }
            }
          });
          
          console.log("Cal.com initialization completed");
          return true;
        } catch (error) {
          console.error("Error initializing Cal.com:", error);
          return false;
        }
      };
      
      // Create and load the script
      const loadCalScript = () => {
        console.log("Loading Cal.com script");
        setCalendarLoaded(false);
        
        // Remove any existing Cal scripts first
        const existingScripts = document.querySelectorAll('script[src*="cal.com"]');
        existingScripts.forEach(s => s.remove());
        
        // Create script element
        script = document.createElement('script');
        script.src = "https://app.cal.com/embed/embed.js";
        script.async = true;
        script.crossOrigin = "anonymous";
        
        // Handle script load success
        script.onload = () => {
          console.log("Cal.com script loaded successfully");
          setScriptLoaded(true);
          
          // Try to initialize Cal with a small delay
          setTimeout(() => {
            const initialized = initializeCal();
            
            if (initialized) {
              // Mark as loaded after a short additional delay to allow rendering
              setTimeout(() => {
                setCalendarLoaded(true);
                console.log("Calendar marked as loaded");
              }, 1000);
            } else {
              // Try one more time after a delay
              calInitTimeout = window.setTimeout(() => {
                console.log("Retrying Cal.com initialization...");
                const retrySuccess = initializeCal();
                
                if (retrySuccess) {
                  setTimeout(() => setCalendarLoaded(true), 1000);
                } else {
                  handleCalendarFailure("Failed to initialize calendar");
                }
              }, 2000);
            }
          }, 300);
        };
        
        // Handle script load error
        script.onerror = () => {
          console.error("Failed to load Cal.com script");
          handleCalendarFailure("Failed to load calendar script");
        };
        
        // Add the script to the page
        document.head.appendChild(script);
        
        // Set a timeout to prevent infinite loading
        scriptLoadTimeout = window.setTimeout(() => {
          if (!window.Cal) {
            console.error("Cal.com script loading timeout");
            handleCalendarFailure("Calendar loading timeout");
          }
        }, 12000); // 12 second timeout
      };
      
      // Handle calendar loading failure
      const handleCalendarFailure = (message: string) => {
        console.error(message);
        setCalendarLoadFailed(true);
        setCalendarLoaded(true); // Mark as "loaded" to remove spinner
        toast({
          title: "Problema ao carregar calendário",
          description: "Estamos alternando para um método de carregamento alternativo",
          variant: "destructive",
        });
      };
      
      // Start loading the script
      loadCalScript();
      
      // Cleanup function
      return () => {
        // Clear timeouts
        if (scriptLoadTimeout) window.clearTimeout(scriptLoadTimeout);
        if (calInitTimeout) window.clearTimeout(calInitTimeout);
        
        // Reset states
        setScriptLoaded(false);
        
        if (!isOpen) {
          setCalendarLoaded(false);
          
          // Remove Cal.com scripts when dialog closes
          if (script) {
            script.remove();
          }
          
          // Remove any other Cal.com scripts that might be present
          const scripts = document.querySelectorAll('script');
          scripts.forEach(s => {
            if (s.src && s.src.includes('cal.com/embed/embed.js')) {
              s.remove();
            }
          });
          
          // Remove any Cal-related elements
          const calElements = document.querySelectorAll('[data-cal-namespace]');
          calElements.forEach(el => el.remove());
        }
      };
    }
  }, [showCalendar, isOpen, calendarLoadFailed, setCalendarLoaded]);
  
  return {
    scriptLoaded,
    calendarLoadFailed,
    setCalendarLoadFailed
  };
};
