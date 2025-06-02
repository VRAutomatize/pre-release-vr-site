
import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import BottomNavigation from "./BottomNavigation";
import MobileHeader from "./MobileHeader";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  headerActions?: React.ReactNode;
}

const MobileLayout = ({ 
  children, 
  title, 
  showBackButton = false,
  headerActions 
}: MobileLayoutProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Mobile Header - Compact */}
      <MobileHeader 
        title={title}
        showBackButton={showBackButton}
        actions={headerActions}
      />
      
      {/* Main Content Area - Edge to Edge, Single Scroll */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="pb-16 min-h-full">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation - Compact */}
      <BottomNavigation />
    </div>
  );
};

export default MobileLayout;
