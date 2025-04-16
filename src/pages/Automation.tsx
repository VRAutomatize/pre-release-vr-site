
import React from "react";
import Header from "@/components/Header";
import AutomationHero from "@/components/automation/AutomationHero";
import EligibilitySection from "@/components/automation/EligibilitySection";
import BenefitsSection from "@/components/automation/BenefitsSection";
import ProjectsSection from "@/components/automation/ProjectsSection";
import TestimonialsSection from "@/components/automation/TestimonialsSection";
import LeadCaptureForm from "@/components/automation/LeadCaptureForm";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Automation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AutomationHero />
      <EligibilitySection />
      <BenefitsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <LeadCaptureForm />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Automation;
