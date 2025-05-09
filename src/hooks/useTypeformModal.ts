
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
    // Não resetamos showCalendar imediatamente para permitir animação de saída
    setTimeout(() => {
      setShowCalendar(false);
    }, 300);
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
