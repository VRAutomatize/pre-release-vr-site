
import { useState } from "react";

export const useTypeformModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [useAltCalendarView, setUseAltCalendarView] = useState(true); // Default to alternative view

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

  return {
    isOpen,
    showCalendar,
    useAltCalendarView,
    openModal,
    closeModal,
    showCalendarView,
    toggleCalendarView,
  };
};
