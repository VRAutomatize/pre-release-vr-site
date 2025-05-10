
import { useState, useEffect } from "react";

export const useTypeformModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [useAltCalendarView, setUseAltCalendarView] = useState(true); // Default to alternative view
  const [useFallbackIframe, setUseFallbackIframe] = useState(false);
  const [calendarLoadAttempts, setCalendarLoadAttempts] = useState(0);
  
  // Check for stored user preference for calendar view
  useEffect(() => {
    try {
      // Try to load previous successful method from local storage
      const storedPreference = localStorage.getItem('calendar-view-preference');
      if (storedPreference === 'iframe-fallback') {
        setUseFallbackIframe(true);
        console.log("Using iframe fallback based on stored preference");
      }
    } catch (error) {
      // Ignore storage errors
      console.log("Could not access localStorage for calendar preference");
    }
  }, []);

  const openModal = () => {
    setIsOpen(true);
    setShowCalendar(false);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    // Don't reset showCalendar immediately to allow for exit animation
    setTimeout(() => {
      setShowCalendar(false);
    }, 300);
  };
  
  const showCalendarView = () => {
    setShowCalendar(true);
  };
  
  const toggleCalendarView = () => {
    setUseAltCalendarView(prev => !prev);
  };
  
  // New method to switch to fallback iframe view
  const switchToFallbackView = () => {
    setUseFallbackIframe(true);
    // Store this preference for future visits
    try {
      localStorage.setItem('calendar-view-preference', 'iframe-fallback');
    } catch (error) {
      // Ignore storage errors
    }
    // Increment attempts counter
    setCalendarLoadAttempts(prev => prev + 1);
    console.log("Switched to iframe fallback view");
  };
  
  // New method to retry with default view
  const retryWithDefaultView = () => {
    setUseFallbackIframe(false);
    setCalendarLoadAttempts(prev => prev + 1);
    console.log("Retrying with default calendar view");
  };

  return {
    isOpen,
    showCalendar,
    useAltCalendarView,
    useFallbackIframe,
    calendarLoadAttempts,
    openModal,
    closeModal,
    showCalendarView,
    toggleCalendarView,
    switchToFallbackView,
    retryWithDefaultView
  };
};
