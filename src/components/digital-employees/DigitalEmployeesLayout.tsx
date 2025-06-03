
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Footer from "@/components/Footer";
import ExitIntentAlert from "@/components/digital-employees/ExitIntentAlert";
import PremiumMobileNav from "@/components/digital-employees/PremiumMobileNav";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useDigitalEmployeesTracking } from "./DigitalEmployeesTracking";

interface DigitalEmployeesLayoutProps {
  children: React.ReactNode;
}

const DigitalEmployeesLayout = ({ children }: DigitalEmployeesLayoutProps) => {
  const isMobile = useIsMobile();
  const { handleWhatsAppClick, handleHomeClick } = useDigitalEmployeesTracking();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" style={{ width: 'calc(100vw - 4px)', margin: '0 2px' }}>
      {/* Exit Intent Alert */}
      <ExitIntentAlert />
      
      {/* Premium Mobile Navigation */}
      {isMobile ? (
        <PremiumMobileNav />
      ) : (
        /* Desktop Header */
        <header className="w-full-edge bg-background/20 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
          <div className="content-container">
            <div className="flex items-center justify-between h-16">
              <Link 
                to="/" 
                className="flex items-center gap-2 hover:text-gold transition-colors"
                onClick={handleHomeClick}
              >
                <ArrowLeft className="h-4 w-4" />
                Home
              </Link>
              <button
                onClick={handleWhatsAppClick}
                className="bg-gold hover:bg-gold-light text-background px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Entre em contato
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default DigitalEmployeesLayout;
