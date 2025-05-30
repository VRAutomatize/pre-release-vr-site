
import { useState, useEffect } from "react";

export const useHeaderScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Atualiza estado de scroll
          setIsScrolled(currentScrollY > 20);
          
          // A navbar só é visível quando está na seção hero (primeiros 90vh)
          // Quando o usuário rola além disso, ela desaparece
          if (currentScrollY > window.innerHeight * 0.85) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isScrolled, isVisible };
};
