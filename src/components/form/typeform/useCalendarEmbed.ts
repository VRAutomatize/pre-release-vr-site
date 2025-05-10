
import { useEffect } from "react";

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
  // Load Cal.com script dynamically when calendar view is shown
  useEffect(() => {
    if (showCalendar && isOpen) {
      // Create script element
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.onload = () => {
        setTimeout(() => {
          if (window.Cal) {
            // Initialize Cal
            window.Cal("init", "call", {origin: "https://cal.com"});
            
            // Setup inline calendar
            window.Cal.ns.call("inline", {
              elementOrSelector: "#my-cal-inline",
              config: {
                "layout": "month_view",
                "theme": "dark"
              },
              calLink: "vrautomatize/call",
            });
            
            // Add custom UI theme
            window.Cal.ns.call("ui", {
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
            
            // Mark as loaded after a short delay
            setTimeout(() => {
              setCalendarLoaded(true);
            }, 1000);
          }
        }, 300);
      };
      
      // Add the script to the page
      document.head.appendChild(script);
      
      // Cleanup function
      return () => {
        if (!isOpen) {
          setCalendarLoaded(false);
          
          // Remove any Cal.com scripts when dialog closes
          const scripts = document.querySelectorAll('script');
          scripts.forEach(s => {
            if (s.src && s.src.includes('cal.com/embed/embed.js')) {
              s.remove();
            }
          });
        }
      };
    }
  }, [showCalendar, isOpen, setCalendarLoaded]);
};
