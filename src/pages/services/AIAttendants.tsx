
import { Home, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/ai-attendants/HeroSection";
import DashboardPreview from "@/components/ai-attendants/DashboardPreview";
import VideoDemo from "@/components/ai-attendants/VideoDemo";
import PricingTable from "@/components/ai-attendants/PricingTable";
import Benefits from "@/components/Benefits";
import FinalCTA from "@/components/crm/FinalCTA";

const AIAttendants = () => {
  const whatsappLink = "https://wa.me/554788558257?text=Ol%C3%A1!%20Tenho%20interesse%20em%20atendentes%20de%20IA!";

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold-light text-black rounded-md px-4 py-2 flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Entre em contato
          </a>
        </div>
      </Header>

      <div className="container mx-auto px-4 pt-12 space-y-32">
        {/* Hero Section */}
        <HeroSection scrollToSection={scrollToSection} />
        
        {/* Dashboard Preview Section */}
        <DashboardPreview scrollToSection={scrollToSection} />
        
        {/* Video Demonstration Section */}
        <VideoDemo scrollToSection={scrollToSection} />

        {/* Benefits Section */}
        <Benefits />
        
        <section id="pricing-table">
          <PricingTable />
        </section>
        <FinalCTA whatsappLink={whatsappLink} />
      </div>
    </div>
  );
};

export default AIAttendants;
