
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
    // Desktop fallback - render children without mobile layout
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Mobile Header */}
      <MobileHeader 
        title={title}
        showBackButton={showBackButton}
        actions={headerActions}
      />
      
      {/* Main Content Area - Single scroll container */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="pb-20 safe-area-pb">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default MobileLayout;
