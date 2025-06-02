
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useIsMobile } from "@/hooks/useIsMobile";

interface DigitalEmployeesLayoutProps {
  children: React.ReactNode;
}

const DigitalEmployeesLayout = ({ children }: DigitalEmployeesLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className={`${isMobile ? 'pt-0' : 'pt-0'}`}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default DigitalEmployeesLayout;
