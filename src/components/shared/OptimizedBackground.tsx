
import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface OptimizedBackgroundProps {
  variant?: 'hero' | 'section' | 'minimal';
  children: React.ReactNode;
}

const OptimizedBackground = ({ 
  variant = 'section', 
  children 
}: OptimizedBackgroundProps) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Em mobile ou com preferência por menos movimento, simplificamos os efeitos
  const shouldReduceEffects = isMobile || prefersReducedMotion;

  const getBackgroundElements = () => {
    if (shouldReduceEffects) {
      // Versão simplificada para mobile/reduced motion
      return (
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gold/10 rounded-full filter blur-2xl" />
        </div>
      );
    }

    // Versão completa para desktop
    switch (variant) {
      case 'hero':
        return (
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>
        );
      case 'section':
        return (
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gold/10 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          </div>
        );
    }
  };

  return (
    <div className="relative overflow-hidden">
      {getBackgroundElements()}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default OptimizedBackground;
