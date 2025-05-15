
import { useEffect } from "react";

interface UseCalendarErrorHandlingProps {
  showCalendar: boolean;
  calendarLoaded: boolean;
  setCalendarLoaded: (loaded: boolean) => void;
  setCalendarError: (error: boolean) => void;
}

export const useCalendarErrorHandling = ({
  showCalendar,
  calendarLoaded,
  setCalendarLoaded,
  setCalendarError
}: UseCalendarErrorHandlingProps) => {
  // Set up listener for Cal.com errors
  useEffect(() => {
    if (showCalendar) {
      const handleCalError = () => {
        console.error("Cal.com error detected");
        setCalendarError(true);
      };
      
      // Listen for errors from Cal.com (custom event we could dispatch)
      window.addEventListener('cal:error', handleCalError);
      
      // Set a timeout to detect if calendar hasn't loaded
      const timeout = setTimeout(() => {
        if (!calendarLoaded) {
          console.log("Calendar loading timeout triggered");
          setCalendarError(true);
          setCalendarLoaded(true); // Stop the loading indicator
        }
      }, 12000); // 12 second timeout
      
      return () => {
        window.removeEventListener('cal:error', handleCalError);
        clearTimeout(timeout);
      };
    }
  }, [showCalendar, calendarLoaded, setCalendarError, setCalendarLoaded]);
};
