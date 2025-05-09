
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
      // Create Cal.com script
      const script = document.createElement('script');
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.onload = () => {
        // Initialize Cal.com after script is loaded
        if (window.Cal) {
          window.Cal("init", "call", {origin: "https://cal.com"});
          // Wait a bit for Cal to initialize
          setTimeout(() => {
            if (window.Cal && window.Cal.ns && window.Cal.ns.call) {
              window.Cal.ns.call("inline", {
                elementOrSelector: "#cal-embed-container",
                config: {
                  "layout": "month_view",
                  "theme": "dark",
                },
                calLink: "vrautomatize/call",
              });
              window.Cal.ns.call("ui", {
                "theme": "dark",
                "hideEventTypeDetails": true,
                "layout": "month_view"
              });
              setCalendarLoaded(true);
            }
          }, 500);
        }
      };
      document.head.appendChild(script);
      
      // Cleanup function to remove script when modal is closed
      return () => {
        try {
          document.head.removeChild(script);
        } catch (error) {
          console.error("Error removing Cal script:", error);
        }
      };
    }
  }, [showCalendar, isOpen, setCalendarLoaded]);
};
