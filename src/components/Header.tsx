
import React, { useMemo } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import HeaderLogo from "./header/HeaderLogo";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileNavigation from "./header/MobileNavigation";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = React.memo(({ children }: HeaderProps) => {
  const { isScrolled, isVisible } = useHeaderScroll();
  const isMobile = useIsMobile();

  const headerClasses = useMemo(() => {
    const baseTransition = "transition-all duration-300";
    const visibilityClass = isVisible ? "translate-y-0" : "-translate-y-full";
    
    if (isMobile) {
      return `fixed top-0 left-0 right-0 z-50 ${baseTransition} ${visibilityClass} ${
        isScrolled ? "glass-blur shadow-lg" : "bg-background/80 backdrop-blur-sm"
      }`;
    }
    return `fixed top-4 left-4 right-4 z-50 ${baseTransition} ${visibilityClass} ${
      isScrolled ? "glass shadow-lg" : ""
    } rounded-xl mx-4`;
  }, [isScrolled, isMobile, isVisible]);

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <HeaderLogo />
          </div>

          {children || <DesktopNavigation />}
          <MobileNavigation />
        </nav>
      </div>
    </header>
  );
});

export default Header;
