
import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import NativeBottomNavigation from "./NativeBottomNavigation";
import NativeMobileHeader from "./NativeMobileHeader";

interface NativeMobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  headerActions?: React.ReactNode;
  transparentHeader?: boolean;
  fullScreen?: boolean;
}

const NativeMobileLayout = ({ 
  children, 
  title,
  subtitle,
  showBackButton = false,
  headerActions,
  transparentHeader = false,
  fullScreen = false
}: NativeMobileLayoutProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden w-full">
      {/* Mobile Header */}
      {!fullScreen && (
        <NativeMobileHeader 
          title={title}
          subtitle={subtitle}
          showBackButton={showBackButton}
          actions={headerActions}
          transparent={transparentHeader}
        />
      )}
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50" />
        
        {/* Content */}
        <div className={`relative z-10 min-h-full w-full ${!fullScreen ? 'pb-20' : ''}`}>
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation */}
      {!fullScreen && <NativeBottomNavigation />}
    </div>
  );
};

export default NativeMobileLayout;
