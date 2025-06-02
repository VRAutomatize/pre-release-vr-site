
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import UniversalPageTransition from "@/components/animations/UniversalPageTransition";

// Importar estilos premium apenas para esta seção
import "@/styles/premium-optional.css";

interface DigitalEmployeesLayoutProps {
  children: React.ReactNode;
}

const DigitalEmployeesLayout: React.FC<DigitalEmployeesLayoutProps> = ({ children }) => {
  return (
    <UniversalPageTransition>
      <div className="premium-theme min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </div>
    </UniversalPageTransition>
  );
};

export default DigitalEmployeesLayout;
