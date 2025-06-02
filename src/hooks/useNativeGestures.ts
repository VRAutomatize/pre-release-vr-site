
import { useEffect, useRef, useState } from "react";

interface SwipeState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  isActive: boolean;
}

interface UseNativeGesturesOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPullRefresh?: () => void;
  threshold?: number;
  pullRefreshThreshold?: number;
}

export const useNativeGestures = (options: UseNativeGesturesOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPullRefresh,
    threshold = 50,
    pullRefreshThreshold = 80
  } = options;

  const [swipeState, setSwipeState] = useState<SwipeState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    direction: null,
    isActive: false
  });

  const [isPullRefreshing, setIsPullRefreshing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startTime: number;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startTime = Date.now();
      
      setSwipeState({
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        deltaX: 0,
        deltaY: 0,
        direction: null,
        isActive: true
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!swipeState.isActive) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - swipeState.startX;
      const deltaY = touch.clientY - swipeState.startY;
      
      let direction: SwipeState['direction'] = null;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      setSwipeState(prev => ({
        ...prev,
        currentX: touch.clientX,
        currentY: touch.clientY,
        deltaX,
        deltaY,
        direction
      }));

      // Pull to refresh logic
      if (direction === 'down' && deltaY > pullRefreshThreshold && element.scrollTop === 0) {
        setIsPullRefreshing(true);
      }
    };

    const handleTouchEnd = () => {
      const { deltaX, deltaY, direction } = swipeState;
      const duration = Date.now() - startTime;
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / duration;

      // Execute swipe callbacks based on direction and threshold
      if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold || velocity > 0.5) {
        switch (direction) {
          case 'left':
            onSwipeLeft?.();
            break;
          case 'right':
            onSwipeRight?.();
            break;
          case 'up':
            onSwipeUp?.();
            break;
          case 'down':
            if (isPullRefreshing && onPullRefresh) {
              onPullRefresh();
            } else {
              onSwipeDown?.();
            }
            break;
        }
      }

      setSwipeState(prev => ({ ...prev, isActive: false }));
      setIsPullRefreshing(false);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [swipeState.isActive, threshold, pullRefreshThreshold, isPullRefreshing, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPullRefresh]);

  return {
    ref,
    swipeState,
    isPullRefreshing,
    isSwipeActive: swipeState.isActive
  };
};
