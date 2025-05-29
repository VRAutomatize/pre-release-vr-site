
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
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
  const { handleWhatsAppClick, handleHomeClick } = useDigitalEmployeesTracking();

  // Scroll padding dinâmico baseado no dispositivo
  const scrollPaddingClass = isMobile ? "scroll-pt-16" : "scroll-pt-24";

  return (
    <div className={`min-h-screen bg-background overflow-x-hidden ${scrollPaddingClass}`}>
      {/* Exit Intent Alert */}
      <ExitIntentAlert />
      
      <Header>
        <div className="hidden md:flex items-center gap-8">
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
            className="bg-gold hover:bg-gold-light text-background rounded-md px-4 py-2 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Entre em contato
          </button>
        </div>
      </Header>

      {children}

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />

      <Footer />
    </div>
  );
};

export default DigitalEmployeesLayout;
