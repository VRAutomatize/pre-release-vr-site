
import { useState } from "react";

export const useTypeformModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setShowCalendar(false);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setShowCalendar(false);
  };
  
  const showCalendarView = () => {
    setShowCalendar(true);
  };

  return {
    isOpen,
    showCalendar,
    openModal,
    closeModal,
    showCalendarView,
  };
};
