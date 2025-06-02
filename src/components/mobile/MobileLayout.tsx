
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
    <div className="flex flex-col h-screen bg-background overflow-hidden w-full">
      {/* Mobile Header - Edge to Edge */}
      <MobileHeader 
        title={title}
        showBackButton={showBackButton}
        actions={headerActions}
      />
      
      {/* Main Content Area - Completely Edge to Edge */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full">
        <div className="pb-16 min-h-full w-full">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation - Edge to Edge */}
      <BottomNavigation />
    </div>
  );
};

export default MobileLayout;
