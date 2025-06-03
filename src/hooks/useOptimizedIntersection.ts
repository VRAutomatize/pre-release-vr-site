
import { useEffect, useRef, useCallback } from 'react';

interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

// Singleton observer manager com otimizações agressivas
class OptimizedObserverManager {
  private observer: IntersectionObserver | null = null;
  private entries: Map<Element, (entry: IntersectionObserverEntry) => void> = new Map();
  private observedElements: Set<Element> = new Set();

  constructor() {
    // Usar um único observer global para tudo
    this.observer = new IntersectionObserver(
      (entries) => {
        // Processar em lote para melhor performance
        requestIdleCallback(() => {
          entries.forEach((entry) => {
            const callback = this.entries.get(entry.target);
            if (callback && entry.isIntersecting) {
              callback(entry);
            }
          });
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
  }

  observe(element: Element, callback: (entry: IntersectionObserverEntry) => void, options: IntersectionOptions = {}) {
    if (!this.observer || this.observedElements.has(element)) return;
    
    this.entries.set(element, callback);
    this.observedElements.add(element);
    this.observer.observe(element);
  }

  unobserve(element: Element) {
    if (!this.observer || !this.observedElements.has(element)) return;
    
    this.observer.unobserve(element);
    this.entries.delete(element);
    this.observedElements.delete(element);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.entries.clear();
      this.observedElements.clear();
    }
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
      elementsRef.current.forEach(element => {
        observerManager.unobserve(element);
      });
      elementsRef.current.clear();
    };
  }, []);

  return { observe, unobserve };
};
