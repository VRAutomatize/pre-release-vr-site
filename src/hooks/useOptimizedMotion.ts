
import { useState, useEffect } from 'react';

export const useOptimizedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return {
    shouldReduceMotion,
    // Configurações otimizadas de animação
    animationConfig: shouldReduceMotion 
      ? { duration: 0, ease: "linear" }
      : { duration: 0.3, ease: "easeOut" }
  };
};
