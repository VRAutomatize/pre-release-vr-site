
import { useState } from "react";

export const useCalendarState = () => {
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [calendarError, setCalendarError] = useState(false);
  
  return {
    calendarLoaded,
    setCalendarLoaded,
    calendarError,
    setCalendarError
  };
};
