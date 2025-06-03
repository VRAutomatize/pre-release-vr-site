
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
    <div className="min-h-screen premium-gradient-bg overflow-x-hidden">
      {/* Import premium mobile styles */}
      <style jsx global>{`
        @import url('/src/styles/premium-mobile.css');
      `}</style>
      
      {/* Exit Intent Alert */}
      <ExitIntentAlert />
      
      {/* Premium Mobile Navigation */}
      {isMobile ? (
        <PremiumMobileNav />
      ) : (
        /* Desktop Header */
        <header className="nav-premium">
          <div className="container-premium">
            <div className="flex items-center justify-between h-16">
              <Link 
                to="/" 
                className="flex items-center gap-2 hover:text-gold transition-colors interactive-hover"
                onClick={handleHomeClick}
              >
                <ArrowLeft className="h-4 w-4" />
                Home
              </Link>
              <button
                onClick={handleWhatsAppClick}
                className="button-premium flex items-center gap-2 text-sm"
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
