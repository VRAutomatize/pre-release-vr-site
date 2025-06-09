
import React from "react";
import Footer from "@/components/Footer";
import ExitIntentAlert from "@/components/digital-employees/ExitIntentAlert";
import MobileStickyCTA from "@/components/digital-employees/MobileStickyCTA";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useDigitalEmployeesTracking } from "./DigitalEmployeesTracking";

interface DigitalEmployeesLayoutProps {
  children: React.ReactNode;
}

const DigitalEmployeesLayout = ({ children }: DigitalEmployeesLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden prevent-overflow">
      {/* Exit Intent Alert */}
      <ExitIntentAlert />
      
      {/* Mobile Sticky CTA - Restored and optimized */}
      <MobileStickyCTA />

      {/* Main Content - No header, clean layout */}
      <main className="relative z-10 prevent-overflow">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default DigitalEmployeesLayout;
