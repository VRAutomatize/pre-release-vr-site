
import React, { useEffect } from "react";

interface NativeHapticFeedbackProps {
  type?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';
  trigger?: boolean;
  onComplete?: () => void;
}

export const useHapticFeedback = () => {
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'medium') => {
    // For web, we simulate haptic feedback with a brief visual/audio cue
    // In a real native app with Capacitor, this would use the Haptics plugin
    
    if ('vibrate' in navigator) {
      switch (type) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(20);
          break;
        case 'heavy':
          navigator.vibrate(50);
          break;
        case 'success':
          navigator.vibrate([10, 50, 10]);
          break;
        case 'warning':
          navigator.vibrate([20, 20, 20]);
          break;
        case 'error':
          navigator.vibrate([50, 100, 50]);
          break;
      }
    }

    // Visual feedback for web
    const element = document.activeElement;
    if (element instanceof HTMLElement) {
      element.style.transform = 'scale(0.98)';
      setTimeout(() => {
        element.style.transform = '';
      }, 100);
    }
  };

  return { triggerHaptic };
};

const NativeHapticFeedback: React.FC<NativeHapticFeedbackProps> = ({
  type = 'medium',
  trigger = false,
  onComplete
}) => {
  const { triggerHaptic } = useHapticFeedback();

  useEffect(() => {
    if (trigger) {
      triggerHaptic(type);
      onComplete?.();
    }
  }, [trigger, type, onComplete, triggerHaptic]);

  return null;
};

export default NativeHapticFeedback;
