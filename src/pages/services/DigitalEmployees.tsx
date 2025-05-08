
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/digital-employees/HeroSection";
import IdealForSection from "@/components/digital-employees/IdealForSection";
import ComparisonSection from "@/components/digital-employees/ComparisonSection";
import ProcessSection from "@/components/digital-employees/ProcessSection";
import UseCasesSection from "@/components/digital-employees/UseCasesSection";
import CTASection from "@/components/digital-employees/CTASection";

const DigitalEmployees = () => {
  const calendarLink = "https://www.cal.com/vrautomatize";
  
  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <a href={calendarLink} target="_blank" rel="noopener noreferrer" className="bg-gold hover:bg-gold-light text-background rounded-lg px-4 py-2 flex items-center gap-2">
            <span className="h-4 w-4 mr-2" />
            Agendar Consulta
          </a>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-24 space-y-32">
        {/* Hero Section */}
        <HeroSection calendarLink={calendarLink} />
        
        {/* Ideal For Section */}
        <IdealForSection />
        
        {/* Comparison Section */}
        <ComparisonSection />
        
        {/* Process Section */}
        <ProcessSection />
        
        {/* Use Cases Section */}
        <UseCasesSection />
        
        {/* CTA Section */}
        <CTASection calendarLink={calendarLink} />
      </div>
    </div>
  );
};

export default DigitalEmployees;
