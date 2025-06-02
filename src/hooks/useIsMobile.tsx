
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Function to check if device is mobile
    const checkIsMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent || navigator.vendor;
      
      // Check screen width
      const isSmallScreen = width < MOBILE_BREAKPOINT;
      
      // Check user agent for mobile devices
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Consider touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      return isSmallScreen || (isMobileUA && hasTouch);
    };
    
    // Check initial state
    setIsMobile(checkIsMobile());
    
    // Create event listener function
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
