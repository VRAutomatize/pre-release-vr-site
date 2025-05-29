
import { useState, useCallback, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { getCalApi } from "@calcom/embed-react";

interface UseCalendarInitializerProps {
  elementId: string;
  calLink: string;
  onLoaded?: () => void;
  onError?: () => void;
  isOpen: boolean;
}

export const useCalendarInitializer = ({
  elementId,
  calLink,
  onLoaded,
  onError,
  isOpen
}: UseCalendarInitializerProps) => {
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);

  // Network check before attempting to load Cal.com
  const checkCalNetwork = useCallback(async () => {
    try {
      const response = await fetch('https://app.cal.com/status', { 
        method: 'HEAD',
        mode: 'no-cors',
        timeout: 5000
      });
      return true;
    } catch (error) {
      console.error('Cal.com network check failed:', error);
      return false;
    }
  }, []);

  // Retry initialization function
  const retryInitialization = useCallback(() => {
    if (retryCount < 3) {
      setLoadError(false);
      setRetryCount(prev => prev + 1);
      console.log(`Retrying Cal.com initialization (attempt ${retryCount + 1})`);
      initializeCalendar();
    } else {
      console.error('Max retry attempts reached for Cal.com');
      setLoadError(true);
      if (onError) onError();
    }
  }, [retryCount]);

  // Calendar initialization function with better error handling
  const initializeCalendar = useCallback(async () => {
    if (!isOpen || isInitializing) return;
    
    setIsInitializing(true);
    setLoadError(false);
    
    // Check network connectivity first
    const networkAvailable = await checkCalNetwork();
    if (!networkAvailable) {
      console.error('Cal.com network unavailable');
      setLoadError(true);
      setIsInitializing(false);
      return;
    }
    
    try {
      console.log("Initializing Cal.com API");
      const cal = await getCalApi();
      
      // Ensure cal object is properly loaded before calling methods
      if (!cal || typeof cal !== 'function') {
        throw new Error('Cal API not properly loaded');
      }
      
      // Only destroy if it exists and is a function
      if (cal.destroy && typeof cal.destroy === 'function') {
        try {
          cal.destroy();
        } catch (destroyError) {
          console.warn('Cal.com destroy method failed:', destroyError);
          // Continue with initialization even if destroy fails
        }
      }
      
      // Configure Cal.com with options
      cal("init", {
        debug: true,
        calLink,
        elementOrSelector: `#${elementId}`,
        config: {
          layout: "month_view",
          theme: "dark",
        }
      });
      
      // Add event listeners for monitoring
      cal("on", {
        action: "loaded",
        callback: () => {
          console.log("Cal.com calendar loaded successfully");
          setIsInitializing(false);
          setRetryCount(0); // Reset retry count on success
          if (onLoaded) onLoaded();
        }
      });
      
      cal("on", {
        action: "error",
        callback: (error: any) => {
          console.error("Cal.com calendar error:", error);
          setIsInitializing(false);
          // Don't immediately fail, try retry first
          setTimeout(() => {
            retryInitialization();
          }, 2000);
        }
      });
      
    } catch (error) {
      console.error("Cal.com initialization error:", error);
      setIsInitializing(false);
      // Don't immediately fail, try retry first
      setTimeout(() => {
        retryInitialization();
      }, 2000);
    }
  }, [isOpen, elementId, calLink, onLoaded, checkCalNetwork, retryCount, isInitializing]);

  // Cleanup function with better error handling
  const cleanupCalendar = useCallback(async () => {
    try {
      const cal = await getCalApi();
      if (cal && cal.destroy && typeof cal.destroy === 'function') {
        cal.destroy();
      }
    } catch (e) {
      console.log("Cal.com cleanup error (non-critical):", e);
    }
  }, []);

  // Cleanup when component unmounts or dialog closes
  useEffect(() => {
    return () => {
      if (!isOpen) {
        cleanupCalendar();
        setRetryCount(0);
        setIsInitializing(false);
      }
    };
  }, [isOpen, cleanupCalendar]);

  return {
    initializeCalendar,
    loadError,
    setLoadError,
    cleanupCalendar,
    retryInitialization,
    isInitializing,
    retryCount
  };
};
