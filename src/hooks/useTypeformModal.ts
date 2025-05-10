
import { useState, useEffect, useCallback } from "react";

export const useTypeformModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarViewMethod, setCalendarViewMethod] = useState<'default' | 'simple' | 'iframe'>('simple'); // Default to simple method
  const [calendarLoadAttempts, setCalendarLoadAttempts] = useState(0);
  
  // Load stored preferences once on component initialization
  useEffect(() => {
    try {
      // Try to load previous successful method from local storage
      const storedPreference = localStorage.getItem('calendar-view-preference');
      if (storedPreference && (storedPreference === 'simple' || storedPreference === 'iframe')) {
        setCalendarViewMethod(storedPreference as 'simple' | 'iframe');
        console.log(`Using ${storedPreference} calendar view based on stored preference`);
      }
    } catch (error) {
      // Ignore storage errors
      console.log("Could not access localStorage for calendar preference");
    }
  }, []);

  // Use callbacks for all functions to prevent unnecessary re-renders
  const openModal = useCallback(() => {
    setIsOpen(true);
    setShowCalendar(false);
  }, []);
  
  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Don't reset showCalendar immediately to allow for exit animation
    setTimeout(() => {
      setShowCalendar(false);
    }, 300);
  }, []);
  
  const showCalendarView = useCallback(() => {
    setShowCalendar(true);
  }, []);
  
  // Method to switch between calendar view methods
  const switchCalendarMethod = useCallback((method: 'default' | 'simple' | 'iframe') => {
    setCalendarViewMethod(method);
    
    // Store this preference for future visits
    try {
      localStorage.setItem('calendar-view-preference', method);
    } catch (error) {
      // Ignore storage errors
    }
    
    // Increment attempts counter
    setCalendarLoadAttempts(prev => prev + 1);
    console.log(`Switched to ${method} calendar view method`);
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
