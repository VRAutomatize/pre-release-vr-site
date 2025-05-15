
import { useEffect } from "react";

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  isSubmitting: boolean;
  showCalendar: boolean;
  onClose: () => void;
  handleNextStep: () => void;
}

export const useKeyboardNavigation = ({
  isOpen,
  isSubmitting,
  showCalendar,
  onClose,
  handleNextStep
}: UseKeyboardNavigationProps) => {
  // Handle key press for form navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Enter' && !isSubmitting && !showCalendar) {
        e.preventDefault();
        handleNextStep();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, showCalendar, handleNextStep, onClose]);
};
