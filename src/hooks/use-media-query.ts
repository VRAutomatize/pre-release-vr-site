
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    
    // Initial check for SSR
    setMatches(media.matches);
    
    // Create a listener for changes
    const listener = () => setMatches(media.matches);
    
    // Attach the listener to know when the matches value changes
    media.addEventListener("change", listener);
    
    // Remove the listener when the component unmounts
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
