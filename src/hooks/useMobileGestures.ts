
import { useEffect, useCallback, useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface PullToRefreshOptions {
  onRefresh: () => void;
  threshold?: number;
  enabled?: boolean;
}

export const useMobileGestures = (
  elementRef: React.RefObject<HTMLElement>,
  handlers: SwipeHandlers = {}
) => {
  const startTouch = useRef<{ x: number; y: number } | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    startTouch.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!startTouch.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startTouch.current.x;
    const deltaY = touch.clientY - startTouch.current.y;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if it's a horizontal or vertical swipe
    if (absDeltaX > absDeltaY && absDeltaX > minSwipeDistance) {
      // Horizontal swipe
      if (deltaX > 0) {
        handlers.onSwipeRight?.();
      } else {
        handlers.onSwipeLeft?.();
      }
    } else if (absDeltaY > absDeltaX && absDeltaY > minSwipeDistance) {
      // Vertical swipe
      if (deltaY > 0) {
        handlers.onSwipeDown?.();
      } else {
        handlers.onSwipeUp?.();
      }
    }

    startTouch.current = null;
  }, [handlers, minSwipeDistance]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
};

export const usePullToRefresh = (
  elementRef: React.RefObject<HTMLElement>,
  options: PullToRefreshOptions
) => {
  const { onRefresh, threshold = 80, enabled = true } = options;
  const startY = useRef<number>(0);
  const isPulling = useRef<boolean>(false);
  const currentY = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return;
    
    const element = elementRef.current;
    if (!element || element.scrollTop > 0) return;

    startY.current = e.touches[0].clientY;
    isPulling.current = true;
  }, [enabled]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled || !isPulling.current) return;

    const element = elementRef.current;
    if (!element || element.scrollTop > 0) {
      isPulling.current = false;
      return;
    }

    currentY.current = e.touches[0].clientY - startY.current;
    
    if (currentY.current > 0) {
      // Add visual feedback here if needed
      const pullDistance = Math.min(currentY.current, threshold * 1.5);
      element.style.transform = `translateY(${pullDistance * 0.4}px)`;
    }
  }, [enabled, threshold]);

  const handleTouchEnd = useCallback(() => {
    if (!enabled || !isPulling.current) return;

    const element = elementRef.current;
    if (!element) return;

    if (currentY.current > threshold) {
      onRefresh();
    }

    // Reset transform
    element.style.transform = '';
    isPulling.current = false;
    currentY.current = 0;
  }, [enabled, threshold, onRefresh]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
};

export const useHapticFeedback = () => {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  const lightTap = useCallback(() => vibrate(10), [vibrate]);
  const mediumTap = useCallback(() => vibrate(50), [vibrate]);
  const heavyTap = useCallback(() => vibrate([100, 50, 100]), [vibrate]);

  return {
    vibrate,
    lightTap,
    mediumTap,
    heavyTap
  };
};
