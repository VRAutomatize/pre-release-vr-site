
import React, { useMemo } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import HeaderLogo from "./header/HeaderLogo";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = React.memo(({
  children
}: HeaderProps) => {
  const {
    isScrolled,
    isVisible
  } = useHeaderScroll();
  const isMobile = useIsMobile();

  const headerClasses = useMemo(() => {
    const baseTransition = "transition-all duration-300";
    const visibilityClass = isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0";
    
    if (isMobile) {
      return `fixed top-0 left-0 right-0 z-50 w-screen ${baseTransition} ${visibilityClass} ${isScrolled ? "glass-blur shadow-lg" : "bg-background/20 backdrop-blur-sm"}`;
    }
    
    return `fixed top-0 left-0 right-0 z-50 w-screen ${baseTransition} ${visibilityClass} ${isScrolled ? "glass shadow-lg" : "bg-background/20 backdrop-blur-sm"}`;
  }, [isScrolled, isMobile, isVisible]);

  return (
    <header className={headerClasses}>
      <div className="w-full px-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <HeaderLogo />
            {children}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
