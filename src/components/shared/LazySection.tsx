
import React, { useState, useRef, useEffect } from 'react';
import { useOptimizedIntersection } from '@/hooks/useOptimizedIntersection';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  id?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0.1,
  className = '',
  id
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { observe } = useOptimizedIntersection();

  useEffect(() => {
    if (elementRef.current) {
      observe(
        elementRef.current,
        (entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
          }
        },
        { threshold, rootMargin, once: true }
      );
    }
  }, [observe, threshold, rootMargin, hasLoaded]);

  return (
    <div ref={elementRef} className={className} id={id}>
      {isVisible ? children : (fallback || <div className="min-h-[200px]" />)}
    </div>
  );
};

export default React.memo(LazySection);
