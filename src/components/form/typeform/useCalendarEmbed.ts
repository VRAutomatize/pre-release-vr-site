
import { useEffect, useState } from "react";

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
  
  // Load Cal.com script dynamically when calendar view is shown
  useEffect(() => {
    if (showCalendar && isOpen && !scriptLoaded) {
      // Create Cal.com script
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
        
        // Initialize Cal.com after script is loaded
        if (window.Cal) {
          window.Cal("init", "call", {origin: "https://cal.com"});
          
          // Wait a bit for Cal to initialize properly
          setTimeout(() => {
            if (window.Cal && window.Cal.ns && window.Cal.ns.call) {
              window.Cal.ns.call("inline", {
                elementOrSelector: "#cal-embed-container",
                config: {
                  "layout": "month_view",
                  "theme": "dark",
                  "cssVarsPerTheme": {
                    "dark": {
                      "cal-brand": "#FFD700",
                    }
                  }
                },
                calLink: "vrautomatize/call",
              });
              
              // Mark calendar as loaded after a short delay to ensure rendering
              setTimeout(() => {
                setCalendarLoaded(true);
              }, 1000);
            }
          }, 500);
        }
      };
      
      document.head.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      if (!isOpen && scriptLoaded) {
        setScriptLoaded(false);
        
        // Find and remove the Cal.com script
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.src.includes('cal.com/embed/embed.js')) {
            try {
              document.head.removeChild(script);
            } catch (error) {
              console.error("Error removing Cal script:", error);
            }
          }
        });
      }
    };
  }, [showCalendar, isOpen, setCalendarLoaded, scriptLoaded]);
};
