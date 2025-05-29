
import { useState, useEffect } from 'react';

export const useKeyboardDetection = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Use Visual Viewport API if available (modern browsers)
    if (window.visualViewport) {
      const handleViewportChange = () => {
        const currentHeight = window.visualViewport!.height;
        const windowHeight = window.innerHeight;
        
        // Consider keyboard open if viewport is significantly smaller
        const isOpen = currentHeight < windowHeight * 0.8;
        setIsKeyboardOpen(isOpen);
        setViewportHeight(currentHeight);
      };

      window.visualViewport.addEventListener('resize', handleViewportChange);
      
      return () => {
        window.visualViewport?.removeEventListener('resize', handleViewportChange);
      };
    } else {
      // Fallback for older browsers
      const handleResize = () => {
        const currentHeight = window.innerHeight;
        const isOpen = currentHeight < viewportHeight * 0.8;
        setIsKeyboardOpen(isOpen);
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [viewportHeight]);

  return { isKeyboardOpen, viewportHeight };
};
