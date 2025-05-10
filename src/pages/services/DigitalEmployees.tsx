
import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/digital-employees/HeroSection";
import CTASection from "@/components/digital-employees/CTASection";
import UseCasesSection from "@/components/digital-employees/UseCasesSection";
import ProcessSection from "@/components/digital-employees/ProcessSection";
import ComparisonSection from "@/components/digital-employees/ComparisonSection";
import IdealForSection from "@/components/digital-employees/IdealForSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";

// Add type definition for Window with Cal property
declare global {
  interface Window {
    Cal?: any;
  }
}

const DigitalEmployees = () => {
  // Configuration settings - usando URLs reais em produção
  const calendarLink = "https://cal.com/vrautomatize/call"; 
  // Em produção, substitua por um webhook real
  const webhookUrl = "https://webhook.site/your-webhook";
  
  const whatsappLink = React.useCallback(() => "https://wa.me/554788558257?text=Olá!%20Tenho%20interesse%20em%20Funcionários%20Digitais!", []);

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <a 
            href={whatsappLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold-light text-background rounded-md px-4 py-2 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Entre em contato
          </a>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-12">
        {/* Hero Section */}
        <HeroSection calendarLink={calendarLink} webhookUrl={webhookUrl} />
        
        {/* Use Cases Section */}
        <UseCasesSection />
        
        {/* Process Section */}
        <ProcessSection />
        
        {/* Comparison Section */}
        <ComparisonSection />
        
        {/* Ideal For Section */}
        <IdealForSection />
        
        {/* CTA Section - Now moved below IdealForSection */}
        <CTASection calendarLink={calendarLink} webhookUrl={webhookUrl} />
      </div>

      <Footer />
    </div>
  );
};

export default DigitalEmployees;
