
import { useEffect, useRef, useCallback } from 'react';

interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface ObserverEntry {
  element: Element;
  callback: (entry: IntersectionObserverEntry) => void;
  options: IntersectionOptions;
}

// Singleton observer manager
class OptimizedObserverManager {
  private observers: Map<string, IntersectionObserver> = new Map();
  private entries: Map<Element, ObserverEntry> = new Map();

  private getObserverKey(options: IntersectionOptions): string {
    return `${options.threshold || 0.3}-${options.rootMargin || '0px'}`;
  }

  observe(element: Element, callback: (entry: IntersectionObserverEntry) => void, options: IntersectionOptions = {}) {
    const key = this.getObserverKey(options);
    
    if (!this.observers.has(key)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const observerEntry = this.entries.get(entry.target);
            if (observerEntry) {
              observerEntry.callback(entry);
              
              // Remove if once option is true and element is intersecting
              if (observerEntry.options.once && entry.isIntersecting) {
                this.unobserve(entry.target);
              }
            }
          });
        },
        {
          threshold: options.threshold || 0.3,
          rootMargin: options.rootMargin || '0px'
        }
      );
      
      this.observers.set(key, observer);
    }

    const observer = this.observers.get(key)!;
    const observerEntry: ObserverEntry = { element, callback, options };
    
    this.entries.set(element, observerEntry);
    observer.observe(element);
  }

  unobserve(element: Element) {
    const entry = this.entries.get(element);
    if (entry) {
      const key = this.getObserverKey(entry.options);
      const observer = this.observers.get(key);
      
      if (observer) {
        observer.unobserve(element);
      }
      
      this.entries.delete(element);
    }
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.entries.clear();
  }
}

const observerManager = new OptimizedObserverManager();

export const useOptimizedIntersection = () => {
  const elementsRef = useRef<Set<Element>>(new Set());

  const observe = useCallback((
    element: Element | null,
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionOptions = {}
  ) => {
    if (!element) return;
    
    elementsRef.current.add(element);
    observerManager.observe(element, callback, options);
  }, []);

  const unobserve = useCallback((element: Element | null) => {
    if (!element) return;
    
    elementsRef.current.delete(element);
    observerManager.unobserve(element);
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      elementsRef.current.forEach(element => {
        observerManager.unobserve(element);
      });
      elementsRef.current.clear();
    };
  }, []);

  return { observe, unobserve };
};
