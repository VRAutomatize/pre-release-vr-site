
import { useState, useEffect, useCallback } from "react";

type CalendarViewMethod = 'default' | 'simple' | 'iframe';

export const useTypeformModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarViewMethod, setCalendarViewMethod] = useState<CalendarViewMethod>('simple');
  const [calendarLoadAttempts, setCalendarLoadAttempts] = useState(0);
  
  // Load stored preferences once on component initialization
  useEffect(() => {
    try {
      const storedPreference = localStorage.getItem('calendar-view-preference') as CalendarViewMethod | null;
      if (storedPreference && ['simple', 'iframe'].includes(storedPreference)) {
        setCalendarViewMethod(storedPreference);
      }
    } catch (error) {
      console.log("Could not access localStorage for calendar preference");
    }
  }, []);

  // Modal controls
  const openModal = useCallback(() => {
    setIsOpen(true);
    setShowCalendar(false);
  }, []);
  
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setShowCalendar(false);
    }, 300);
  }, []);
  
  const showCalendarView = useCallback(() => {
    setShowCalendar(true);
  }, []);
  
  // Method to switch between calendar view methods
  const switchCalendarMethod = useCallback((method: CalendarViewMethod) => {
    setCalendarViewMethod(method);
    
    try {
      localStorage.setItem('calendar-view-preference', method);
    } catch (error) {
      // Ignore storage errors
    }
    
    setCalendarLoadAttempts(prev => prev + 1);
  }, []);

  return {
    isOpen,
    showCalendar,
    calendarViewMethod,
    calendarLoadAttempts,
    openModal,
    closeModal,
    showCalendarView,
    switchCalendarMethod
  };
};
